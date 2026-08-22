import { writeFile } from 'node:fs/promises'
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import prettier, { type Options } from 'prettier'

import { paletteNames } from '@saas-ui/appearance'
import {
  type FlattenedToken,
  type TokenTree,
  flattenTokens,
  isLightDarkValue,
  toStylexKey,
} from '../src/flatten.ts'
import {
  type ChakraRecipe,
  type ChakraSlotRecipe,
  emitRecipe,
  emitSlotRecipe,
  stripSuiPrefix,
  toKebabCase,
} from '../src/generate-recipe.ts'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const chakraTheme = join(root, '../saas-ui-chakra-preset/src/theme')

const TOKEN_FILES: Record<string, string> = {
  animations: 'animations',
  'aspect-ratios': 'aspectRatios',
  blurs: 'blurs',
  borders: 'borders',
  colors: 'colors',
  cursor: 'cursor',
  durations: 'durations',
  easings: 'easings',
  'font-sizes': 'fontSizes',
  'font-weights': 'fontWeights',
  fonts: 'fonts',
  'letter-spacings': 'letterSpacings',
  'line-heights': 'lineHeights',
  radii: 'radii',
  sizes: 'sizes',
  spacing: 'spacing',
  'z-indices': 'zIndices',
}

const SEMANTIC_FILES: Record<string, string> = {
  colors: 'semanticColors',
  radii: 'semanticRadii',
  shadows: 'semanticShadows',
}

const COLOR_PALETTE_SLOTS = [
  'solid',
  'contrast',
  'fg',
  'muted',
  'subtle',
  'emphasized',
  'border',
  'focusRing',
] as const

const COLOR_PALETTES = [...paletteNames, 'base', 'accent'] as const

async function format(
  code: string,
  parser: 'typescript' | 'css' = 'typescript',
) {
  return prettier.format(code, {
    parser,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
  } as Options)
}

function rewriteTokenRefs(value: string): string {
  return value
    .replace(
      /\{colors\.(\w+)\.(\w+)\/(\d+)\}/g,
      (_, color, shade, opacity) =>
        `color-mix(in oklch, var(--sui-colors-${color}-${shade}) ${opacity}%, transparent)`,
    )
    .replace(
      /\{colors\.(\w+)\/(\d+)\}/g,
      (_, color, opacity) =>
        `color-mix(in oklch, var(--sui-colors-${color}) ${opacity}%, transparent)`,
    )
    .replace(/\{colors\.(\w+)\.(\w+)\}/g, 'var(--sui-colors-$1-$2)')
    .replace(/\{colors\.(\w+)\}/g, 'var(--sui-colors-$1)')
    .replace(/\{black\/(\d+)\}/g, 'oklch(0 0 0 / $1%)')
    .replace(/\{white\/(\d+)\}/g, 'oklch(1 0 0 / $1%)')
    .replace(/\{black\}/g, 'oklch(0 0 0)')
    .replace(/\{white\}/g, 'oklch(1 0 0)')
    .replace(
      /\{spacing\.([0-9._]+)\}/g,
      (_, num) => `var(--sui-spacing-${num.replace('.', '_')})`,
    )
    .replace(
      /\{radii\.([^}]+)\}/g,
      (_, path) => `var(--sui-radii-${String(path).replace(/\./g, '-')})`,
    )
    .replace(/\{blurs\.(\w+)\}/g, 'var(--sui-blurs-$1)')
    .replace(
      /\{sizes\.([^}]+)\}/g,
      (_, path) => `var(--sui-sizes-${String(path).replace(/\./g, '-')})`,
    )
    .replace(/\{shadows\.(\w+)\}/g, 'var(--sui-shadows-$1)')
}

function serializeValue(value: unknown): string {
  if (Array.isArray(value)) {
    return JSON.stringify(
      value.map((item) => rewriteTokenRefs(String(item))).join(', '),
    )
  }

  if (isLightDarkValue(value)) {
    const light = rewriteTokenRefs(String(value._light))
    const dark = rewriteTokenRefs(String(value._dark))
    if (light === dark) {
      return JSON.stringify(light)
    }
    return JSON.stringify(`light-dark(${light}, ${dark})`)
  }

  if (typeof value === 'number') {
    return JSON.stringify(String(value))
  }

  if (typeof value === 'string') {
    return JSON.stringify(rewriteTokenRefs(value))
  }

  return JSON.stringify(String(value))
}

function emitDefineVars(
  exportName: string,
  tokens: FlattenedToken[],
  importStylex = true,
): string {
  const entries = tokens
    .map((token) => {
      return `  ${JSON.stringify(token.key)}: ${serializeValue(token.value)},`
    })
    .join('\n')

  return `${importStylex ? "import * as stylex from '@stylexjs/stylex'\n\n" : ''}export const ${exportName} = stylex.defineVars({\n${entries}\n})\n`
}

async function writeGenerated(relativePath: string, code: string) {
  const destination = join(root, 'src', relativePath)
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, await format(code))
}

async function loadTokenModule(file: string): Promise<TokenTree> {
  const module = await import(join(chakraTheme, 'tokens', file))
  return Object.values(module)[0] as TokenTree
}

async function loadSemanticModule(file: string): Promise<TokenTree> {
  const module = await import(join(chakraTheme, 'semantic-tokens', file))
  return Object.values(module)[0] as TokenTree
}

async function generateTokens() {
  for (const [file, exportName] of Object.entries(TOKEN_FILES)) {
    const tree = await loadTokenModule(`${file}.ts`)
    const category = file === 'z-indices' ? 'z-index' : file
    const tokens = flattenTokens(tree, category)
    await writeGenerated(
      `tokens/${file}.stylex.ts`,
      emitDefineVars(exportName, tokens),
    )
  }

  for (const [file, exportName] of Object.entries(SEMANTIC_FILES)) {
    const tree = await loadSemanticModule(`${file}.ts`)
    const tokens = flattenTokens(tree, file)
    await writeGenerated(
      `semantic-tokens/${file}.stylex.ts`,
      emitDefineVars(exportName, tokens),
    )
  }
}

async function generateColorPalette() {
  const defaults = COLOR_PALETTE_SLOTS.map((slot) => {
    return `  ${slot}: semanticColors.gray${slot.charAt(0).toUpperCase()}${slot.slice(1)},`
  }).join('\n')

  const code = `import * as stylex from '@stylexjs/stylex'

import { semanticColors } from './semantic-tokens/colors.stylex.ts'

export const colorPalette = stylex.defineVars({
${defaults}
})
`

  await writeGenerated('color-palette.stylex.ts', code)
}

async function generatePaletteThemes() {
  const imports = `import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
`

  const themes = COLOR_PALETTES.map((palette) => {
    const source = palette === 'base' ? 'colors' : 'semanticColors'
    const overrides = COLOR_PALETTE_SLOTS.map((slot) => {
      const key = `${palette}${slot.charAt(0).toUpperCase()}${slot.slice(1)}`
      return `    ${slot}: ${source}.${key},`
    }).join('\n')

    return `export const ${palette}Palette = stylex.createTheme(colorPalette, {\n${overrides}\n})`
  }).join('\n\n')

  const record = `export const paletteThemes = {\n${COLOR_PALETTES.map(
    (palette) => `  ${palette}: ${palette}Palette,`,
  ).join('\n')}\n} as const

export type ColorPaletteName = keyof typeof paletteThemes
`

  await writeGenerated(
    'themes/palettes.ts',
    `${imports}\n${themes}\n\n${record}`,
  )
}

async function generateBreakpoints() {
  const module = await import(join(chakraTheme, 'breakpoints.ts'))
  const values = module.breakpointValues as Record<string, string>

  const entries = Object.entries(values)
    .map(([key, value]) => {
      const width = value.endsWith('px') ? value : `${value}px`
      return `  ${JSON.stringify(key)}: ${JSON.stringify(`@media (min-width: ${width})`)},`
    })
    .join('\n')

  await writeGenerated(
    'breakpoints.stylex.ts',
    `import * as stylex from '@stylexjs/stylex'

export const breakpoints = stylex.defineConsts({
${entries}
})
`,
  )
}

function serializeCssRule(
  selector: string,
  styles: Record<string, unknown>,
): string {
  let declarations = ''
  let nested = ''

  for (const [property, value] of Object.entries(styles)) {
    if (value && typeof value === 'object') {
      if (property.startsWith('@')) {
        nested += `${property} {\n${serializeCssRule(selector, value as Record<string, unknown>)}}\n`
      } else {
        const nestedSelector = property.includes('&')
          ? property.split('&').join(selector)
          : `${selector} ${property}`
        nested += serializeCssRule(
          nestedSelector,
          value as Record<string, unknown>,
        )
      }
    } else {
      const cssProperty = property.startsWith('--')
        ? property
        : property.replace(/([A-Z])/g, '-$1').toLowerCase()
      declarations += `  ${cssProperty}: ${value};\n`
    }
  }

  const rule = declarations ? `${selector} {\n${declarations}}\n` : ''
  return rule + nested
}

async function collectCssVariables() {
  const variables: Array<[string, string]> = []

  for (const file of Object.keys(TOKEN_FILES)) {
    const tree = await loadTokenModule(`${file}.ts`)
    const category = file === 'z-indices' ? 'z-index' : file
    for (const token of flattenTokens(tree, category)) {
      variables.push([token.cssVar, cssLiteral(token.value)])
    }
  }

  for (const file of Object.keys(SEMANTIC_FILES)) {
    const tree = await loadSemanticModule(`${file}.ts`)
    for (const token of flattenTokens(tree, file)) {
      variables.push([token.cssVar, cssLiteral(token.value)])
    }
  }

  return variables
}

function cssLiteral(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((item) => rewriteTokenRefs(String(item))).join(', ')
  }

  if (isLightDarkValue(value)) {
    const light = rewriteTokenRefs(String(value._light))
    const dark = rewriteTokenRefs(String(value._dark))
    return light === dark ? light : `light-dark(${light}, ${dark})`
  }

  return rewriteTokenRefs(String(value))
}

function isThemeCssVar(property: string) {
  return (
    property.startsWith('--scale-') ||
    property.startsWith('--radius-') ||
    property.startsWith('--focus-ring-') ||
    property.startsWith('--motion-') ||
    property === '--ease-standard' ||
    property === '--color-shadow'
  )
}

async function generateGlobalCss() {
  const appearance = await import(join(chakraTheme, 'appearance.ts'))
  const chakraGlobal = await import(join(chakraTheme, 'global-css.ts'))
  const globalCss = appearance.appearanceGlobalCss as Record<
    string,
    Record<string, unknown>
  >
  const rootVars = (chakraGlobal.globalCss?.['*'] ?? {}) as Record<
    string,
    unknown
  >
  const variables = await collectCssVariables()

  let css = `/* Generated from the Chakra appearance contract. */\n`
  css += `:where(html, .sui-theme) {\n`
  for (const [property, value] of Object.entries(rootVars)) {
    if (isThemeCssVar(property)) {
      css += `  ${property}: ${cssLiteral(value)};\n`
    }
  }
  for (const [name, value] of variables) {
    css += `  ${name}: ${value};\n`
  }
  css += `}\n\n`

  for (const [selector, styles] of Object.entries(globalCss)) {
    css += serializeCssRule(selector, styles)
    css += '\n'
  }

  const destination = join(root, 'src/global-theme.css')
  await writeFile(destination, await format(css, 'css'))
}

async function generateKeyframes() {
  const module = await import(join(chakraTheme, 'keyframes.ts'))
  const keyframes = module.keyframes as Record<string, Record<string, object>>

  const entries = Object.entries(keyframes)
    .map(([name, frames]) => {
      const ident = toStylexKey([name])
      return `export const ${ident} = stylex.keyframes(${JSON.stringify(frames, null, 2)})`
    })
    .join('\n\n')

  await writeGenerated(
    'keyframes.ts',
    `import * as stylex from '@stylexjs/stylex'\n\n${entries}\n`,
  )
}

async function generateTextStyles() {
  const module = await import(join(chakraTheme, 'text-styles.ts'))
  const textStyles = module.textStyles as Record<
    string,
    { value?: Record<string, string> }
  >

  const styles: Record<string, Record<string, string>> = {}
  for (const [name, definition] of Object.entries(textStyles)) {
    const value = definition.value ?? {}
    const next: Record<string, string> = {}
    if (value.fontSize) {
      next.fontSize = `fontSizes.${toStylexKey([value.fontSize])}`
    }
    if (value.lineHeight) {
      next.lineHeight = `lineHeights.${toStylexKey([value.lineHeight])}`
    }
    if (value.letterSpacing) {
      next.letterSpacing = `letterSpacings.${toStylexKey([value.letterSpacing])}`
    }
    styles[toStylexKey([name])] = next
  }

  const code = `import * as stylex from '@stylexjs/stylex'

import { fontSizes } from './tokens/font-sizes.stylex.ts'
import { letterSpacings } from './tokens/letter-spacings.stylex.ts'
import { lineHeights } from './tokens/line-heights.stylex.ts'

export const textStyles = stylex.create({
${Object.entries(styles)
  .map(([name, style]) => {
    const body = Object.entries(style)
      .map(([prop, token]) => `    ${prop}: ${token},`)
      .join('\n')
    return `  ${name}: {\n${body}\n  },`
  })
  .join('\n')}
})
`

  await writeGenerated('text-styles.ts', code)
}

async function generateRecipes() {
  const recipesModule = await import(join(chakraTheme, 'recipes.ts'))
  const slotRecipesModule = await import(join(chakraTheme, 'slot-recipes.ts'))
  const recipes = recipesModule.recipes as Record<string, ChakraRecipe>
  const slotRecipes = slotRecipesModule.slotRecipes as Record<
    string,
    ChakraSlotRecipe
  >

  const recipeExports: string[] = []
  const slotExports: string[] = []

  for (const [rawName, recipe] of Object.entries(recipes)) {
    const name = stripSuiPrefix(rawName)
    const { code, varsCode, skipped } = emitRecipe(name, recipe)
    if (skipped.length > 0) {
      console.log(`  recipe ${name}: skipped ${skipped.join(', ')}`)
    }
    const recipeFile = toKebabCase(name)
    await writeGenerated(`recipes/${recipeFile}.ts`, code)
    if (varsCode) {
      await writeGenerated(`recipes/${recipeFile}.stylex.ts`, varsCode)
    }
    recipeExports.push(`export * from './${recipeFile}.ts'`)
  }

  for (const [rawName, recipe] of Object.entries(slotRecipes)) {
    const name = stripSuiPrefix(rawName)
    const { code, varsCode, skipped } = emitSlotRecipe(name, recipe)
    if (skipped.length > 0) {
      console.log(`  slot recipe ${name}: skipped ${uniquePreview(skipped)}`)
    }
    const recipeFile = toKebabCase(name)
    await writeGenerated(`slot-recipes/${recipeFile}.ts`, code)
    if (varsCode) {
      await writeGenerated(`slot-recipes/${recipeFile}.stylex.ts`, varsCode)
    }
    slotExports.push(`export * from './${recipeFile}.ts'`)
  }

  await writeGenerated(
    'recipes/index.ts',
    `${generatedFileBanner()}\n${recipeExports.join('\n')}\n`,
  )
  await writeGenerated(
    'slot-recipes/index.ts',
    `${generatedFileBanner()}\n${slotExports.join('\n')}\n`,
  )
}

function generatedFileBanner() {
  return '/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */'
}

function uniquePreview(values: string[]): string {
  const unique = [...new Set(values)]
  if (unique.length <= 8) {
    return unique.join(', ')
  }
  return `${unique.slice(0, 8).join(', ')} (+${unique.length - 8} more)`
}

async function main() {
  console.log('Generating StyleX tokens from the Chakra preset...')
  await generateTokens()
  await generateColorPalette()
  await generatePaletteThemes()
  await generateBreakpoints()
  await generateGlobalCss()
  await generateKeyframes()
  await generateTextStyles()
  console.log('Generating StyleX recipes...')
  await generateRecipes()
  console.log('StyleX preset generated.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
