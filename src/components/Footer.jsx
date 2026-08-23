import { WhatsappIcon, YoutubeIcon, MailIcon, ShieldIcon } from './Icons.jsx'
import { WHATSAPP_URL, YOUTUBE_URL, mailtoHref } from '../config.js'

export default function Footer({ navigate }) {
  return (
    <footer className="relative z-10 mt-24 border-t border-neon-cyan/15 bg-panel/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-sm border border-neon-cyan/40 bg-panel text-neon-cyan">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-extrabold tracking-[0.22em] text-white">
                CYBER<span className="text-neon-cyan"> DT</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              White Hat Ethical Hacker &amp; Tech Ecosystem Specialist — securing people,
              devices and systems across Sri Lanka and beyond.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">// Navigate</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {[['home', 'Home'], ['about', 'About Me'], ['services', 'Services'], ['youtube', 'YouTube'], ['contact', 'Contact']].map(
                ([id, label]) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => navigate(id)}
                      className="text-slate-400 transition-colors hover:text-neon-cyan"
                    >
                      {label}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">// Connect</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={mailtoHref()} className="flex items-center gap-2.5 text-slate-400 hover:text-neon-cyan">
                  <MailIcon className="h-4 w-4 shrink-0 text-neon-cyan/70" />
                  Email — secure inbox
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-slate-400 hover:text-neon-green">
                  <WhatsappIcon className="h-4 w-4 shrink-0 text-neon-green/80" />
                  WhatsApp — secure line
                </a>
              </li>
              <li>
                <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-slate-400 hover:text-neon-red">
                  <YoutubeIcon className="h-4 w-4 shrink-0 text-neon-red" />
                  @dtcybersl1
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-slate-800/80 pt-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400/90">
            [ system status : <span className="text-neon-green text-glow-green">secure</span> ]
          </p>
          <p className="text-sm text-slate-500">
            © 2026 CYBER DT (Darshitha Theekshana). All Rights Reserved | Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  )
}
