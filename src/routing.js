/**
 * URL routing for the SPA.
 *
 * The site stays a single-page app (no reloads when navigating), but every
 * route now has a real, crawlable URL:
 *
 *   /            -> home
 *   /about/      -> about
 *   /services/   -> services
 *   /youtube/    -> youtube
 *   /contact/    -> contact
 *
 * The base path is detected at runtime so the exact same build works both on
 * the GitHub Pages project URL (/cyberdtweb.lk/) and on a custom domain root.
 */

import { ROUTES } from './seo/site.data.js'

export const PAGE_KEYS = ROUTES.map((r) => r.key)

const SLUG_TO_KEY = Object.fromEntries(ROUTES.map((r) => [r.slug, r.key]))
const KEY_TO_SLUG = Object.fromEntries(ROUTES.map((r) => [r.key, r.slug]))

/** The part of the path that belongs to the deployment (e.g. "/cyberdtweb.lk/"). */
export function basePath(pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  const segments = pathname.split('/').filter(Boolean)

  for (let i = 0; i < segments.length; i += 1) {
    if (SLUG_TO_KEY[segments[i]] !== undefined) {
      const prefix = segments.slice(0, i).join('/')
      return prefix ? `/${prefix}/` : '/'
    }
  }

  return segments.length ? `/${segments.join('/')}/` : '/'
}

/** Which SPA page does this URL represent? */
export function pageFromPath(pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  const segments = pathname.split('/').filter(Boolean)

  for (let i = segments.length - 1; i >= 0; i -= 1) {
    const key = SLUG_TO_KEY[segments[i]]
    if (key !== undefined && key !== 'home') return key
  }

  return 'home'
}

/** Canonical href for a page (absolute path, includes the deployment base). */
export function pageHref(page, pathname) {
  const slug = KEY_TO_SLUG[page] ?? ''
  const base = basePath(pathname)
  return slug ? `${base}${slug}/` : base
}
