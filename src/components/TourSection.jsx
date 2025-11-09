// app/components/TourSection.jsx

import SectionHeader from './SectionHeader'
import Button from './Button'
import { i18n } from '../app/i18n'
import { cn } from '../lib/utils'

export default function TourSection({ lang }) {
  const t = i18n[lang].tour
  const shows = [
    { date: '2025-11-15', city: 'Malatya',    venue: 'OFEST',          link: '#', status: 'new' },
    { date: '2025-11-23', city: 'Ordu',       venue: 'Milyon / OFEST', link: '#', status: 'onsale' },
    { date: '2025-11-28', city: 'Bursa',      venue: 'OFEST',          link: '#', status: 'soldout' },
    { date: '2025-12-06', city: 'Eskişehir',  venue: 'OFEST',          link: '#', status: 'onsale' },
    { date: '2025-12-12', city: 'Ankara',     venue: 'OFEST',          link: '#', status: 'onsale' },
  ]

  const fmt = (iso) => {
    try {
      const d = new Date(iso + 'T00:00:00')
      const locale = lang === 'tr' ? 'tr-TR' : 'en-GB'
      const day = d.toLocaleDateString(locale, { day: '2-digit' })
      const mon = d.toLocaleDateString(locale, { month: 'short' })
      const wk  = d.toLocaleDateString(locale, { weekday: 'short' })
      return { day, mon, wk }
    } catch {
      return { day: '—', mon: '', wk: '' }
    }
  }

  const StatusBadge = ({ status }) => {
    const map = {
      soldout: { text: t.soldout, cls: 'border-red-400/40 bg-red-500/10 text-red-300' },
      new:     { text: t.new,     cls: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300' },
      onsale:  { text: t.onsale,  cls: 'border-purple-400/40 bg-purple-500/10 text-purple-300' },
    }
    const m = map[status] || map.onsale
    return <span className={cn('text-[11px] uppercase tracking-wide rounded-full border px-2 py-1', m.cls)}>{m.text}</span>
  }

  return (
    <section id="tour" className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <SectionHeader title={t.title} id="tour-header" subtitle={t.subtitle} />
      <div className="grid gap-4">
        {shows.map((s, i) => {
          const { day, mon, wk } = fmt(s.date)
          const soldOut = s.status === 'soldout'
          return (
            <article
              key={`${s.city}-${s.date}`}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              aria-labelledby={`show-${i}`}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                  <div className="text-center leading-tight">
                    <div className="text-base font-extrabold text-white">{day}</div>
                    <div className="text-[11px] uppercase text-zinc-300">{mon}</div>
                  </div>
                </div>
                <div>
                  <p id={`show-${i}`} className="text-white font-semibold">
                    {s.city} • <span className="text-zinc-300">{s.venue}</span>
                  </p>
                  <p className="text-zinc-400 text-sm">{wk}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={s.status} />
                <Button href={soldOut ? undefined : s.link} disabled={soldOut} ariaLabel={`${t.tickets} ${s.city}`}>
                  {soldOut ? t.soldout : t.tickets}
                </Button>
                <Button variant="ghost" href="#contact" ariaLabel={t.contact}>{t.contact}</Button>
              </div>
            </article>
          )
        })}
      </div>
      <p className="mt-4 text-xs text-zinc-500">{t.note}</p>
    </section>
  )
}
