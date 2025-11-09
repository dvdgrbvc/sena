// app/components/SocialSection.jsx

import { useEffect } from 'react'
import SectionHeader from './SectionHeader'
import { i18n } from '../i18n'

function TikTokCreator({ uniqueId = 'sena.sener', profileUrl = 'https://www.tiktok.com/@sena.sener' }) {
  useEffect(() => {
    const id = 'tiktok-embed-script'
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.async = true
      s.src = 'https://www.tiktok.com/embed.js'
      document.body.appendChild(s)
    }
  }, [])

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-center h-[600px]">
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
    </div>
  )
}

function InstagramProfileEmbed({ profileUrl = 'https://www.instagram.com/sena.sener/' }) {
  useEffect(() => {
    const id = 'instagram-embed-script'
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.async = true
      s.src = 'https://www.instagram.com/embed.js'
      document.body.appendChild(s)
    } else if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 flex items-start justify-center h-[600px]">
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
    </div>
  )
}

export default function SocialSection({ lang }) {
  const t = i18n[lang].social
  return (
    <section id="social" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title={t.title} subtitle={t.subtitle} />
      <div className="grid gap-6 md:grid-cols-2">
        <InstagramProfileEmbed profileUrl="https://www.instagram.com/sena.sener/" />
        <TikTokCreator uniqueId="sena.sener" profileUrl="https://www.tiktok.com/@sena.sener" />
      </div>
    </section>
  )
}
