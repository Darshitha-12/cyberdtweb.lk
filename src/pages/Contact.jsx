import { useState } from 'react'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  WhatsappIcon,
  YoutubeIcon,
  SendIcon,
  CheckIcon,
  ClockIcon,
  ShieldIcon,
} from '../components/Icons.jsx'
import ProtectedContact from '../components/ProtectedContact.jsx'
import {
  EMAIL,
  WHATSAPP_URL,
  YOUTUBE_URL,
  FORM_ENDPOINT,
  MASKED_EMAIL,
  MASKED_PHONE,
  mailtoHref,
} from '../config.js'

const INITIAL = { name: '', email: '', subject: '', message: '', _honey: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `[CYBER DT Portfolio] ${form.subject || 'New enquiry'}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      // graceful fallback — open the visitor's mail client pre-filled
      window.location.href = mailtoHref(
        form.subject || 'CYBER DT Enquiry',
        `${form.message}\n\n— ${form.name} (${form.email})`,
      )
      setStatus('error')
    }
  }

  return (
    <div className="pt-36 md:pt-44">
      {/* header */}
      <section className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="pointer-events-none absolute -top-24 right-1/3 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[130px]" />
        <p className="section-tag">secure_uplink // encrypted_contact</p>
        <h1 className="mt-4 font-display text-3xl font-black uppercase tracking-wide text-white sm:text-5xl">
          Get In <span className="text-neon-cyan text-glow-cyan">Touch</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
          System compromised? Device acting strange? Need a security audit? Open a secure channel
          below — every message is treated as confidential.{' '}
          <span className="font-mono text-xs tracking-wider text-neon-cyan">
            {'// direct IDs are privacy-shielded — tap the eye to reveal'}
          </span>
        </p>
        <div className="mt-4 h-px w-28 bg-gradient-to-r from-neon-cyan to-transparent" />
      </section>

      {/* info cards */}
      <section className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <ProtectedContact
            icon={MailIcon}
            label="email_channel"
            masked={MASKED_EMAIL}
            value={EMAIL}
            href={`mailto:${EMAIL}`}
            accent="text-neon-cyan"
          />
          <ProtectedContact
            icon={WhatsappIcon}
            label="secure_line / whatsapp"
            masked={MASKED_PHONE}
            value="+94 77 695 4529"
            href={WHATSAPP_URL}
            external
            accent="text-neon-green"
          />
          <div
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
            }}
            className="cyber-card flex items-center gap-4 rounded-md p-6 hover:border-red-500/60"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm border border-slate-700 bg-panel text-red-400">
              <MapPinIcon className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                operating_base
              </span>
              <span className="mt-1 block truncate font-semibold text-white">
                Sri Lanka 🇱🇰 — Remote Worldwide
              </span>
            </span>
          </div>
        </div>

        {/* response promise */}
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-md border border-neon-green/20 bg-panel/50 px-6 py-4 backdrop-blur-md">
          <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-neon-green">
            <ClockIcon className="h-4 w-4" /> avg response &lt; 24h
          </span>
          <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-neon-cyan">
            <ShieldIcon className="h-4 w-4" /> nda-friendly engagements
          </span>
          <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-emerald-300">
            <CheckIcon className="h-4 w-4" /> free first assessment
          </span>
        </div>
      </section>

      {/* form */}
      <section className="mx-auto mt-14 max-w-7xl px-5 pb-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* side panel */}
          <div className="lg:col-span-2">
            <div className="cyber-card h-full rounded-md p-8">
              <pre className="overflow-x-auto font-mono text-[11px] leading-6 text-slate-500">
<code><span className="text-emerald-400">$</span> ./initiate --channel secure
<span className="text-neon-cyan">[ TLS 1.3 ]</span> handshake... ok
<span className="text-neon-cyan">[ AES-256 ]</span> payload encryption ready
<span className="text-emerald-400">▸ awaiting your transmission_</span></code>
              </pre>
              <ul className="mt-7 space-y-4 text-sm leading-relaxed text-slate-400">
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-neon-green" />
                  Describe your issue as precisely as possible — device model, symptoms, timeline.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-neon-green" />
                  For urgent incidents, WhatsApp is the fastest route to my desk.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-neon-green" />
                  All penetration testing is performed strictly against systems you own or are authorized to test.
                </li>
              </ul>

              <div className="mt-8 flex gap-3 border-t border-slate-800 pt-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-11 w-11 place-items-center rounded-sm border border-neon-green/40 bg-panel text-neon-green transition-all duration-300 hover:bg-neon-green hover:text-void hover:shadow-glow-green"
                >
                  <WhatsappIcon className="h-5 w-5" />
                </a>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="grid h-11 w-11 place-items-center rounded-sm border border-red-500/40 bg-panel text-red-400 transition-all duration-300 hover:bg-red-600 hover:text-white"
                >
                  <YoutubeIcon className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Email"
                  className="grid h-11 w-11 place-items-center rounded-sm border border-neon-cyan/40 bg-panel text-neon-cyan transition-all duration-300 hover:bg-neon-cyan hover:text-void hover:shadow-glow-cyan"
                >
                  <MailIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* the form */}
          <div className="lg:col-span-3">
            <form onSubmit={onSubmit} className="cyber-card rounded-md p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                    full_name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={update('name')}
                    placeholder="John Perera"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                    email_address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={120}
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@example.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                  subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  maxLength={140}
                  value={form.subject}
                  onChange={update('subject')}
                  placeholder="e.g. Suspected malware on laptop + phone audit"
                  className="form-input"
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                  message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  maxLength={2000}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Brief me on the situation — what's happening, since when, and what devices are involved..."
                  className="form-input resize-none"
                />
              </div>

              {/* honeypot for bots */}
              <input type="text" name="_honey" value={form._honey} onChange={update('_honey')} className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {status === 'sending' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-void/30 border-t-void" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <SendIcon className="h-4 w-4" />
                      Transmit Message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="flex items-center gap-2 font-mono text-sm text-neon-green text-glow-green">
                    <CheckIcon className="h-4 w-4" /> [ OK ] message received — I'll reply within 24h.
                  </p>
                )}
                {status === 'error' && (
                  <p className="font-mono text-sm text-yellow-400">
                    ⚠ direct uplink failed — opened your mail client as fallback.
                  </p>
                )}
              </div>

              <p className="mt-5 border-t border-slate-800 pt-5 font-mono text-[10px] uppercase leading-5 tracking-[0.2em] text-slate-600">
                transmissions route: <span className="text-slate-400">encrypted → operator inbox</span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
