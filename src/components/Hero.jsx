// app/components/Hero.jsx

import { motion } from 'framer-motion'
import Button from './Button'
import { i18n } from '../i18n'

export default function Hero({ lang }) {
  const t = i18n[lang].hero

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 text-center">
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

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-light tracking-wide"
        >
          {t.subtitle}
        </motion.p>

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
