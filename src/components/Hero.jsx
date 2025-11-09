// app/components/Hero.jsx

import { motion } from 'framer-motion'
import Button from './Button'
import { i18n } from '../app/i18n'

export default function Hero({ lang }) {
  const t = i18n[lang].hero

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
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
        {/* LOGO ohne Shine-Effekt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.img
            src="/sena-logo2.png"
            alt="Sena Şener"
            className="
              max-w-[80vw]
              md:max-w-[60vw]
              lg:max-w-[50vw]
            "
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Subtitle – weniger Abstand, kann optisch „ranrutschen“ */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-1 text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-light tracking-wide"
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
          <Button
            href="#tour"
            size="lg"
            className="px-8 py-3 text-base font-semibold shadow-lg shadow-purple-500/30"
          >
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