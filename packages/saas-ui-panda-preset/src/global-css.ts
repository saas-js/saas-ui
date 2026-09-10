import { appearanceGlobalCss } from './appearance.ts'
import { defineGlobalStyles } from './def'

const empty = 'var(--chakra-empty,/*!*/ /*!*/)'

export const globalCss = defineGlobalStyles({
  ...appearanceGlobalCss,
  '*': {
    '--ring-inset': empty,
    '--ring-offset-width': '0px',
    '--ring-offset-color': '#fff',
    '--ring-color': 'rgba(66, 153, 225, 0.6)',
    '--ring-offset-shadow': '0 0 #0000',
    '--ring-shadow': '0 0 #0000',
    ...Object.fromEntries(
      [
        'brightness',
        'contrast',
        'grayscale',
        'hue-rotate',
        'invert',
        'saturate',
        'sepia',
        'drop-shadow',
      ].map((prop) => [`--${prop}`, empty]),
    ),
    ...Object.fromEntries(
      [
        'blur',
        'brightness',
        'contrast',
        'grayscale',
        'hue-rotate',
        'invert',
        'opacity',
        'saturate',
        'sepia',
      ].map((prop) => [`--backdrop-${prop}`, empty]),
    ),
    '--global-font-mono': 'fonts.mono',
    '--global-font-body': 'fonts.body',
    '--global-color-border': 'colors.border',
    '--cursor-button': 'default',
    '--radius-full': '9999px',
    '--scale-factor': '1',
    '--radius-factor': '1',
    '--radius-control-factor': '1',
    '--radius-panel-factor': '1',
    '--radius-indicator-factor': '1',
    '--focus-ring-width': '1px',
    '--focus-ring-style': 'solid',
    '--focus-ring-offset': '1px',
    '--focus-ring-color': '{colors.accent.solid}',
    '--color-shadow': '{colors.shadow}',
    '--motion-fast': '150ms',
    '--motion-medium': '200ms',
    '--motion-slow': '400ms',
    '--motion-ratio': '0.75',
    '--ease-standard': 'cubic-bezier(0.24, 1, 0.4, 1)',
    '--overlay-effect': 'blur({blurs.lg})',
    '--backdrop-effect': 'none',
    '--scrollbar-color': 'colors.border.emphasized',
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--scrollbar-color) transparent',
  },
  body: {
    color: 'fg',
    bg: 'bg',
    lineHeight: '1.5',
    colorPalette: 'accent',
  },
  '*::placeholder, *[data-placeholder]': {
    color: 'fg.muted/90',
  },
  '*::selection': {
    bg: 'colorPalette.solid/20',
  },
})
