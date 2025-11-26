'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

// Tipp: Wenn du die Bilder in WebP konvertierst, einfach Endung hier ändern:
const images = Array.from({ length: 15 }, (_, i) => `/gallery/${i + 1}.jpg`)
// z. B.: `/gallery/${i + 1}.webp`

export default function GallerySection({ lang = 'en' }) {
  const t = i18n[lang].gallery

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (index) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [])

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [])

  // Keyboard controls: Esc, ←, →
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, showNext, showPrev])

  return (
    <section
      id="gallery"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24"
    >
      <SectionHeader
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openModal(i)}
            className="relative overflow-hidden rounded-2xl group aspect-[4/5] md:aspect-square focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
          >
            <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
              />
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox / Slideshow Modal */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="relative max-w-5xl w-full"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
              aria-label="Close gallery"
            >
              ✕
            </button>

            {/* Image wrapper – FULL IMAGE, NO CROP */}
            <div className="relative w-full max-h-[80vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <div className="relative w-full h-[80vh]">
                <Image
                  src={images[currentIndex]}
                  alt={`Gallery ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Controls */}
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 text-white p-2 md:p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 text-white p-2 md:p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Counter */}
            <div className="mt-3 text-center text-xs text-white/70">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
