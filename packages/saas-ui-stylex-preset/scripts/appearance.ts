#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, extname, resolve } from 'node:path'
import { parseArgs } from 'node:util'

import prettier, { type Options } from 'prettier'

import {
  type AppearanceFormat,
  type AppearanceThemeInput,
  createAppearanceArtifact,
  createAppearanceCss,
} from '../src/create-appearance.ts'

const HELP = `Generate a StyleX appearance theme from OKLCH seeds.

Usage:
  pnpm --filter @saas-ui/stylex-preset appearance -- [options]

Options:
  --name <id>              Export / class name (default: appearance)
  --in <file>              JSON AppearanceOptions (+ optional name)
  --out <file>             Write the artifact instead of printing it
  --format <css|stylex>    css writes seed CSS variables, stylex writes createTheme
  --selector <css>         CSS selector (css format only)
  --base <h,c>             Base hue and chroma, e.g. 260,0.012
  --base-contrast <level>  soft | normal | strong
  --accent <l,c,h>         Accent OKLCH, e.g. 0.511,0.262,276.966
  --accent-foreground <t>  light | dark
  --sidebar <h,c>          Tonal sidebar hue and chroma
  --sidebar-contrast <l>   soft | normal | strong
  --sidebar-solid <l,c,h>  Solid sidebar OKLCH
  --sidebar-foreground <t> light | dark
  --help                   Show this message

css is the runtime contract: set --sui-base / --sui-accent and let the
browser resolve the rest. stylex bakes createAppearance() into a static
createTheme() file for compile-time overrides.
`

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

function parsePair(value: string, label: string) {
  const parts = value.split(',').map((part) => Number(part.trim()))
  if (parts.length !== 2 || parts.some((part) => Number.isNaN(part))) {
    fail(`Expected ${label} as h,c`)
  }
  return { h: parts[0]!, c: parts[1]! }
}

function parseTriple(value: string, label: string) {
  const parts = value.split(',').map((part) => Number(part.trim()))
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    fail(`Expected ${label} as l,c,h`)
  }
  return { l: parts[0]!, c: parts[1]!, h: parts[2]! }
}

function isFormat(value: string): value is AppearanceFormat {
  return value === 'css' || value === 'stylex'
}

function inferFormat(out: string | undefined, format: string | undefined) {
  if (format) {
    if (!isFormat(format)) fail(`Unknown format: ${format}`)
    return format
  }
  if (out?.endsWith('.stylex.ts') || out?.endsWith('.ts')) return 'stylex'
  return 'css'
}

async function readInput(path: string): Promise<AppearanceThemeInput> {
  const source = await readFile(resolve(path), 'utf8')
  return JSON.parse(source) as AppearanceThemeInput
}

async function formatArtifact(code: string, format: AppearanceFormat) {
  return prettier.format(code, {
    parser: format === 'stylex' ? 'typescript' : 'css',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
  } as Options)
}

const { values } = parseArgs({
  args: process.argv.slice(2).filter((arg) => arg !== '--'),
  options: {
    name: { type: 'string' },
    in: { type: 'string' },
    out: { type: 'string' },
    format: { type: 'string' },
    selector: { type: 'string' },
    base: { type: 'string' },
    'base-contrast': { type: 'string' },
    accent: { type: 'string' },
    'accent-foreground': { type: 'string' },
    sidebar: { type: 'string' },
    'sidebar-contrast': { type: 'string' },
    'sidebar-solid': { type: 'string' },
    'sidebar-foreground': { type: 'string' },
    help: { type: 'boolean', default: false },
  },
  allowPositionals: false,
})

if (values.help) {
  console.log(HELP)
  process.exit(0)
}

const fileInput = values.in ? await readInput(values.in) : {}
const format = inferFormat(values.out, values.format)
const input: AppearanceThemeInput = {
  ...fileInput,
  name: values.name ?? fileInput.name,
}

if (values.base || values['base-contrast'] || fileInput.base) {
  input.base = {
    ...fileInput.base,
    ...(values.base ? parsePair(values.base, '--base') : {}),
    ...(values['base-contrast']
      ? { contrast: values['base-contrast'] as 'soft' | 'normal' | 'strong' }
      : {}),
  }
}

if (values.accent || values['accent-foreground'] || fileInput.accent) {
  input.accent = {
    foreground: 'light',
    ...fileInput.accent,
    ...(values.accent ? parseTriple(values.accent, '--accent') : {}),
    ...(values['accent-foreground']
      ? {
          foreground: values['accent-foreground'] as 'light' | 'dark',
        }
      : {}),
  }
}

if (values['sidebar-solid']) {
  input.sidebar = {
    solid: parseTriple(values['sidebar-solid'], '--sidebar-solid'),
    foreground:
      (values['sidebar-foreground'] as 'light' | 'dark' | undefined) ??
      'light',
  }
} else if (values.sidebar || values['sidebar-contrast']) {
  input.sidebar = {
    ...(typeof fileInput.sidebar === 'object' ? fileInput.sidebar : {}),
    ...(values.sidebar ? parsePair(values.sidebar, '--sidebar') : {}),
    ...(values['sidebar-contrast']
      ? {
          contrast: values['sidebar-contrast'] as 'soft' | 'normal' | 'strong',
        }
      : {}),
  }
}

const artifact =
  format === 'css'
    ? createAppearanceCss(input, { selector: values.selector })
    : createAppearanceArtifact(input, format)
const output = await formatArtifact(artifact, format)

if (values.out) {
  const destination = resolve(values.out)
  if (format === 'stylex' && extname(destination) === '.css') {
    fail('stylex format needs a .ts output file')
  }
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, output)
  console.error(`Wrote ${destination}`)
} else {
  process.stdout.write(output)
}
