import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const websiteRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const typesDir = join(websiteRoot, 'public/types')
const outFile = join(websiteRoot, 'lib/generated/prop-types.json')
const baseDirs = ['ark', 'recipe', 'component', 'static']

const types = {}
let count = 0

for (const baseDir of baseDirs) {
  const dir = join(typesDir, baseDir)
  types[baseDir] = {}
  if (!existsSync(dir)) continue
  for (const file of await readdir(dir)) {
    if (!file.endsWith('.json')) continue
    const name = file.slice(0, -'.json'.length)
    types[baseDir][name] = JSON.parse(await readFile(join(dir, file), 'utf8'))
    count += 1
  }
}

await mkdir(dirname(outFile), { recursive: true })
await writeFile(outFile, `${JSON.stringify(types)}\n`)
console.log(`Wrote ${count} prop-type files to ${outFile}`)
