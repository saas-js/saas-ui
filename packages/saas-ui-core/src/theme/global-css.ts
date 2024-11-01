import { defineGlobalStyles } from '@chakra-ui/react'

const empty = 'var(--chakra-empty,/*!*/ /*!*/)'

export const globalCss = defineGlobalStyles({
  '*': {
    fontFeatureSettings: '"cv11"',
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
    '--radius-factor': '1',
    '--radius-full': '9999px',
    '--scale-factor': '1',
  },
  body: {
    color: 'fg',
    bg: 'bg',
    lineHeight: '1.5',
    colorPalette: 'accent',
  },
  '*::placeholder': {
    color: 'fg.subtle',
  },
  '*::selection': {
    bg: 'colorPalette.muted/80',
  },
  '[data-radius="none"]': {
    '--radius-factor': '0',
    '--radius-full': '0',
  },
  '[data-radius="sm"]': {
    '--radius-factor': '0.9',
    '--radius-full': '0',
  },
  '[data-radius="md"]': {
    '--radius-factor': '1',
    '--radius-full': '0',
  },
  '[data-radius="lg"]': {
    '--radius-factor': '1.5',
    '--radius-full': '0',
  },
  '[data-radius="full"]': {
    '--radius-factor': '1.5',
    '--radius-full': '9999px',
  },
  '[data-scale="xs"]': {
    '--scale-factor': '0.9',
  },
  '[data-scale="sm"]': {
    '--scale-factor': '0.95',
  },
  '[data-scale="md"]': {
    '--scale-factor': '1',
  },
  '[data-scale="lg"]': {
    '--scale-factor': '1.05',
  },
  '[data-scale="xl"]': {
    '--scale-factor': '1.1',
  },
})
