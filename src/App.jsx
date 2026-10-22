import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import YouTubePage from './pages/YouTubePage.jsx'
import Contact from './pages/Contact.jsx'
import { pageFromPath, pageHref } from './routing.js'
import { ROUTES } from './seo/site.data.js'

export const PAGES = ROUTES.map((r) => r.key)

const TITLE_BY_PAGE = Object.fromEntries(ROUTES.map((r) => [r.key, r.title]))

export default function App() {
  const [page, setPage] = useState(() => pageFromPath())

  const navigate = useCallback((target) => {
    setPage(target)
    const href = pageHref(target)
    if (window.location.pathname !== href) {
      window.history.pushState({ page: target }, '', href)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  // browser back / forward
  useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // per-route document title + canonical
  useEffect(() => {
    document.title = TITLE_BY_PAGE[page] ?? 'CYBER DT'
    const route = ROUTES.find((r) => r.key === page)
    if (!route) return

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', new URL(pageHref(page), window.location.origin).href)
    }
  }, [page])

  return (
    <div className="relative min-h-screen bg-void">
      {/* subtle grid overlay */}
      <div className="pointer-events-none fixed inset-0 grid-overlay-bg z-0" aria-hidden="true" />

      <Navbar active={page} navigate={navigate} />

      {/* keyed container => remount animation on every tab switch, no reload */}
      <main key={page} className="relative z-10 animate-pageIn">
        {page === 'home' && <Home navigate={navigate} />}
        {page === 'about' && <About navigate={navigate} />}
        {page === 'services' && <Services navigate={navigate} />}
        {page === 'youtube' && <YouTubePage navigate={navigate} />}
        {page === 'contact' && <Contact navigate={navigate} />}
      </main>

      <Footer navigate={navigate} />
      <WhatsAppButton />
    </div>
  )
}
