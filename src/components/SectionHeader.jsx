// app/components/SectionHeader.jsx

export default function SectionHeader({ id, title, subtitle }) {
  return (
    <header id={id} className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-zinc-400 mt-2 max-w-prose">{subtitle}</p>}
    </header>
  )
}
