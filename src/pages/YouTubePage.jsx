import { useState } from 'react'
import { YoutubeIcon, PlayIcon, TerminalIcon, ShieldIcon, SmartphoneIcon, ArrowRightIcon } from '../components/Icons.jsx'
import { YOUTUBE_URL, YOUTUBE_SUBSCRIBE_URL } from '../config.js'
import { VIDEOS, FEATURED_VIDEO_ID, thumbUrl, embedUrl, watchUrl } from '../data/videos.js'

const CONTENT_PILLARS = [
  {
    icon: TerminalIcon,
    title: 'Hacking Tutorials',
    desc: 'Step-by-step ethical hacking walkthroughs — from recon to reporting, always legal and authorized.',
  },
  {
    icon: ShieldIcon,
    title: 'Security Tips',
    desc: 'Practical defences for everyday users: passwords, 2FA, phishing awareness and privacy lockdowns.',
  },
  {
    icon: SmartphoneIcon,
    title: 'Device Fixes',
    desc: 'Android and iOS rescue missions — malware cleanup, speed recovery and OS optimisation on real devices.',
  },
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
    <div className="pt-32 md:pt-40">
      {/* header */}
      <section className="relative mx-auto max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">YouTube · @dtcybersl1</p>
        <h1 className="page-title mt-4">The CYBER DT channel</h1>
        <p className="page-lede mt-5">
          Real uploads from the CYBER DT channel — ethical hacking labs, WhatsApp and Android
          tricks, security breakdowns and device rescue sessions.
        </p>
      </section>

      {/* player + channel card */}
      <section id="yt-player" className="mx-auto mt-12 max-w-6xl scroll-mt-28 px-5 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="cyber-card overflow-hidden">
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
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 px-6 py-4">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-white">
                    {selected.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {selected.views} · {selected.age} · {selected.duration}
                  </p>
                </div>
                <a
                  href={watchUrl(selected.id)}
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline inline-flex shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-wide text-red-400 transition-colors hover:text-red-300"
                >
                  Watch on YouTube
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* channel card */}
          <div className="lg:col-span-2">
            <div className="cyber-card flex h-full flex-col p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#ff0033] text-white">
                  <YoutubeIcon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-semibold text-white">CYBER DT</h2>
                  <p className="mt-0.5 truncate text-sm text-slate-500">@dtcybersl1 · Sri Lanka</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-400">
                Ethical hacking tutorials, cybersecurity breakdowns, mobile diagnostics and system
                hardening guides — explained in a way anyone can follow.
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-slate-800/80 pt-5 text-sm text-slate-400">
                <li>Weekly uploads</li>
                <li>Real device teardowns</li>
                <li>Beginner friendly, professional depth</li>
              </ul>

              <a
                href={YOUTUBE_SUBSCRIBE_URL}
                target="_blank"
                rel="noreferrer"
                className="no-underline mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#ff0033] px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#d40029]"
              >
                <YoutubeIcon className="h-5 w-5" />
                Subscribe to CYBER DT
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* video library */}
      <section className="mx-auto mt-16 max-w-6xl px-5 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Video library</p>
            <h2 className="section-title mt-4">Latest uploads</h2>
          </div>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="no-underline inline-flex shrink-0 items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-red-400"
          >
            View all on YouTube
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video) => {
            const active = video.id === selectedId
            return (
              <article
                key={video.id}
                onClick={() => play(video.id)}
                className={`cyber-card cursor-pointer overflow-hidden ${
                  active ? 'border-cyan-400/50' : ''
                }`}
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={thumbUrl(video.id)}
                    alt={video.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                    className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {active && (
                    <span className="absolute left-3 top-3 rounded-md bg-cyan-500/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#04121a]">
                      Now playing
                    </span>
                  )}
                  {video.tag === 'popular' && !active && (
                    <span className="absolute left-3 top-3 rounded-md bg-amber-400/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-900">
                      Trending
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-[11px] font-medium text-slate-200">
                    {video.duration}
                  </span>

                  <span
                    className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${
                      active ? 'opacity-0' : 'opacity-0 hover:opacity-100'
                    }`}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-red-500/50 bg-black/60 text-red-400">
                      <PlayIcon className="ml-0.5 h-5 w-5" />
                    </span>
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-slate-200">
                    {video.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-500">
                    <span>
                      {video.views} · {video.age}
                    </span>
                    <span className="text-slate-600">#{video.tag}</span>
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
            className="btn-outline no-underline"
          >
            <YoutubeIcon className="h-5 w-5" />
            Browse all videos
          </a>
        </div>
      </section>

      {/* content pillars */}
      <section className="mx-auto mt-20 max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">What you will learn</p>
        <h2 className="section-title mt-4">Content pillars</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CONTENT_PILLARS.map(({ icon: Icon, title, desc }) => (
            <a
              key={title}
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="cyber-card block p-7"
            >
              <span className="inline-grid h-11 w-11 place-items-center rounded-lg border border-red-500/25 bg-slate-900/60 text-red-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold text-white">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-red-400">
                Watch now
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
