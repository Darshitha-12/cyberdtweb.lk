import { useEffect, useState } from 'react'
import { WhatsappIcon } from './Icons.jsx'
import { WHATSAPP_URL } from '../config.js'

export default function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 2500)
    const t2 = setTimeout(() => setShowTip(false), 9000)
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
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span
        className={`hidden translate-x-2 rounded-sm border border-neon-green/30 bg-panel/90 px-3 py-2 font-mono text-xs tracking-wider text-neon-green backdrop-blur-md transition-all duration-500 group-hover:translate-x-0 sm:block ${
          showTip ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none'
        }`}
      >
        secure_line : <span className="text-white">online</span>
      </span>

      <span className="relative grid h-14 w-14 place-items-center">
        <span className="absolute inset-0 rounded-full bg-neon-green/40 animate-pulseRing" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#00e676] to-[#00b863] text-white shadow-glow-green transition-transform duration-300 group-hover:scale-110">
          <WhatsappIcon className="h-7 w-7" />
        </span>
      </span>
    </a>
  )
}
