'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'

// Optionale Helper: Wenn du später wieder Drive-Links mischst
function normalizeDriveUrl(src) {
  if (!src) return src
  try {
    if (/^[\w-]{20,}$/.test(src)) return `https://drive.google.com/uc?export=view&id=${src}`
    const u = new URL(src)
    const m1 = u.pathname.match(/\/file\/d\/([^/]+)/)
    if (m1?.[1]) return `https://drive.google.com/uc?export=view&id=${m1[1]}`
    const id = u.searchParams.get('id')
    if (id) return `https://drive.google.com/uc?export=view&id=${id}`
    return src
  } catch {
    return src
  }
}

function useKey(handler) {
  useEffect(() => {
    const onKey = (e) => handler(e)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handler])
}

export default function GallerySection({
  title = 'Gallery',
  subtitle = 'Highlights & moments.',
  images = [], // [{ src, alt, credit }]
}) {
  const items = useMemo(
    () => (images || []).map((img) => ({ ...img, src: normalizeDriveUrl(img.src) })),
    [images]
  )

  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const wrap = useCallback((i) => {
    const n = items.length
    return ((i % n) + n) % n
  }, [items.length])

  const openAt = (i) => { setIndex(i); setOpen(true) }
  const close = () => setOpen(false)
  const next = () => setIndex((i) => wrap(i + 1))
  const prev = () => setIndex((i) => wrap(i - 1))

  useKey((e) => {
    if (!open) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  })

  const startX = useRef(0)
  const onTouchStart = (e) => (startX.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 42) (dx < 0 ? next() : prev())
  }

  if (!items.length) return null

  return (
    <section id="gallery" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title={title} subtitle={subtitle} />

      {/* Masonry via CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {items.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            onClick={() => openAt(i)}
            className="mb-4 block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
            aria-label={`Open image ${i + 1}`}
          >
            <motion.img
              src={img.src}
              alt={img.alt || 'gallery image'}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
            />
            {img.credit && (
              <div className="mt-1 text-[11px] text-zinc-400 text-left">{img.credit}</div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div
              className="absolute inset-0 flex items-center justify-center px-3"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <motion.img
                key={index}
                src={items[index].src}
                alt={items[index].alt || 'image'}
                className="max-h-[86vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              />

              {(items[index].alt || items[index].credit) && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 max-w-[92vw] text-center">
                  <div className="inline-block rounded-lg bg-black/50 px-3 py-1.5 text-sm text-zinc-200">
                    {items[index].alt || ''}
                    {items[index].alt && items[index].credit ? ' — ' : ''}
                    {items[index].credit || ''}
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
                <button
                  onClick={prev}
                  className="pointer-events-auto ml-2 md:ml-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="pointer-events-auto mr-2 md:mr-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                  aria-label="Next"
                >
                  ›
                </button>
              </div>

              <button
                onClick={close}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
