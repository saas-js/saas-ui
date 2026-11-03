import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const websiteRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const examplesDir = join(websiteRoot, '../compositions/src/examples')
const outFile = join(websiteRoot, 'lib/generated/example-sources.json')

const files = await readdir(examplesDir, { recursive: true })
const sources = {}

for (const file of files) {
  const key = file.replaceAll('\\', '/')
  if (!/\.(tsx|ts|jsx|js)$/.test(key)) continue
  sources[key] = await readFile(join(examplesDir, key), 'utf8')
}

await mkdir(dirname(outFile), { recursive: true })
await writeFile(outFile, `${JSON.stringify(sources)}\n`)
console.log(
  `Wrote ${Object.keys(sources).length} example sources to ${outFile}`,
)
