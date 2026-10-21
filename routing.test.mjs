import { basePath, pageFromPath, pageHref } from './src/routing.js'

const cases = [
  ['/', 'home', '/'],
  ['/cyberdtweb.lk/', 'home', '/cyberdtweb.lk/'],
  ['/about/', 'about', '/'],
  ['/services/', 'services', '/'],
  ['/youtube/', 'youtube', '/'],
  ['/contact/', 'contact', '/'],
  ['/cyberdtweb.lk/about/', 'about', '/cyberdtweb.lk/'],
  ['/cyberdtweb.lk/services/', 'services', '/cyberdtweb.lk/'],
  ['/cyberdtweb.lk/youtube/', 'youtube', '/cyberdtweb.lk/'],
  ['/cyberdtweb.lk/contact/', 'contact', '/cyberdtweb.lk/'],
  ['/cyberdtweb.lk', 'home', '/cyberdtweb.lk/'],
  ['/some/unknown/path/', 'home', '/some/unknown/path/'],
]

let failed = 0
for (const [path, expectedPage, expectedBase] of cases) {
  const gotPage = pageFromPath(path)
  const gotBase = basePath(path)
  const ok = gotPage === expectedPage && gotBase === expectedBase
  if (!ok) failed += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${path}  page=${gotPage} base=${gotBase}`)
}

console.log('--- hrefs from the project URL ---')
for (const p of ['home', 'about', 'services', 'youtube', 'contact']) {
  console.log(`  ${p} -> ${pageHref(p, '/cyberdtweb.lk/')}`)
}
console.log('--- hrefs from a root domain ---')
for (const p of ['home', 'about', 'services', 'youtube', 'contact']) {
  console.log(`  ${p} -> ${pageHref(p, '/')}`)
}

console.log(failed === 0 ? '\nALL ROUTING TESTS PASSED' : `\n${failed} FAILURES`)
process.exit(failed === 0 ? 0 : 1)
