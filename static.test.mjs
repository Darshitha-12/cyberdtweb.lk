import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('dist')
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
}

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(ROOT, p)
  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (!fs.existsSync(file)) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('not found')
      return
    }
  } catch {
    res.writeHead(404)
    res.end('not found')
    return
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' })
  res.end(fs.readFileSync(file))
})

await new Promise((r) => server.listen(4173, r))

const ROUTES = ['/', '/about/', '/services/', '/youtube/', '/contact/']
let fail = 0

for (const route of ROUTES) {
  const res = await fetch(`http://localhost:4173${route}`)
  const html = await res.text()
  const assets = [...html.matchAll(/(?:src|href)="([^"]*\.(?:js|css|png))"/g)].map((m) => m[1])
  let ok = res.status === 200
  for (const a of assets) {
    const abs = a.startsWith('http') ? null : new URL(a, `http://localhost:4173${route}`)
    if (!abs) continue
    const r2 = await fetch(abs)
    if (r2.status !== 200) {
      ok = false
      console.log(`   MISSING ${a} (${r2.status}) from ${route}`)
    }
  }
  if (!ok) fail++
  console.log(`${res.status === 200 && ok ? 'PASS' : 'FAIL'}  ${route}  status=${res.status}  assets=${assets.length}`)
}

// 404 behaviour
const nf = await fetch('http://localhost:4173/nope/')
console.log(`${nf.status === 404 ? 'PASS' : 'FAIL'}  /nope/ -> ${nf.status}`)

// static files
for (const f of ['/robots.txt', '/sitemap.xml', '/og-image.png', '/404.html']) {
  const r = await fetch(`http://localhost:4173${f}`)
  if (r.status !== 200) fail++
  console.log(`${r.status === 200 ? 'PASS' : 'FAIL'}  ${f} -> ${r.status}`)
}

// sitemap URL count
const sm = await (await fetch('http://localhost:4173/sitemap.xml')).text()
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
console.log(`sitemap urls (${urls.length}):`)
urls.forEach((u) => console.log('   ' + u))
if (urls.length !== 5) fail++

server.close()
console.log(fail === 0 ? '\nALL STATIC TESTS PASSED' : `\n${fail} FAILURE(S)`)
process.exit(fail === 0 ? 0 : 1)
