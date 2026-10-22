import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import {
  BRAND,
  FAQ,
  FACEBOOK_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  OG_IMAGE,
  PERSON,
  PERSON_ALIASES,
  PERSON_ID,
  ROLE,
  ROUTES,
  SERVICE_ID,
  SITE_URL,
  WEBSITE_ID,
  YOUTUBE_SUBSCRIBE_URL,
  YOUTUBE_URL,
} from './src/seo/site.data.js'

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const SITE_NAME = 'CYBER DT — Darshitha Theekshana | Ethical Hacker Sri Lanka'

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23080b10'/%3E%3Crect x='1.5' y='1.5' width='61' height='61' rx='12.5' fill='none' stroke='%2322d3ee' stroke-width='3'/%3E%3Ctext x='32' y='41' font-family='Segoe UI,Inter,sans-serif' font-size='22' font-weight='700' fill='%23ffffff' text-anchor='middle'%3EDT%3C/text%3E%3C/svg%3E"

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'

const STATIC_CSS = `
.seo-static{max-width:52rem;margin:0 auto;padding:7rem 1.25rem 4rem;color:#cbd5e1;font-family:'Inter',system-ui,-apple-system,Segoe UI,sans-serif;font-size:1.0625rem;line-height:1.75;background:#080b10}
.seo-static h1{color:#fff;font-family:'Space Grotesk','Inter',system-ui,sans-serif;font-weight:700;font-size:clamp(1.9rem,4vw,2.9rem);line-height:1.15;letter-spacing:-.02em;margin:0 0 1.25rem}
.seo-static h2{color:#fff;font-family:'Space Grotesk','Inter',system-ui,sans-serif;font-weight:600;font-size:clamp(1.3rem,2.5vw,1.7rem);letter-spacing:-.01em;margin:2.5rem 0 .85rem}
.seo-static p{margin:0 0 1.1rem}
.seo-static ul{margin:0 0 1.4rem;padding-left:1.25rem}
.seo-static li{margin-bottom:.6rem}
.seo-static li::marker{color:#22d3ee}
.seo-static .seo-lede{color:#e2e8f0;font-size:1.15rem}
.seo-static a{color:#22d3ee}
.seo-static dl{margin:0 0 1.5rem}
.seo-static dt{color:#fff;font-weight:600;margin-top:1rem}
.seo-static dd{margin:.35rem 0 0}
.seo-static .seo-nav{display:flex;flex-wrap:wrap;gap:.75rem;padding-top:1.5rem;border-top:1px solid #1e293b;margin-top:2.5rem;font-size:.85rem}
.seo-static .seo-nav a{border:1px solid rgba(148,163,184,.28);border-radius:.5rem;padding:.5rem .9rem;text-decoration:none;color:#cbd5e1}
.seo-static .seo-nav a:hover{border-color:rgba(34,211,238,.55);color:#22d3ee}
`.trim()

function pageUrl(route) {
  return route.slug ? `${SITE_URL}/${route.slug}/` : `${SITE_URL}/`
}

function breadcrumb(route) {
  const items = [
    { name: 'Home', item: SITE_URL },
    ...(route.slug
      ? [{ name: route.navLabel, item: pageUrl(route) }]
      : []),
  ]

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}

function jsonLd(route) {
  const graph = [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PERSON,
      alternateName: PERSON_ALIASES,
      jobTitle: ROLE,
      description:
        'White hat ethical hacker, cyber security specialist and mobile & desktop system expert based in Sri Lanka.',
      url: `${SITE_URL}/`,
      image: OG_IMAGE,
      nationality: 'Sri Lankan',
      address: {
        '@type': 'PostalAddress',
        addressLocality: LOCATION,
        addressCountry: 'LK',
      },
      knowsAbout: [
        'Ethical Hacking',
        'Penetration Testing',
        'Cyber Security',
        'Malware Analysis',
        'Digital Forensics',
        'Mobile Device Diagnostics',
        'Windows Hardening',
        'Linux Hardening',
        'Network Security',
      ],
      worksFor: { '@id': SERVICE_ID },
      sameAs: [YOUTUBE_URL, FACEBOOK_URL, LINKEDIN_URL, GITHUB_URL],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: BRAND,
      alternateName: `${BRAND} — ${PERSON}`,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfessionalService',
      '@id': SERVICE_ID,
      name: BRAND,
      description:
        'Ethical hacking, penetration testing, mobile diagnostics, malware removal and PC hardening services by Darshitha Theekshana in Sri Lanka.',
      url: `${SITE_URL}/`,
      image: OG_IMAGE,
      founder: { '@id': PERSON_ID },
      areaServed: [
        { '@type': 'Country', name: 'Sri Lanka' },
        { '@type': 'Place', name: 'Worldwide (remote)' },
      ],
      serviceType: [
        'Ethical Hacking',
        'Penetration Testing',
        'Mobile Diagnostics',
        'PC System Hardening',
        'Malware Removal',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl(route)}#webpage`,
      url: pageUrl(route),
      name: route.title,
      description: route.description,
      inLanguage: 'en',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      primaryImageOfPage: OG_IMAGE,
      breadcrumb: breadcrumb(route),
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl(route)}#faq`,
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

function staticBody(route) {
  const parts = []

  parts.push(`<h1>${esc(route.h1)}</h1>`)
  parts.push(`<p class="seo-lede">${esc(route.lede)}</p>`)

  for (const section of route.sections) {
    parts.push(`<h2>${esc(section.h2)}</h2>`)
    for (const paragraph of section.paragraphs ?? []) {
      parts.push(`<p>${esc(paragraph)}</p>`)
    }
    if (section.list?.length) {
      parts.push('<ul>')
      for (const item of section.list) {
        parts.push(`<li>${esc(item)}</li>`)
      }
      parts.push('</ul>')
    }
  }

  if (route.key === 'home') {
    parts.push('<h2>Frequently asked questions about CYBER DT</h2>')
    parts.push('<dl>')
    for (const item of FAQ) {
      parts.push(`<dt>${esc(item.q)}</dt>`)
      parts.push(`<dd>${esc(item.a)}</dd>`)
    }
    parts.push('</dl>')
  }

  parts.push('<nav class="seo-nav" aria-label="CYBER DT pages">')
  for (const other of ROUTES) {
    const href = other.slug ? `/${other.slug}/` : '/'
    parts.push(`<a href="${esc(href)}">${esc(other.navLabel)}</a>`)
  }
  parts.push(
    `<a href="${esc(YOUTUBE_URL)}" rel="noopener">YouTube @dtcybersl1</a>`,
    `<a href="${esc(FACEBOOK_URL)}" rel="noopener">Facebook</a>`,
    `<a href="${esc(LINKEDIN_URL)}" rel="noopener">LinkedIn</a>`,
    `<a href="${esc(GITHUB_URL)}" rel="noopener">GitHub</a>`,
  )
  parts.push('</nav>')

  return parts.join('\n      ')
}

function renderPage(route) {
  const url = pageUrl(route)
  const isHome = route.key === 'home'

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#080b10" />
    <!-- Generated by vite-plugin-seo-pages.mjs - edit src/seo/site.data.js instead. -->

    <title>${esc(route.title)}</title>
    <meta name="description" content="${esc(route.description)}" />
    <meta name="keywords" content="${esc(route.keywords)}" />
    <meta name="author" content="${esc(PERSON)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${esc(url)}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(BRAND)}" />
    <meta property="og:title" content="${esc(route.title)}" />
    <meta property="og:description" content="${esc(route.description)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(OG_IMAGE)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(`${BRAND} — ${PERSON}, ${ROLE} in ${LOCATION}`)}" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(route.title)}" />
    <meta name="twitter:description" content="${esc(route.description)}" />
    <meta name="twitter:image" content="${esc(OG_IMAGE)}" />
    <meta name="twitter:image:alt" content="${esc(`${BRAND} — ${PERSON}, ${ROLE}`)}" />

    <link rel="icon" href="${FAVICON}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="${FONT_HREF}"
      rel="stylesheet"
    />
    <link rel="alternate" type="application/rss+xml" title="${esc(`${BRAND} — YouTube`)}" href="${esc(YOUTUBE_SUBSCRIBE_URL)}" />

    <style>${STATIC_CSS}</style>

    <script type="application/ld+json">
      ${JSON.stringify(jsonLd(route), null, 2)}
    </script>
  </head>
  <body>
    <div id="root">
      <div class="seo-static">
      ${staticBody(route)}
      </div>
    </div>
    <noscript>
      <h1>${esc(route.h1)}</h1>
      <p>${esc(route.lede)}</p>
      <p>
        <a href="${esc(SITE_URL)}/">CYBER DT home</a> ·
        <a href="${esc(`${SITE_URL}/about/`)}">About Me</a> ·
        <a href="${esc(`${SITE_URL}/services/`)}">Services</a> ·
        <a href="${esc(`${SITE_URL}/youtube/`)}">YouTube Channel</a> ·
        <a href="${esc(`${SITE_URL}/contact/`)}">Contact</a> ·
        <a href="${esc(YOUTUBE_URL)}">YouTube @dtcybersl1</a> ·
        <a href="${esc(FACEBOOK_URL)}">Facebook</a> ·
        <a href="${esc(LINKEDIN_URL)}">LinkedIn</a> ·
        <a href="${esc(GITHUB_URL)}">GitHub</a>
      </p>
      <p>${esc(`JavaScript is required for the full interactive experience of ${SITE_NAME}.`)}</p>
    </noscript>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
}

/* ------------------------------------------------------------------ */
/* vite plugin                                                         */
/* ------------------------------------------------------------------ */

export function seoPages() {
  return {
    name: 'cyberdt-seo-pages',
    enforce: 'pre',

    config() {
      const input = {}
      for (const route of ROUTES) {
        input[route.key] = route.slug ? `${route.slug}/index.html` : 'index.html'
      }

      return {
        build: {
          rollupOptions: { input },
        },
      }
    },

    configResolved(config) {
      for (const route of ROUTES) {
        const file = resolve(config.root, route.slug ? `${route.slug}/index.html` : 'index.html')
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, renderPage(route), 'utf8')
      }
    },
  }
}

export default seoPages
