
'use client'

import { useEffect, useState } from 'react'

import Nav from '../components/Nav'
import Hero from '../components/Hero'
import MilestoneCelebration from '../components/MilestoneCelebration'
import SpotifySection from '../components/SpotifySection'
import TourSection from '../components/TourSection'
import SocialSection from '../components/SocialSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import ImageStripe from '../components/ImageStripe'
import StreamSection from '../components/StreamSection'
import GallerySection from '../components/GallerySection'

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
      <ImageStripe />
      <StreamSection />
      <SpotifySection lang={lang} />
      <TourSection lang={lang} />
      <SocialSection lang={lang} />
      <ContactSection lang={lang} />
      <GallerySection />
      <Footer />
    </main>
  )
}