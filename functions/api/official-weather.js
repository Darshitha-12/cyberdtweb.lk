const SOURCE = 'https://www.meteo.gov.lk/content.json'
const BASE = 'https://www.meteo.gov.lk/'

const ADVISORY_LABELS = {
  tsunami_pdf: 'සුනාමි අවවාදාත්මක නිවේදනය',
  land_pdf: 'ගොඩබඳ ප්‍රදේශ සඳහා අවවාදාත්මක නිවේදනය',
  lighting_pdf: 'අකුණු සම්බන්ධ අවවාදාත්මක නිවේදනය',
  sea_pdf: 'මුහුදු ප්‍රදේශ සඳහා අවවාදාත්මක නිවේදනය',
  heat_pdf: 'තාප තරංග අවවාදාත්මක නිවේදනය',
}

const REPORT_LABELS = {
  twentyfour_pdf: 'පැය 24 කාලගුණ සාරාංශය',
  weekly_pdf: 'සතියේ කාලගුණ අනාවැකිය',
  agromet_pdf: 'කෘෂිකාර්මික කාලගුණ අනාවැකිය',
  drought_pdf: 'නියං තත්ත්ව වාර්තාව',
  national_pdf: 'ජාතික කාලගුණ වාර්තාව',
}

function absoluteUrl(path, stamp) {
  if (!path) return null
  if (/^https?:\/\//i.test(path)) return path
  return BASE + path.replace(/^\/+/, '') + (stamp ? `?t=${stamp}` : '')
}

function paragraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/[ \t]+/g, ' ').replace(/\s+$/g, '').trim())
    .filter(Boolean)
}

// The department publishes one string with the Sinhala bulletin first and the
// English translation after the "WEATHER FORECAST FOR ..." heading.
function splitBulletin(raw) {
  if (!raw) return null
  const text = raw.replace(/\r\n/g, '\n').replace(/\u00a0/g, ' ').trim()
  const englishAt = text.search(/\n\s*WEATHER FORECAST FOR/i)
  const sinhala = englishAt === -1 ? text : text.slice(0, englishAt)
  const english = englishAt === -1 ? '' : text.slice(englishAt)

  const lines = sinhala
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  return {
    title: lines[0] || '',
    issued: lines[1] || '',
    si: paragraphs(lines.slice(2).join('\n\n').replace(/\n{2,}/g, '\n\n') || sinhala),
    en: paragraphs(english),
  }
}

function collectLinks(obj, labels, stamp) {
  if (!obj || typeof obj !== 'object') return []
  return Object.keys(labels)
    .map((key) => {
      const url = absoluteUrl(typeof obj[key] === 'string' ? obj[key] : '', stamp)
      if (!url) return null
      return { key, label: labels[key], url }
    })
    .filter(Boolean)
}

async function loadOfficial() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12000)
  try {
    const res = await fetch(SOURCE, {
      signal: controller.signal,
      headers: {
        accept: 'application/json',
        'user-agent': 'cyberdt-weather/1.0 (+https://cyberdt.pages.dev)',
      },
      cf: { cacheTtl: 120, cacheEverything: true },
    })
    if (!res.ok) throw new Error(`meteo.gov.lk responded ${res.status}`)
    const json = await res.json()
    const stamp = Date.now()

    return {
      ok: true,
      source: 'meteo.gov.lk',
      sourceUrl: BASE,
      fetchedAt: new Date(stamp).toISOString(),
      land: splitBulletin(json.public_weather_forecast),
      sea: splitBulletin(json.sea_weather_forecast),
      fleet: splitBulletin(json.fleet_shipping_forecast),
      advisories: collectLinks(json.severe_weather_advisory, ADVISORY_LABELS, stamp),
      reports: collectLinks(json.weather_data, REPORT_LABELS, stamp),
    }
  } finally {
    clearTimeout(timer)
  }
}

export async function onRequestGet() {
  try {
    const payload = await loadOfficial()
    return new Response(JSON.stringify(payload), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        // Short edge cache: the department updates a few times per day, and a
        // 2 minute window keeps the site fresh without hammering their server.
        'cache-control': 'public, max-age=120, s-maxage=120',
        'access-control-allow-origin': '*',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, error: String(error && error.message ? error.message : error) }),
      {
        status: 502,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store',
          'access-control-allow-origin': '*',
        },
      }
    )
  }
}
