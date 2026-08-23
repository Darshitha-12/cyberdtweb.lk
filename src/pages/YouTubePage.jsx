import { useState } from 'react'
import { YoutubeIcon, PlayIcon, TerminalIcon, ShieldIcon, SmartphoneIcon, ArrowRightIcon } from '../components/Icons.jsx'
import { YOUTUBE_URL, YOUTUBE_SUBSCRIBE_URL } from '../config.js'
import { VIDEOS, FEATURED_VIDEO_ID, thumbUrl, embedUrl, watchUrl } from '../data/videos.js'

const CONTENT_PILLARS = [
  { icon: TerminalIcon, title: 'Hacking Tutorials', desc: 'Step-by-step ethical hacking walkthroughs — from recon to reporting, always legal & authorized.', tag: 'tutorials' },
  { icon: ShieldIcon, title: 'Security Tips', desc: 'Practical defenses for everyday users: passwords, 2FA, phishing awareness and privacy lockdowns.', tag: 'defense' },
  { icon: SmartphoneIcon, title: 'Device Fixes', desc: 'Android/iOS rescue missions — malware cleanup, speed recovery and OS optimization on real devices.', tag: 'mobile' },
]

export default function YouTubePage() {
  const [selectedId, setSelectedId] = useState(FEATURED_VIDEO_ID)
  const [playerKey, setPlayerKey] = useState(0)

  const selected = VIDEOS.find((v) => v.id === selectedId) || VIDEOS[0]

  const play = (id) => {
    setSelectedId(id)
    setPlayerKey((k) => k + 1)
    document.getElementById('yt-player')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pt-36 md:pt-44">
      {/* header */}
      <section className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-[380px] w-[380px] rounded-full bg-red-600/10 blur-[130px]" />
        <p className="section-tag">broadcast_channel // @dtcybersl1</p>
        <h1 className="mt-4 font-display text-3xl font-black uppercase tracking-wide text-white sm:text-5xl">
          YouTube <span className="text-neon-red drop-shadow-[0_0_18px_rgba(255,0,51,0.5)]">Channel</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
          Real uploads from the CYBER DT channel — ethical hacking labs, WhatsApp/Android tricks,
          security breakdowns and device rescue sessions.
        </p>
        <div className="mt-4 h-px w-28 bg-gradient-to-r from-neon-red to-transparent" />
      </section>

      {/* player + subscribe card */}
      <section id="yt-player" className="mx-auto mt-12 max-w-7xl scroll-mt-32 px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="cyber-card group overflow-hidden rounded-md">
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  key={playerKey}
                  src={embedUrl(selected.id)}
                  title={selected.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-black/30 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold tracking-wide text-white">{selected.title}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                    {selected.views} · {selected.age} · {selected.duration}
                  </p>
                </div>
                <a
                  href={watchUrl(selected.id)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-red-400 transition-colors hover:text-red-300"
                >
                  watch_on_youtube <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* channel card */}
          <div className="lg:col-span-2">
            <div className="cyber-card h-full rounded-md p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-sm bg-gradient-to-br from-red-600 to-red-800 text-white shadow-[0_0_25px_rgba(255,0,51,0.4)]">
                  <YoutubeIcon className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">CYBER DT</h2>
                  <p className="font-mono text-xs text-slate-500">@dtcybersl1 · sri lanka 🇱🇰</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-400">
                Ethical hacking tutorials, cybersecurity breakdowns, mobile diagnostics and system
                hardening guides — explained in a way anyone can follow.
              </p>

              <ul className="mt-5 space-y-2 border-t border-slate-800 pt-5 font-mono text-xs text-slate-500">
                <li><span className="text-neon-green">▸</span> weekly uploads</li>
                <li><span className="text-neon-green">▸</span> real device teardowns</li>
                <li><span className="text-neon-green">▸</span> beginner friendly + pro depth</li>
              </ul>

              <a href={YOUTUBE_SUBSCRIBE_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-sm bg-gradient-to-r from-red-600 to-red-700 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_25px_rgba(255,0,51,0.45)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(255,0,51,0.75)]">
                <YoutubeIcon className="h-5 w-5" />
                Subscribe To Cyber DT
              </a>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
                one click — zero risk, all knowledge
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* video library */}
      <section className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-tag">video_archive // click_to_play</p>
            <h2 className="mt-3 font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
              Latest <span className="text-neon-cyan text-glow-cyan">Uploads</span>
            </h2>
          </div>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-neon-red sm:inline-flex"
          >
            view_all_on_youtube <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video) => {
            const active = video.id === selectedId
            return (
              <article
                key={video.id}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                }}
                onClick={() => play(video.id)}
                className={`cyber-card group cursor-pointer overflow-hidden rounded-md ${
                  active ? '!border-neon-red/70 shadow-[0_0_0_1px_rgba(255,0,51,0.35),0_10px_45px_rgba(255,0,51,0.15)]' : ''
                }`}
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={thumbUrl(video.id)}
                    alt={video.title}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {active && (
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-sm bg-red-600/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> now_playing
                    </span>
                  )}
                  {video.tag === 'popular' && !active && (
                    <span className="absolute left-3 top-3 rounded-sm bg-yellow-500/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-black">
                      ★ trending
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 rounded-sm bg-black/85 px-2 py-1 font-mono text-[11px] font-medium text-emerald-400 backdrop-blur-sm">
                    {video.duration}
                  </span>

                  {/* hover play overlay */}
                  <span className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-red-500/60 bg-black/60 text-red-500 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <PlayIcon className="ml-1 h-6 w-6" />
                    </span>
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 min-h-[2.6rem] text-sm font-semibold leading-snug text-slate-200 transition-colors duration-300 group-hover:text-neon-cyan">
                    {video.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    <span>{video.views} · {video.age}</span>
                    <span className="text-red-400/70 transition-colors group-hover:text-red-400">#{video.tag}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href={YOUTUBE_URL + '/videos'}
            target="_blank"
            rel="noreferrer"
            className="btn-outline !border-neon-red/50 !text-red-400 hover:!bg-red-500/10 hover:!shadow-[0_0_26px_rgba(255,0,51,0.25)]"
          >
            <YoutubeIcon className="h-5 w-5" />
            Browse All Videos On YouTube
          </a>
        </div>
      </section>

      {/* content pillars */}
      <section className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
        <p className="section-tag">content_feed // what_you_will_learn</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {CONTENT_PILLARS.map(({ icon: Icon, title, desc, tag }) => (
            <a
              key={title}
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
              className="cyber-card group block rounded-md p-7"
            >
              <div className="flex items-center justify-between">
                <span className="inline-grid h-11 w-11 place-items-center rounded-sm border border-red-500/30 bg-panel text-red-400 transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(255,0,51,0.3)]">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600 group-hover:text-red-400/70">
                  #{tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover:text-red-300">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                watch_now <ArrowRightIcon className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
