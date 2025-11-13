'use client'

import { useEffect, useState, useCallback } from 'react'
import SectionHeader from './SectionHeader'
import Button from './Button'
import { i18n } from '../app/i18n'
import { cn } from '../lib/utils'

export default function TourSection({ lang }) {
  const t = i18n[lang].tour
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // für das Popup: ausgewählte Show oder null
  const [modalShow, setModalShow] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/api/tour')
        if (!res.ok) throw new Error('Failed to load tour data')
        const data = await res.json()
        setShows(data.shows || [])
      } catch (e) {
        console.error(e)
        setError('Could not load tour data.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const fmt = (iso) => {
    try {
      const d = new Date(iso + 'T00:00:00')
      const locale = lang === 'tr' ? 'tr-TR' : 'en-GB'
      const day = d.toLocaleDateString(locale, { day: '2-digit' })
      const mon = d.toLocaleDateString(locale, { month: 'short' })
      const wk = d.toLocaleDateString(locale, { weekday: 'short' })
      return { day, mon, wk }
    } catch {
      return { day: '—', mon: '', wk: '' }
    }
  }

  const StatusBadge = ({ status }) => {
    const map = {
      soldout: {
        text: t.soldout,
        cls: 'border-red-400/40 bg-red-500/10 text-red-300',
      },
      new: {
        text: t.new,
        cls: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
      },
      onsale: {
        text: t.onsale,
        cls: 'border-purple-400/40 bg-purple-500/10 text-purple-300',
      },
    }
    const m = map[status] || map.onsale
    return (
      <span
        className={cn(
          'text-[11px] uppercase tracking-wide rounded-full border px-2 py-1',
          m.cls
        )}
      >
        {m.text}
      </span>
    )
  }

  const handleTicketsClick = useCallback((e, show) => {
    if (show.status === 'soldout') return

    // Verhindert, dass ein evtl. vorhandenes href direkt navigiert
    e.preventDefault()

    const links = [
      show.bubilet && { label: 'Bubilet', url: show.bubilet },
      show.biletix && { label: 'Biletix', url: show.biletix },
    ].filter(Boolean)

    if (links.length === 0) return

    if (links.length === 1) {
      // Direkt zur einzigen Ticketseite
      window.open(links[0].url, '_blank', 'noopener,noreferrer')
    } else {
      // Popup mit Auswahl öffnen
      setModalShow(show)
    }
  }, [])

  return (
    <section
      id="tour"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24"
    >
      <SectionHeader title={t.title} id="tour-header" subtitle={t.subtitle} />

      {loading && (
        <p className="text-sm text-zinc-400 mt-4">Loading shows…</p>
      )}

      {error && (
        <p className="text-sm text-red-400 mt-4">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid gap-4">
            {shows.map((s, i) => {
              const { day, mon, wk } = fmt(s.date)
              const soldOut = s.status === 'soldout'

              return (
                <article
                  key={`${s.city}-${s.date}-${i}`}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  aria-labelledby={`show-${i}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                      <div className="text-center leading-tight">
                        <div className="text-base font-extrabold text-white">
                          {day}
                        </div>
                        <div className="text-[11px] uppercase text-zinc-300">
                          {mon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        id={`show-${i}`}
                        className="text-white font-semibold"
                      >
                        {s.city} •{' '}
                        <span className="text-zinc-300">{s.venue}</span>
                      </p>
                      <p className="text-zinc-400 text-sm">{wk}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={s.status} />
                    <Button
                      href="#"
                      onClick={(e) => handleTicketsClick(e, s)}
                      disabled={soldOut}
                      ariaLabel={`${t.tickets} ${s.city}`}
                    >
                      {soldOut ? t.soldout : t.tickets}
                    </Button>
                    <Button
                      variant="ghost"
                      href="#contact"
                      ariaLabel={t.contact}
                    >
                      {t.contact}
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>

          <p className="mt-4 text-xs text-zinc-500">{t.note}</p>
        </>
      )}

      {/* Modal: Auswahl zwischen Bubilet / Biletix */}
      {modalShow && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setModalShow(null)}
        >
          <div
            className="max-w-sm w-full rounded-2xl bg-zinc-900 border border-white/10 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {modalShow.city} • {modalShow.venue}
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Choose a ticket provider:
            </p>

            <div className="flex flex-col gap-3">
              {modalShow.bubilet && (
                <Button
                  href={modalShow.bubilet}
                  ariaLabel="Go to Bubilet"
                >
                  Bubilet
                </Button>
              )}
              {modalShow.biletix && (
                <Button
                  href={modalShow.biletix}
                  ariaLabel="Go to Biletix"
                  variant="ghost"
                >
                  Biletix
                </Button>
              )}
            </div>

            <button
              className="mt-4 text-xs text-zinc-400 hover:text-zinc-200"
              onClick={() => setModalShow(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
