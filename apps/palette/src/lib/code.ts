import {
  type PaletteScale,
  type PaletteTokens,
  createAppearanceCssVars,
} from '@saas-ui/appearance'

import type { GeneratedPalette } from './palette'

export const exportFormats = [
  { value: 'saas-ui', label: 'Saas UI', language: 'tsx' },
  { value: 'chakra-ui', label: 'Chakra UI', language: 'tsx' },
  { value: 'css', label: 'CSS variables', language: 'css' },
  { value: 'tailwind', label: 'Tailwind CSS', language: 'css' },
  { value: 'json', label: 'JSON', language: 'json' },
] as const

export type ExportFormat = (typeof exportFormats)[number]['value']

function literal(value: object) {
  return `{ ${Object.entries(value)
    .filter(([, entry]) => entry !== undefined)
    .map(([key, entry]) =>
      typeof entry === 'string' ? `${key}: '${entry}'` : `${key}: ${entry}`,
    )
    .join(', ')} }`
}

function json(value: unknown) {
  return JSON.stringify(value, null, 2)
}

const IDENTIFIER = /^[A-Za-z_$][\w$]*$|^\d+$/

/** A string array wrapped to the print width, prettier style. */
function wrapList(items: string[]) {
  const lines: string[] = []
  let line = ''
  for (const item of items.map((name) => `'${name}',`)) {
    if (line && line.length + item.length + 1 > 76) {
      lines.push(line)
      line = ''
    }
    line = line ? `${line} ${item}` : item
  }
  if (line) lines.push(line)
  return `[\n${lines.map((entry) => `  ${entry}`).join('\n')}\n]`
}

/** Serialize data as a TypeScript literal, inlining short objects. */
function ts(value: unknown, depth = 0): string {
  if (typeof value === 'string') return `'${value}'`
  if (typeof value !== 'object' || value === null) return String(value)

  const pad = '  '.repeat(depth)
  const isArray = Array.isArray(value)
  const entries = isArray
    ? (value as unknown[]).map((entry) => ts(entry, depth + 1))
    : Object.entries(value).map(
        ([key, entry]) =>
          `${IDENTIFIER.test(key) ? key : `'${key}'`}: ${ts(entry, depth + 1)}`,
      )
  const [open, close] = isArray ? ['[', ']'] : ['{ ', ' }']
  const inline = `${open}${entries.join(', ')}${close}`
  if (inline.length + pad.length <= 72 && !inline.includes('\n')) return inline
  const [openBlock, closeBlock] = isArray ? ['[', ']'] : ['{', '}']
  return `${openBlock}\n${entries.map((entry) => `${pad}  ${entry},`).join('\n')}\n${pad}${closeBlock}`
}

/** Scales and semantic palettes that differ from the preset defaults. */
function customColors(palette: GeneratedPalette) {
  const names = ['brand', 'gray', ...Object.keys(palette.catalog)]
  const scales: Record<string, PaletteScale> = {}
  const palettes: Record<string, PaletteTokens> = {}
  for (const name of names) {
    scales[name] = palette.scales[name]!
    palettes[name] = palette.palettes[name]!
  }
  return { scales, palettes }
}

function saasUi(palette: GeneratedPalette) {
  const { accent, base, gray, harmonized } = palette
  const imports = [
    'createAppearance',
    'createPalette',
    'createScale',
    'defaultConfig',
    ...(harmonized ? ['paletteSeeds', 'type PaletteSeed'] : []),
  ]

  const catalog = harmonized
    ? `
// Cap the catalog hues at the brand chroma so they sit next to it.
const hues = ${wrapList(Object.keys(palette.catalog))} as const
function catalog<T>(create: (seed: PaletteSeed) => T): Record<string, T> {
  return Object.fromEntries(
    hues.map((name) => [
      name,
      create({ ...paletteSeeds[name], c: Math.min(paletteSeeds[name].c, brand.c) }),
    ]),
  )
}
`
    : ''

  return `import { createSystem, defineConfig } from '@chakra-ui/react'
import {
${imports.map((name) => `  ${name},`).join('\n')}
} from '@saas-ui/chakra-preset'

const brand = ${literal(accent)} as const
const base = ${literal(base)} as const
const gray = ${literal(gray)} as const
${catalog}
export const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: {
        colors: {
          brand: createScale(brand),
          gray: createScale(gray),${harmonized ? '\n          ...catalog(createScale),' : ''}
        },
      },
      semanticTokens: {
        colors: {
          ...createAppearance({ base, accent: brand }),
          brand: createPalette(brand),
          gray: createPalette(gray),${harmonized ? '\n          ...catalog(createPalette),' : ''}
        },
      },
    },
  }),
)
`
}

function chakraUi(palette: GeneratedPalette) {
  const { scales, palettes } = customColors(palette)
  return `import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const colors = ${ts(scales)}

const palettes = ${ts(palettes)}

export const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: { colors },
      semanticTokens: { colors: palettes },
    },
  }),
)
`
}

function cssVariables(palette: GeneratedPalette) {
  const { accent, base } = palette
  const cssVars: Record<string, string> = {
    ...createAppearanceCssVars(palette.appearance),
  }
  const attributes = [
    base.contrast !== 'normal' ? `data-base-contrast="${base.contrast}"` : '',
    accent.foreground === 'dark' ? 'data-accent-foreground="dark"' : '',
  ].filter(Boolean)

  const vars = ['--sui-base', '--sui-accent', '--sui-contrast', '--sui-accent-foreground-tone']
    .map((name) => `  ${name}: ${cssVars[name]};`)
    .join('\n')

  return `/*
 * Runtime theming with @saas-ui/chakra-preset. Put these on any element with
 * the \`sui-theme\` class, or on <html>.${
   attributes.length
     ? `\n *\n * Also set: <div class="sui-theme" ${attributes.join(' ')}>`
     : ''
 }
 */
.sui-theme {
${vars}
}
`
}

function tailwind(palette: GeneratedPalette) {
  const { scales } = customColors(palette)
  const lines = Object.entries(scales).flatMap(([name, scale], index) => [
    ...(index ? [''] : []),
    ...Object.entries(scale).map(
      ([step, token]) => `  --color-${name}-${step}: ${token.value};`,
    ),
  ])
  return `@import 'tailwindcss';

@theme {
${lines.join('\n')}
}
`
}

function jsonExport(palette: GeneratedPalette) {
  const { scales, palettes } = customColors(palette)
  return `${json({
    seeds: { base: palette.base, accent: palette.accent, gray: palette.gray },
    scales,
    palettes,
  })}\n`
}

export function exportPalette(
  palette: GeneratedPalette,
  format: ExportFormat,
) {
  switch (format) {
    case 'chakra-ui':
      return chakraUi(palette)
    case 'css':
      return cssVariables(palette)
    case 'tailwind':
      return tailwind(palette)
    case 'json':
      return jsonExport(palette)
    default:
      return saasUi(palette)
  }
}
