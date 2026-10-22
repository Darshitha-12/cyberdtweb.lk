import { useEffect, useState } from 'react'
import {
  ArrowRightIcon,
  YoutubeIcon,
  CrosshairIcon,
  SmartphoneIcon,
  ServerIcon,
  CheckIcon,
  MapPinIcon,
  ClockIcon,
  ShieldIcon,
  WhatsappIcon,
} from '../components/Icons.jsx'
import { pageHref } from '../routing.js'
import { WHATSAPP_URL, YOUTUBE_URL } from '../config.js'
import { FAQ } from '../seo/site.data.js'

const ROLES = [
  'White Hat Ethical Hacker',
  'Cyber Security Specialist',
  'Mobile Diagnostics Expert',
  'Desktop System Hardener',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let delay = deleting ? 30 : 62

    if (!deleting && text === current) {
      delay = 1900
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
    <span className="font-display text-sm font-medium tracking-wide text-cyan-400 sm:text-base">
      {text}
      <span className="ml-0.5 animate-blink text-cyan-400/70">▍</span>
    </span>
  )
}

const HIGHLIGHTS = [
  {
    icon: CrosshairIcon,
    title: 'Ethical Hacking',
    desc: 'Authorized penetration testing and vulnerability assessment that finds the holes before attackers do.',
  },
  {
    icon: SmartphoneIcon,
    title: 'Mobile Diagnostics',
    desc: 'Deep Android and iOS diagnostics — malware removal, performance recovery and OS-level security tuning.',
  },
  {
    icon: ServerIcon,
    title: 'PC System Hardening',
    desc: 'Windows and Linux desktops locked down, optimised and hardened against real-world threats.',
  },
]

const FACTS = [
  { icon: MapPinIcon, label: 'Base', value: 'Sri Lanka — Remote worldwide' },
  { icon: ClockIcon, label: 'Response time', value: 'Under 24 hours' },
  { icon: ShieldIcon, label: 'Engagements', value: 'Authorized & NDA-friendly' },
]

export default function Home({ navigate }) {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40">
        <div className="pointer-events-none absolute inset-0 hero-aurora" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-16 lg:px-6">
          {/* left copy */}
          <div>
            <p className="eyebrow">Ethical Hacker &amp; Security Specialist</p>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Darshitha
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                Theekshana
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-slate-700" />
              <Typewriter />
            </div>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              I break into systems{' '}
              <span className="text-white">so criminals can’t.</span> From ethical hacking and
              penetration testing to mobile diagnostics and complete PC hardening, CYBER DT secures
              your digital ecosystem end to end.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={pageHref('contact')}
                onClick={(e) => {
                  e.preventDefault()
                  navigate('contact')
                }}
                className="btn-primary no-underline group"
              >
                Get in touch
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={pageHref('services')}
                onClick={(e) => {
                  e.preventDefault()
                  navigate('services')
                }}
                className="btn-outline no-underline"
              >
                View services
              </a>
            </div>

            {/* trust strip */}
            <ul className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-slate-800/80 pt-6 text-[13px] text-slate-400">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-emerald-400" />
                100% confidential
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-emerald-400" />
                Legal &amp; authorized only
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-emerald-400" />
                Sri Lanka based · Global remote
              </li>
            </ul>
          </div>

          {/* right profile panel */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="cyber-card p-8">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 font-display text-lg font-bold text-[#04121a]">
                  DT
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold text-white">
                    Darshitha Theekshana
                  </p>
                  <p className="mt-1 truncate text-sm text-slate-400">
                    White Hat Ethical Hacker · Cyber Security Specialist
                  </p>
                </div>
              </div>

              <dl className="mt-7 space-y-4 border-t border-slate-800/80 pt-6">
                {FACTS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-800 bg-slate-900/50 text-cyan-400">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                        {label}
                      </dt>
                      <dd className="mt-0.5 truncate text-sm font-medium text-slate-200">{value}</dd>
                    </span>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex gap-3 border-t border-slate-800/80 pt-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost no-underline flex-1"
                >
                  <WhatsappIcon className="h-4 w-4 text-emerald-400" />
                  WhatsApp
                </a>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost no-underline flex-1"
                >
                  <YoutubeIcon className="h-4 w-4 text-red-400" />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERTISE ================= */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-6">
          <p className="eyebrow">What I do</p>
          <h2 className="section-title mt-4">Three areas of practice</h2>
          <p className="page-lede mt-4">
            Every engagement is scoped in writing, performed only against systems you own or are
            authorized to test, and delivered with a clear remediation report.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="cyber-card p-7">
                <span className="inline-grid h-11 w-11 place-items-center rounded-lg border border-cyan-400/25 bg-slate-900/60 text-cyan-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CYBER DT ================= */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="eyebrow">The brand</p>
              <h2 className="section-title mt-4">Why the name CYBER DT</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                CYBER DT is the short, searchable identity used across this website, the
                @dtcybersl1 YouTube channel and the GitHub profile — same spelling, same role, same
                services everywhere.
              </p>
            </div>

            <div className="lg:col-span-3">
              <ul className="space-y-4">
                {[
                  {
                    title: 'Authorized, documented work',
                    desc: 'Written scope and rules of engagement before any testing begins.',
                  },
                  {
                    title: 'Root cause, not symptoms',
                    desc: 'Root causes are traced and defences rebuilt so issues stay fixed.',
                  },
                  {
                    title: 'Practical, real-world focus',
                    desc: 'The same work shown on the channel is the work delivered to clients.',
                  },
                ].map((item) => (
                  <li key={item.title} className="cyber-card flex gap-4 p-6">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span>
                      <span className="block font-display text-sm font-semibold text-white">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-slate-400">
                        {item.desc}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-5 lg:px-6">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title mt-4">Frequently asked questions</h2>

          <dl className="mt-9 divide-y divide-slate-800/80 border-y border-slate-800/80">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6">
                <dt className="font-display text-base font-semibold text-white">{item.q}</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-slate-400">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-5 lg:px-6">
          <div className="cyber-card flex flex-col items-center gap-6 p-10 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold tracking-tight text-white">
                Need a security assessment?
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                Describe the symptoms — I’ll map the vulnerability and recommend the right fix before
                anything is scoped.
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
              Start a conversation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
