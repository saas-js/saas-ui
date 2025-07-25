import { defineLayerStyles } from '@chakra-ui/react'

export const layerStyles: any = defineLayerStyles({
  // fill: some background color + color combination
  'fill.muted': {
    value: {
      background: 'colorPalette.muted',
      color: 'colorPalette.fg',
    },
  },
  'fill.subtle': {
    value: {
      background: 'colorPalette.subtle',
      color: 'colorPalette.fg',
    },
  },
  'fill.surface': {
    value: {
      background: 'colorPalette.muted',
      color: 'colorPalette.fg',
      boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
      boxShadowColor: 'colorPalette.subtle',
    },
  },
  'fill.solid': {
    value: {
      background: 'colorPalette.solid',
      color: 'colorPalette.contrast',
    },
  },

  // outline: some border color + color combination
  'outline.subtle': {
    value: {
      color: 'colorPalette.fg',
      boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
      boxShadowColor: 'colorPalette.subtle',
    },
  },
  'outline.solid': {
    value: {
      borderWidth: '1px',
      borderColor: 'colorPalette.solid',
      color: 'colorPalette.fg',
    },
  },

  // indicator: floating border color or left/bottom border
  'indicator.bottom': {
    value: {
      position: 'relative',
      '--indicator-color-fallback': 'colors.colorPalette.solid',
      _before: {
        content: `""`,
        position: 'absolute',
        bottom: 'var(--indicator-offset-y, 0)',
        insetInline: 'var(--indicator-offset-x, 0)',
        height: 'var(--indicator-thickness, 3px)',
        borderTopLeftRadius: 'var(--indicator-thickness, 3px)',
        borderTopRightRadius: 'var(--indicator-thickness, 3px)',
        background: 'var(--indicator-color, var(--indicator-color-fallback))',
      },
    },
  },
  'indicator.top': {
    value: {
      position: 'relative',
      '--indicator-color-fallback': 'colors.colorPalette.solid',
      _before: {
        content: `""`,
        position: 'absolute',
        top: 'var(--indicator-offset-y, 0)',
        insetInline: 'var(--indicator-offset-x, 0)',
        height: 'var(--indicator-thickness, 3px)',
        borderBottomLeftRadius: 'var(--indicator-thickness, 3px)',
        borderBottomRightRadius: 'var(--indicator-thickness, 3px)',
        background: 'var(--indicator-color, var(--indicator-color-fallback))',
      },
    },
  },
  'indicator.start': {
    value: {
      position: 'relative',
      '--indicator-color-fallback': 'colors.colorPalette.solid',
      _before: {
        content: `""`,
        position: 'absolute',
        insetInlineStart: 'var(--indicator-offset-x, 0)',
        insetBlock: 'var(--indicator-offset-y, 0)',
        width: 'var(--indicator-thickness, 3px)',
        borderTopLeftRadius: 'var(--indicator-thickness, 3px)',
        borderBottomLeftRadius: 'var(--indicator-thickness, 3px)',
        background: 'var(--indicator-color, var(--indicator-color-fallback))',
      },
    },
  },
  'indicator.end': {
    value: {
      position: 'relative',
      '--indicator-color-fallback': 'colors.colorPalette.solid',
      _before: {
        content: `""`,
        position: 'absolute',
        insetInlineEnd: 'var(--indicator-offset-x, 0)',
        insetBlock: 'var(--indicator-offset-y, 0)',
        width: 'var(--indicator-thickness, 3px)',
        borderTopRightRadius: 'var(--indicator-thickness, 3px)',
        borderBottomRightRadius: 'var(--indicator-thickness, 3px)',
        background: 'var(--indicator-color, var(--indicator-color-fallback))',
      },
    },
  },

  disabled: {
    value: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },

  none: {
    value: {},
  },

  overlay: {
    value: {
      bg: 'bg.overlay',
      backdropFilter: 'var(--overlay-effect)',
      borderRadius: 'panel.lg',
      boxShadow: 'overlay',
    },
  },

  backdrop: {
    value: {
      bg: 'bg.backdrop',
      backdropFilter: 'var(--backdrop-effect)',
    },
  },
})
