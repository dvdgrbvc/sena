// app/api/tour/route.js
import { NextResponse } from 'next/server'

// Deine veröffentlichte CSV-URL
const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS9GzbalaUXSTHZDYum9oDe8yFxRSl0dSkEG-AbDARMjV1qNwht0jl-yXwEv9C18DadSDfpRlmsZqqu/pub?output=csv'

// sehr einfache CSV-Parsing-Funktion
function parseCsv(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []

  const [headerLine, ...rows] = lines
  const headers = headerLine.split(',').map((h) => h.trim().toLowerCase())

  return rows
    .map((line) => {
      if (!line.trim()) return null
      const cols = line.split(',').map((c) => c.trim())

      const obj = {}
      headers.forEach((h, i) => {
        obj[h] = cols[i] || ''
      })
      return obj
    })
    .filter(Boolean)
}

export async function GET() {
  try {
    const res = await fetch(SHEET_URL, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch sheet')
    }

    const csv = await res.text()
    const rows = parseCsv(csv)

    const shows = rows
  .filter((r) => r.date)
  .map((r) => ({
    date: r.date,
    city: r.city,
    venue: r.venue,
    bubilet: r.bubilet,
    biletix: r.biletix,        // ✅ neue Spalte
    status: (r.sale || 'onsale').toLowerCase(),
  }))

    return NextResponse.json({ shows })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { shows: [], error: 'Failed to load tour data' },
      { status: 500 }
    )
  }
}
