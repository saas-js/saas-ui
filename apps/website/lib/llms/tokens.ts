import tokenData from '@/lib/generated/llms-tokens.json'

/**
 * Markdown versions of the `*TokenDoc` components used on the theming pages.
 * Values come from `defaultSystem`, snapshotted by scripts/generate-llms-tokens.mjs
 * (next.config runs it). Importing the preset from a route crashes under Turbopack.
 */

type Token = {
  name: string
  value: any
  extensions: {
    prop?: string
    category?: string
    negative?: boolean
    conditions?: Record<string, any>
    pixelValue?: string
  }
}

const categories = tokenData.categories as Record<string, Token[]>
const keyframeNames = tokenData.keyframes as string[]

const categoryTokens = (category: string) =>
  (categories[category] ?? []).filter((token) => !token.extensions.negative)

const code = (value: unknown) =>
  `\`${String(typeof value === 'object' ? JSON.stringify(value) : value)
    // Size tokens alias breakpoints, which the preset stores as `480pxpx`.
    .replace(/(\d+)pxpx\b/g, '$1px')
    .replace(/\|/g, '\\|')}\``

function valueTable(category: string, filter?: (token: Token) => boolean) {
  const list = categoryTokens(category).filter(
    (token) => !token.extensions.conditions && (!filter || filter(token)),
  )
  if (!list.length) return ''
  return [
    `Tokens in \`theme.tokens.${category}\`:`,
    '',
    '| Token | Value |',
    '| --- | --- |',
    ...list.map(
      (token) =>
        `| ${code(token.extensions.prop ?? token.name)} | ${code(token.value)} |`,
    ),
  ].join('\n')
}

/** Color tokens grouped by palette, names only (values come from the appearance seeds). */
function colorList(kind: 'primitive' | 'semantic') {
  const groups = new Map<string, string[]>()
  for (const token of categoryTokens('colors')) {
    const isSemantic = Boolean(token.extensions.conditions)
    if ((kind === 'semantic') !== isSemantic) continue
    const name = token.name.replace(/^colors\./, '')
    const group = name.split('.')[0]
    groups.set(group, [...(groups.get(group) ?? []), name])
  }
  if (!groups.size) return ''
  return [
    `${kind === 'semantic' ? 'Semantic color' : 'Color'} tokens, by palette:`,
    '',
    ...Array.from(groups, ([group, names]) => `- \`${group}\`: ${names.map((n) => `\`${n}\``).join(', ')}`),
  ].join('\n')
}

const TOKEN_DOCS: Record<string, () => string> = {
  ColorTokenDoc: () => colorList('primitive'),
  ColorSemanticTokenDoc: () => colorList('semantic'),
  ColorPaletteTokenDoc: () => '',
  AspectRatioTokenDoc: () => valueTable('aspectRatios'),
  BorderRadiusTokenDoc: () => valueTable('radii'),
  ShadowTokenDoc: () => valueTable('shadows'),
  SizesTokenDoc: () => valueTable('sizes'),
  SpacingTokenDoc: () => valueTable('spacing'),
  ZIndexTokenDoc: () => valueTable('zIndex'),
  DurationTokenDoc: () => valueTable('durations'),
  EasingTokenDoc: () => valueTable('easings'),
  KeyframeDoc: () => {
    const names = keyframeNames.filter(
      (name) => !/expand|collapse|bg-|position|circular/.test(name),
    )
    if (!names.length) return ''
    return [
      'Keyframes in `theme.keyframes`:',
      '',
      ...names.map((name) => `- \`${name}\``),
    ].join('\n')
  },
  // Breakpoints are a token category, but the preset stores them as
  // `480pxpx` (`breakpoints.ts` appends `px` to values that already have it).
  // Show the width the docs table publishes.
  BreakpointDoc: () => {
    const list = categoryTokens('breakpoints').filter(
      (token) => !token.extensions.conditions,
    )
    if (!list.length) return ''
    return [
      'Tokens in `theme.tokens.breakpoints` (min-width):',
      '',
      '| Token | Value |',
      '| --- | --- |',
      ...list.map((token) => {
        const value = String(token.value).replace(/(\d+)pxpx$/, '$1px')
        return `| ${code(token.extensions.prop ?? token.name)} | ${code(value)} |`
      }),
    ].join('\n')
  },
  FontTokenDoc: () => valueTable('fonts'),
  FontSizeTokenDoc: () => valueTable('fontSizes'),
  FontWeightTokenDoc: () => valueTable('fontWeights'),
  LineHeightTokenDoc: () => valueTable('lineHeights'),
  LetterSpacingTokenDoc: () => valueTable('letterSpacings'),
}

export function replaceTokenDocs(content: string) {
  return content.replace(/<([A-Z][A-Za-z]*(?:TokenDoc|Doc))\s*\/>/g, (tag, name) => {
    const render = TOKEN_DOCS[name]
    return render ? render() : tag
  })
}
