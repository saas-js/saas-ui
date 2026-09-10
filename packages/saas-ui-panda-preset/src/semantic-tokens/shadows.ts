import { defineSemanticTokens } from '../def'

export const semanticShadows = defineSemanticTokens.shadows({
  xs: {
    value: {
      _light: '0px 1px 2px {colors.shadow/5}, 0px 0px 1px {colors.shadow/5}',
      _dark:
        '0px 1px 1px {colors.shadow/30}, 0px 0px 1px inset {colors.white/5}',
    },
  },
  sm: {
    value: {
      _light: '0px 2px 4px {colors.shadow/5}, 0px 0px 2px {colors.shadow/5}',
      _dark:
        '0px 2px 4px {colors.shadow/30}, 0px 0px 1px inset {colors.white/5}',
    },
  },
  md: {
    value: {
      _light: '0px 4px 8px {colors.shadow/5}, 0px 0px 3px {colors.shadow/5}',
      _dark:
        '0px 4px 8px {colors.shadow/30}, 0px 0px 1px inset {colors.white/5}',
    },
  },
  lg: {
    value: {
      _light: '0px 8px 16px {colors.shadow/5}, 0px 0px 4px {colors.shadow/5}',
      _dark:
        '0px 8px 16px {colors.shadow/30}, 0px 0px 1px inset {colors.white/5}',
    },
  },
  xl: {
    value: {
      _light: '0px 16px 24px {colors.shadow/5}, 0px 0px 5px {colors.shadow/5}',
      _dark:
        '0px 16px 24px {colors.shadow/30}, 0px 0px 1px inset {colors.white/5}',
    },
  },
  '2xl': {
    value: {
      _light: '0px 24px 40px {colors.shadow/10}, 0px 0px 6px {colors.shadow/5}',
      _dark:
        '0px 24px 40px {colors.shadow/30}, 0px 0px 1px inset {colors.white/5}',
    },
  },
  inner: {
    value: {
      _light: 'inset 0 2px 4px 0 {colors.shadow/5}',
      _dark: 'inset 0 2px 4px 0 {colors.shadow}',
    },
  },
  inset: {
    value: {
      _light: 'inset 0 1px 2px 0 {colors.shadow/5}',
      _dark:
        'inset 0 -1px 2px 0 {colors.white/4}, inset 0 0 0 1px {colors.white/4}',
    },
  },
  overlay: {
    value: {
      _light:
        '0px 8px 16px {colors.shadow/5}, 0px 0px 4px {colors.shadow/5}, 0px 0px 1px {colors.shadow/80}',
      _dark:
        '0px 8px 16px {colors.shadow/20}, 0px 0px 3px {colors.shadow/20}, 0px 0px 1px {colors.white/80}',
    },
  },
})
