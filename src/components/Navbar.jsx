import { useEffect, useState } from 'react'
import { MenuIcon, XIcon } from './Icons.jsx'
import { pageHref } from '../routing.js'
import { ROUTES } from '../seo/site.data.js'

const LINKS = ROUTES.map(({ key, navLabel }) => ({ id: key, label: navLabel }))

export default function Navbar({ active, navigate }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Real hrefs keep the navigation crawlable for search engines while the
  // click handler keeps the site a single-page app (no page reloads).
  const go = (id) => (event) => {
    event.preventDefault()
    setOpen(false)
    navigate(id)
  }

  const homeHref = pageHref('home')
  const contactHref = pageHref('contact')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-800/80 bg-[#080b10]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-6">
        {/* text-only logo */}
        <a
          href={homeHref}
          onClick={go('home')}
          className="no-underline font-display text-lg font-bold tracking-[0.2em] text-white"
        >
          CYBER<span className="text-cyan-400">DT</span>
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={pageHref(id)}
                onClick={go(id)}
                aria-current={active === id ? 'page' : undefined}
                className={`no-underline relative py-1 text-sm font-medium transition-colors duration-200 ${
                  active === id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-cyan-400 transition-all duration-300 ${
                    active === id ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={contactHref}
            onClick={go('contact')}
            className="btn-primary no-underline hidden sm:inline-flex"
          >
            Hire Me
          </a>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800 text-slate-300 transition-colors hover:border-slate-600 hover:text-white lg:hidden"
          >
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? 'max-h-[420px] border-b border-slate-800/80' : 'max-h-0'
        }`}
      >
        <ul className="mx-auto max-w-6xl space-y-1 px-5 pb-5 pt-2">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={pageHref(id)}
                onClick={go(id)}
                aria-current={active === id ? 'page' : undefined}
                className={`no-underline block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === id
                    ? 'bg-slate-900/70 text-cyan-400'
                    : 'text-slate-300 hover:bg-slate-900/40 hover:text-white'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href={contactHref} onClick={go('contact')} className="btn-primary no-underline w-full">
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
