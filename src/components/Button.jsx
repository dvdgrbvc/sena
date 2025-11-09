// app/components/Button.jsx

import { cx } from '../lib/utils'

export default function Button({
  href,
  onClick,
  children,
  variant = 'solid',
  disabled = false,
  ariaLabel,
  className,
  size // you already pass size but it was ignored before; still optional
}) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold outline-none ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500/60 transition'
  const styles =
    variant === 'solid'
      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed'
      : 'bg-transparent text-white/80 hover:text-white border border-white/15 hover:border-white/30 backdrop-blur disabled:opacity-50 disabled:cursor-not-allowed'

  const cls = cx(base, styles, className)

  if (href) {
    return (
      <a aria-label={ariaLabel} href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button aria-label={ariaLabel} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  )
}
