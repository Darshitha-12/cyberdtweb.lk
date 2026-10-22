/**
 * Regenerates public/og-image.png (1200x630) from scripts/og-image.svg.
 *
 *   npm i -D sharp
 *   node scripts/generate-og.mjs
 *
 * The SVG source is committed so the social preview card can be re-rendered
 * at any time without a design tool.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const svgPath = path.join(here, 'og-image.svg')
const outPath = path.join(root, 'public', 'og-image.png')

let sharp
try {
  ;({ default: sharp } = await import('sharp'))
} catch {
  console.error('sharp is not installed — run: npm i -D sharp')
  process.exit(1)
}

const svg = fs.readFileSync(svgPath)

await sharp(svg, { density: 96 })
  .resize(1200, 630, { fit: 'fill' })
  .png({ compressionLevel: 9, palette: false })
  .toFile(outPath)

const { size } = fs.statSync(outPath)
console.log(`og-image.png written — ${(size / 1024).toFixed(1)} kB (1200x630)`)
