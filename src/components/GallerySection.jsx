'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const images = Array.from({ length: 9 }, (_, i) => `/gallery/${i + 1}.jpg`)

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-24 mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24"
    >
      <SectionHeader
        title="Gallery"
        subtitle="Moments on stage & behind the scenes"
      />

      {/* Grid of images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <motion.img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover aspect-[4/5] md:aspect-square"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
