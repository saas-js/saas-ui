/**
 * Chakra style shorthands → CSS properties, plus the token category used to
 * resolve bare values like `px: '2'` → spacing._2.
 *
 * Mirrors Chakra's styled-system utilities:
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/styled-system
 */
export type TokenCategory =
  | 'colors'
  | 'spacing'
  | 'sizes'
  | 'radii'
  | 'fontSizes'
  | 'fontWeights'
  | 'lineHeights'
  | 'letterSpacings'
  | 'shadows'
  | 'durations'
  | 'easings'
  | 'zIndex'
  | 'blurs'
  | 'borders'
  | 'fonts'
  | 'cursor'
  | 'animations'

export interface PropertyMap {
  css: string | string[]
  category?: TokenCategory
}

export const properties: Record<string, PropertyMap> = {
  bg: { css: 'backgroundColor', category: 'colors' },
  bgColor: { css: 'backgroundColor', category: 'colors' },
  background: { css: 'background', category: 'colors' },
  backgroundColor: { css: 'backgroundColor', category: 'colors' },
  backgroundImage: { css: 'backgroundImage' },
  backgroundSize: { css: 'backgroundSize' },
  backgroundClip: { css: 'backgroundClip' },
  color: { css: 'color', category: 'colors' },
  borderColor: { css: 'borderColor', category: 'colors' },
  borderTopColor: { css: 'borderTopColor', category: 'colors' },
  borderBottomColor: { css: 'borderBottomColor', category: 'colors' },
  outlineColor: { css: 'outlineColor', category: 'colors' },
  fill: { css: 'fill', category: 'colors' },
  stroke: { css: 'stroke', category: 'colors' },
  shadowColor: { css: '--shadow-color', category: 'colors' },
  boxShadowColor: { css: '--shadow-color', category: 'colors' },
  focusRingColor: { css: '--focus-ring-color', category: 'colors' },

  p: { css: 'padding', category: 'spacing' },
  px: { css: 'paddingInline', category: 'spacing' },
  paddingX: { css: 'paddingInline', category: 'spacing' },
  py: { css: 'paddingBlock', category: 'spacing' },
  paddingY: { css: 'paddingBlock', category: 'spacing' },
  pt: { css: 'paddingTop', category: 'spacing' },
  pr: { css: 'paddingRight', category: 'spacing' },
  pb: { css: 'paddingBottom', category: 'spacing' },
  pl: { css: 'paddingLeft', category: 'spacing' },
  padding: { css: 'padding', category: 'spacing' },
  paddingInline: { css: 'paddingInline', category: 'spacing' },
  paddingBlock: { css: 'paddingBlock', category: 'spacing' },
  paddingTop: { css: 'paddingTop', category: 'spacing' },
  paddingRight: { css: 'paddingRight', category: 'spacing' },
  paddingBottom: { css: 'paddingBottom', category: 'spacing' },
  paddingLeft: { css: 'paddingLeft', category: 'spacing' },
  m: { css: 'margin', category: 'spacing' },
  mx: { css: 'marginInline', category: 'spacing' },
  marginX: { css: 'marginInline', category: 'spacing' },
  my: { css: 'marginBlock', category: 'spacing' },
  mt: { css: 'marginTop', category: 'spacing' },
  mr: { css: 'marginRight', category: 'spacing' },
  mb: { css: 'marginBottom', category: 'spacing' },
  ml: { css: 'marginLeft', category: 'spacing' },
  margin: { css: 'margin', category: 'spacing' },
  gap: { css: 'gap', category: 'spacing' },
  rowGap: { css: 'rowGap', category: 'spacing' },
  columnGap: { css: 'columnGap', category: 'spacing' },
  inset: { css: 'inset', category: 'spacing' },
  top: { css: 'top', category: 'spacing' },
  right: { css: 'right', category: 'spacing' },
  bottom: { css: 'bottom', category: 'spacing' },
  left: { css: 'left', category: 'spacing' },

  w: { css: 'width', category: 'sizes' },
  h: { css: 'height', category: 'sizes' },
  minW: { css: 'minWidth', category: 'sizes' },
  minH: { css: 'minHeight', category: 'sizes' },
  maxW: { css: 'maxWidth', category: 'sizes' },
  maxH: { css: 'maxHeight', category: 'sizes' },
  boxSize: { css: ['width', 'height'], category: 'sizes' },
  width: { css: 'width', category: 'sizes' },
  height: { css: 'height', category: 'sizes' },
  minWidth: { css: 'minWidth', category: 'sizes' },
  minHeight: { css: 'minHeight', category: 'sizes' },
  maxWidth: { css: 'maxWidth', category: 'sizes' },
  maxHeight: { css: 'maxHeight', category: 'sizes' },

  borderRadius: { css: 'borderRadius', category: 'radii' },
  rounded: { css: 'borderRadius', category: 'radii' },
  borderTopRadius: {
    css: ['borderTopLeftRadius', 'borderTopRightRadius'],
    category: 'radii',
  },

  fontSize: { css: 'fontSize', category: 'fontSizes' },
  fontWeight: { css: 'fontWeight', category: 'fontWeights' },
  lineHeight: { css: 'lineHeight', category: 'lineHeights' },
  letterSpacing: { css: 'letterSpacing', category: 'letterSpacings' },
  fontFamily: { css: 'fontFamily', category: 'fonts' },

  shadow: { css: 'boxShadow', category: 'shadows' },
  boxShadow: { css: 'boxShadow', category: 'shadows' },

  zIndex: { css: 'zIndex', category: 'zIndex' },
  transitionDuration: { css: 'transitionDuration', category: 'durations' },
  animation: { css: 'animation', category: 'animations' },
  cursor: { css: 'cursor', category: 'cursor' },
  blur: { css: 'filter', category: 'blurs' },
  borderWidth: { css: 'borderWidth' },
  borderBottomWidth: { css: 'borderBottomWidth' },
  borderTopWidth: { css: 'borderTopWidth' },
  borderStyle: { css: 'borderStyle' },
}

export const cssOnlyProperties = new Set([
  'display',
  'appearance',
  'alignItems',
  'justifyContent',
  'alignSelf',
  'justifySelf',
  'userSelect',
  'position',
  'whiteSpace',
  'verticalAlign',
  'flexShrink',
  'flexGrow',
  'flex',
  'flexDirection',
  'flexWrap',
  'outline',
  'outlineWidth',
  'outlineOffset',
  'outlineStyle',
  'isolation',
  'overflow',
  'overflowX',
  'overflowY',
  'opacity',
  'visibility',
  'pointerEvents',
  'textAlign',
  'textTransform',
  'textDecoration',
  'textShadow',
  'textWrap',
  'wordWrap',
  'wordBreak',
  'fontVariantNumeric',
  'content',
  'transform',
  'transformOrigin',
  'transitionProperty',
  'transitionTimingFunction',
  'boxSizing',
  'objectFit',
  'objectPosition',
  'gridTemplateColumns',
  'gridTemplateRows',
  'placeItems',
  'placeContent',
  'insetInline',
  'insetBlock',
  'insetInlineStart',
  'insetInlineEnd',
  'minWidth',
  'maxWidth',
  'scale',
])

export function getProperty(key: string): PropertyMap | undefined {
  return properties[key]
}
