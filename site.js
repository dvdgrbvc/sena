(function () {
  'use strict';

  // The release time is authored once in the visible <time> element, with Turkey's UTC+3 offset.
  var releaseDate = document.getElementById('release-date');
  var releaseAt = Date.parse(releaseDate.dateTime);
  var countdown = document.getElementById('countdown');
  var releaseStatus = document.getElementById('release-status');
  var releaseTimer;
  var isReleased = false;

  function updateRelease() {
    if (!Number.isFinite(releaseAt)) return; // Keep the dated HTML fallback if configuration is invalid.
    var remaining = releaseAt - Date.now();
    if (remaining <= 0) {
      if (isReleased) return;
      isReleased = true;
      countdown.hidden = true;
      releaseStatus.textContent = 'Şimdi yayında';
      document.getElementById('release-time').hidden = true;
      document.getElementById('release-cta-label').textContent = 'Şimdi dinle';
      document.getElementById('new-track-status').textContent = 'Yeni şarkı · Yayında';
      document.getElementById('new-track-link').href = '#dinle';
      document.getElementById('new-track-link').setAttribute('aria-label', 'Alışılır mı Aşka — dinleme bağlantıları');
      document.getElementById('new-track-link-label').textContent = 'Dinle';
      window.clearInterval(releaseTimer);
      return;
    }
    var totalSeconds = Math.ceil(remaining / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var values = { days: days, hours: Math.floor(totalSeconds % 86400 / 3600), minutes: Math.floor(totalSeconds % 3600 / 60), seconds: totalSeconds % 60 };
    Object.keys(values).forEach(function (unit) {
      document.querySelector('[data-unit="' + unit + '"]').textContent = String(values[unit]).padStart(2, '0');
    });
    document.getElementById('countdown-days').hidden = days === 0;
    countdown.hidden = false;
    var status = remaining <= 86400000 ? 'Bu gece, 00.00' : "11 Eylül'de";
    if (releaseStatus.textContent !== status) releaseStatus.textContent = status;
  }
  updateRelease();
  if (!isReleased && Number.isFinite(releaseAt)) releaseTimer = window.setInterval(updateRelease, 1000);

  // The retained film belongs to Aşkından Ölmemeli. Sound is enabled only by this explicit control.
  var video = document.getElementById('bgvid');
  var soundToggle = document.getElementById('sound-toggle');
  var motionToggle = document.getElementById('motion-toggle');
  var mediaStatus = document.getElementById('media-status');
  var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var connection = navigator.connection;
  var shouldResume = false;
  var playAttempt = 0;
  var soundBusy = false;
  var mediaFailed = false;
  document.getElementById('film-controls').hidden = false;
  video.muted = true;

  function syncMediaControls() {
    var playing = !video.paused && !video.ended;
    var audible = playing && !video.muted;
    document.body.classList.toggle('film-playing', playing);
    soundToggle.setAttribute('aria-pressed', String(audible));
    motionToggle.setAttribute('aria-pressed', String(playing));
    document.getElementById('sound-label').textContent = audible ? 'Sesi kapat' : 'Sesi aç';
    document.getElementById('motion-label').textContent = playing ? 'Videoyu duraklat' : 'Videoyu oynat';
  }
  function playVideo() {
    var attempt = ++playAttempt;
    if (mediaFailed) return Promise.resolve(false);
    return video.play().then(function () {
      if (attempt === playAttempt) {
        mediaStatus.textContent = '';
        syncMediaControls();
      }
      return true;
    }).catch(function () {
      if (attempt === playAttempt && !mediaFailed) {
        video.muted = true;
        mediaStatus.textContent = 'Video başlamadı. Oynat düğmesiyle tekrar deneyebilirsin.';
        syncMediaControls();
      }
      return false;
    });
  }
  function pauseVideo() {
    ++playAttempt;
    video.pause();
    syncMediaControls();
  }
  soundToggle.addEventListener('click', function () {
    if (soundBusy) return;
    if (!video.muted && !video.paused) {
      video.muted = true;
      syncMediaControls();
      return;
    }
    video.muted = false;
    if (video.paused) {
      soundBusy = true;
      playVideo().finally(function () { soundBusy = false; });
    } else {
      syncMediaControls();
    }
  });
  motionToggle.addEventListener('click', function () {
    shouldResume = false;
    if (video.paused) playVideo();
    else pauseVideo();
  });
  ['play', 'pause', 'volumechange', 'ended'].forEach(function (event) {
    video.addEventListener(event, syncMediaControls);
  });
  function handleMediaError() {
    mediaFailed = true;
    pauseVideo();
    video.muted = true;
    document.getElementById('film-controls').hidden = true;
    mediaStatus.textContent = 'Video şu an yüklenemiyor. Müziğe aşağıdaki bağlantılardan ulaşabilirsin.';
  }
  video.addEventListener('error', handleMediaError);
  video.querySelector('source').addEventListener('error', handleMediaError);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      shouldResume = !video.paused && video.muted;
      pauseVideo();
    } else {
      updateRelease();
      if (shouldResume && !motionPreference.matches) playVideo();
      shouldResume = false;
    }
  });
  window.addEventListener('pageshow', updateRelease);
  motionPreference.addEventListener('change', function (event) {
    if (event.matches) {
      shouldResume = false;
      pauseVideo();
    }
  });
  syncMediaControls();
  if (!motionPreference.matches && !(connection && connection.saveData) && !document.hidden) playVideo();
})();
