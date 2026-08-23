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
  accent = 'text-neon-cyan',
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
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      className={`cyber-card flex items-center gap-4 rounded-md p-6 hover:border-neon-cyan/60 ${
        revealed && href ? '' : 'cursor-default'
      }`}
    >
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-sm border border-slate-700 bg-panel ${accent}`}>
        <Icon className="h-6 w-6" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
          {label}
        </span>
        <span
          className={`mt-1 block truncate font-semibold transition-colors duration-300 ${
            revealed ? 'text-white' : 'text-slate-400 select-none blur-[3px] hover:blur-none'
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
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-sm border transition-all duration-300 ${
          revealed
            ? 'border-neon-green/50 bg-neon-green/10 text-neon-green shadow-glow-green'
            : 'border-slate-600 bg-panel text-slate-500 hover:border-neon-cyan/60 hover:text-neon-cyan'
        }`}
      >
        {revealed ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
      </button>
    </Tag>
  )
}
