// app/components/SpotifySection.jsx

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

export default function SpotifySection({ lang }) {
  const t = i18n[lang]
  return (
    <section
      id="music"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24"
    >
      <SectionHeader
        title={t.music.title}
        id="music-header"
        subtitle={t.music.subtitle}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SpotifyArtistEmbed />
        <AppleMusicEmbed />
      </div>

      <div id="videos" className="mt-14">
        <SectionHeader title={t.videos.title} subtitle={t.videos.subtitle} />

        {/* YouTube promo image (below header, centered, not full width) */}
        <a
          href="https://www.youtube.com/c/Sena%C5%9Eenermusic"
          target="_blank"
          rel="noopener"
          aria-label="Open Sena Şener YouTube channel"
          className="block mt-6"
        >
          <img
            src="/sena-youtube.png"
            alt="Sena Şener — Watch on YouTube"
            loading="lazy"
            className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
            style={{ display: 'block' }}
          />
        </a>

        <YouTubeGallery
          videos={[
            {
              url: 'https://youtu.be/tBcizD1Hsls?si=i2P35TOSUx5elopp&t=5',
              label: 'Teni Tenem (Live)',
            },
            {
              url: 'https://youtu.be/iOz-oLU2ZZY?si=1cCuUZ94FqOxtl4g',
              label: 'Official Video',
            },
            {
              url: 'https://youtu.be/R8chfFb9NO0?si=ZMHDqb_Jy4hqpE1N',
              label: 'Performance',
            },
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
        style={{
          width: '100%',
          maxWidth: '660px',
          overflow: 'hidden',
          borderRadius: 10,
        }}
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

  const CENTER_WIDTH = '72%'
  const SIDE_WIDTH = '36%'
  const OVERLAP_PX = 28
  const SIDE_SCALE = 0.94
  const SIDE_OPACITY = 0.9

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
            ? parseInt(h || '0') * 3600 +
              parseInt(m || '0') * 60 +
              parseInt(s || '0')
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

  const startX = useRef(0)
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
    }
  }

  if (!total) return null

  const active = items[index]
  const leftItem = items[(index - 1 + total) % total]
  const rightItem = items[(index + 1) % total]

  return (
    <section className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden mt-10">
      <div
        className="relative aspect-video"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <SidePreview
          side="left"
          item={leftItem}
          onClick={prev}
          style={{
            width: SIDE_WIDTH,
            transform: `translateY(-50%) translateX(${OVERLAP_PX}px) scale(${SIDE_SCALE})`,
            opacity: SIDE_OPACITY,
            zIndex: 5,
          }}
        />

        <SidePreview
          side="right"
          item={rightItem}
          onClick={next}
          style={{
            width: SIDE_WIDTH,
            transform: `translateY(-50%) translateX(-${OVERLAP_PX}px) scale(${SIDE_SCALE})`,
            opacity: SIDE_OPACITY,
            zIndex: 5,
          }}
        />

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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-20" />

        <button
          aria-label="Previous"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black/50 hover:bg-black/70 border border-white/10 rounded-full h-10 w-10 grid place-items-center text-white z-30"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black/50 hover:bg-black/70 border border-white/10 rounded-full h-10 w-10 grid place-items-center text-white z-30"
        >
          ›
        </button>
      </div>

      <div className="flex items-center justify-center gap-1 pb-4 pt-3">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-4 rounded-full ${
              i === index ? 'bg-purple-500' : 'bg-white/20'
            }`}
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
        <div className="absolute inset-0 bg-black/30" />
        <div
          className={`absolute inset-y-0 ${
            side === 'left' ? 'right-0' : 'left-0'
          } w-16 ${
            side === 'left' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
          } from-transparent to-black/80`}
        />
        {item.label && (
          <div
            className={`absolute ${
              side === 'left' ? 'left-3' : 'right-3'
            } bottom-3 text-xs text-white/90 drop-shadow`}
          >
            {item.label}
          </div>
        )}
      </div>
    </motion.button>
  )
}
