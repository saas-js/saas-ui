import { defineSemanticTokens } from '@chakra-ui/react'

export const semanticColors = defineSemanticTokens.colors({
  presence: {
    online: {
      value: { _light: '{colors.green.500}', _dark: '{colors.green.500}' },
    },
    offline: {
      value: { _light: '{colors.gray.400}', _dark: '{colors.gray.400}' },
    },
    busy: {
      value: { _light: '{colors.orange.500}', _dark: '{colors.orange.500}' },
    },
    dnd: {
      value: { _light: '{colors.red.500}', _dark: '{colors.red.500}' },
    },
    away: {
      value: { _light: '{colors.gray.400}', _dark: '{colors.gray.400}' },
    },
  },

  status: {
    success: {
      value: { _light: '{colors.green.500}', _dark: '{colors.green.500}' },
    },
    error: {
      value: { _light: '{colors.red.500}', _dark: '{colors.red.500}' },
    },
    warning: {
      value: { _light: '{colors.orange.500}', _dark: '{colors.orange.500}' },
    },
    info: {
      value: { _light: '{colors.blue.500}', _dark: '{colors.blue.500}' },
    },
  },

  sidebar: {
    bg: {
      value: { _light: '{colors.gray.100}', _dark: '{colors.black}' },
    },
    fg: {
      value: { _light: '{colors.gray.900}', _dark: '{colors.gray.100}' },
    },
    border: {
      value: { _light: '{colors.gray.200}', _dark: '{colors.gray.800}' },
    },
    accent: {
      bg: {
        value: { _light: '{colors.gray.200/80}', _dark: '{colors.gray.900}' },
      },
      fg: {
        value: { _light: '{colors.gray.900}', _dark: '{colors.gray.200}' },
      },
    },
  },

  bg: {
    DEFAULT: {
      value: { _light: '{colors.white}', _dark: '{colors.black}' },
    },
    muted: {
      value: { _light: '{colors.gray.50}', _dark: '{colors.gray.950}' },
    },
    subtle: {
      value: { _light: '{colors.gray.100}', _dark: '{colors.gray.900}' },
    },
    emphasized: {
      value: { _light: '{colors.gray.200}', _dark: '{colors.gray.800}' },
    },
    inverted: {
      value: { _light: '{colors.black}', _dark: '{colors.white}' },
    },
    content: {
      value: { _light: '{colors.gray.50}', _dark: '{colors.gray.950}' },
    },
    panel: {
      value: { _light: '{colors.white}', _dark: '{colors.gray.900}' },
    },
    overlay: {
      value: {
        _light:
          'color-mix(in oklch, {colors.white} var(--overlay-translucency), transparent)',
        _dark:
          'color-mix(in oklch, {colors.gray.900} var(--overlay-translucency), transparent)',
      },
    },
    backdrop: {
      value: {
        _light: '{colors.black/30}',
        _dark: '{colors.black/30}',
      },
    },
    error: {
      value: { _light: '{colors.red.50}', _dark: '{colors.red.950}' },
    },
    warning: {
      value: { _light: '{colors.orange.50}', _dark: '{colors.orange.950}' },
    },
    success: {
      value: { _light: '{colors.green.50}', _dark: '{colors.green.950}' },
    },
    info: {
      value: { _light: '{colors.blue.50}', _dark: '{colors.blue.950}' },
    },
  },

  fg: {
    DEFAULT: {
      value: { _light: '{colors.black}', _dark: '{colors.gray.50}' },
    },
    muted: {
      value: { _light: '{colors.gray.500}', _dark: '{colors.gray.500}' },
    },
    subtle: {
      value: { _light: '{colors.gray.600}', _dark: '{colors.gray.400}' },
    },
    emphasized: {
      value: { _light: '{colors.gray.800}', _dark: '{colors.gray.200}' },
    },
    inverted: {
      value: { _light: '{colors.gray.50}', _dark: '{colors.black}' },
    },
    error: {
      value: { _light: '{colors.red.500}', _dark: '{colors.red.400}' },
    },
    warning: {
      value: { _light: '{colors.orange.600}', _dark: '{colors.orange.300}' },
    },
    success: {
      value: { _light: '{colors.green.600}', _dark: '{colors.green.300}' },
    },
    info: {
      value: { _light: '{colors.blue.600}', _dark: '{colors.blue.300}' },
    },
  },

  border: {
    DEFAULT: {
      value: { _light: '{colors.gray.200}', _dark: '{colors.gray.800}' },
    },
    muted: {
      value: { _light: '{colors.gray.50}', _dark: '{colors.gray.950}' },
    },
    subtle: {
      value: { _light: '{colors.gray.100}', _dark: '{colors.gray.900}' },
    },
    emphasized: {
      value: { _light: '{colors.gray.300}', _dark: '{colors.gray.700}' },
    },
    inverted: {
      value: { _light: '{colors.gray.800}', _dark: '{colors.gray.200}' },
    },
    error: {
      value: { _light: '{colors.red.500}', _dark: '{colors.red.400}' },
    },
    warning: {
      value: { _light: '{colors.orange.500}', _dark: '{colors.orange.400}' },
    },
    success: {
      value: { _light: '{colors.green.500}', _dark: '{colors.green.400}' },
    },
    info: {
      value: { _light: '{colors.blue.500}', _dark: '{colors.blue.400}' },
    },
  },

  accent: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.indigo.700}', _dark: '{colors.indigo.300}' },
    },
    muted: {
      value: { _light: '{colors.indigo.50}', _dark: '{colors.indigo.950}' },
    },
    subtle: {
      value: { _light: '{colors.indigo.100}', _dark: '{colors.indigo.900}' },
    },
    emphasized: {
      value: { _light: '{colors.indigo.200}', _dark: '{colors.indigo.800}' },
    },
    solid: {
      value: { _light: '{colors.indigo.600}', _dark: '{colors.indigo.600}' },
    },
    focusRing: {
      value: { _light: '{colors.indigo.600}', _dark: '{colors.indigo.600}' },
    },
  },

  neutral: {
    contrast: {
      value: { _light: '{colors.white}', _dark: '{colors.black}' },
    },
    fg: {
      value: { _light: '{colors.gray.800}', _dark: '{colors.gray.200}' },
    },
    muted: {
      value: { _light: '{colors.gray.100}', _dark: '{colors.gray.900}' },
    },
    subtle: {
      value: { _light: '{colors.gray.200}', _dark: '{colors.gray.800}' },
    },
    emphasized: {
      value: { _light: '{colors.gray.300}', _dark: '{colors.gray.700}' },
    },
    solid: {
      value: { _light: '{colors.gray.900}', _dark: '{colors.white}' },
    },
    focusRing: {
      value: { _light: '{colors.gray.600}', _dark: '{colors.gray.600}' },
    },
  },

  slate: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.slate.900}', _dark: '{colors.slate.200}' },
    },
    muted: {
      value: { _light: '{colors.slate.100}', _dark: '{colors.slate.900}' },
    },
    subtle: {
      value: { _light: '{colors.slate.200}', _dark: '{colors.slate.800}' },
    },
    emphasized: {
      value: { _light: '{colors.slate.300}', _dark: '{colors.slate.700}' },
    },
    solid: {
      value: { _light: '{colors.slate.500}', _dark: '{colors.slate.500}' },
    },
    focusRing: {
      value: { _light: '{colors.slate.600}', _dark: '{colors.slate.600}' },
    },
  },

  gray: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.gray.900}', _dark: '{colors.gray.200}' },
    },
    muted: {
      value: { _light: '{colors.gray.50}', _dark: '{colors.gray.950}' },
    },
    subtle: {
      value: { _light: '{colors.gray.100}', _dark: '{colors.gray.900}' },
    },
    emphasized: {
      value: { _light: '{colors.gray.300}', _dark: '{colors.gray.700}' },
    },
    solid: {
      value: { _light: '{colors.gray.500}', _dark: '{colors.gray.500}' },
    },
    focusRing: {
      value: { _light: '{colors.gray.600}', _dark: '{colors.gray.600}' },
    },
  },

  zinc: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.zinc.900}', _dark: '{colors.zinc.200}' },
    },
    muted: {
      value: { _light: '{colors.zinc.50}', _dark: '{colors.zinc.950}' },
    },
    subtle: {
      value: { _light: '{colors.zinc.100}', _dark: '{colors.zinc.900}' },
    },
    emphasized: {
      value: { _light: '{colors.zinc.300}', _dark: '{colors.zinc.700}' },
    },
    solid: {
      value: { _light: '{colors.zinc.500}', _dark: '{colors.zinc.500}' },
    },
    focusRing: {
      value: { _light: '{colors.zinc.600}', _dark: '{colors.zinc.600}' },
    },
  },

  stone: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.stone.900}', _dark: '{colors.stone.200}' },
    },
    muted: {
      value: { _light: '{colors.stone.50}', _dark: '{colors.stone.950}' },
    },
    subtle: {
      value: { _light: '{colors.stone.100}', _dark: '{colors.stone.900}' },
    },
    emphasized: {
      value: { _light: '{colors.stone.300}', _dark: '{colors.stone.700}' },
    },
    solid: {
      value: { _light: '{colors.stone.500}', _dark: '{colors.stone.500}' },
    },
    focusRing: {
      value: { _light: '{colors.stone.600}', _dark: '{colors.stone.600}' },
    },
  },

  red: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.red.700}', _dark: '{colors.red.300}' },
    },
    muted: {
      value: { _light: '{colors.red.50}', _dark: '{colors.red.950}' },
    },
    subtle: {
      value: { _light: '{colors.red.100}', _dark: '{colors.red.900}' },
    },
    emphasized: {
      value: { _light: '{colors.red.200}', _dark: '{colors.red.800}' },
    },
    solid: {
      value: { _light: '{colors.red.600}', _dark: '{colors.red.600}' },
    },
    focusRing: {
      value: { _light: '{colors.red.600}', _dark: '{colors.red.600}' },
    },
  },

  orange: {
    contrast: {
      value: { _light: 'white', _dark: 'black' },
    },
    fg: {
      value: { _light: '{colors.orange.700}', _dark: '{colors.orange.300}' },
    },
    muted: {
      value: { _light: '{colors.orange.50}', _dark: '{colors.orange.950}' },
    },
    subtle: {
      value: { _light: '{colors.orange.100}', _dark: '{colors.orange.900}' },
    },
    emphasized: {
      value: { _light: '{colors.orange.200}', _dark: '{colors.orange.800}' },
    },
    solid: {
      value: { _light: '{colors.orange.600}', _dark: '{colors.orange.600}' },
    },
    focusRing: {
      value: { _light: '{colors.orange.600}', _dark: '{colors.orange.600}' },
    },
  },

  amber: {
    contrast: {
      value: { _light: 'black', _dark: 'black' },
    },
    fg: {
      value: { _light: '{colors.amber.700}', _dark: '{colors.amber.300}' },
    },
    muted: {
      value: { _light: '{colors.amber.50}', _dark: '{colors.amber.950}' },
    },
    subtle: {
      value: { _light: '{colors.amber.100}', _dark: '{colors.amber.900}' },
    },
    emphasized: {
      value: { _light: '{colors.amber.200}', _dark: '{colors.amber.800}' },
    },
    solid: {
      value: { _light: '{colors.amber.400}', _dark: '{colors.amber.400}' },
    },
    focusRing: {
      value: { _light: '{colors.amber.400}', _dark: '{colors.amber.400}' },
    },
  },

  yellow: {
    contrast: {
      value: { _light: 'black', _dark: 'black' },
    },
    fg: {
      value: { _light: '{colors.yellow.700}', _dark: '{colors.yellow.300}' },
    },
    muted: {
      value: { _light: '{colors.yellow.50}', _dark: '{colors.yellow.950}' },
    },
    subtle: {
      value: { _light: '{colors.yellow.100}', _dark: '{colors.yellow.900}' },
    },
    emphasized: {
      value: { _light: '{colors.yellow.200}', _dark: '{colors.yellow.800}' },
    },
    solid: {
      value: { _light: '{colors.yellow.400}', _dark: '{colors.yellow.400}' },
    },
    focusRing: {
      value: { _light: '{colors.yellow.400}', _dark: '{colors.yellow.400}' },
    },
  },

  lime: {
    contrast: {
      value: { _light: 'black', _dark: 'black' },
    },
    fg: {
      value: { _light: '{colors.lime.700}', _dark: '{colors.lime.300}' },
    },
    muted: {
      value: { _light: '{colors.lime.50}', _dark: '{colors.lime.950}' },
    },
    subtle: {
      value: { _light: '{colors.lime.100}', _dark: '{colors.lime.900}' },
    },
    emphasized: {
      value: { _light: '{colors.lime.200}', _dark: '{colors.lime.800}' },
    },
    solid: {
      value: { _light: '{colors.lime.400}', _dark: '{colors.lime.400}' },
    },
    focusRing: {
      value: { _light: '{colors.lime.400}', _dark: '{colors.lime.400}' },
    },
  },

  green: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.green.700}', _dark: '{colors.green.300}' },
    },
    muted: {
      value: { _light: '{colors.green.50}', _dark: '{colors.green.950}' },
    },
    subtle: {
      value: { _light: '{colors.green.100}', _dark: '{colors.green.900}' },
    },
    emphasized: {
      value: { _light: '{colors.green.200}', _dark: '{colors.green.800}' },
    },
    solid: {
      value: { _light: '{colors.green.600}', _dark: '{colors.green.600}' },
    },
    focusRing: {
      value: { _light: '{colors.green.600}', _dark: '{colors.green.600}' },
    },
  },

  emerald: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.emerald.700}', _dark: '{colors.emerald.300}' },
    },
    muted: {
      value: { _light: '{colors.emerald.50}', _dark: '{colors.emerald.950}' },
    },
    subtle: {
      value: { _light: '{colors.emerald.100}', _dark: '{colors.emerald.900}' },
    },
    emphasized: {
      value: { _light: '{colors.emerald.200}', _dark: '{colors.emerald.800}' },
    },
    solid: {
      value: { _light: '{colors.emerald.600}', _dark: '{colors.emerald.600}' },
    },
    focusRing: {
      value: { _light: '{colors.emerald.600}', _dark: '{colors.emerald.600}' },
    },
  },

  teal: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.teal.700}', _dark: '{colors.teal.300}' },
    },
    muted: {
      value: { _light: '{colors.teal.50}', _dark: '{colors.teal.950}' },
    },
    subtle: {
      value: { _light: '{colors.teal.100}', _dark: '{colors.teal.900}' },
    },
    emphasized: {
      value: { _light: '{colors.teal.200}', _dark: '{colors.teal.800}' },
    },
    solid: {
      value: { _light: '{colors.teal.600}', _dark: '{colors.teal.600}' },
    },
    focusRing: {
      value: { _light: '{colors.teal.600}', _dark: '{colors.teal.600}' },
    },
  },

  cyan: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.cyan.700}', _dark: '{colors.cyan.300}' },
    },
    muted: {
      value: { _light: '{colors.cyan.50}', _dark: '{colors.cyan.950}' },
    },
    subtle: {
      value: { _light: '{colors.cyan.100}', _dark: '{colors.cyan.900}' },
    },
    emphasized: {
      value: { _light: '{colors.cyan.200}', _dark: '{colors.cyan.800}' },
    },
    solid: {
      value: { _light: '{colors.cyan.600}', _dark: '{colors.cyan.600}' },
    },
    focusRing: {
      value: { _light: '{colors.cyan.600}', _dark: '{colors.cyan.600}' },
    },
  },

  sky: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.sky.700}', _dark: '{colors.sky.300}' },
    },
    muted: {
      value: { _light: '{colors.sky.50}', _dark: '{colors.sky.950}' },
    },
    subtle: {
      value: { _light: '{colors.sky.100}', _dark: '{colors.sky.900}' },
    },
    emphasized: {
      value: { _light: '{colors.sky.200}', _dark: '{colors.sky.800}' },
    },
    solid: {
      value: { _light: '{colors.sky.600}', _dark: '{colors.sky.600}' },
    },
    focusRing: {
      value: { _light: '{colors.sky.600}', _dark: '{colors.sky.600}' },
    },
  },

  blue: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.blue.700}', _dark: '{colors.blue.300}' },
    },
    muted: {
      value: { _light: '{colors.blue.50}', _dark: '{colors.blue.950}' },
    },
    subtle: {
      value: { _light: '{colors.blue.100}', _dark: '{colors.blue.900}' },
    },
    emphasized: {
      value: { _light: '{colors.blue.200}', _dark: '{colors.blue.800}' },
    },
    solid: {
      value: { _light: '{colors.blue.600}', _dark: '{colors.blue.600}' },
    },
    focusRing: {
      value: { _light: '{colors.blue.600}', _dark: '{colors.blue.600}' },
    },
  },

  indigo: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.indigo.700}', _dark: '{colors.indigo.300}' },
    },
    muted: {
      value: { _light: '{colors.indigo.50}', _dark: '{colors.indigo.950}' },
    },
    subtle: {
      value: { _light: '{colors.indigo.100}', _dark: '{colors.indigo.900}' },
    },
    emphasized: {
      value: { _light: '{colors.indigo.200}', _dark: '{colors.indigo.800}' },
    },
    solid: {
      value: { _light: '{colors.indigo.600}', _dark: '{colors.indigo.600}' },
    },
    focusRing: {
      value: { _light: '{colors.indigo.600}', _dark: '{colors.indigo.600}' },
    },
  },

  violet: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.violet.700}', _dark: '{colors.violet.300}' },
    },
    muted: {
      value: { _light: '{colors.violet.50}', _dark: '{colors.violet.950}' },
    },
    subtle: {
      value: { _light: '{colors.violet.100}', _dark: '{colors.violet.900}' },
    },
    emphasized: {
      value: { _light: '{colors.violet.200}', _dark: '{colors.violet.800}' },
    },
    solid: {
      value: { _light: '{colors.violet.600}', _dark: '{colors.violet.600}' },
    },
    focusRing: {
      value: { _light: '{colors.violet.600}', _dark: '{colors.violet.600}' },
    },
  },

  purple: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.purple.700}', _dark: '{colors.purple.300}' },
    },
    muted: {
      value: { _light: '{colors.purple.50}', _dark: '{colors.purple.950}' },
    },
    subtle: {
      value: { _light: '{colors.purple.100}', _dark: '{colors.purple.900}' },
    },
    emphasized: {
      value: { _light: '{colors.purple.200}', _dark: '{colors.purple.800}' },
    },
    solid: {
      value: { _light: '{colors.purple.600}', _dark: '{colors.purple.600}' },
    },
    focusRing: {
      value: { _light: '{colors.purple.600}', _dark: '{colors.purple.600}' },
    },
  },

  fuchsia: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.fuchsia.700}', _dark: '{colors.fuchsia.300}' },
    },
    muted: {
      value: { _light: '{colors.fuchsia.50}', _dark: '{colors.fuchsia.950}' },
    },
    subtle: {
      value: { _light: '{colors.fuchsia.100}', _dark: '{colors.fuchsia.900}' },
    },
    emphasized: {
      value: { _light: '{colors.fuchsia.200}', _dark: '{colors.fuchsia.800}' },
    },
    solid: {
      value: { _light: '{colors.fuchsia.600}', _dark: '{colors.fuchsia.600}' },
    },
    focusRing: {
      value: { _light: '{colors.fuchsia.600}', _dark: '{colors.fuchsia.600}' },
    },
  },

  pink: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.pink.700}', _dark: '{colors.pink.300}' },
    },
    muted: {
      value: { _light: '{colors.pink.50}', _dark: '{colors.pink.950}' },
    },
    subtle: {
      value: { _light: '{colors.pink.100}', _dark: '{colors.pink.900}' },
    },
    emphasized: {
      value: { _light: '{colors.pink.200}', _dark: '{colors.pink.800}' },
    },
    solid: {
      value: { _light: '{colors.pink.600}', _dark: '{colors.pink.600}' },
    },
    focusRing: {
      value: { _light: '{colors.pink.600}', _dark: '{colors.pink.600}' },
    },
  },

  rose: {
    contrast: {
      value: { _light: 'white', _dark: 'white' },
    },
    fg: {
      value: { _light: '{colors.rose.700}', _dark: '{colors.rose.300}' },
    },
    muted: {
      value: { _light: '{colors.rose.50}', _dark: '{colors.rose.950}' },
    },
    subtle: {
      value: { _light: '{colors.rose.100}', _dark: '{colors.rose.900}' },
    },
    emphasized: {
      value: { _light: '{colors.rose.200}', _dark: '{colors.rose.800}' },
    },
    solid: {
      value: { _light: '{colors.rose.600}', _dark: '{colors.rose.600}' },
    },
    focusRing: {
      value: { _light: '{colors.rose.600}', _dark: '{colors.rose.600}' },
    },
  },
})
