// app/components/ImageStripe.jsx

export default function ImageStripe() {
  return (
    <section aria-label="Image divider" className="relative">
      <div className="relative h-70 md:h-96 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
        <img
          src="/sena-divider.jpg"
          alt="Sena Şener"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-[center_80%]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </section>
  )
}