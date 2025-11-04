import fg from 'fast-glob'
import { mkdir, writeFile } from 'fs/promises'
import { basename } from 'path'

import { formatCSS, kebabCase } from './shared'

interface ChakraToken {
  value: string | { _light: string; _dark: string }
}

type TokenObject = Record<string, ChakraToken | TokenObject>

export async function exportTokens() {
  console.log('🎨 Exporting Chakra tokens to Tailwind 4...')

  let themeContent = '@theme {\n'
  let semanticContent = ':root {\n'
  let themeSemanticContent = ''
  let darkVariantContent = ''

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
      // Use singular form for Tailwind @theme
      themeContent += convertTokensToCSS(tokens, tokenName, '', true)
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

  themeContent += themeSemanticContent
  themeContent += '}\n\n'
  semanticContent += '}\n'

  // Add dark variant section if there's content
  let darkSection = ''
  if (darkVariantContent) {
    darkSection = '\n@custom-variant dark (&:where(.dark, .dark *));\n\n@variant dark {\n:root {\n'
    darkSection += darkVariantContent
    darkSection += '}\n}\n'
  }

  const cssContent = themeContent + semanticContent + darkSection

  // Format and write output
  const formattedCSS = await formatCSS(cssContent)

  await mkdir('src', { recursive: true })
  await writeFile('src/theme.css', formattedCSS)

  console.log('✅ Tailwind theme exported to src/theme.css')
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
            themeVars += `  ${themeVar}: var(${cssVar});\n`
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
            themeVars += `  ${themeVar}: var(${cssVar});\n`
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

  const fullName = `${finalCategory}-${prefix}${key}`
  return `--${kebabCase(fullName).replace(/\./g, '_')}`
}

function processShadowToken(
  lightValue: string,
  darkValue: string,
  cssVar: string,
): { light: string; dark: string } {
  // Convert shadow values directly using oklch inline
  const convertShadowValue = (shadowValue: string): string => {
    return shadowValue
      // {colors.gray.900/5} -> oklch(from var(--color-gray-900) l c h / 0.05)
      .replace(/\{colors\.(\w+)\.(\w+)\/(\d+)\}/g, (_, color, shade, opacity) =>
        `oklch(from var(--color-${color}-${shade}) l c h / ${parseInt(opacity) / 100})`
      )
      // {black/30} -> oklch(0% 0 0 / 0.3)
      .replace(/\{black\/(\d+)\}/g, (_, opacity) =>
        `oklch(0% 0 0 / ${parseInt(opacity) / 100})`
      )
      // {white/30} -> oklch(100% 0 0 / 0.3)
      .replace(/\{white\/(\d+)\}/g, (_, opacity) =>
        `oklch(100% 0 0 / ${parseInt(opacity) / 100})`
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
      .replace(/\{radii\.(\w+)\}/g, 'var(--radius-$1)')
      .replace(/\{blurs\.(\w+)\}/g, 'var(--blurs-$1)')
  )
}
