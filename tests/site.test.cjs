const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const source = fs.readFileSync(path.join(root, 'site.js'), 'utf8');
const releaseAt = Date.parse('2026-09-11T00:00:00+03:00');

// Run the shipped script with a controlled clock and media API. No browser or dependencies required.
function setup({ now = releaseAt - 1000, reducedMotion = false, saveData = false, rejectPlay = false } = {}) {
  let clock = now;
  const elements = new Map();
  const listeners = new Map();
  const intervals = new Map();
  const classes = new Set();
  function element() {
    const handlers = new Map();
    return {
      hidden: false, textContent: '', attributes: {},
      addEventListener(type, handler) {
        if (!handlers.has(type)) handlers.set(type, []);
        handlers.get(type).push(handler);
      },
      emit(type, event = {}) { (handlers.get(type) || []).forEach(fn => fn(event)); },
      setAttribute(name, value) { this.attributes[name] = value; }
    };
  }
  for (const [, id] of html.matchAll(/\bid="([^"]+)"/g)) elements.set(id, element());
  elements.get('release-date').dateTime = html.match(/id="release-date" datetime="([^"]+)"/)[1];
  const units = Object.fromEntries(['days', 'hours', 'minutes', 'seconds'].map(key => [key, element()]));
  const video = elements.get('bgvid');
  const mediaSource = element();
  video.paused = true;
  video.ended = false;
  video.playCalls = 0;
  video.querySelector = () => mediaSource;
  video.play = () => {
    video.playCalls++;
    if (rejectPlay) return Promise.reject(new Error('Autoplay blocked'));
    video.paused = false;
    video.emit('play');
    return Promise.resolve();
  };
  video.pause = () => { video.paused = true; video.emit('pause'); };
  const preference = element();
  preference.matches = reducedMotion;
  const document = {
    hidden: false,
    body: { classList: { toggle(name, on) { if (on) classes.add(name); else classes.delete(name); } } },
    getElementById(id) { assert.ok(elements.has(id), `Missing element ${id}`); return elements.get(id); },
    querySelector(selector) { return units[selector.match(/data-unit="([^"]+)"/)[1]]; },
    addEventListener(name, handler) { listeners.set(name, handler); }
  };
  const window = {
    matchMedia: () => preference,
    setInterval(callback) { const id = intervals.size + 1; intervals.set(id, callback); return id; },
    clearInterval(id) { intervals.delete(id); },
    addEventListener(name, handler) { listeners.set(name, handler); }
  };
  class Clock extends Date { static now() { return clock; } }
  vm.runInNewContext(source, { document, window, navigator: { connection: { saveData } }, Date: Clock, Promise });
  return {
    elements, units, video, document, listeners, intervals, classes, mediaSource, preference,
    tick(next) { clock = next; [...intervals.values()].forEach(fn => fn()); },
    click(id) { elements.get(id).emit('click'); }
  };
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test('uses Turkish midnight, counts the last second, then switches every release affordance exactly once', () => {
  assert.equal(new Date(releaseAt).toISOString(), '2026-09-10T21:00:00.000Z');
  const app = setup({ now: releaseAt - 500 });
  assert.equal(app.units.seconds.textContent, '01');
  assert.equal(app.elements.get('countdown').hidden, false);
  assert.equal(app.elements.get('release-status').textContent, 'Bu gece, 00.00');
  app.tick(releaseAt);
  assert.equal(app.elements.get('countdown').hidden, true);
  assert.equal(app.elements.get('release-status').textContent, 'Şimdi yayında');
  assert.equal(app.elements.get('release-cta-label').textContent, 'Şimdi dinle');
  assert.equal(app.elements.get('new-track-status').textContent, 'Yeni şarkı · Yayında');
  assert.equal(app.elements.get('new-track-link').href, '#dinle');
  assert.equal(app.elements.get('new-track-link-label').textContent, 'Dinle');
  assert.equal(app.intervals.size, 0);
});

test('opening after release never shows a countdown; earlier dates retain full days', () => {
  const after = setup({ now: releaseAt + 60000 });
  assert.equal(after.elements.get('countdown').hidden, true);
  assert.equal(after.elements.get('release-status').textContent, 'Şimdi yayında');
  assert.equal(after.intervals.size, 0);
  const before = setup({ now: releaseAt - 90061000 });
  assert.equal(before.elements.get('countdown-days').hidden, false);
  assert.deepEqual(Object.values(before.units).map(x => x.textContent), ['01', '01', '01', '01']);
});

test('returning from a suspended tab refreshes release state without waiting for a timer', () => {
  const app = setup();
  app.intervals.clear();
  app.tick(releaseAt + 60000);
  app.listeners.get('pageshow')();
  assert.equal(app.elements.get('release-status').textContent, 'Şimdi yayında');
});

test('autoplay is muted; only the sound button unmutes; pause also stops vinyl motion', async () => {
  const app = setup();
  await settle();
  assert.equal(app.video.playCalls, 1);
  assert.equal(app.video.muted, true);
  for (const event of ['click', 'pointerdown', 'touchend', 'keydown']) assert.equal(app.listeners.has(event), false);
  app.click('sound-toggle');
  assert.equal(app.video.muted, false);
  assert.equal(app.elements.get('sound-toggle').attributes['aria-pressed'], 'true');
  app.click('motion-toggle');
  assert.equal(app.video.paused, true);
  assert.equal(app.classes.has('film-playing'), false);
  assert.equal(app.elements.get('motion-toggle').attributes['aria-pressed'], 'false');
});

test('reduced motion and data saver avoid video downloads until playback is explicitly requested', async () => {
  assert.match(html, /<video[^>]*preload="none"/);
  for (const option of [{ reducedMotion: true }, { saveData: true }]) {
    const app = setup(option);
    assert.equal(app.video.playCalls, 0);
    app.click('motion-toggle');
    await settle();
    assert.equal(app.video.playCalls, 1);
    assert.equal(app.video.muted, true);
  }
});

test('blocked playback remains muted and offers retry; failed media removes unusable controls', async () => {
  const app = setup({ rejectPlay: true });
  await settle();
  assert.equal(app.video.muted, true);
  assert.match(app.elements.get('media-status').textContent, /Oynat/);
  app.click('sound-toggle');
  await settle();
  assert.equal(app.video.muted, true);
  assert.equal(app.elements.get('sound-toggle').attributes['aria-pressed'], 'false');
  app.mediaSource.emit('error');
  assert.equal(app.elements.get('film-controls').hidden, true);
  assert.match(app.elements.get('media-status').textContent, /yüklenemiyor/);
});

test('leaving the tab pauses the film; audible playback does not restart without another click', async () => {
  const app = setup();
  await settle();
  app.click('sound-toggle');
  app.document.hidden = true;
  app.listeners.get('visibilitychange')();
  assert.equal(app.video.paused, true);
  app.document.hidden = false;
  app.listeners.get('visibilitychange')();
  assert.equal(app.video.paused, true);
});

test('all local assets and navigation fragments resolve, including a dated no-script fallback', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [, href] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(href), href);
  for (const [, asset] of html.matchAll(/(?:src|href|poster)="([^"#][^"]*)"/g)) {
    if (!asset.startsWith('https://')) assert.ok(fs.existsSync(path.join(root, asset)), asset);
  }
  assert.match(html, /<time id="release-date" datetime="2026-09-11T00:00:00\+03:00">11 Eylül 2026<\/time>/);
  assert.match(html, /id="countdown"[^>]* hidden/);
  assert.match(html, /id="film-controls" hidden/);
  assert.doesNotMatch(html, /Albüm yayında|Yeni albüm · 07\.08\.2026/);
});
