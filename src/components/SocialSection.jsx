// app/components/SocialSection.jsx

import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

// Einfacher Lazy Wrapper der Inhalte erst rendert wenn der Bereich in Sicht ist
function LazyOnScroll({ children, rootMargin = '200px 0px' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [visible, rootMargin])

  return (
    <div
      ref={ref}
      className="h-[400px] md:h-[600px] rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center"
    >
      {visible ? (
        children
      ) : (
        <p className="text-xs text-zinc-400 text-center px-4">
          Social Inhalte werden automatisch geladen sobald du in diesen Bereich scrollst
        </p>
      )}
    </div>
  )
}

function TikTokCreator({ uniqueId = 'sena.sener', profileUrl = 'https://www.tiktok.com/@sena.sener' }) {
  useEffect(() => {
    const id = 'tiktok-embed-script'
    if (typeof window === 'undefined') return

    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.async = true
      s.src = 'https://www.tiktok.com/embed.js'
      document.body.appendChild(s)
    }
  }, [])

  return (
    <blockquote
      className="tiktok-embed"
      cite={profileUrl}
      data-unique-id={uniqueId}
      data-embed-from="embed_page"
      data-embed-type="creator"
      style={{
        maxWidth: '100%',
        minWidth: '280px',
        width: '100%',
        height: '100%',
      }}
    >
      <section>
        <a target="_blank" rel="noreferrer" href={`${profileUrl}?refer=creator_embed`}>
          @{uniqueId}
        </a>
      </section>
    </blockquote>
  )
}

function InstagramProfileEmbed({ profileUrl = 'https://www.instagram.com/sena.sener/' }) {
  useEffect(() => {
    const id = 'instagram-embed-script'
    if (typeof window === 'undefined') return

    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.async = true
      s.src = 'https://www.instagram.com/embed.js'
      document.body.appendChild(s)
      s.onload = () => {
        if (window.instgrm?.Embeds) {
          window.instgrm.Embeds.process()
        }
      }
    } else if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={profileUrl}
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        border: 0,
        borderRadius: 12,
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 8px 24px 0 rgba(0,0,0,0.15)',
        margin: '0 auto',
        maxWidth: '100%',
        minWidth: 326,
        width: '100%',
        height: '84%',
      }}
    />
  )
}

export default function SocialSection({ lang }) {
  const t = i18n[lang].social

  return (
    <section
      id="social"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 pt-16 pb-8 md:pt-24 md:pb-12"
    >
      <SectionHeader title={t.title} subtitle={t.subtitle} />
      <div className="grid gap-6 md:grid-cols-2">
        <LazyOnScroll>
          <InstagramProfileEmbed profileUrl="https://www.instagram.com/sena.sener/" />
        </LazyOnScroll>
        <LazyOnScroll>
          <TikTokCreator uniqueId="sena.sener" profileUrl="https://www.tiktok.com/@sena.sener" />
        </LazyOnScroll>
      </div>
    </section>
  )
}
