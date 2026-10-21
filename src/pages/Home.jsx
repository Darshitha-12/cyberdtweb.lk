import { useEffect, useState } from 'react'
import CyberSphere from '../components/CyberSphere.jsx'
import { ArrowRightIcon, YoutubeIcon, CrosshairIcon, SmartphoneIcon, ServerIcon, CheckIcon } from '../components/Icons.jsx'

const ROLES = ['White Hat Ethical Hacker', 'Cyber Security Specialist', 'Mobile Diagnostics Expert', 'Desktop System Hardener']

function Typewriter() {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let delay = deleting ? 32 : 68

    if (!deleting && text === current) {
      delay = 1800
    } else if (deleting && text === '') {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
      return
    }

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true)
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, roleIdx])

  return (
    <span className="font-mono text-sm text-neon-green sm:text-base">
      <span className="text-slate-500">$</span> {text}
      <span className="animate-blink text-neon-cyan">▊</span>
    </span>
  )
}

const HIGHLIGHTS = [
  { icon: CrosshairIcon, title: 'Ethical Hacking', desc: 'Authorized penetration testing & vulnerability assessment that finds the holes before attackers do.' },
  { icon: SmartphoneIcon, title: 'Mobile Diagnostics', desc: 'Deep Android/iOS diagnostics — malware removal, performance recovery and OS-level security tuning.' },
  { icon: ServerIcon, title: 'PC System Hardening', desc: 'Windows & Linux desktops locked down, optimized and hardened against real-world threats.' },
]

export default function Home({ navigate }) {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 lg:min-h-screen">
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-neon-cyan/10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-[-8%] h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-8 lg:px-8">
          {/* left copy */}
          <div className="text-center lg:text-left">
            <p className="section-tag justify-center lg:justify-start">authorized_access // white_hat</p>

            <h1 className="mt-5 font-display text-4xl font-black uppercase leading-tight tracking-wide text-white sm:text-5xl xl:text-6xl">
              <span className="mb-2 block font-mono text-[11px] font-medium tracking-[0.45em] text-neon-cyan/80 sm:text-xs">
                CYBER DT
              </span>
              Darshitha
              <br />
              <span className="bg-gradient-to-r from-neon-cyan via-cyan-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,242,254,0.35)]">
                Theekshana
              </span>
            </h1>

            <div className="mt-5 inline-flex items-center gap-2 rounded-sm border border-neon-green/30 bg-panel/70 px-4 py-2 backdrop-blur-md">
              <Typewriter />
            </div>

            <h2 className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.3em] text-slate-400 sm:text-base">
              White Hat Ethical Hacker <span className="text-neon-cyan">&amp;</span> Tech Ecosystem Specialist
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 lg:mx-0">
              I break into systems <span className="text-white">so criminals can't.</span> From ethical
              hacking and penetration testing to mobile diagnostics and full PC system hardening —
              CYBER DT secures your entire digital ecosystem, end to end.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <button type="button" onClick={() => navigate('contact')} className="btn-primary group">
                Get In Touch
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button type="button" onClick={() => navigate('youtube')} className="btn-outline !border-neon-red/50 !text-red-400 hover:!bg-red-500/10 hover:!shadow-[0_0_26px_rgba(255,0,51,0.25)]">
                <YoutubeIcon className="h-5 w-5" />
                YouTube Channel
              </button>
            </div>

            {/* trust strip */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-slate-800/70 pt-6 font-mono text-[11px] uppercase tracking-widest text-slate-500 lg:justify-start">
              <span className="flex items-center gap-2"><CheckIcon className="h-3.5 w-3.5 text-neon-green" /> 100% Confidential</span>
              <span className="flex items-center gap-2"><CheckIcon className="h-3.5 w-3.5 text-neon-green" /> Legal &amp; Authorized Only</span>
              <span className="flex items-center gap-2"><CheckIcon className="h-3.5 w-3.5 text-neon-green" /> Sri Lanka Based · Global Remote</span>
            </div>
          </div>

          {/* right 3D visualizer */}
          <div className="relative mx-auto aspect-square w-full max-w-[520px] animate-floatY">
            <CyberSphere />
            <div className="pointer-events-none absolute inset-x-10 bottom-4 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/50">
              cryptographic_core :: live
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/10" />
          </div>
        </div>
      </section>

      {/* ================= EXPERTISE STRIP ================= */}
      <section className="relative py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 lg:px-8">
          {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
              className="cyber-card rounded-md p-7"
            >
              <span className="inline-grid h-12 w-12 place-items-center rounded-sm border border-neon-cyan/30 bg-panel text-neon-cyan shadow-glow-cyan">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-base font-bold uppercase tracking-[0.14em] text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ================= TERMINAL CTA BAND ================= */}
      <section className="relative py-14">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="cyber-card overflow-hidden rounded-md">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-black/40 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-slate-500">dt@cyber-sl: ~/portfolio</span>
            </div>
            <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-7 text-slate-400">
<code><span className="text-neon-green">$</span> whoami
<span className="text-white">darshitha_theekshana — cyber security specialist, sri lanka 🇱🇰</span>

<span className="text-neon-green">$</span> ./scan --scope your_systems --mode <span className="text-neon-cyan">whitehat</span>
<span className="text-slate-500">[ OK ]</span> vulnerabilities mapped   <span className="text-slate-500">[ OK ]</span> malware purged   <span className="text-slate-500">[ OK ]</span> defenses hardened

<span className="text-neon-green">$</span> status --mission
<span className="text-neon-cyan">▸ protecting clients. educating on youtube. one secured device at a time.</span></code>
            </pre>
          </div>
        </div>
      </section>
    </>
  )
}
