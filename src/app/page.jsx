'use client'

import { useEffect, useRef, useState } from 'react'

// ---- Simple helpers ----
function SectionHeader({ id, title, subtitle }) {
  return (
    <header id={id} className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-zinc-400 mt-2 max-w-prose">{subtitle}</p>}
    </header>
  )
}

function Button({ href, onClick, children, variant = 'solid' }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition';
  const styles = variant === 'solid'
    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
    : 'bg-transparent text-white/80 hover:text-white border border-white/15 hover:border-white/30 backdrop-blur';
  if (href) return <a href={href} className={`${base} ${styles}`}>{children}</a>
  return <button onClick={onClick} className={`${base} ${styles}`}>{children}</button>
}

// ---- Sticky Nav with in-page anchors ----
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const link = 'text-sm md:text-base text-white/80 hover:text-white transition px-3 py-2 rounded-xl hover:bg-white/5'
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'backdrop-blur bg-black/60 border-b border-white/10' : 'bg-transparent'} `}>
      <div className="mx-auto max-w-6xl px-4 md:px-6 flex items-center justify-between h-14">
        <a href="#home" className="font-bold tracking-wide text-white">Sena Sener</a>
        <div className="flex items-center gap-1 md:gap-2">
          <a className={link} href="#home">Home</a>
          <a className={link} href="#music">Music</a>
          <a className={link} href="#tour">Tour / Tickets</a>
          <a className={link} href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  )
}

// ---- HERO with looping MP4 background ----
function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background video – replace '/sena-hero.mp4' with your actual file in public/ */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/sena-hero.mp4"
        autoPlay
        playsInline
        muted
        loop
      />
      {/* Gradient + overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(168,85,247,0.18),rgba(0,0,0,0))]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">
          SENA <span className="text-purple-400">SENER</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-zinc-200 max-w-2xl mx-auto">
          Turkish singer–songwriter. Dark, airy, emotional. New music & shows announced below.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button href="#tour">Get Tickets</Button>
          <Button href="#music" variant="ghost">Listen on Spotify</Button>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

// ---- Spotify Embed (Artist) + milestone blurb ----
function SpotifySection() {
  return (
    <section id="music" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title="Music" id="music-header" subtitle="Stream the latest releases and artist picks." />

      <div className="grid md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3">
          <SpotifyArtistEmbed uri="spotify:artist:7CW2eGwAuElNq09rVtZYsM" />
        </div>
        <aside className="md:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5">
          <p className="text-xl font-semibold text-white">Teni Tenem surpassed <span className="text-purple-400">100,000,000</span> streams on Spotify!</p>
          <p className="mt-3 text-zinc-300 text-sm leading-relaxed">
            Thank you for the love and continuous support. Explore more tracks, playlists and live sessions.
          </p>
          <div className="mt-6">
            <Button href="#tour">See Tour Dates</Button>
          </div>
        </aside>
      </div>

     
      {/* YouTube segment (modern) */}
<div className="mt-14">
  <SectionHeader id="videos" title="Videos" subtitle="Highlights from YouTube." />
  <YouTubeGallery
    videos={[
      { url: 'https://youtu.be/tBcizD1Hsls?si=i2P35TOSUx5elopp&t=5', label: 'Teni Tenem (Live)' },
      { url: 'https://youtu.be/iOz-oLU2ZZY?si=1cCuUZ94FqOxtl4g', label: 'Official Video' },
      { url: 'https://youtu.be/R8chfFb9NO0?si=ZMHDqb_Jy4hqpE1N', label: 'Performance' },
    ]}
  />
</div>
    </section>
  )
}

// Spotify IFrame API artist embed
function SpotifyArtistEmbed({ uri }) {
  const embedRef = useRef(null)
  const controllerRef = useRef(null)
  const [iFrameAPI, setIFrameAPI] = useState()
  const [playerLoaded, setPlayerLoaded] = useState(false)

  // Load Spotify IFrame script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://open.spotify.com/embed/iframe-api/v1'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  // Expose ready callback
  useEffect(() => {
    if (window.onSpotifyIframeApiReady) return
    window.onSpotifyIframeApiReady = (SpotifyIframeApi) => {
      setIFrameAPI(SpotifyIframeApi)
    }
  }, [])

  // Create controller
  useEffect(() => {
    if (!iFrameAPI || playerLoaded) return
    iFrameAPI.createController(
      embedRef.current,
      { width: '100%', height: '352', uri },
      (controller) => {
        controller.addListener('ready', () => setPlayerLoaded(true))
        controller.addListener('playback_update', () => {})
        controllerRef.current = controller
      }
    )
    return () => {
      if (controllerRef.current) controllerRef.current.removeListener('playback_update')
    }
  }, [iFrameAPI, playerLoaded, uri])

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
      <div ref={embedRef} />
      {!playerLoaded && <p className="p-4 text-sm text-zinc-400">Loading player…</p>}
      <div className="p-3 flex gap-2">
        <Button onClick={() => controllerRef.current?.play()}>Play</Button>
        <Button variant="ghost" onClick={() => controllerRef.current?.pause()}>Pause</Button>
      </div>
    </div>
  )
}

function YouTubeGallery({ videos }) {
  const [index, setIndex] = useState(0);

  const parseYouTube = (url) => {
    try {
      const u = new URL(url);
      let id = u.pathname.split('/').pop();
      if (id === 'watch') id = u.searchParams.get('v');
      const t = u.searchParams.get('t');
      let start = 0;
      if (t) {
        const m = String(t).match(/(\d+)(s)?/);
        if (m) start = parseInt(m[1], 10);
      }
      return { id, start };
    } catch {
      return { id: url, start: 0 };
    }
  };

  const items = (videos || []).map((v) => ({ ...v, ...parseYouTube(v.url) }));
  const total = items.length;
  const go = (n) => setIndex(((n % total) + total) % total);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // simple swipe
  const startX = useRef(0);
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
  };

  if (!total) return null;
  const active = items[index];

  return (
    <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
      {/* Player */}
      <div className="relative aspect-video" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <iframe
          key={`${active.id}-${active.start}`}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${active.id}?rel=0&start=${active.start}`}
          title={active.label || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        {/* overlay gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <button
            aria-label="Previous"
            onClick={prev}
            className="opacity-0 group-hover:opacity-100 transition bg-black/50 hover:bg-black/70 border border-white/10 rounded-full h-10 w-10 grid place-items-center text-white"
          >‹</button>
          <button
            aria-label="Next"
            onClick={next}
            className="opacity-0 group-hover:opacity-100 transition bg-black/50 hover:bg-black/70 border border-white/10 rounded-full h-10 w-10 grid place-items-center text-white"
          >›</button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto p-4">
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setIndex(i)}
            className={`relative shrink-0 rounded-xl border ${i === index ? 'border-purple-500 ring-2 ring-purple-500/40' : 'border-white/10'} overflow-hidden`}
            style={{ width: 200 }}
            aria-label={`Play ${it.label || 'video'} ${i + 1}`}
          >
            <img
              src={`https://img.youtube.com/vi/${it.id}/hqdefault.jpg`}
              alt={it.label || 'thumbnail'}
              className="h-28 w-50 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20" />
            {it.label && <span className="absolute left-2 bottom-2 text-xs text-white/90 drop-shadow">{it.label}</span>}
          </button>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1 pb-4">
        {items.map((_, i) => (
          <span key={i} className={`h-1.5 w-4 rounded-full ${i === index ? 'bg-purple-500' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
}
// ---- Minimal YouTube carousel (no external deps) ----
function YouTubeCarousel({ videoIds }) {
  const [index, setIndex] = useState(0)
  const clamp = (n) => (n + videoIds.length) % videoIds.length
  const next = () => setIndex((i) => clamp(i + 1))
  const prev = () => setIndex((i) => clamp(i - 1))
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  if (!videoIds?.length) return null
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="aspect-video">
        <iframe
          key={videoIds[index]}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoIds[index]}?rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="text-xs text-zinc-400">{index + 1} / {videoIds.length}</span>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={prev}>Prev</Button>
          <Button onClick={next}>Next</Button>
        </div>
      </div>
    </div>
  )
}

// ---- Tour Dates ----
function TourSection() {
  const shows = [
    { date: '15 Kasım', city: 'Malatya', venue: 'OFEST', link: '#' },
    { date: '23 Kasım', city: 'Ordu', venue: 'Milyon / OFEST', link: '#' },
    { date: '28 Kasım', city: 'Bursa', venue: 'OFEST', link: '#' },
    { date: '06 Aralık', city: 'Eskişehir', venue: 'OFEST', link: '#' },
    { date: '12 Aralık', city: 'Ankara', venue: 'OFEST', link: '#' },
  ]
  return (
    <section id="tour" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title="Tour / Tickets" id="tour-header" subtitle="Current dates – find your city and get tickets." />
      <div className="grid gap-4">
        {shows.map((s, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-white font-bold">{String(i+1).padStart(2,'0')}</div>
              <div>
                <p className="text-white font-semibold">{s.date} • {s.city}</p>
                <p className="text-zinc-400 text-sm">{s.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button href={s.link}>Tickets</Button>
              <Button variant="ghost" href="#contact">Contact</Button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-zinc-500">* Dates and venues subject to change. Check back for updates.</p>
    </section>
  )
}

// ---- Contact ----
function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title="Contact" id="contact-header" subtitle="Management, collaborations & bookings." />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h3 className="text-white font-semibold text-lg">Management / Collaborations</h3>
          <p className="text-zinc-300 mt-2">Aslı Eren</p>
          <a href="mailto:management@senasener.com" className="text-purple-400 hover:underline">management@senasener.com</a>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h3 className="text-white font-semibold text-lg">Bookings (Concerts)</h3>
          <p className="text-zinc-300 mt-2">Müge Sözen</p>
          <p className="text-zinc-400">Phone: <a href="tel:+905326655776" className="hover:underline text-purple-400">+90 (532) 665 5776</a></p>
          <a href="mailto:haluklevent@mugesozen.com.tr" className="text-purple-400 hover:underline">haluklevent@mugesozen.com.tr</a>
        </div>
      </div>
    </section>
  )
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} Sena Sener. All rights reserved.
    </footer>
  )
}

export default function Page() {
  // Smooth scrolling for in-page anchors (Tailwind v4 supports utility, but this ensures cross-browser)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [])

  return (
    <main className="bg-black min-h-[100dvh] text-white">
      <Nav />
      <Hero />
      <SpotifySection />
      <TourSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
