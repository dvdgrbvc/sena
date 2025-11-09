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
      line:
        "<span class='text-white'>Teni Tenime</span> and <span class='text-white'>Sevmemeliyiz</span> each surpassed <span class='text-yellow-300'>100.000.000</span> streams on Spotify"
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
      line:
        "Teni Tenime ve <span class='text-white'>Sevmemeliyiz</span> single'ları Spotify'da <span class='text-yellow-300'>100.000.000</span> dinlenmeyi geçti"
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
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/sena-hero2.mp4"
        autoPlay
        playsInline
        muted
        loop
        poster="/hero-poster.jpg"
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(168,85,247,0.18),rgba(0,0,0,0))]" />

      {/* Center content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 text-center">
        {/* WORDMARK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative inline-block">
            <motion.h1
              initial={{ letterSpacing: '0.05em' }}
              animate={{ letterSpacing: '0.08em' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="
                font-extrabold uppercase leading-none tracking-[0.08em]
                text-white mix-blend-difference
                drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]
                text-[14vw] md:text-[10vw] lg:text-[9vw]
              "
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.22)',
              }}
            >
              SENA ŞENER
            </motion.h1>

            {/* Shine animation */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 100%)',
                WebkitMaskImage: 'linear-gradient(#000,#000)',
                mixBlendMode: 'difference',
              }}
              initial={{ backgroundPosition: '-200% 0%', backgroundSize: '200% 100%', opacity: 0.35 }}
              animate={{ backgroundPosition: ['-200% 0%', '200% 0%'], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-light tracking-wide"
        >
          {t.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Button href="#tour" size="lg" className="px-8 py-3 text-base font-semibold shadow-lg shadow-purple-500/30">
            {t.ctaPrimary}
          </Button>
          <Button href="#music" variant="ghost" size="lg" className="px-8 py-3 text-base">
            {t.ctaSecondary}
          </Button>
        </motion.div>
      </div>

      {/* Floating lights */}
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

      {/* Gradient fade bottom */}
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
    const t = setTimeout(() => setShowConfetti(false), 5500)
    return () => clearTimeout(t)
  }, [prefersReducedMotion])

  const pieces = Math.min(600, Math.max(180, Math.floor(dims.width * 0.4)))

  const SPOTIFY_TENI = "https://open.spotify.com/embed/track/6lN8zGW83p9Ee4TJWedanB?utm_source=generator&theme=0"
  const SPOTIFY_BENI = "https://open.spotify.com/embed/track/7sNgPpXH3mDpC12yRUqEtz?utm_source=generator&theme=0"

  return (
    <section className="relative overflow-hidden" aria-label="Milestone celebration">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b0764] via-[#6d28d9] to-[#4c1d95]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,rgba(255,255,255,0.18),rgba(0,0,0,0)_60%)]" />
        <motion.div
          className="absolute -top-1/3 -left-1/4 h-[120vmin] w-[120vmin] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(168,85,247,0.35), rgba(168,85,247,0) 60%)",
          }}
          animate={{ x: ["0%", "10%", "-5%", "0%"], y: ["0%", "6%", "-4%", "0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/3 -right-1/4 h-[120vmin] w-[120vmin] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(139,92,246,0.28), rgba(139,92,246,0) 60%)",
          }}
          animate={{ x: ["0%", "-8%", "6%", "0%"], y: ["0%", "-5%", "7%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Confetti */}
      {showConfetti && !prefersReducedMotion && dims.width > 0 && (
        <Confetti
          width={dims.width}
          height={dims.height}
          numberOfPieces={pieces}
          recycle={false}
          gravity={0.25}
        />
      )}

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24 text-center text-white">
        {/* Header text (edit freely later) */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-10"
        >
          <span
            className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </motion.h2>

        {/* Two Spotify tracks side by side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 place-items-center"
        >
          <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-3 md:p-4 w-full">
            <iframe
              title="Teni Tenime — Spotify"
              style={{ borderRadius: 12 }}
              src={SPOTIFY_TENI}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-3 md:p-4 w-full">
            <iframe
              title="Beni Bırakma — Spotify"
              style={{ borderRadius: 12 }}
              src={SPOTIFY_BENI}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
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

<div className="grid gap-6 md:grid-cols-2">
  <SpotifyArtistEmbed uri="spotify:artist:7CW2eGwAuElNq09rVtZYsM" />
  <AppleMusicEmbed url="https://music.apple.com/de/artist/sena-%C5%9Fener/992280338" />
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

function SpotifyArtistEmbed() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
      <iframe
        style={{ borderRadius: 12 }}
        src="https://open.spotify.com/embed/artist/7CW2eGwAuElNq09rVtZYsM?utm_source=generator&theme=0"
        width="100%"
        height="450"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify — Sena Şener"
      />
    </div>
  )
}

function AppleMusicEmbed() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
      <iframe
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        frameBorder="0"
        height="450"
        style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: 10 }}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src="https://embed.music.apple.com/de/playlist/sena-%C5%9Fener-essentials/pl.3c2051b0a5c24924a95460b65bed8ea9"
        title="Apple Music — Sena Şener Essentials"
        loading="lazy"
      />
    </div>
  )
}


function YouTubeGallery({ videos }) {
  const [index, setIndex] = useState(0)

  // --- Tweakables
  const CENTER_WIDTH = '72%';   // how wide the middle video is
  const SIDE_WIDTH   = '36%';   // how wide each side preview is
  const OVERLAP_PX   = 28;      // how far the center overlaps the sides
  const SIDE_SCALE   = 0.94;    // scale of side previews (relative to center)
  const SIDE_OPACITY = 0.9;     // opacity of side previews

  // --- helpers (unchanged)
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
          start = h || m || s
            ? (parseInt(h || '0') * 3600 + parseInt(m || '0') * 60 + parseInt(s || '0'))
            : parseInt(sec[0], 10)
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

  // swipe
  const startX = useRef(0)
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev() }
  }

  if (!total) return null

  const active = items[index]
  const leftItem = items[(index - 1 + total) % total]
  const rightItem = items[(index + 1) % total]

  return (
    <section className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
      {/* Stage */}
      <div className="relative aspect-video" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Left preview (behind) */}
        <SidePreview
          side="left"
          item={leftItem}
          onClick={prev}
          style={{
            width: SIDE_WIDTH,
            transform: `translateY(-50%) translateX(${OVERLAP_PX}px) scale(${SIDE_SCALE})`,
            opacity: SIDE_OPACITY,
            zIndex: 5
          }}
        />

        {/* Right preview (behind) */}
        <SidePreview
          side="right"
          item={rightItem}
          onClick={next}
          style={{
            width: SIDE_WIDTH,
            transform: `translateY(-50%) translateX(-${OVERLAP_PX}px) scale(${SIDE_SCALE})`,
            opacity: SIDE_OPACITY,
            zIndex: 5
          }}
        />

        {/* Center (slightly larger, on top) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 pointer-events-auto"
            style={{ width: CENTER_WIDTH, aspectRatio: '16 / 9', zIndex: 10 }}
          >
            <iframe
              key={`${active.id}-${active.start}`}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${active.id}?rel=0&start=${active.start}`}
              title={active.label || 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </div>

        {/* gradient bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-20" />

        {/* arrows */}
        <button
          aria-label="Previous"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black/50 hover:bg-black/70 border border-white/10 rounded-full h-10 w-10 grid place-items-center text-white z-30"
        >‹</button>
        <button
          aria-label="Next"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black/50 hover:bg-black/70 border border-white/10 rounded-full h-10 w-10 grid place-items-center text-white z-30"
        >›</button>
      </div>

      {/* dots */}
      <div className="flex items-center justify-center gap-1 pb-4 pt-3">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-4 rounded-full ${i === index ? 'bg-purple-500' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  )
}

function SidePreview({ side = 'left', item, onClick, style }) {
  if (!item) return null
  const align = side === 'left' ? 'left-2 md:left-4' : 'right-2 md:right-4'

  return (
    <motion.button
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous video' : 'Next video'}
      className={`hidden sm:block absolute ${align} top-1/2 -translate-y-1/2 [transform:translateZ(0)]`}
      initial={{ opacity: 0.0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 0.97 }}
      transition={{ duration: 0.25 }}
      style={style}
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/40">
        <img
          src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
          alt={item.label || 'thumbnail'}
          className="h-full w-full object-cover"
          loading="lazy"
          style={{ filter: 'brightness(0.9)' }}
        />
        {/* overlay and soft edge toward center */}
        <div className="absolute inset-0 bg-black/30" />
        <div className={`absolute inset-y-0 ${side === 'left' ? 'right-0' : 'left-0'} w-16 ${side === 'left' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent to-black/80`} />
        {item.label && (
          <div className={`absolute ${side === 'left' ? 'left-3' : 'right-3'} bottom-3 text-xs text-white/90 drop-shadow`}>
            {item.label}
          </div>
        )}
      </div>
    </motion.button>
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
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-center h-[600px]">
      <blockquote
        className="tiktok-embed"
        cite={profileUrl}
        data-unique-id={uniqueId}
        data-embed-from="embed_page"
        data-embed-type="creator"
        style={{
          maxWidth: '100%',
          minWidth: '280px',
          width: '100%',
          height: '100%',
        }}
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

function InstagramProfileEmbed({ profileUrl = 'https://www.instagram.com/sena.sener/' }) {
  useEffect(() => {
    const id = 'instagram-embed-script'
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.async = true
      s.src = 'https://www.instagram.com/embed.js'
      document.body.appendChild(s)
    } else if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 flex items-start justify-center h-[600px]">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={profileUrl}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 12,
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 8px 24px 0 rgba(0,0,0,0.15)',
          margin: '0 auto',
          maxWidth: '100%',
          minWidth: 326,
          width: '100%',
          height: '84%',
        }}
      />
    </div>
  )
}

function SocialSection({ lang }) {
  const t = i18n[lang].social
  return (
    <section id="social" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title={t.title} subtitle={t.subtitle} />
      <div className="grid gap-6 md:grid-cols-2">
        <InstagramProfileEmbed profileUrl="https://www.instagram.com/sena.sener/" />
        <TikTokCreator uniqueId="sena.sener" profileUrl="https://www.tiktok.com/@sena.sener" />
      </div>
    </section>
  )
}

/* =======================
   Contact (simple & direct)
======================= */
function ContactSection({ lang }) {
  const t = i18n[lang].contact
  return (
    <section
      id="contact"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24"
    >
      <SectionHeader
        title={t.title}
        id="contact-header"
        subtitle={t.subtitle}
      />

      {/* FULL-WIDTH CARD */}
      <article
        className="relative overflow-hidden rounded-3xl border border-white/10
                   bg-gradient-to-br from-white/[.06] to-white/[.03]
                   p-6 md:p-10"
        aria-label="Professional contact card"
      >
        {/* spiral background image */}
       <div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: "url('/spirale.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1.5rem top 1.5rem", // top-right corner
    backgroundSize: "30%", // you can tweak this for scale (e.g. 150–220px)
    opacity: 0.1,
    mixBlendMode: "lighten",
  }}
/>

        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr,auto] items-start gap-6 md:gap-10 relative">
          {/* Avatar */}
          <div className="shrink-0">
            <img
              src="/asli-eren.jpg"
              alt="Aslı Eren"
              className="h-24 w-24 md:h-28 md:w-28 rounded-2xl object-cover border border-white/10 shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-white font-semibold text-xl md:text-2xl">
              Aslı Eren — Brands & Media
            </h3>
            <p className="text-zinc-300 mt-1">Manager</p>

            <p className="text-zinc-300 mt-3 leading-relaxed">
              For inquiries regarding collaborations, bookings, media appearances,
              interviews, sponsorships, partnerships or press requests for{' '}
              <span className="text-white font-medium">Sena Şener</span>.
            </p>

            {/* Contacts */}
            <div className="mt-4 grid gap-1 text-purple-300">
              <a
                className="hover:underline break-all"
                href="mailto:management@senasener.com"
              >
                management@senasener.com
              </a>
              <a className="hover:underline" href="tel:+905547388339">
                +90 554 738 83 39
              </a>
            </div>
          </div>

          {/* Buttons (compact, aligned top-right) */}
          <div className="flex gap-2 self-start">
            <Button
              href="mailto:management@senasener.com"
              ariaLabel="Email Aslı Eren"
            >
              Email
            </Button>
            <Button
              variant="ghost"
              href="tel:+905547388339"
              ariaLabel="Call Aslı Eren"
            >
              Call
            </Button>
          </div>
        </div>
      </article>
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
   Image Stripe Divider
======================= */
function ImageStripe() {
  return (
    <section aria-label="Image divider" className="relative">
      <div className="relative h-70 md:h-96 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
        <img
          src="/sena-divider.jpg"
          alt="Sena Şener"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-[center_80%]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </section>
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

      <ImageStripe src="/sena-divider.jpg" alt="Sena performing live" heightClass="h-20 md:h-36" />
      <SpotifySection lang={lang} />
      <TourSection lang={lang} />
      <SocialSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer />
    </main>
  )
}
