'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Confetti from 'react-confetti'

/* =======================
   Utilities & i18n
======================= */
function cx(...cls) { return cls.filter(Boolean).join(' ') }

const i18n = {
  en: {
    nav: { home: "Home", music: "Music", videos: "Videos", tour: "Tour / Tickets", social: "Social", contact: "Contact", toggle: "TR" },
    hero: {
      titleTop: "SENA",
      titleBottom: "ŞENER",
      subtitle: "Turkish singer–songwriter. Dark, airy, emotional. New music & shows below.",
      ctaPrimary: "Get Tickets",
      ctaSecondary: "Listen on Spotify"
    },
    milestone: {
      line: "Teni Tenime reached over <span class='text-yellow-300'>100.000.000</span> Streams on Spotify"
    },
    music: { title: "Music", subtitle: "Stream the latest releases and artist picks." },
    videos: { title: "Videos", subtitle: "Highlights from YouTube." },
    tour: { title: "Tour / Tickets", subtitle: "Current dates – find your city and get tickets.", soldout: "Sold out", onsale: "On sale", new: "New", tickets: "Tickets", contact: "Contact", note: "* Dates and venues subject to change. Check back for updates." },
    social: { title: "Social", subtitle: "Follow for clips, teasers & behind-the-scenes." },
    contact: {
      title: "Contact",
      subtitle: "Quick lines for the right person.",
      collabTitle: "Aslı Eren — Brands & Media",
      collabLine: "Brand collaborations & media inquiries.",
      bookingTitle: "Müge Sözen — Bookings",
      bookingLine: "Concert bookings & live shows."
    }
  },
  tr: {
    nav: { home: "Ana Sayfa", music: "Müzik", videos: "Videolar", tour: "Turne / Biletler", social: "Sosyal", contact: "İletişim", toggle: "EN" },
    hero: {
      titleTop: "SENA",
      titleBottom: "ŞENER",
      subtitle: "Türk söz yazarı ve şarkıcı. Karanlık, ferah, duygusal. Yeni müzik ve konserler aşağıda.",
      ctaPrimary: "Bilet Al",
      ctaSecondary: "Spotify'da Dinle"
    },
    milestone: {
      line: "Teni Tenime, Spotify'da <span class='text-yellow-300'>100.000.000</span> dinlenmeyi geçti"
    },
    music: { title: "Müzik", subtitle: "En yeni parçalar ve sanatçı seçimleri." },
    videos: { title: "Videolar", subtitle: "YouTube'dan öne çıkanlar." },
    tour: { title: "Turne / Biletler", subtitle: "Güncel tarihler – şehrini bul ve bilet al.", soldout: "Tükendi", onsale: "Satışta", new: "Yeni", tickets: "Biletler", contact: "İletişim", note: "* Tarihler ve mekanlar değişebilir. Güncellemeler için tekrar kontrol edin." },
    social: { title: "Sosyal", subtitle: "Klipler, teaserlar ve kamera arkası için takip et." },
    contact: {
      title: "İletişim",
      subtitle: "Doğru kişiye hızlıca ulaşın.",
      collabTitle: "Aslı Eren — Marka & Medya",
      collabLine: "Marka işbirlikleri ve medya talepleri.",
      bookingTitle: "Müge Sözen — Rezervasyon",
      bookingLine: "Konser rezervasyonları ve canlı gösteriler."
    }
  }
}

/* =======================
   Common UI
======================= */
function SectionHeader({ id, title, subtitle }) {
  return (
    <header id={id} className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-zinc-400 mt-2 max-w-prose">{subtitle}</p>}
    </header>
  )
}

function Button({ href, onClick, children, variant = 'solid', disabled = false, ariaLabel }) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold outline-none ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500/60 transition'
  const styles =
    variant === 'solid'
      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed'
      : 'bg-transparent text-white/80 hover:text-white border border-white/15 hover:border-white/30 backdrop-blur disabled:opacity-50 disabled:cursor-not-allowed'
  const cls = cx(base, styles)
  if (href) return <a aria-label={ariaLabel} href={href} className={cls} onClick={onClick}>{children}</a>
  return <button aria-label={ariaLabel} onClick={onClick} className={cls} disabled={disabled}>{children}</button>
}

/* =======================
   Sticky Nav with Lang Toggle
======================= */
function Nav({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const t = i18n[lang]
  const link =
    'text-sm md:text-base text-white/80 hover:text-white transition px-3 py-2 rounded-xl hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60'
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'backdrop-blur bg-black/60 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6 flex items-center justify-between h-14">
        <a href="#home" className="font-bold tracking-wide text-white">Sena Şener</a>
        <div className="flex items-center gap-1 md:gap-2">
          <a className={link} href="#home">{t.nav.home}</a>
          <a className={link} href="#music">{t.nav.music}</a>
          <a className={link} href="#videos">{t.nav.videos}</a>
          <a className={link} href="#tour">{t.nav.tour}</a>
          <a className={link} href="#social">{t.nav.social}</a>
          <a className={link} href="#contact">{t.nav.contact}</a>
          <button
            aria-label="Toggle language"
            onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
            className="ml-1 md:ml-3 text-xs md:text-sm text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-xl px-3 py-2"
          >{t.nav.toggle}</button>
        </div>
      </div>
    </nav>
  )
}

/* =======================
   HERO with video + motion
======================= */
function Hero({ lang }) {
  const t = i18n[lang].hero
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/sena-hero.mp4"
        autoPlay
        playsInline
        muted
        loop
        poster="/hero-poster.jpg"
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(168,85,247,0.18),rgba(0,0,0,0))]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl"
        >
          {t.titleTop} <span className="text-purple-400">{t.titleBottom}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-base md:text-lg text-zinc-200 max-w-2xl mx-auto"
        >
          {t.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Button href="#tour">{t.ctaPrimary}</Button>
          <Button href="#music" variant="ghost">{t.ctaSecondary}</Button>
        </motion.div>
      </div>

      {/* floating orbs */}
      <motion.div
        className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"
        animate={{ y: [0, -10, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute top-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl"
        animate={{ y: [0, 12, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

/* =======================
   Milestone Celebration (purple bg, no header/name)
======================= */
function MilestoneCelebration({ lang }) {
  const prefersReducedMotion = useReducedMotion()
  const text = i18n[lang].milestone.line

  // responsive confetti canvas (SSR-safe)
  const [dims, setDims] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () => setDims({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // auto-stop confetti
  const [showConfetti, setShowConfetti] = useState(true)
  useEffect(() => {
    if (prefersReducedMotion) return setShowConfetti(false)
    const t = setTimeout(() => setShowConfetti(false), 6000)
    return () => clearTimeout(t)
  }, [prefersReducedMotion])

  return (
    <section
      className="relative flex items-center justify-center text-center py-20 md:py-24 px-6 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white overflow-hidden"
      aria-label="Milestone celebration"
    >
      {showConfetti && !prefersReducedMotion && dims.width > 0 && (
        <Confetti width={dims.width} height={dims.height} numberOfPieces={420} recycle={false} gravity={0.25} />
      )}

      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -inset-[20%] rounded-full blur-3xl bg-white/10" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm max-w-4xl"
      >
        <span
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </motion.h2>
    </section>
  )
}

/* =======================
   Spotify + Videos (no milestone aside)
======================= */
function SpotifySection({ lang }) {
  const t = i18n[lang]
  return (
    <section id="music" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title={t.music.title} id="music-header" subtitle={t.music.subtitle} />

      <div className="grid gap-6">
        <SpotifyArtistEmbed uri="spotify:artist:7CW2eGwAuElNq09rVtZYsM" />
      </div>

      <div id="videos" className="mt-14">
        <SectionHeader title={t.videos.title} subtitle={t.videos.subtitle} />
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

function SpotifyArtistEmbed({ uri }) {
  const embedRef = useRef(null)
  const controllerRef = useRef(null)
  const [apiReady, setApiReady] = useState(false)
  const [playerLoaded, setPlayerLoaded] = useState(false)

  useEffect(() => {
    const id = 'spotify-iframe-sdk'
    if (!document.getElementById(id)) {
      const script = document.createElement('script')
      script.id = id
      script.src = 'https://open.spotify.com/embed/iframe-api/v1'
      script.async = true
      document.body.appendChild(script)
    }
    window.onSpotifyIframeApiReady = (SpotifyIframeApi) => {
      window.__SpotifyIframeApi = SpotifyIframeApi
      setApiReady(true)
    }
  }, [])

  useEffect(() => {
    if (!apiReady || playerLoaded || !embedRef.current) return
    const API = window.__SpotifyIframeApi
    if (!API) return
    API.createController(
      embedRef.current,
      { width: '100%', height: '352', uri },
      (controller) => {
        controller.addListener('ready', () => setPlayerLoaded(true))
        controllerRef.current = controller
      }
    )
  }, [apiReady, playerLoaded, uri])

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
  const [index, setIndex] = useState(0)

  const parseYouTube = (url) => {
    try {
      const u = new URL(url)
      let id = u.pathname.split('/').pop()
      if (id === 'watch') id = u.searchParams.get('v')
      const t = u.searchParams.get('t')
      let start = 0
      if (t) {
        const sec =
          /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?/.exec(String(t)) ||
          /(\d+)/.exec(String(t))
        if (sec) {
          const [, h, m, s] = sec
          start = h || m || s ? (parseInt(h || '0') * 3600 + parseInt(m || '0') * 60 + parseInt(s || '0')) : parseInt(sec[0], 10)
        }
      }
      return { id, start }
    } catch {
      return { id: url, start: 0 }
    }
  }

  const items = (videos || []).map((v) => ({ ...v, ...parseYouTube(v.url) }))
  const total = items.length
  const go = (n) => setIndex(((n % total) + total) % total)
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  const startX = useRef(0)
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev() }
  }

  if (!total) return null
  const active = items[index]

  return (
    <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
      <div className="relative aspect-video" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <iframe
          key={`${active.id}-${active.start}`}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${active.id}?rel=0&start=${active.start}`}
          title={active.label || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
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

      <div className="flex gap-3 overflow-x-auto p-4">
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setIndex(i)}
            className={cx(
              'relative shrink-0 rounded-xl border overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60',
              i === index ? 'border-purple-500 ring-2 ring-purple-500/40' : 'border-white/10'
            )}
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

      <div className="flex items-center justify-center gap-1 pb-4">
        {items.map((_, i) => (
          <span key={i} className={cx('h-1.5 w-4 rounded-full', i === index ? 'bg-purple-500' : 'bg-white/20')} />
        ))}
      </div>
    </div>
  )
}

/* =======================
   Tour Section (localized)
======================= */
function TourSection({ lang }) {
  const t = i18n[lang].tour
  const shows = [
    { date: '2025-11-15', city: 'Malatya',    venue: 'OFEST',           link: '#', status: 'new' },
    { date: '2025-11-23', city: 'Ordu',       venue: 'Milyon / OFEST',  link: '#', status: 'onsale' },
    { date: '2025-11-28', city: 'Bursa',      venue: 'OFEST',           link: '#', status: 'soldout' },
    { date: '2025-12-06', city: 'Eskişehir',  venue: 'OFEST',           link: '#', status: 'onsale' },
    { date: '2025-12-12', city: 'Ankara',     venue: 'OFEST',           link: '#', status: 'onsale' },
  ]

  const fmt = (iso) => {
    try {
      const d = new Date(iso + 'T00:00:00')
      const locale = lang === 'tr' ? 'tr-TR' : 'en-GB'
      const day = d.toLocaleDateString(locale, { day: '2-digit' })
      const mon = d.toLocaleDateString(locale, { month: 'short' })
      const wk  = d.toLocaleDateString(locale, { weekday: 'short' })
      return { day, mon, wk }
    } catch {
      return { day: '—', mon: '', wk: '' }
    }
  }

  const StatusBadge = ({ status }) => {
    const map = {
      soldout: { text: t.soldout, cls: 'border-red-400/40 bg-red-500/10 text-red-300' },
      new:     { text: t.new,     cls: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300' },
      onsale:  { text: t.onsale,  cls: 'border-purple-400/40 bg-purple-500/10 text-purple-300' },
    }
    const m = map[status] || map.onsale
    return <span className={cx('text-[11px] uppercase tracking-wide rounded-full border px-2 py-1', m.cls)}>{m.text}</span>
  }

  return (
    <section id="tour" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title={t.title} id="tour-header" subtitle={t.subtitle} />
      <div className="grid gap-4">
        {shows.map((s, i) => {
          const { day, mon, wk } = fmt(s.date)
          const soldOut = s.status === 'soldout'
          return (
            <article
              key={`${s.city}-${s.date}`}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              aria-labelledby={`show-${i}`}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                  <div className="text-center leading-tight">
                    <div className="text-base font-extrabold text-white">{day}</div>
                    <div className="text-[11px] uppercase text-zinc-300">{mon}</div>
                  </div>
                </div>
                <div>
                  <p id={`show-${i}`} className="text-white font-semibold">
                    {s.city} • <span className="text-zinc-300">{s.venue}</span>
                  </p>
                  <p className="text-zinc-400 text-sm">{wk}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={s.status} />
                <Button href={soldOut ? undefined : s.link} disabled={soldOut} ariaLabel={`${t.tickets} ${s.city}`}>
                  {soldOut ? t.soldout : t.tickets}
                </Button>
                <Button variant="ghost" href="#contact" ariaLabel={t.contact}>{t.contact}</Button>
              </div>
            </article>
          )
        })}
      </div>
      <p className="mt-4 text-xs text-zinc-500">{t.note}</p>
    </section>
  )
}

/* =======================
   TikTok (only)
======================= */
function TikTokCreator({ uniqueId = 'sena.sener', profileUrl = 'https://www.tiktok.com/@sena.sener' }) {
  useEffect(() => {
    const id = 'tiktok-embed-script'
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.async = true
      s.src = 'https://www.tiktok.com/embed.js'
      document.body.appendChild(s)
    }
  }, [])
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <blockquote
        className="tiktok-embed"
        cite={profileUrl}
        data-unique-id={uniqueId}
        data-embed-from="embed_page"
        data-embed-type="creator"
        style={{ maxWidth: '780px', minWidth: '288px' }}
      >
        <section>
          <a target="_blank" rel="noreferrer" href={`${profileUrl}?refer=creator_embed`}>
            @{uniqueId}
          </a>
        </section>
      </blockquote>
    </div>
  )
}

function SocialSection({ lang }) {
  const t = i18n[lang].social
  return (
    <section id="social" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title={t.title} subtitle={t.subtitle} />
      <TikTokCreator />
    </section>
  )
}

/* =======================
   Contact (simple & direct)
======================= */
function ContactSection({ lang }) {
  const t = i18n[lang].contact
  return (
    <section id="contact" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title={t.title} id="contact-header" subtitle={t.subtitle} />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Aslı Eren */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <h3 className="text-white font-semibold text-lg">{t.collabTitle}</h3>
          <p className="text-zinc-300 mt-2">{t.collabLine}</p>
          <div className="mt-4 space-y-1 text-purple-300">
            <a className="block hover:underline" href="mailto:management@senasener.com">management@senasener.com</a>
            <a className="block hover:underline" href="tel:+905547388339">+90 554 738 8339</a>
          </div>
        </div>

        {/* Müge Sözen */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <h3 className="text-white font-semibold text-lg">{t.bookingTitle}</h3>
          <p className="text-zinc-300 mt-2">{t.bookingLine}</p>
          <div className="mt-4 space-y-1 text-purple-300">
            <a className="block hover:underline" href="mailto:haluklevent@mugesozen.com.tr">haluklevent@mugesozen.com.tr</a>
            <a className="block hover:underline" href="tel:+905326655776">+90 532 665 5776</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =======================
   Footer
======================= */
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} Sena Şener. All rights reserved.
    </footer>
  )
}

/* =======================
   Page
======================= */
export default function Page() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [])

  return (
    <main className="bg-black min-h-[100dvh] text-white">
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <MilestoneCelebration lang={lang} />
      <SpotifySection lang={lang} />
      <TourSection lang={lang} />
      <SocialSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer />
    </main>
  )
}
