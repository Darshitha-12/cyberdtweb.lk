import { useState } from 'react'
import {
  MailIcon,
  MapPinIcon,
  WhatsappIcon,
  YoutubeIcon,
  FacebookIcon,
  LinkedinIcon,
  SendIcon,
  CheckIcon,
  ClockIcon,
  ShieldIcon,
} from '../components/Icons.jsx'
import ProtectedContact from '../components/ProtectedContact.jsx'
import {
  EMAIL,
  PHONE_DISPLAY,
  WHATSAPP_URL,
  YOUTUBE_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  FORM_ENDPOINT,
  MASKED_EMAIL,
  MASKED_PHONE,
  mailtoHref,
} from '../config.js'

const INITIAL = { name: '', email: '', subject: '', message: '', _honey: '' }

const SOCIALS = [
  { href: WHATSAPP_URL, label: 'WhatsApp', Icon: WhatsappIcon, ring: 'hover:border-emerald-400/60 hover:text-emerald-400' },
  { href: YOUTUBE_URL, label: 'YouTube', Icon: YoutubeIcon, ring: 'hover:border-red-400/60 hover:text-red-400' },
  { href: FACEBOOK_URL, label: 'Facebook', Icon: FacebookIcon, ring: 'hover:border-sky-400/60 hover:text-sky-400' },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedinIcon, ring: 'hover:border-cyan-400/60 hover:text-cyan-400' },
  { href: `mailto:${EMAIL}`, label: 'Email', Icon: MailIcon, ring: 'hover:border-cyan-400/60 hover:text-cyan-400' },
]

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
    <div className="pt-32 md:pt-40">
      {/* header */}
      <section className="relative mx-auto max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">Contact</p>
        <h1 className="page-title mt-4">Get in touch</h1>
        <p className="page-lede mt-5">
          System compromised? Device acting strange? Need a security audit? Open a secure channel
          below — every message is treated as confidential. Direct email and phone identifiers are
          privacy-shielded; use the reveal button or send a message through the form.
        </p>
      </section>

      {/* info cards */}
      <section className="mx-auto mt-12 max-w-6xl px-5 lg:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          <ProtectedContact
            icon={MailIcon}
            label="Email"
            masked={MASKED_EMAIL}
            value={EMAIL}
            href={`mailto:${EMAIL}`}
            accent="text-cyan-400"
          />
          <ProtectedContact
            icon={WhatsappIcon}
            label="WhatsApp"
            masked={MASKED_PHONE}
            value={PHONE_DISPLAY}
            href={WHATSAPP_URL}
            external
            accent="text-emerald-400"
          />
          <div className="cyber-card flex items-center gap-4 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-slate-800 bg-slate-900/50 text-cyan-400">
              <MapPinIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Location
              </span>
              <span className="mt-1.5 block truncate text-sm font-semibold text-white">
                Sri Lanka — Remote worldwide
              </span>
            </span>
          </div>
        </div>

        {/* response promise */}
        <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-slate-800/80 bg-slate-900/30 px-6 py-4 text-sm text-slate-300">
          <li className="flex items-center gap-2.5">
            <ClockIcon className="h-4 w-4 text-cyan-400" />
            Average response under 24 hours
          </li>
          <li className="flex items-center gap-2.5">
            <ShieldIcon className="h-4 w-4 text-emerald-400" />
            NDA-friendly engagements
          </li>
          <li className="flex items-center gap-2.5">
            <CheckIcon className="h-4 w-4 text-emerald-400" />
            Free first assessment
          </li>
        </ul>
      </section>

      {/* form */}
      <section className="mx-auto mt-14 max-w-6xl px-5 pb-4 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* side panel */}
          <div className="lg:col-span-2">
            <div className="cyber-card h-full p-8">
              <h2 className="font-display text-base font-semibold text-white">Before you write</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  Describe your issue as precisely as possible — device model, symptoms, timeline.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  For urgent incidents, WhatsApp is the fastest route to my desk.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  All penetration testing is performed strictly against systems you own or are
                  authorized to test.
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-800/80 pt-6">
                {SOCIALS.map(({ href, label, Icon, ring }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className={`no-underline grid h-11 w-11 place-items-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 transition-colors duration-200 ${ring}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* the form */}
          <div className="lg:col-span-3">
            <form onSubmit={onSubmit} className="cyber-card p-8">
              <h2 className="font-display text-base font-semibold text-white">Send a message</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium text-slate-400">
                    Full name *
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
                  <label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-400">
                    Email address *
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
                <label htmlFor="subject" className="mb-2 block text-xs font-medium text-slate-400">
                  Subject *
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
                <label htmlFor="message" className="mb-2 block text-xs font-medium text-slate-400">
                  Message *
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
              <input
                type="text"
                name="_honey"
                value={form._honey}
                onChange={update('_honey')}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#04121a]/30 border-t-[#04121a]" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <SendIcon className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm text-emerald-400">
                    <CheckIcon className="h-4 w-4" />
                    Message received — I’ll reply within 24 hours.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-amber-400">
                    Direct sending failed — your mail client was opened as a fallback.
                  </p>
                )}
              </div>

              <p className="mt-6 border-t border-slate-800/80 pt-5 text-xs leading-5 text-slate-500">
                Messages are delivered straight to the CYBER DT inbox. Nothing is shared with third
                parties.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
