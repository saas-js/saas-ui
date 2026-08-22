import fg from 'fast-glob'
import { mkdir, writeFile } from 'fs/promises'
import { basename } from 'path'

import { formatCSS, kebabCase } from './shared'

interface ChakraToken {
  value: string | { _light: string; _dark: string }
}

type TokenObject = {
  [key: string]: ChakraToken | TokenObject
}

type CSSPrimitive = string | number

type CSSObject = {
  [key: string]: CSSPrimitive | CSSObject
}

export async function exportTokens() {
  console.log('🎨 Exporting Chakra tokens to Tailwind 4...')

  let themeContent = '@theme {\n'
  let inlineThemeContent = '@theme inline {\n'
  let semanticContent = ':root {\n'
  let themeSemanticContent = ''
  let darkVariantContent = ''
  let keyframesContent = ''

  // Export base tokens
  const tokenFiles = await fg(
    '../saas-ui-chakra-preset/src/theme/tokens/**/*.ts',
    {
      absolute: false,
    },
  )

  for (const file of tokenFiles) {
    const modulePath = `../../saas-ui-chakra-preset/src/theme/tokens/${basename(file)}`
    const module = await import(modulePath)
    const tokenName = basename(file, '.ts')
    const tokens = Object.values(module)[0] as TokenObject

    if (tokens && typeof tokens === 'object') {
      themeContent += `  /* ${tokenName} */\n`

      if (tokenName === 'colors' && tokens.base) {
        const { base, ...staticTokens } = tokens

        themeContent += convertTokensToCSS(staticTokens, tokenName, '', true)
        inlineThemeContent += '  /* appearance base colors */\n'
        inlineThemeContent += convertTokensToCSS({ base }, tokenName, '', true)
      } else {
        // Use singular form for Tailwind @theme
        themeContent += convertTokensToCSS(tokens, tokenName, '', true)
      }

      themeContent += '\n'
    }
  }

  // Export semantic tokens with light-dark()
  const semanticFiles = await fg(
    '../saas-ui-chakra-preset/src/theme/semantic-tokens/**/*.ts',
    {
      absolute: false,
    },
  )

  for (const file of semanticFiles) {
    const modulePath = `../../saas-ui-chakra-preset/src/theme/semantic-tokens/${basename(file)}`
    const module = await import(modulePath)
    const tokenName = basename(file, '.ts')
    const tokens = Object.values(module)[0] as TokenObject

    if (tokens && typeof tokens === 'object') {
      // Process all semantic tokens the same way
      semanticContent += `  /* semantic ${tokenName} */\n`
      const semantic = convertSemanticTokensToCSS(tokens, tokenName, '', true)
      semanticContent += semantic.rootVars
      themeSemanticContent += semantic.themeVars

      // Collect dark variant content
      if (semantic.darkVars) {
        darkVariantContent += semantic.darkVars
      }

      semanticContent += '\n'
    }
  }

  themeContent += '}\n\n'
  inlineThemeContent += themeSemanticContent
  inlineThemeContent += '}\n\n'
  semanticContent += '}\n'

  const appearanceContent = await exportAppearanceGlobalCss()
  const themeCssVars = await exportThemeCssVars()

  // Add dark variant section if there's content
  let darkSection = ''
  if (darkVariantContent) {
    darkSection =
      '\n@custom-variant dark (&:where(.dark, .dark *));\n\n@variant dark {\n:root {\n'
    darkSection += darkVariantContent
    darkSection += '}\n}\n'
  }

  // Export keyframes
  keyframesContent = await exportKeyframes()

  console.log(keyframesContent)

  const cssContent =
    themeContent +
    inlineThemeContent +
    appearanceContent +
    themeCssVars +
    semanticContent +
    darkSection +
    keyframesContent

  // Format and write output
  const formattedCSS = await formatCSS(cssContent)

  await mkdir('src', { recursive: true })
  await writeFile('src/theme.css', formattedCSS)

  console.log('✅ Tailwind theme exported to src/theme.css')
}

function isThemeCssVar(property: string) {
  return (
    property.startsWith('--scale-') ||
    property.startsWith('--radius-') ||
    property.startsWith('--focus-ring-') ||
    property.startsWith('--motion-') ||
    property === '--ease-standard'
  )
}

async function exportThemeCssVars(): Promise<string> {
  const modulePath = '../../saas-ui-chakra-preset/src/theme/global-css.ts'
  const module = await import(modulePath)
  const rootVars = (module.globalCss?.['*'] ?? {}) as CSSObject
  let css = '/* Theme CSS variables */\n:where(html, .sui-theme) {\n'

  for (const [property, value] of Object.entries(rootVars)) {
    if (isThemeCssVar(property) && typeof value !== 'object') {
      css += `  ${property}: ${extractValue(String(value))};\n`
    }
  }

  return `${css}}\n\n`
}

async function exportAppearanceGlobalCss(): Promise<string> {
  const modulePath = '../../saas-ui-chakra-preset/src/theme/appearance.ts'
  const module = await import(modulePath)
  const globalCss = module.appearanceGlobalCss as CSSObject | undefined

  if (!globalCss) {
    return ''
  }

  let css = '/* Appearance */\n'

  for (const [selector, styles] of Object.entries(globalCss)) {
    if (typeof styles === 'object') {
      css += serializeCSSRule(selector, styles)
    }
  }

  return `${css}\n`
}

function serializeCSSRule(selector: string, styles: CSSObject): string {
  let declarations = ''
  let nestedRules = ''

  for (const [property, value] of Object.entries(styles)) {
    if (typeof value === 'object') {
      if (property.startsWith('@')) {
        nestedRules += `${property} {\n${serializeCSSRule(selector, value)}}\n`
      } else {
        const nestedSelector = property.includes('&')
          ? property.split('&').join(selector)
          : `${selector} ${property}`
        nestedRules += serializeCSSRule(nestedSelector, value)
      }
    } else {
      declarations += `  ${formatCSSProperty(property)}: ${value};\n`
    }
  }

  const rule = declarations ? `${selector} {\n${declarations}}\n` : ''

  return rule + nestedRules
}

function formatCSSProperty(property: string): string {
  if (property.startsWith('--')) {
    return property
  }

  return property.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function convertTokensToCSS(
  tokens: TokenObject,
  category: string,
  prefix = '',
  useSingular = false,
): string {
  let css = ''

  for (const [key, value] of Object.entries(tokens)) {
    if (isLeafToken(value)) {
      // Leaf token
      const cssVar = formatCSSVariable(category, prefix, key, useSingular)
      const cssValue = extractValue(value.value as string)
      css += `  ${cssVar}: ${cssValue};\n`
    } else if (typeof value === 'object') {
      // Nested tokens
      css += convertTokensToCSS(
        value as TokenObject,
        category,
        prefix + key + '-',
        useSingular,
      )
    }
  }

  return css
}

function convertSemanticTokensToCSS(
  tokens: TokenObject,
  category: string,
  prefix = '',
  generateThemeVars = false,
): { rootVars: string; themeVars: string; darkVars?: string } {
  let rootVars = ''
  let themeVars = ''
  let darkVars = ''

  for (const [key, value] of Object.entries(tokens)) {
    if (isLeafToken(value)) {
      const cssVar = formatCSSVariable(category, prefix, key, false)
      const themeVar = formatCSSVariable(category, prefix, key, true)

      if (
        typeof value.value === 'object' &&
        '_light' in value.value &&
        '_dark' in value.value
      ) {
        // Special handling for shadows - put definitions in :root, reference in @theme
        if (category === 'shadows') {
          const shadowResult = processShadowToken(
            value.value._light,
            value.value._dark,
            cssVar,
          )
          rootVars += shadowResult.light
          darkVars += shadowResult.dark

          if (generateThemeVars) {
            themeVars += `  ${themeVar}: var(${cssVar});\n`
          }
        } else {
          // Handle light/dark variants with light-dark() function
          const lightVal = extractValue(value.value._light)
          const darkVal = extractValue(value.value._dark)
          rootVars += `  ${cssVar}: light-dark(${lightVal}, ${darkVal});\n`

          if (generateThemeVars) {
            themeVars += `  ${themeVar}: light-dark(${lightVal}, ${darkVal});\n`
          }
        }
      } else {
        // Non-light/dark semantic tokens
        if (category === 'shadows') {
          // Skip generating theme vars for non-light/dark shadows
          rootVars += `  ${cssVar}: ${extractValue(value.value as string)};\n`
        } else {
          rootVars += `  ${cssVar}: ${extractValue(value.value as string)};\n`

          if (generateThemeVars) {
            themeVars += `  ${themeVar}: ${extractValue(value.value as string)};\n`
          }
        }
      }
    } else if (typeof value === 'object') {
      const nested = convertSemanticTokensToCSS(
        value as TokenObject,
        category,
        prefix + key + '-',
        generateThemeVars,
      )
      rootVars += nested.rootVars
      themeVars += nested.themeVars
      if (nested.darkVars) {
        darkVars += nested.darkVars
      }
    }
  }

  return { rootVars, themeVars, darkVars: darkVars || undefined }
}

function isLeafToken(value: any): value is ChakraToken {
  return typeof value === 'object' && 'value' in value
}

function formatCSSVariable(
  category: string,
  prefix: string,
  key: string,
  useSingular = false,
): string {
  // For Tailwind @theme, use singular forms (color instead of colors)
  let finalCategory = category
  if (useSingular) {
    if (category === 'colors') finalCategory = 'color'
    else if (category === 'spacing') finalCategory = 'spacing'
    else if (category === 'radii') finalCategory = 'radius'
    else if (category === 'shadows') finalCategory = 'shadow'
  }

  const tokenName =
    key === 'DEFAULT' ? prefix.replace(/-$/, '') : `${prefix}${key}`
  const fullName = tokenName ? `${finalCategory}-${tokenName}` : finalCategory
  return `--${kebabCase(fullName).replace(/\./g, '_')}`
}

function processShadowToken(
  lightValue: string,
  darkValue: string,
  cssVar: string,
): { light: string; dark: string } {
  // Convert shadow values directly using oklch inline
  const convertShadowValue = (shadowValue: string): string => {
    return (
      shadowValue
        // {colors.gray.900/5} -> oklch(from var(--color-gray-900) l c h / 0.05)
        .replace(
          /\{colors\.(\w+)\.(\w+)\/(\d+)\}/g,
          (_, color, shade, opacity) =>
            `oklch(from var(--color-${color}-${shade}) l c h / ${parseInt(opacity) / 100})`,
        )
        // {black/30} -> oklch(0% 0 0 / 0.3)
        .replace(
          /\{black\/(\d+)\}/g,
          (_, opacity) => `oklch(0% 0 0 / ${parseInt(opacity) / 100})`,
        )
        // {white/30} -> oklch(100% 0 0 / 0.3)
        .replace(
          /\{white\/(\d+)\}/g,
          (_, opacity) => `oklch(100% 0 0 / ${parseInt(opacity) / 100})`,
        )
    )
  }

  const lightShadow = convertShadowValue(lightValue)
  const darkShadow = convertShadowValue(darkValue)

  return {
    light: `  ${cssVar}: ${lightShadow};\n`,
    dark: `  ${cssVar}: ${darkShadow};\n`,
  }
}

function extractValue(value: string | number | string[]): string {
  // Handle arrays (for shadows with multiple values)
  if (Array.isArray(value)) {
    return value.map((v) => extractValue(v)).join(', ')
  }

  // Handle non-string values
  if (typeof value !== 'string') {
    return String(value)
  }

  // Convert Chakra token references to CSS variables
  // Use singular forms to match @theme (--color-* instead of --colors-*)
  return (
    value
      // Handle color references with opacity (e.g. {colors.gray.900/5} -> rgb(from var(--color-gray-900) r g b / 5%))
      .replace(
        /\{colors\.(\w+)\.(\w+)\/(\d+)\}/g,
        'rgb(from var(--color-$1-$2) r g b / $3%)',
      )
      .replace(/\{colors\.(\w+)\.(\w+)\}/g, 'var(--color-$1-$2)')
      .replace(
        /\{colors\.(\w+)\/(\d+)\}/g,
        'rgb(from var(--color-$1) r g b / $2%)',
      )
      .replace(/\{colors\.(\w+)\}/g, 'var(--color-$1)')
      .replace(/\{black\/(\d+)\}/g, 'rgb(0 0 0 / $1%)')
      .replace(/\{black\}/g, 'black')
      .replace(/\{white\/(\d+)\}/g, 'rgb(255 255 255 / $1%)')
      .replace(/\{white\}/g, 'white')
      .replace(
        /\{spacing\.([0-9._]+)\}/g,
        (_, num) => `var(--spacing-${num.replace('.', '_')})`,
      )
      .replace(
        /\{radii\.([^}]+)\}/g,
        (_, path) => `var(--radius-${String(path).replace(/\./g, '-')})`,
      )
      .replace(
        /\{sizes\.([^}]+)\}/g,
        (_, path) =>
          `var(--sizes-${String(path).replace(/\./g, '-').replace(/(\d)_(\d)/, '$1_$2')})`,
      )
      .replace(/\{blurs\.(\w+)\}/g, 'var(--blurs-$1)')
  )
}

async function exportKeyframes(): Promise<string> {
  const modulePath = '../../saas-ui-chakra-preset/src/theme/keyframes.ts'
  const module = await import(modulePath)
  const keyframesDefinition = module.keyframes

  if (!keyframesDefinition) {
    return ''
  }

  let css = '\n/* Keyframes */\n'

  for (const [name, frames] of Object.entries(keyframesDefinition)) {
    css += `@keyframes ${name} {\n`

    for (const [step, properties] of Object.entries(
      frames as Record<string, any>,
    )) {
      css += `  ${step} {\n`

      for (const [prop, value] of Object.entries(
        properties as Record<string, any>,
      )) {
        const cssProperty = convertPropertyName(prop)
        const cssValue = convertPropertyValue(prop, value)
        css += `    ${cssProperty}: ${cssValue};\n`
      }

      css += '  }\n'
    }

    css += '}\n\n'
  }

  return css
}

function convertPropertyName(prop: string): string {
  // Convert camelCase to kebab-case
  return prop.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function convertPropertyValue(prop: string, value: any): string {
  // Handle special property conversions
  if (prop === 'translate') {
    return `translate(${value})`
  }
  if (prop === 'scale') {
    return `scale(${value})`
  }
  if (prop === 'rotate') {
    return `rotate(${value})`
  }

  return String(value)
}
