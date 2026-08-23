import { useEffect, useState } from 'react'
import { ShieldIcon, MenuIcon, XIcon } from './Icons.jsx'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'services', label: 'Services' },
  { id: 'youtube', label: 'YouTube Channel' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ active, navigate }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    navigate(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-void/70 backdrop-blur-xl border-b border-neon-cyan/20 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* top status strip */}
      <div className="hidden md:block border-b border-slate-800/60 bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] lg:px-8">
          <span className="text-slate-500">
            root@cyberdt:~# <span className="text-neon-cyan">encryption active</span>
          </span>
          <span className="flex items-center gap-2 text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
            </span>
            systems online — sri lanka
          </span>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* logo */}
        <button type="button" onClick={() => go('home')} className="group flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-sm border border-neon-cyan/50 bg-panel text-neon-cyan transition-shadow duration-300 group-hover:shadow-glow-cyan">
            <ShieldIcon className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-neon-green shadow-[0_0_8px_#00e676]" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-[0.22em] text-white">
            CYBER<span className="text-neon-cyan text-glow-cyan"> DT</span>
          </span>
        </button>

        {/* desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                className={`group relative px-1 py-1 font-display text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${
                  active === id ? 'text-neon-cyan' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-neon-cyan to-transparent transition-all duration-300 ${
                    active === id ? 'w-full shadow-[0_0_8px_#00f2fe]' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => go('contact')} className="btn-primary hidden !px-6 !py-2.5 sm:inline-flex">
            Hire Me
          </button>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-sm border border-neon-cyan/30 bg-panel text-neon-cyan lg:hidden"
          >
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? 'max-h-[420px] border-b border-neon-cyan/20' : 'max-h-0'
        }`}
      >
        <ul className="glass-panel space-y-1 px-5 pb-6 pt-3">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                className={`flex w-full items-center justify-between rounded-sm px-4 py-3 text-left font-display text-sm font-semibold uppercase tracking-[0.18em] ${
                  active === id ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {label}
                <span className="font-mono text-xs text-slate-600">
                  {'>'}_
                </span>
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button type="button" onClick={() => go('contact')} className="btn-primary w-full">
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
