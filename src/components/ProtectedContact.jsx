import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from './Icons.jsx'

/**
 * Contact card that keeps the raw value out of view until the visitor
 * explicitly reveals it — protects against casual scraping / shoulder surfing.
 */
export default function ProtectedContact({
  icon: Icon,
  label,
  masked,
  value,
  href,
  accent = 'text-cyan-400',
  external = false,
}) {
  const [revealed, setRevealed] = useState(false)

  const Tag = revealed && href ? 'a' : 'div'
  const linkProps =
    revealed && href
      ? { href, ...(external ? { target: '_blank', rel: 'noreferrer' } : {}) }
      : {}

  return (
    <Tag
      {...linkProps}
      className={`cyber-card flex items-center gap-4 p-6 ${revealed && href ? '' : 'cursor-default'}`}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-slate-800 bg-slate-900/50 ${accent}`}
      >
        <Icon className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
          {label}
        </span>
        <span
          className={`mt-1.5 block truncate text-sm font-semibold transition-colors duration-300 ${
            revealed ? 'text-white' : 'select-none text-slate-400 blur-[3px] hover:blur-none'
          }`}
        >
          {revealed ? value : masked}
        </span>
      </span>

      <button
        type="button"
        aria-label={revealed ? 'Hide contact details' : 'Reveal contact details'}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setRevealed((v) => !v)
        }}
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors duration-200 ${
          revealed
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
            : 'border-slate-800 text-slate-500 hover:border-cyan-400/50 hover:text-cyan-400'
        }`}
      >
        {revealed ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
      </button>
    </Tag>
  )
}
