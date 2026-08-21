import { toStylexKey } from './flatten.ts'
import {
  type StyleObject,
  type TransformedStyle,
  styleObjectToCode,
  transformStyleObject,
} from './transform-style.ts'

export const RECIPE_IMPORTS: Record<string, string> = {
  colorPalette: '../color-palette.stylex.ts',
  semanticColors: '../semantic-tokens/colors.stylex.ts',
  radii: '../tokens/radii.stylex.ts',
  semanticRadii: '../semantic-tokens/radii.stylex.ts',
  semanticShadows: '../semantic-tokens/shadows.stylex.ts',
  textStyles: '../text-styles.ts',
  colors: '../tokens/colors.stylex.ts',
  spacing: '../tokens/spacing.stylex.ts',
  sizes: '../tokens/sizes.stylex.ts',
  fontSizes: '../tokens/font-sizes.stylex.ts',
  fontWeights: '../tokens/font-weights.stylex.ts',
  fonts: '../tokens/fonts.stylex.ts',
  lineHeights: '../tokens/line-heights.stylex.ts',
  letterSpacings: '../tokens/letter-spacings.stylex.ts',
  durations: '../tokens/durations.stylex.ts',
  easings: '../tokens/easings.stylex.ts',
  zIndices: '../tokens/z-indices.stylex.ts',
  blurs: '../tokens/blurs.stylex.ts',
  borders: '../tokens/borders.stylex.ts',
  cursor: '../tokens/cursor.stylex.ts',
  animations: '../tokens/animations.stylex.ts',
}

const SKIP_AXES = new Set(['colorPalette'])

/**
 * Chakra styles descendants from the parent. StyleX sets variables on the
 * ancestor and the child reads them.
 * @see https://stylexjs.com/docs/learn/recipes/descendant-styles
 */
export const DESCENDANT_SLOTS: Record<string, string> = {
  _icon: 'icon',
  '& .dot': 'dot',
  '& svg': 'svg',
  '& > svg': 'svg',
  '& :where(svg)': 'svg',
}

interface DescendantStore {
  defaults: TransformedStyle
  axes: Record<string, Record<string, TransformedStyle>>
}

export interface ChakraRecipe {
  className?: string
  base?: StyleObject
  variants?: Record<string, Record<string, StyleObject>>
  compoundVariants?: Array<Record<string, unknown> & { css?: StyleObject }>
  defaultVariants?: Record<string, string | number | boolean>
}

export interface ChakraSlotRecipe {
  className?: string
  base?: Record<string, StyleObject>
  variants?: Record<string, Record<string, Record<string, StyleObject>>>
  compoundVariants?: Array<Record<string, unknown> & { css?: Record<string, StyleObject> }>
  defaultVariants?: Record<string, string | number | boolean>
}

export interface GeneratedRecipe {
  code: string
  varsCode?: string
  skipped: string[]
}

interface AxisMap {
  name: string
  exportName: string
  typeName: string
  keys: string[]
  styles: Record<string, TransformedStyle>
  textStyles: Record<string, string>
}

interface CompoundMap {
  exportName: string
  whenAxis: string
  whenValue: string
  keyAxis: string
  styles: Record<string, TransformedStyle>
}

export function emitRecipe(name: string, recipe: ChakraRecipe): GeneratedRecipe {
  const skipped: string[] = []
  const descendants: Record<string, DescendantStore> = {}
  const restBase = takeDescendants(descendants, recipe.base ?? {}, skipped)
  const restVariants: Record<string, Record<string, StyleObject>> = {}

  for (const [axis, values] of Object.entries(recipe.variants ?? {})) {
    restVariants[axis] = {}
    for (const [key, value] of Object.entries(values)) {
      restVariants[axis][key] = takeDescendants(descendants, value, skipped, {
        name: axis,
        key,
      })
    }
  }

  const axes = collectAxes(name, restVariants, skipped)
  const base = applyDescendantAssignments(
    name,
    descendants,
    transformRecipeStyle(restBase, skipped),
    axes,
  )
  mergeSingleAxisCompounds(recipe.compoundVariants ?? [], axes, skipped)
  const compounds = collectTwoAxisCompounds(
    name,
    recipe.compoundVariants ?? [],
    skipped,
  )
  const defaults = omitSkippedAxes(recipe.defaultVariants ?? {})

  const textAxis =
    axes.find((axis) => axis.name === 'size' && Object.keys(axis.textStyles).length > 0) ??
    axes.find((axis) => Object.keys(axis.textStyles).length > 0)

  const used = new Set<string>()
  collectIdents(base, used)
  for (const axis of axes) {
    for (const style of Object.values(axis.styles)) {
      collectIdents(style, used)
    }
  }
  if (textAxis) {
    used.add('textStyles')
  }
  for (const compound of compounds) {
    for (const style of Object.values(compound.styles)) {
      collectIdents(style, used)
    }
  }

  const descendantBlocks = emitDescendantBlocks(name, descendants)

  const parts = [
    generatedBanner(),
    "import * as stylex from '@stylexjs/stylex'",
    emitVarsImport(toKebabCase(name), descendantBlocks.varNames),
    emitImports(used),
    emitVarsReexport(descendantBlocks.varNames),
    emitCreate(`${name}Styles`, { base }),
    ...axes.map((axis) => emitCreate(axis.exportName, axis.styles)),
    ...(textAxis
      ? [emitTextStyleMap(`${name}TextStyles`, textAxis.textStyles)]
      : []),
    ...compounds.map((compound) => emitCreate(compound.exportName, compound.styles)),
    ...descendantBlocks.consumers,
    ...axes.map(
      (axis) =>
        `export type ${axis.typeName} = keyof typeof ${axis.exportName}`,
    ),
    emitRecipeBag(
      name,
      axes,
      compounds,
      defaults,
      Boolean(textAxis),
      descendantBlocks.bagFields,
    ),
    emitRecipeHelper(name, axes, compounds, defaults),
    ...descendantBlocks.helpers,
  ]

  return {
    code: `${parts.filter(Boolean).join('\n\n')}\n`,
    varsCode: emitVarsFile(descendantBlocks.vars, descendantBlocks.varsUsed),
    skipped: unique(skipped),
  }
}

export function emitSlotRecipe(
  name: string,
  recipe: ChakraSlotRecipe,
): GeneratedRecipe {
  const skipped: string[] = []
  const slots = collectSlots(recipe)
  const defaults = omitSkippedAxes(recipe.defaultVariants ?? {})
  const used = new Set<string>()
  const blocks: string[] = []
  const slotBag: string[] = []
  const allVars: string[] = []
  const allVarNames: string[] = []
  const varsUsed = new Set<string>()

  for (const slot of slots) {
    const pascalSlot = pascalCase(slot)
    const stylesName = `${name}${pascalSlot}`
    const descendants: Record<string, DescendantStore> = {}
    const restBase = takeDescendants(
      descendants,
      recipe.base?.[slot] ?? {},
      skipped,
    )
    let base = transformRecipeStyle(restBase, skipped)

    const sizeAxis = recipe.variants?.size
    const variantAxis = recipe.variants?.variant
    const otherAxes = Object.entries(recipe.variants ?? {}).filter(
      ([axis]) => axis !== 'size' && axis !== 'variant' && !SKIP_AXES.has(axis),
    )

    const slotEntry = [`      styles: ${stylesName}`]
    const slotAxes: AxisMap[] = []

    if (sizeAxis) {
      const sizes: Record<string, TransformedStyle> = {}
      for (const [key, value] of Object.entries(sizeAxis)) {
        if (value[slot]) {
          const rest = takeDescendants(descendants, value[slot], skipped, {
            name: 'size',
            key,
          })
          sizes[key] = transformRecipeStyle(rest, skipped)
        }
      }
      if (Object.keys(sizes).length > 0) {
        slotAxes.push({
          name: 'size',
          exportName: `${stylesName}Sizes`,
          typeName: '',
          keys: Object.keys(sizes),
          styles: sizes,
          textStyles: {},
        })
      }
    }

    if (variantAxis) {
      const variants: Record<string, TransformedStyle> = {}
      for (const [key, value] of Object.entries(variantAxis)) {
        if (value[slot]) {
          const rest = takeDescendants(descendants, value[slot], skipped, {
            name: 'variant',
            key,
          })
          variants[key] = transformRecipeStyle(rest, skipped)
        }
      }
      if (Object.keys(variants).length > 0) {
        slotAxes.push({
          name: 'variant',
          exportName: `${stylesName}Variants`,
          typeName: '',
          keys: Object.keys(variants),
          styles: variants,
          textStyles: {},
        })
      }
    }

    for (const [axis, values] of otherAxes) {
      const styles: Record<string, TransformedStyle> = {}
      for (const [key, value] of Object.entries(values)) {
        if (value[slot]) {
          const rest = takeDescendants(descendants, value[slot], skipped, {
            name: axis,
            key,
          })
          styles[key] = transformRecipeStyle(rest, skipped)
        }
      }
      if (Object.keys(styles).length > 0) {
        slotAxes.push({
          name: axis,
          exportName: axisCollectionName(stylesName, axis),
          typeName: '',
          keys: Object.keys(styles),
          styles,
          textStyles: {},
        })
      }
    }

    base = applyDescendantAssignments(stylesName, descendants, base, slotAxes)
    collectIdents(base, used)
    const descendantBlocks = emitDescendantBlocks(stylesName, descendants)
    allVars.push(...descendantBlocks.vars)
    allVarNames.push(...descendantBlocks.varNames)
    for (const ident of descendantBlocks.varsUsed) {
      varsUsed.add(ident)
    }
    blocks.push(emitCreate(stylesName, { base }))

    for (const axis of slotAxes) {
      for (const style of Object.values(axis.styles)) {
        collectIdents(style, used)
      }
      blocks.push(emitCreate(axis.exportName, axis.styles))
      slotEntry.push(
        `      ${axis.name === 'size' ? 'sizes' : axis.name === 'variant' ? 'variants' : axis.name}: ${axis.exportName}`,
      )
    }

    blocks.push(...descendantBlocks.consumers)
    slotEntry.push(...descendantBlocks.bagFields.map((field) => `      ${field}`))

    slotBag.push(`    ${emitKey(slot)}: {\n${slotEntry.join(',\n')},\n    }`)
  }

  const axisTypes = Object.keys(recipe.variants ?? {})
    .filter((axis) => !SKIP_AXES.has(axis))
    .map((axis) => {
      const firstSlot = slots.find((slot) => {
        const values = recipe.variants?.[axis]
        return values && Object.values(values).some((value) => value[slot])
      })
      if (!firstSlot) {
        return ''
      }
      const exportName =
        axis === 'size'
          ? `${name}${pascalCase(firstSlot)}Sizes`
          : axis === 'variant'
            ? `${name}${pascalCase(firstSlot)}Variants`
            : axisCollectionName(`${name}${pascalCase(firstSlot)}`, axis)
      return `export type ${typeName(name, axis)} = keyof typeof ${exportName}`
    })
    .filter(Boolean)

  const helperAxes = Object.keys(defaults).filter((axis) => !SKIP_AXES.has(axis))

  const parts = [
    generatedBanner(),
    "import * as stylex from '@stylexjs/stylex'",
    emitVarsImport(toKebabCase(name), allVarNames),
    emitImports(used),
    emitVarsReexport(allVarNames),
    ...blocks,
    ...axisTypes,
    `export const ${name}SlotRecipe = {
  slots: {
${slotBag.join(',\n')}
  },
  defaultVariants: ${literal(defaults)},
} as const`,
    emitSlotHelper(name, helperAxes, defaults),
  ]

  return {
    code: `${parts.filter(Boolean).join('\n\n')}\n`,
    varsCode: emitVarsFile(allVars, varsUsed),
    skipped: unique(skipped),
  }
}

function collectAxes(
  recipeName: string,
  variants: Record<string, Record<string, StyleObject>>,
  skipped: string[],
): AxisMap[] {
  return Object.entries(variants)
    .filter(([axis]) => !SKIP_AXES.has(axis))
    .map(([axis, values]) => {
      const styles: Record<string, TransformedStyle> = {}
      const textStyles: Record<string, string> = {}

      for (const [key, value] of Object.entries(values)) {
        const { textStyle, rest } = splitTextStyle(value)
        styles[key] = transformRecipeStyle(rest, skipped)
        if (textStyle) {
          textStyles[key] = textStyleRef(textStyle)
        }
      }

      return {
        name: axis,
        exportName: axisCollectionName(recipeName, axis),
        typeName: typeName(recipeName, axis),
        keys: Object.keys(values),
        styles,
        textStyles,
      }
    })
}

function mergeSingleAxisCompounds(
  compounds: Array<Record<string, unknown> & { css?: StyleObject }>,
  axes: AxisMap[],
  skipped: string[],
) {
  for (const compound of compounds) {
    const conditions = compoundConditions(compound)
    if (conditions.length !== 1 || !compound.css) {
      continue
    }

    const [axis, values] = conditions[0]
    const target = axes.find((item) => item.name === axis)
    if (!target) {
      continue
    }

    const css = transformRecipeStyle(compound.css, skipped)
    for (const value of values) {
      target.styles[value] = mergeStyles(target.styles[value] ?? {}, css)
    }
  }
}

function collectTwoAxisCompounds(
  recipeName: string,
  compounds: Array<Record<string, unknown> & { css?: StyleObject }>,
  skipped: string[],
): CompoundMap[] {
  const groups = new Map<string, CompoundMap>()

  for (const compound of compounds) {
    const conditions = compoundConditions(compound)
    if (conditions.length !== 2 || !compound.css) {
      continue
    }

    const singleton = conditions.find(([, values]) => values.length === 1)
    const varying = conditions.find((item) => item !== singleton)
    if (!singleton || !varying) {
      skipped.push(`compound:${JSON.stringify(conditions)}`)
      continue
    }

    const [whenAxis, whenValues] = singleton
    const [keyAxis, keyValues] = varying
    const whenValue = whenValues[0]
    const groupKey = `${whenAxis}:${whenValue}:${keyAxis}`
    const existing = groups.get(groupKey) ?? {
      exportName: `${recipeName}When${pascalCase(whenAxis)}${pascalCase(whenValue)}`,
      whenAxis,
      whenValue,
      keyAxis,
      styles: {},
    }

    const css = transformRecipeStyle(compound.css, skipped)
    for (const key of keyValues) {
      existing.styles[key] = mergeStyles(existing.styles[key] ?? {}, css)
    }
    groups.set(groupKey, existing)
  }

  return [...groups.values()]
}

function compoundConditions(
  compound: Record<string, unknown>,
): Array<[string, string[]]> {
  return Object.entries(compound)
    .filter(([key]) => key !== 'css' && !SKIP_AXES.has(key))
    .map(([axis, value]) => [axis, toStringArray(value)] as [string, string[]])
}

function collectSlots(recipe: ChakraSlotRecipe): string[] {
  const slots = new Set<string>()

  for (const slot of Object.keys(recipe.base ?? {})) {
    slots.add(slot)
  }

  for (const axis of Object.values(recipe.variants ?? {})) {
    for (const value of Object.values(axis)) {
      for (const slot of Object.keys(value)) {
        slots.add(slot)
      }
    }
  }

  return [...slots]
}

function takeDescendants(
  store: Record<string, DescendantStore>,
  styles: StyleObject,
  skipped: string[],
  axis?: { name: string; key: string },
): StyleObject {
  const rest: StyleObject = {}
  const children: Record<string, StyleObject> = {}

  for (const [key, value] of Object.entries(styles)) {
    const slot = DESCENDANT_SLOTS[key]
    if (slot && value && typeof value === 'object' && !Array.isArray(value)) {
      children[slot] = { ...children[slot], ...(value as StyleObject) }
      continue
    }
    rest[key] = value
  }

  for (const [slot, child] of Object.entries(children)) {
    const transformed = transformRecipeStyle(child, skipped)
    const entry = store[slot] ?? { defaults: {}, axes: {} }

    if (!axis) {
      entry.defaults = mergeStyles(entry.defaults, transformed)
    } else {
      entry.axes[axis.name] ??= {}
      entry.axes[axis.name][axis.key] = mergeStyles(
        entry.axes[axis.name][axis.key] ?? {},
        transformed,
      )
    }

    store[slot] = entry
  }

  return rest
}

function ensureDescendantDefaults(entry: DescendantStore) {
  for (const styles of Object.values(entry.axes)) {
    for (const style of Object.values(styles)) {
      for (const [key, value] of Object.entries(style)) {
        if (!(key in entry.defaults) && (typeof value !== 'object' || value == null)) {
          entry.defaults[key] = value
        }
      }
    }
  }
}

function descendantVarsName(prefix: string, slot: string): string {
  return `${prefix}${pascalCase(slot)}Vars`
}

function descendantStylesName(prefix: string, slot: string): string {
  return `${prefix}${pascalCase(slot)}`
}

function toVarKey(property: string): string {
  if (property.startsWith('--')) {
    return toStylexKey([property.slice(2)])
  }

  return property
}

function toVarAssignments(
  varsName: string,
  styles: TransformedStyle,
): TransformedStyle {
  const next: TransformedStyle = {}

  for (const [property, value] of Object.entries(styles)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      next[property] = toVarAssignments(varsName, value)
      continue
    }

    next[`[${varsName}.${toVarKey(property)}]`] = value
  }

  return next
}

function applyDescendantAssignments(
  prefix: string,
  store: Record<string, DescendantStore>,
  base: TransformedStyle,
  axes: AxisMap[],
): TransformedStyle {
  let next = base

  for (const [slot, entry] of Object.entries(store)) {
    ensureDescendantDefaults(entry)
    const varsName = descendantVarsName(prefix, slot)
    next = mergeStyles(next, toVarAssignments(varsName, entry.defaults))

    for (const [axisName, keys] of Object.entries(entry.axes)) {
      const axis = axes.find((item) => item.name === axisName)
      if (!axis) {
        continue
      }

      for (const [key, style] of Object.entries(keys)) {
        axis.styles[key] = mergeStyles(
          axis.styles[key] ?? {},
          toVarAssignments(varsName, style),
        )
      }
    }
  }

  return next
}

function emitDescendantBlocks(
  prefix: string,
  store: Record<string, DescendantStore>,
): {
  vars: string[]
  varNames: string[]
  varsUsed: Set<string>
  consumers: string[]
  bagFields: string[]
  helpers: string[]
} {
  const vars: string[] = []
  const varNames: string[] = []
  const varsUsed = new Set<string>()
  const consumers: string[] = []
  const bagFields: string[] = []
  const helpers: string[] = []

  for (const [slot, entry] of Object.entries(store)) {
    ensureDescendantDefaults(entry)
    if (Object.keys(entry.defaults).length === 0) {
      continue
    }

    const varsName = descendantVarsName(prefix, slot)
    const stylesName = descendantStylesName(prefix, slot)
    collectIdents(entry.defaults, varsUsed)
    varNames.push(varsName)

    const varBody = Object.entries(entry.defaults)
      .filter(([, value]) => typeof value !== 'object' || value == null)
      .map(([property, value]) => {
        return `  ${emitKey(toVarKey(property))}: ${printStyleValue(value)},`
      })
      .join('\n')

    vars.push(`export const ${varsName} = stylex.defineVars({\n${varBody}\n})`)

    const consumerBody = Object.entries(entry.defaults)
      .filter(([, value]) => typeof value !== 'object' || value == null)
      .map(([property]) => {
        return `    ${emitKey(property)}: ${varsName}.${toVarKey(property)},`
      })
      .join('\n')

    consumers.push(
      `export const ${stylesName} = stylex.create({\n  base: {\n${consumerBody}\n  },\n})`,
    )
    bagFields.push(
      `${slot}: {\n    vars: ${varsName},\n    styles: ${stylesName},\n  }`,
    )
    helpers.push(`export function ${stylesName}Styles() {
  return [${stylesName}.base]
}`)
  }

  return { vars, varNames, varsUsed, consumers, bagFields, helpers }
}

function emitVarsFile(vars: string[], used: Set<string>): string | undefined {
  if (vars.length === 0) {
    return undefined
  }

  return `${[
    generatedBanner(),
    "import * as stylex from '@stylexjs/stylex'",
    emitImports(used),
    ...vars,
  ]
    .filter(Boolean)
    .join('\n\n')}\n`
}

function emitVarsImport(fileName: string, varNames: string[]): string {
  if (varNames.length === 0) {
    return ''
  }

  return `import { ${varNames.join(', ')} } from './${fileName}.stylex.ts'`
}

function emitVarsReexport(varNames: string[]): string {
  if (varNames.length === 0) {
    return ''
  }

  return `export { ${varNames.join(', ')} }`
}

function printStyleValue(value: string | number | TransformedStyle): string {
  if (typeof value === 'number') {
    return String(value)
  }

  if (typeof value !== 'string') {
    return styleObjectToCode(value, 4)
  }

  if (/^[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*$/.test(value)) {
    return value
  }

  if (value.startsWith('`') || value.startsWith('color-mix(')) {
    return value
  }

  return JSON.stringify(value)
}

function transformRecipeStyle(
  styles: StyleObject,
  skipped: string[],
): TransformedStyle {
  const meta = { skipped: [] as string[] }
  const result = transformStyleObject(styles, meta)
  skipped.push(...meta.skipped)
  return result
}

function splitTextStyle(styles: StyleObject): {
  textStyle?: string
  rest: StyleObject
} {
  const { textStyle, ...rest } = styles
  return {
    textStyle: typeof textStyle === 'string' ? textStyle : undefined,
    rest,
  }
}

function textStyleRef(name: string): string {
  return `textStyles.${toStylexKey([name])}`
}

function emitCreate(
  exportName: string,
  styles: Record<string, TransformedStyle>,
): string {
  const body = Object.entries(styles)
    .map(([key, style]) => {
      return `  ${emitKey(key)}: ${styleObjectToCode(style, 4)},`
    })
    .join('\n')

  return `export const ${exportName} = stylex.create({\n${body}\n})`
}

function emitTextStyleMap(
  exportName: string,
  textStyles: Record<string, string>,
): string {
  const body = Object.entries(textStyles)
    .map(([key, value]) => `  ${emitKey(key)}: ${value},`)
    .join('\n')

  return `export const ${exportName} = {\n${body}\n} as const`
}

function emitRecipeBag(
  name: string,
  axes: AxisMap[],
  compounds: CompoundMap[],
  defaults: Record<string, string>,
  hasTextStyles: boolean,
  extraFields: string[] = [],
): string {
  const fields = [
    `  styles: ${name}Styles`,
    ...axes.map((axis) => `  ${axis.name === 'size' ? 'sizes' : axis.name === 'variant' ? 'variants' : axis.name}: ${axis.exportName}`),
    ...(hasTextStyles ? [`  textStyles: ${name}TextStyles`] : []),
    ...compounds.map(
      (compound) =>
        `  when${pascalCase(compound.whenAxis)}${pascalCase(compound.whenValue)}: ${compound.exportName}`,
    ),
    ...extraFields.map((field) => `  ${field}`),
    `  defaultVariants: ${literal(defaults)}`,
  ]

  return `export const ${name}Recipe = {\n${fields.join(',\n')},\n} as const`
}

function emitRecipeHelper(
  name: string,
  axes: AxisMap[],
  compounds: CompoundMap[],
  defaults: Record<string, string>,
): string {
  const params = axes
    .map((axis) => `  ${axis.name}?: ${axis.typeName}`)
    .concat('  colorPalette?: string')
    .join('\n')

  const resolved = axes
    .map((axis) => {
      const fallback = defaults[axis.name]
      return fallback
        ? `  const ${axis.name} = variants?.${axis.name} ?? ${name}Recipe.defaultVariants.${axis.name}`
        : `  const ${axis.name} = variants?.${axis.name} ?? ${JSON.stringify(axis.keys[0])}`
    })
    .join('\n')

  const textAxis = axes.find((axis) => Object.keys(axis.textStyles).length > 0)
  const applied = [
    `${name}Styles.base`,
    textAxis ? `${name}TextStyles[${textAxis.name}]` : null,
    ...axes.map((axis) => `${axis.exportName}[${axis.name}]`),
    ...compounds.map((compound) => {
      const key = compound.keyAxis
      return `${compound.whenAxis} === ${JSON.stringify(compound.whenValue)} && ${compound.exportName}[${key} as keyof typeof ${compound.exportName}]`
    }),
  ].filter(Boolean)

  return `export function ${name}RecipeStyles(variants?: {
${params}
}) {
${resolved}

  return [
    ${applied.join(',\n    ')},
  ]
}

export type ${pascalCase(name)}VariantProps = Parameters<typeof ${name}RecipeStyles>[0]`
}

function emitSlotHelper(
  name: string,
  axes: string[],
  defaults: Record<string, string>,
): string {
  const typeFields = axes
    .map((axis) => `    ${axis}?: ${typeName(name, axis)}`)
    .join('\n')

  const resolved = axes
    .map((axis) => {
      const fallback = defaults[axis]
      return fallback
        ? `  const ${axis} = variants?.${axis} ?? ${name}SlotRecipe.defaultVariants.${axis}`
        : `  const ${axis} = variants?.${axis}`
    })
    .join('\n')

  const lookups = [
    'def.styles.base',
    ...axes.map((axis) => {
      if (axis === 'size') {
        return `'sizes' in def ? def.sizes[${axis} as keyof typeof def.sizes] : false`
      }
      if (axis === 'variant') {
        return `'variants' in def ? def.variants[${axis} as keyof typeof def.variants] : false`
      }
      return `'${axis}' in def ? def.${axis}[${axis} as keyof typeof def.${axis}] : false`
    }),
  ]

  return `export function ${name}SlotStyles(
  slot: keyof typeof ${name}SlotRecipe.slots,
  variants?: {
${typeFields}
  },
) {
${resolved}
  const def = ${name}SlotRecipe.slots[slot]

  return [
    ${lookups.join(',\n    ')},
  ]
}`
}

function emitImports(used: Set<string>): string {
  return [...used]
    .sort()
    .filter((ident) => RECIPE_IMPORTS[ident])
    .map((ident) => `import { ${ident} } from '${RECIPE_IMPORTS[ident]}'`)
    .join('\n')
}

function collectIdents(value: unknown, into: Set<string>) {
  if (typeof value === 'string') {
    for (const ident of Object.keys(RECIPE_IMPORTS)) {
      if (value.includes(`${ident}.`)) {
        into.add(ident)
      }
    }
    return
  }

  if (value && typeof value === 'object') {
    for (const nested of Object.values(value)) {
      collectIdents(nested, into)
    }
  }
}

function mergeStyles(
  left: TransformedStyle,
  right: TransformedStyle,
): TransformedStyle {
  const result: TransformedStyle = { ...left }

  for (const [key, value] of Object.entries(right)) {
    const current = result[key]
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      current &&
      typeof current === 'object' &&
      !Array.isArray(current)
    ) {
      result[key] = mergeStyles(current, value)
    } else {
      result[key] = value
    }
  }

  return result
}

function axisCollectionName(recipeName: string, axis: string): string {
  if (axis === 'size') {
    return `${recipeName}Sizes`
  }
  if (axis === 'variant') {
    return `${recipeName}Variants`
  }
  return `${recipeName}${pascalCase(axis)}${axis.endsWith('s') ? '' : 's'}`
}

function typeName(recipeName: string, axis: string): string {
  return `${pascalCase(recipeName)}${pascalCase(axis)}`
}

function omitSkippedAxes(
  defaults: Record<string, string | number | boolean>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(defaults)
      .filter(([axis]) => !SKIP_AXES.has(axis))
      .map(([axis, value]) => [axis, String(value)]),
  )
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String)
  }
  if (value == null) {
    return []
  }
  return [String(value)]
}

function emitKey(key: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key)
}

function pascalCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function literal(value: Record<string, string>): string {
  const entries = Object.entries(value)
  if (entries.length === 0) {
    return '{}'
  }

  const body = entries
    .map(([key, item]) => `    ${emitKey(key)}: ${JSON.stringify(item)}`)
    .join(',\n')
  return `{\n${body},\n  }`
}

function generatedBanner(): string {
  return '/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */'
}

function unique(values: string[]): string[] {
  return [...new Set(values)]
}

export function stripSuiPrefix(name: string): string {
  return name.replace(/^sui(?=[A-Z])/, '').replace(/^./, (char) => char.toLowerCase())
}

export function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}
