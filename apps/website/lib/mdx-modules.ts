import fs from 'node:fs'
import path from 'node:path'

export function toMdxId(collection: string, slug: string) {
  return `${collection}__${slug.replace(/[^a-zA-Z0-9]+/g, '_')}`.replace(
    /^_|_$/g,
    '',
  )
}

export function wrapMdxModule(code: string) {
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

export function getMdxDir(cwd: string) {
  return path.join(cwd, 'lib/generated/mdx')
}

export function persistMdxModule(
  cwd: string,
  collection: string,
  slug: string,
  code: string,
) {
  const id = toMdxId(collection, slug)
  const dir = getMdxDir(cwd)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${id}.js`), wrapMdxModule(code))
  return id
}

export function writeMdxRegistry(cwd: string) {
  const dir = getMdxDir(cwd)
  fs.mkdirSync(dir, { recursive: true })
  const files = fs
    .readdirSync(dir)
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
  fs.writeFileSync(path.join(dir, 'registry.js'), source)
  return files.length
}

export function isCompiledMdx(code: unknown): code is string {
  return typeof code === 'string' && code.includes('var Component=')
}
