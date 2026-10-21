import { BugIcon, CrosshairIcon, LockIcon, ConsultIcon, ArrowRightIcon, CheckIcon } from '../components/Icons.jsx'
import { pageHref } from '../routing.js'

const SERVICES = [
  {
    icon: CrosshairIcon,
    code: 'SVC-01',
    title: 'Penetration Testing & Vulnerability Assessment',
    desc: 'Simulated real-world attacks on your apps, networks and devices — executed legally and ethically to expose weak points before criminals find them.',
    features: ['Web & network penetration testing', 'Vulnerability scanning & CVSS scoring', 'Detailed remediation report'],
  },
  {
    icon: BugIcon,
    code: 'SVC-02',
    title: 'Malware Analysis & Removal',
    desc: 'Infected device? I dissect the malware, remove every trace and harden the system so the same strain never gets back in.',
    features: ['Virus / trojan / spyware elimination', 'Rootkit & stalkerware detection', 'Post-infection forensics & cleanup'],
  },
  {
    icon: LockIcon,
    code: 'SVC-03',
    title: 'System Hardening',
    desc: 'Desktops, laptops and servers locked down to professional baseline standards — minimal attack surface, maximum performance.',
    features: ['Windows & Linux hardening', 'Firewall + intrusion prevention setup', 'Secure backup & recovery config'],
  },
  {
    icon: ConsultIcon,
    code: 'SVC-04',
    title: 'Custom Security Consultation',
    desc: 'One-on-one guidance for individuals and small businesses: security audits, best-practice training and a tailored defense roadmap.',
    features: ['Personal / SMB security audit', 'Staff awareness coaching', 'Tailored protection roadmap'],
  },
]

const PROCESS = [
  { step: '01', title: 'Recon & Scope', desc: 'We define targets, rules of engagement and success criteria.' },
  { step: '02', title: 'Analyze', desc: 'Deep scanning, enumeration and manual testing of the environment.' },
  { step: '03', title: 'Report & Fix', desc: 'Clear findings, prioritized fixes and hands-on remediation.' },
  { step: '04', title: 'Verify & Monitor', desc: 'Re-testing to confirm closure, plus optional ongoing monitoring.' },
]

export default function Services({ navigate }) {
  return (
    <div className="pt-36 md:pt-44">
      {/* header */}
      <section className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[130px]" />
        <p className="section-tag">service_modules // deployable</p>
        <h1 className="mt-4 font-display text-3xl font-black uppercase tracking-wide text-white sm:text-5xl">
          Technical <span className="text-neon-cyan text-glow-cyan">Services</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
          Every engagement is scoped, authorized and documented. Pick a module — or combine them
          into a full-stack security package for your digital ecosystem.
        </p>
        <div className="mt-4 h-px w-28 bg-gradient-to-r from-neon-cyan to-transparent" />
      </section>

      {/* service grid */}
      <section className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, code, title, desc, features }) => (
            <article
              key={code}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
              className="cyber-card group relative flex flex-col rounded-md p-8"
            >
              <div className="flex items-start justify-between">
                <span className="inline-grid h-14 w-14 place-items-center rounded-sm border border-neon-cyan/30 bg-panel text-neon-cyan transition-all duration-300 group-hover:border-neon-cyan/70 group-hover:shadow-glow-cyan">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="rounded-sm border border-slate-800 bg-black/40 px-2.5 py-1 font-mono text-[11px] tracking-widest text-neon-green">
                  {code}
                </span>
              </div>

              <h3 className="mt-6 font-display text-lg font-bold uppercase leading-snug tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-neon-cyan">
                {title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{desc}</p>

              <ul className="mt-6 space-y-2 border-t border-slate-800/80 pt-5">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 font-mono text-xs tracking-wide text-slate-400">
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-neon-green" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-600 group-hover:text-slate-500">
                  custom_quote
                </span>
                <a
                  href={pageHref('contact')}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('contact')
                  }}
                  aria-label={`Enquire about ${title}`}
                  className="no-underline grid h-9 w-9 place-items-center rounded-sm border border-neon-cyan/30 text-neon-cyan transition-all duration-300 hover:bg-neon-cyan hover:text-void hover:shadow-glow-cyan"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* process timeline */}
      <section className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
        <p className="section-tag">engagement_protocol // how_it_works</p>
        <div className="relative mt-10 grid gap-6 md:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent md:block" />
          {PROCESS.map(({ step, title, desc }, i) => (
            <div key={step} className="cyber-card relative rounded-md p-6">
              <span className="absolute -top-3 left-6 rounded-sm bg-panel px-2 py-1 font-mono text-[11px] font-bold tracking-widest text-neon-cyan shadow-glow-cyan">
                {step}
              </span>
              <h3 className="mt-3 font-display text-sm font-bold uppercase tracking-[0.15em] text-white">
                {i + 1}. {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div className="cyber-card mt-16 flex flex-col items-center justify-between gap-6 rounded-md p-8 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-display text-xl font-black uppercase tracking-wide text-white">
              Not sure which module you need?
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Send me the symptoms — I'll map the vulnerability and recommend the right fix.
            </p>
          </div>
          <a
            href={pageHref('contact')}
            onClick={(e) => {
              e.preventDefault()
              navigate('contact')
            }}
            className="btn-primary no-underline shrink-0"
          >
            Request A Free Assessment
          </a>
        </div>
      </section>
    </div>
  )
}
