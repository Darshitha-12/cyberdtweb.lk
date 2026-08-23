import { CrosshairIcon, SmartphoneIcon, ServerIcon, CheckIcon } from '../components/Icons.jsx'

const SKILLS = [
  { label: 'Ethical Hacking & Penetration Testing', value: 95 },
  { label: 'Mobile OS Security — Android / iOS', value: 92 },
  { label: 'Desktop & Server Hardening', value: 90 },
  { label: 'Malware Analysis & Digital Forensics', value: 88 },
]

const PILLARS = [
  {
    icon: CrosshairIcon,
    code: '01',
    title: 'White Hat Penetration Testing',
    points: [
      'Authorized attack simulations on web apps, networks and endpoints',
      'Vulnerability assessment with clear, actionable remediation reports',
      'Reconnaissance, exploitation and post-exploit analysis — fully legal scope',
    ],
  },
  {
    icon: SmartphoneIcon,
    code: '02',
    title: 'Mobile OS Security — Android / iOS',
    points: [
      'Deep diagnostics for Android & iOS devices — lag, battery drain, overheating',
      'Malware, spyware & stalkerware detection and clean removal',
      'OS-level security configuration, app auditing and privacy lockdown',
    ],
  },
  {
    icon: ServerIcon,
    code: '03',
    title: 'Desktop / Server Management',
    points: [
      'Windows & Linux system hardening to CIS-style baseline standards',
      'Firewall rules, intrusion prevention and secure remote access setup',
      'Performance tuning, backup strategy and disaster-recovery planning',
    ],
  },
]

export default function About() {
  return (
    <div className="pt-36 md:pt-44">
      {/* header */}
      <section className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/3 h-[380px] w-[380px] rounded-full bg-neon-cyan/10 blur-[130px]" />
        <p className="section-tag">operator_profile // dt_01</p>
        <h1 className="mt-4 font-display text-3xl font-black uppercase tracking-wide text-white sm:text-5xl">
          About <span className="text-neon-cyan text-glow-cyan">Me</span>
        </h1>
        <div className="mt-4 h-px w-28 bg-gradient-to-r from-neon-cyan to-transparent" />
      </section>

      {/* bio */}
      <section className="mx-auto mt-12 grid max-w-7xl gap-10 px-5 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <div className="cyber-card rounded-md p-8">
            <pre className="mb-6 overflow-x-auto font-mono text-xs leading-6 text-slate-500">
<code><span className="text-emerald-400">$</span> cat /etc/cyberdt/identity.conf</code>
            </pre>
            <p className="text-base leading-relaxed text-slate-300">
              I'm <span className="font-semibold text-white">Darshitha Theekshana</span> — operating
              as <span className="text-neon-cyan font-semibold">CYBER DT</span>, a white hat ethical
              hacker and cyber security specialist based in <span className="text-white">Sri Lanka</span>.
              My mission is simple: find every weakness in a system before someone malicious does.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Over the years I've worked across the full tech ecosystem — running authorized
              penetration tests, dissecting malware, rescuing infected smartphones, and hardening
              desktops and servers so they stay secure under real-world pressure. I don't just fix
              symptoms; I trace root causes and rebuild defenses that last.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Beyond client work, I share what I know on my YouTube channel{' '}
              <a
                href="https://www.youtube.com/@dtcybersl1"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-red-400 underline decoration-red-400/40 underline-offset-4 hover:text-red-300"
              >
                @dtcybersl1
              </a>{' '}
              — tutorials, tool breakdowns and practical security tips for everyday users.
              Every system I touch follows one rule:{' '}
              <span className="text-neon-green">stay legal, stay ethical, stay protected.</span>
            </p>
          </div>
        </div>

        {/* skills panel */}
        <div className="lg:col-span-2">
          <div className="cyber-card h-full rounded-md p-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-neon-green">// capability_matrix</h3>
            <ul className="mt-7 space-y-7">
              {SKILLS.map(({ label, value }) => (
                <li key={label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-mono text-xs text-neon-cyan">{value}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-emerald-400 shadow-[0_0_10px_rgba(0,242,254,0.6)] transition-all duration-1000"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-slate-800 pt-6 font-mono text-[11px] leading-5 uppercase tracking-widest text-slate-500">
              <p><span className="text-neon-green">▸</span> white_hat only — authorized targets</p>
              <p className="mt-1"><span className="text-neon-green">▸</span> confidentiality guaranteed</p>
              <p className="mt-1"><span className="text-neon-green">▸</span> remote + onsite (sri lanka)</p>
            </div>
          </div>
        </div>
      </section>

      {/* expertise pillars */}
      <section className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
        <p className="section-tag">core_expertise // deep_dive</p>
        <h2 className="mt-3 font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
          Technical <span className="text-neon-cyan text-glow-cyan">Expertise</span>
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, code, title, points }) => (
            <article
              key={title}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
              className="cyber-card group rounded-md p-7"
            >
              <div className="flex items-start justify-between">
                <span className="inline-grid h-12 w-12 place-items-center rounded-sm border border-neon-cyan/30 bg-panel text-neon-cyan transition-shadow duration-300 group-hover:shadow-glow-cyan">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-mono text-3xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-neon-cyan/30">
                  {code}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-bold uppercase tracking-[0.12em] text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-green" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* philosophy band */}
        <div className="cyber-card relative mt-14 overflow-hidden rounded-md p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-y-0 w-1/3 animate-scanline bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent" />
          <blockquote className="relative text-center">
            <p className="font-display text-lg font-bold uppercase tracking-[0.15em] text-white sm:text-xl">
              "The weakest link is never the firewall — it's the assumption that you're safe."
            </p>
            <footer className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-neon-green">
              — darshitha theekshana / cyber dt
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  )
}
