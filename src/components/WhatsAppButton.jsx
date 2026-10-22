import { useEffect, useState } from 'react'
import { WhatsappIcon } from './Icons.jsx'
import { WHATSAPP_URL } from '../config.js'

export default function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 3000)
    const t2 = setTimeout(() => setShowTip(false), 10000)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [])

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group no-underline fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span
        className={`hidden rounded-lg border border-slate-800 bg-[#080b10]/90 px-3 py-2 text-xs text-slate-300 shadow-lg backdrop-blur-md transition-all duration-500 sm:block ${
          showTip ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-2 opacity-0'
        }`}
      >
        Chat with <span className="text-white">CYBER DT</span>
      </span>

      <span className="relative grid h-14 w-14 place-items-center">
        <span className="absolute inset-0 rounded-full bg-emerald-400/25 animate-pulseRing" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#052e16] shadow-[0_14px_30px_-14px_rgba(37,211,102,0.9)] transition-transform duration-300 group-hover:scale-105">
          <WhatsappIcon className="h-7 w-7" />
        </span>
      </span>
    </a>
  )
}
