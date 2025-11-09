// app/components/ContactSection.jsx

import SectionHeader from './SectionHeader'
import Button from './Button'
import { i18n } from '../app/i18n'

export default function ContactSection({ lang }) {
  const t = i18n[lang].contact
  return (
    <section
      id="contact"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24"
    >
      <SectionHeader
        title={t.title}
        id="contact-header"
        subtitle={t.subtitle}
      />

      <article
        className="relative overflow-hidden rounded-3xl border border-white/10
                   bg-gradient-to-br from-white/[.06] to-white/[.03]
                   p-6 md:p-10"
        aria-label="Professional contact card"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/spirale.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1.5rem top 1.5rem",
            backgroundSize: "30%",
            opacity: 0.1,
            mixBlendMode: "lighten",
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr,auto] items-start gap-6 md:gap-10 relative">
          <div className="shrink-0">
            <img
              src="/asli-eren.jpg"
              alt="Aslı Eren"
              className="h-24 w-24 md:h-28 md:w-28 rounded-2xl object-cover border border-white/10 shadow-lg"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="text-white font-semibold text-xl md:text-2xl">
              Aslı Eren — Brands & Media
            </h3>
            <p className="text-zinc-300 mt-1">Manager</p>

            <p className="text-zinc-300 mt-3 leading-relaxed">
              For inquiries regarding collaborations, bookings, media appearances,
              interviews, sponsorships, partnerships or press requests for{' '}
              <span className="text-white font-medium">Sena Şener</span>.
            </p>

            <div className="mt-4 grid gap-1 text-purple-300">
              <a
                className="hover:underline break-all"
                href="mailto:management@senasener.com"
              >
                management@senasener.com
              </a>
              <a className="hover:underline" href="tel:+905547388339">
                +90 554 738 83 39
              </a>
            </div>
          </div>

          <div className="flex gap-2 self-start">
            <Button
              href="mailto:management@senasener.com"
              ariaLabel="Email Aslı Eren"
            >
              Email
            </Button>
            <Button
              variant="ghost"
              href="tel:+905547388339"
              ariaLabel="Call Aslı Eren"
            >
              Call
            </Button>
          </div>
        </div>
      </article>
    </section>
  )
}
