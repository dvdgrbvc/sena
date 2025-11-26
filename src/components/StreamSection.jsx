'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion, motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

function useCountUp(target = 0, { duration = 1400, play = false } = {}) {
  const prefersReducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!play) return
    if (prefersReducedMotion) {
      setValue(target)
      return
    }

    let raf = 0
    const start = performance.now()
    const startVal = 0
    const diff = target - startVal

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setValue(Math.floor(startVal + diff * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [play, target, duration, prefersReducedMotion])

  return value
}

const formatInt = (n) => new Intl.NumberFormat().format(n)

export default function StreamsSection({ lang }) {
  const t = i18n[lang].streams

  const spotifyTarget = 800_000_000
  const youtubeTarget = 600_000_000

  // trigger when section is in view
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px' })

  const spotify = useCountUp(spotifyTarget, { duration: 3000, play: inView })
  const youtube = useCountUp(youtubeTarget, { duration: 2400, play: inView })

  return (
    <section
      ref={sectionRef}
      id="streams"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24"
    >
      <SectionHeader
        id="streams-header"
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {/* Spotify */}
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[.04] p-5 md:p-6"
        >
          <div className="shrink-0">
            <img
              src="/spotify.webp"
              alt={t.spotifyLabel}
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-zinc-400">
              {t.spotifyLabel}
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                {formatInt(spotify)}
              </span>
              <span className="text-xl md:text-2xl text-zinc-300 font-semibold">
                +
              </span>
            </div>
            <p className="text-zinc-400 text-sm mt-1">{t.streamsLabel}</p>
          </div>
        </motion.article>

        {/* YouTube */}
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[.04] p-5 md:p-6"
        >
          <div className="shrink-0">
            <img
              src="/youtube.webp"
              alt={t.youtubeLabel}
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-zinc-400">
              {t.youtubeLabel}
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                {formatInt(youtube)}
              </span>
              <span className="text-xl md:text-2xl text-zinc-300 font-semibold">
                +
              </span>
            </div>
            <p className="text-zinc-400 text-sm mt-1">{t.streamsLabel}</p>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
