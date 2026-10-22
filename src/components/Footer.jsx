import { WhatsappIcon, YoutubeIcon, MailIcon, FacebookIcon, LinkedinIcon } from './Icons.jsx'
import {
  WHATSAPP_URL,
  YOUTUBE_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  mailtoHref,
} from '../config.js'
import { pageHref } from '../routing.js'
import { ROUTES } from '../seo/site.data.js'

const SOCIALS = [
  { href: YOUTUBE_URL, label: 'YouTube', Icon: YoutubeIcon, hover: 'hover:text-red-400' },
  { href: FACEBOOK_URL, label: 'Facebook', Icon: FacebookIcon, hover: 'hover:text-sky-400' },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedinIcon, hover: 'hover:text-cyan-400' },
  { href: WHATSAPP_URL, label: 'WhatsApp', Icon: WhatsappIcon, hover: 'hover:text-emerald-400' },
]

export default function Footer({ navigate }) {
  return (
    <footer className="relative z-10 mt-24 border-t border-slate-800/80 bg-[#080b10]">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* brand */}
          <div>
            <a
              href={pageHref('home')}
              onClick={(e) => {
                e.preventDefault()
                navigate('home')
              }}
              className="no-underline font-display text-base font-bold tracking-[0.2em] text-white"
            >
              CYBER<span className="text-cyan-400">DT</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              White Hat Ethical Hacker &amp; Cyber Security Specialist — Darshitha Theekshana.
              Securing people, devices and systems across Sri Lanka and beyond.
            </p>
            <p className="mt-3 text-sm text-slate-500">Based in Sri Lanka — Available worldwide.</p>
          </div>

          {/* navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white">Navigation</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {ROUTES.map(({ key, navLabel }) => (
                <li key={key}>
                  <a
                    href={pageHref(key)}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(key)
                    }}
                    className="no-underline text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    {navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* connect */}
          <div>
            <h4 className="text-sm font-semibold text-white">Connect</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={mailtoHref()}
                  className="no-underline flex items-center gap-2.5 text-slate-400 transition-colors hover:text-cyan-400"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-slate-500" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline flex items-center gap-2.5 text-slate-400 transition-colors hover:text-emerald-400"
                >
                  <WhatsappIcon className="h-4 w-4 shrink-0 text-slate-500" />
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map(({ href, label, Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className={`no-underline grid h-9 w-9 place-items-center rounded-lg border border-slate-800 text-slate-400 transition-all duration-200 hover:border-slate-600 ${hover}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-slate-800/80 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 CYBER DT (Darshitha Theekshana). All Rights Reserved | Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  )
}
