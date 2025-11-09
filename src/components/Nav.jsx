// app/components/Nav.jsx

import { useEffect, useState } from 'react'
import { i18n } from '../i18n'

export default function Nav({ lang, setLang }) {
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
          >
            {t.nav.toggle}
          </button>
        </div>
      </div>
    </nav>
  )
}
