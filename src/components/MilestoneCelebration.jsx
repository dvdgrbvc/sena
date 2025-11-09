// app/components/MilestoneCelebration.jsx

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Confetti from 'react-confetti'
import { i18n } from '../i18n'

export default function MilestoneCelebration({ lang }) {
  const prefersReducedMotion = useReducedMotion()
  const text = i18n[lang].milestone.line

  const [dims, setDims] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () => setDims({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const [showConfetti, setShowConfetti] = useState(true)
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowConfetti(false)
      return
    }
    const t = setTimeout(() => setShowConfetti(false), 5500)
    return () => clearTimeout(t)
  }, [prefersReducedMotion])

  const pieces = Math.min(600, Math.max(180, Math.floor(dims.width * 0.4)))

  const SPOTIFY_TENI = "https://open.spotify.com/embed/track/6lN8zGW83p9Ee4TJWedanB?utm_source=generator&theme=0"
  const SPOTIFY_BENI = "https://open.spotify.com/embed/track/7sNgPpXH3mDpC12yRUqEtz?utm_source=generator&theme=0"

  return (
    <section className="relative overflow-hidden" aria-label="Milestone celebration">
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

      {showConfetti && !prefersReducedMotion && dims.width > 0 && (
        <Confetti
          width={dims.width}
          height={dims.height}
          numberOfPieces={pieces}
          recycle={false}
          gravity={0.25}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24 text-center text-white">
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
