// app/components/Nav.jsx

import { useEffect, useState } from 'react'
import { i18n } from '../app/i18n'

export default function Nav({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = i18n[lang]
  const link =
    'text-sm md:text-base text-white/80 hover:text-white transition px-3 py-2 rounded-xl hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60'

  const toggleLang = () => setLang(lang === 'en' ? 'tr' : 'en')

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled || isOpen
          ? 'backdrop-blur bg-black/60 border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 flex items-center justify-between h-14">
        {/* Brand */}
        <a
          href="#home"
          className="font-bold tracking-wide text-white whitespace-nowrap"
        >
          Sena Şener
        </a>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-1 md:gap-2">
          <a className={link} href="#home">
            {t.nav.home}
          </a>
          <a className={link} href="#music">
            {t.nav.music}
          </a>
          <a className={link} href="#videos">
            {t.nav.videos}
          </a>
          <a className={link} href="#tour">
            {t.nav.tour}
          </a>
          <a className={link} href="#social">
            {t.nav.social}
          </a>
          <a className={link} href="#contact">
            {t.nav.contact}
          </a>
          <button
            aria-label="Toggle language"
            onClick={toggleLang}
            className="ml-1 md:ml-3 text-xs md:text-sm text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-xl px-3 py-2"
          >
            {t.nav.toggle}
          </button>
        </div>

        {/* Mobile right side: language + burger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Language toggle on mobile */}
          <button
            aria-label="Toggle language"
            onClick={toggleLang}
            className="text-xs text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-xl px-3 py-2"
          >
            {t.nav.toggle}
          </button>

          {/* Burger button */}
          <button
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-white/80 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
          >
            {/* Icon: 3 Lines / X */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1">
            <a className={link} href="#home" onClick={() => setIsOpen(false)}>
              {t.nav.home}
            </a>
            <a className={link} href="#music" onClick={() => setIsOpen(false)}>
              {t.nav.music}
            </a>
            <a className={link} href="#videos" onClick={() => setIsOpen(false)}>
              {t.nav.videos}
            </a>
            <a className={link} href="#tour" onClick={() => setIsOpen(false)}>
              {t.nav.tour}
            </a>
            <a className={link} href="#social" onClick={() => setIsOpen(false)}>
              {t.nav.social}
            </a>
            <a className={link} href="#contact" onClick={() => setIsOpen(false)}>
              {t.nav.contact}
            </a>
            {/* Optional second language toggle inside the menu */}
            <button
              onClick={() => {
                toggleLang()
                setIsOpen(false)
              }}
              className="mt-1 text-sm text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-xl px-3 py-2 text-left"
            >
              {t.nav.toggle}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
