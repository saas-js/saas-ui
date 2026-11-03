import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const websiteRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

const collections = [
  ['docs', 'allDocs.js'],
  ['sjs-docs', 'allSJSDocs.js'],
  ['blog', 'allBlogs.js'],
  ['changelog', 'allChangelogs.js'],
]

export function toMdxId(collection, slug) {
  return `${collection}__${slug.replace(/[^a-zA-Z0-9]+/g, '_')}`.replace(
    /^_|_$/g,
    '',
  )
}

export function wrapMdxModule(code) {
  return [
    "import * as React from 'react'",
    "import * as ReactDOM from 'react-dom'",
    "import * as _jsx_runtime from 'react/jsx-runtime'",
    '',
    'export default (function (React, ReactDOM, _jsx_runtime) {',
    code,
    '})(React, ReactDOM, _jsx_runtime).default',
    '',
  ].join('\n')
}

export function getMdxDir(cwd) {
  return join(cwd, 'lib/generated/mdx')
}

export function persistMdxModule(cwd, collection, slug, code) {
  const id = toMdxId(collection, slug)
  const dir = getMdxDir(cwd)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${id}.js`), wrapMdxModule(code))
  return id
}

export function writeMdxRegistry(cwd) {
  const dir = getMdxDir(cwd)
  mkdirSync(dir, { recursive: true })
  const files = readdirSync(dir)
    .filter((file) => file.endsWith('.js') && file !== 'registry.js')
    .sort()
  const entries = files.map((file) => {
    const id = file.slice(0, -3)
    return `  ${JSON.stringify(id)}: () => import(${JSON.stringify(`./${file}`)}),`
  })
  const source = [
    '/* generated — do not edit */',
    'export const mdxRegistry = {',
    ...entries,
    '}',
    '',
  ].join('\n')
  writeFileSync(join(dir, 'registry.js'), source)
  return files.length
}

export function isCompiledMdx(code) {
  return typeof code === 'string' && code.includes('var Component=')
}

export async function generateMdxModules(cwd = websiteRoot) {
  const generatedDir = join(cwd, '.content-collections/generated')
  let written = 0

  for (const [collection, file] of collections) {
    const filePath = join(generatedDir, file)
    try {
      const mod = await import(`${pathToFileURL(filePath).href}?t=${Date.now()}`)
      const docs = mod.default ?? []
      for (const doc of docs) {
        if (!doc?.slug || !isCompiledMdx(doc.code)) continue
        persistMdxModule(cwd, collection, doc.slug, doc.code)
        written += 1
      }
    } catch (error) {
      if (error?.code === 'ERR_MODULE_NOT_FOUND') continue
      throw error
    }
  }

  const count = writeMdxRegistry(cwd)
  console.log(
    `MDX modules: wrote ${written} from collections, registry has ${count} entries`,
  )
  return count
}

if (process.argv[1] && process.argv[1].endsWith('generate-mdx-modules.mjs')) {
  await generateMdxModules()
}
