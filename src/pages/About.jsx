import { CrosshairIcon, SmartphoneIcon, ServerIcon, CheckIcon, YoutubeIcon } from '../components/Icons.jsx'
import { YOUTUBE_URL } from '../config.js'

const SKILLS = [
  { label: 'Ethical Hacking & Penetration Testing', value: 95 },
  { label: 'Mobile OS Security — Android / iOS', value: 92 },
  { label: 'Desktop & Server Hardening', value: 90 },
  { label: 'Malware Analysis & Digital Forensics', value: 88 },
]

const PILLARS = [
  {
    icon: CrosshairIcon,
    title: 'White Hat Penetration Testing',
    points: [
      'Authorized attack simulations on web apps, networks and endpoints',
      'Vulnerability assessment with clear, actionable remediation reports',
      'Reconnaissance, exploitation and post-exploit analysis — fully legal scope',
    ],
  },
  {
    icon: SmartphoneIcon,
    title: 'Mobile OS Security — Android / iOS',
    points: [
      'Deep diagnostics for Android and iOS — lag, battery drain, overheating',
      'Malware, spyware and stalkerware detection and clean removal',
      'OS-level security configuration, app auditing and privacy lockdown',
    ],
  },
  {
    icon: ServerIcon,
    title: 'Desktop / Server Management',
    points: [
      'Windows and Linux system hardening to CIS-style baseline standards',
      'Firewall rules, intrusion prevention and secure remote access setup',
      'Performance tuning, backup strategy and disaster-recovery planning',
    ],
  },
]

export default function About() {
  return (
    <div className="pt-32 md:pt-40">
      {/* header */}
      <section className="relative mx-auto max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">About me</p>
        <h1 className="page-title mt-4">
          The person behind <span className="text-cyan-400">CYBER DT</span>
        </h1>
        <p className="page-lede mt-5">
          I am Darshitha Theekshana — a white hat ethical hacker and cyber security specialist based
          in Sri Lanka, working across penetration testing, malware analysis, mobile device recovery
          and system hardening.
        </p>
      </section>

      {/* bio */}
      <section className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 lg:grid-cols-5 lg:px-6">
        <div className="lg:col-span-3">
          <div className="cyber-card h-full p-8">
            <p className="text-base leading-relaxed text-slate-300">
              I operate as{' '}
              <span className="font-semibold text-white">Darshitha Theekshana</span>, the person
              behind <span className="font-semibold text-cyan-400">CYBER DT</span>. My mission is
              simple: find every weakness in a system before someone malicious does.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Over the years I’ve worked across the full tech ecosystem — running authorized
              penetration tests, dissecting malware, rescuing infected smartphones, and hardening
              desktops and servers so they stay secure under real-world pressure. I don’t just fix
              symptoms; I trace root causes and rebuild defences that last.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Beyond client work, I share what I know on my YouTube channel{' '}
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="no-underline inline-flex items-center gap-1.5 font-medium text-red-400 transition-colors hover:text-red-300"
              >
                <YoutubeIcon className="h-4 w-4" />
                @dtcybersl1
              </a>{' '}
              — tutorials, tool breakdowns and practical security tips for everyday users. Every
              system I touch follows one rule:{' '}
              <span className="text-emerald-400">stay legal, stay ethical, stay protected.</span>
            </p>
          </div>
        </div>

        {/* skills panel */}
        <div className="lg:col-span-2">
          <div className="cyber-card h-full p-8">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Capabilities
            </h3>
            <ul className="mt-7 space-y-6">
              {SKILLS.map(({ label, value }) => (
                <li key={label}>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-mono text-xs text-cyan-400">{value}%</span>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-1000"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-2.5 border-t border-slate-800/80 pt-6 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <CheckIcon className="h-4 w-4 text-emerald-400" />
                White hat only — authorized targets
              </li>
              <li className="flex items-center gap-2.5">
                <CheckIcon className="h-4 w-4 text-emerald-400" />
                Confidentiality guaranteed
              </li>
              <li className="flex items-center gap-2.5">
                <CheckIcon className="h-4 w-4 text-emerald-400" />
                Remote worldwide + on-site in Sri Lanka
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* expertise pillars */}
      <section className="mx-auto mt-20 max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">Core expertise</p>
        <h2 className="section-title mt-4">Technical expertise</h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, points }) => (
            <article key={title} className="cyber-card p-7">
              <span className="inline-grid h-11 w-11 place-items-center rounded-lg border border-cyan-400/25 bg-slate-900/60 text-cyan-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold leading-snug text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* philosophy band */}
        <figure className="cyber-card mt-14 p-9 text-center">
          <blockquote className="font-display text-lg font-semibold leading-relaxed text-white sm:text-xl">
            “The weakest link is never the firewall — it’s the assumption that you’re safe.”
          </blockquote>
          <figcaption className="mt-4 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Darshitha Theekshana · CYBER DT
          </figcaption>
        </figure>
      </section>
    </div>
  )
}
