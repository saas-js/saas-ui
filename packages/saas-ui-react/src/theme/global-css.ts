import { defineGlobalStyles } from '@chakra-ui/react'

const empty = 'var(--chakra-empty,/*!*/ /*!*/)'

export const globalCss = defineGlobalStyles({
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
    '--overlay-translucency': '95%',
    '--overlay-effect': 'blur({blurs.lg})',
    '--backdrop-effect': 'none',
    '--scrollbar-color': 'colors.border.emphasized',
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--scrollbar-color) transparent',
  },
  '.dark *': {
    '--overlay-translucency': '85%',
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
