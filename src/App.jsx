import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import ParticleBackground from './components/ParticleBackground.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import YouTubePage from './pages/YouTubePage.jsx'
import Contact from './pages/Contact.jsx'

export const PAGES = ['home', 'about', 'services', 'youtube', 'contact']

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (target) => {
    setPage(target)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  useEffect(() => {
    document.title =
      page === 'home'
        ? 'CYBER DT | Darshitha Theekshana — White Hat Ethical Hacker'
        : `CYBER DT | ${PAGES.find((p) => p === page)[0].toUpperCase() + page.slice(1)}`
  }, [page])

  return (
    <div className="relative min-h-screen bg-void">
      <ParticleBackground />

      {/* subtle grid overlay */}
      <div className="pointer-events-none fixed inset-0 grid-overlay-bg z-0" aria-hidden="true" />

      <Navbar active={page} navigate={navigate} />

      {/* keyed container => remount animation on every tab switch, no reload */}
      <main key={page} className="relative z-10 animate-pageIn">
        {page === 'home' && <Home navigate={navigate} />}
        {page === 'about' && <About />}
        {page === 'services' && <Services navigate={navigate} />}
        {page === 'youtube' && <YouTubePage />}
        {page === 'contact' && <Contact />}
      </main>

      <Footer navigate={navigate} />
      <WhatsAppButton />
    </div>
  )
}
