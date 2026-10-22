import {
  BugIcon,
  CrosshairIcon,
  LockIcon,
  ConsultIcon,
  ArrowRightIcon,
  CheckIcon,
} from '../components/Icons.jsx'
import { pageHref } from '../routing.js'

const SERVICES = [
  {
    icon: CrosshairIcon,
    title: 'Penetration Testing & Vulnerability Assessment',
    desc: 'Simulated real-world attacks on your apps, networks and devices — executed legally and ethically to expose weak points before criminals find them.',
    features: [
      'Web & network penetration testing',
      'Vulnerability scanning & CVSS scoring',
      'Detailed remediation report',
    ],
  },
  {
    icon: BugIcon,
    title: 'Malware Analysis & Removal',
    desc: 'Infected device? I dissect the malware, remove every trace and harden the system so the same strain never gets back in.',
    features: [
      'Virus / trojan / spyware elimination',
      'Rootkit & stalkerware detection',
      'Post-infection forensics & cleanup',
    ],
  },
  {
    icon: LockIcon,
    title: 'System Hardening',
    desc: 'Desktops, laptops and servers locked down to professional baseline standards — minimal attack surface, maximum performance.',
    features: [
      'Windows & Linux hardening',
      'Firewall + intrusion prevention setup',
      'Secure backup & recovery config',
    ],
  },
  {
    icon: ConsultIcon,
    title: 'Custom Security Consultation',
    desc: 'One-on-one guidance for individuals and small businesses: security audits, best-practice training and a tailored defence roadmap.',
    features: [
      'Personal / SMB security audit',
      'Staff awareness coaching',
      'Tailored protection roadmap',
    ],
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Recon & Scope',
    desc: 'We define targets, rules of engagement and success criteria.',
  },
  {
    step: '02',
    title: 'Analyze',
    desc: 'Deep scanning, enumeration and manual testing of the environment.',
  },
  {
    step: '03',
    title: 'Report & Fix',
    desc: 'Clear findings, prioritised fixes and hands-on remediation.',
  },
  {
    step: '04',
    title: 'Verify & Monitor',
    desc: 'Re-testing to confirm closure, plus optional ongoing monitoring.',
  },
]

export default function Services({ navigate }) {
  return (
    <div className="pt-32 md:pt-40">
      {/* header */}
      <section className="relative mx-auto max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">Services</p>
        <h1 className="page-title mt-4">Technical services</h1>
        <p className="page-lede mt-5">
          Every engagement is scoped, authorized and documented. Pick a single module — or combine
          them into a full-stack security package for your digital ecosystem.
        </p>
      </section>

      {/* service grid */}
      <section className="mx-auto mt-12 max-w-6xl px-5 lg:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, desc, features }) => (
            <article key={title} className="cyber-card flex flex-col p-8">
              <span className="inline-grid h-12 w-12 place-items-center rounded-lg border border-cyan-400/25 bg-slate-900/60 text-cyan-400">
                <Icon className="h-6 w-6" />
              </span>

              <h2 className="mt-6 font-display text-lg font-semibold leading-snug text-white">
                {title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{desc}</p>

              <ul className="mt-6 space-y-2.5 border-t border-slate-800/80 pt-5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-end">
                <a
                  href={pageHref('contact')}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('contact')
                  }}
                  aria-label={`Enquire about ${title}`}
                  className="no-underline inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Request a quote
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="mx-auto mt-20 max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">Engagement protocol</p>
        <h2 className="section-title mt-4">How it works</h2>

        <ol className="mt-10 grid gap-5 md:grid-cols-4">
          {PROCESS.map(({ step, title, desc }) => (
            <li key={step} className="cyber-card p-6">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-400">
                {step}
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold uppercase tracking-wide text-white">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{desc}</p>
            </li>
          ))}
        </ol>

        {/* CTA band */}
        <div className="cyber-card mt-16 flex flex-col items-center justify-between gap-6 p-8 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-white">
              Not sure which module you need?
            </h3>
            <p className="mt-2.5 text-sm text-slate-400">
              Send me the symptoms — I’ll map the vulnerability and recommend the right fix.
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
            Free assessment
          </a>
        </div>
      </section>
    </div>
  )
}
