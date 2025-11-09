'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionHeader from './SectionHeader'

const images = Array.from({ length: 15 }, (_, i) => `/gallery/${i + 1}.jpg`)

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24"
    >
      <SectionHeader
        title="Gallery"
        subtitle="Moments on stage & behind the scenes"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.03 }}
            className="relative overflow-hidden rounded-2xl group aspect-[4/5] md:aspect-square"
          >
            {/* Image optimization with Next.js */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={i < 3} // preload first 3 images
                placeholder="blur"
                blurDataURL="/placeholder.jpg" // small base64 blur image (optional)
              />
            </motion.div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
