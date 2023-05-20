// import {

import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'
import { transparentize } from '@chakra-ui/theme-tools'

// } from '@chakra-ui/stepper'

// const variantSolid = definePartsStyle((props) => {
//   const { colorScheme: c } = props
//   return {
//     icon: {
//       bg: `gray.500`,
//       _dark: {
//         bg: `gray.600`,
//       },
//       color: 'white',
//       '[data-active] &': {
//         bg: `${c}.500`,
//         _dark: {
//           bg: `${c}.500`,
//         },
//       },
//       '[data-completed] &': {
//         bg: `${c}.500`,
//         _dark: {
//           bg: `${c}.500`,
//         },
//       },
//     },
//     separator: {
//       '&[data-active]': {
//         borderColor: `${c}.500`,
//       },
//     },
//     step: {
//       '&[data-active]:before, &[data-completed]': {
//         borderColor: `${c}.500`,
//       },
//     },
//   }
// })

// const variantOutline = definePartsStyle((props) => {
//   const { colorScheme: c } = props
//   const styles = variantSolid(props)

//   return {
//     ...styles,
//     icon: {
//       ...styles.icon,
//       '[data-active] &': {
//         ...styles.icon['[data-active] &'],
//         outlineColor: `${c}.500`,
//         outlineWidth: '1px',
//         outlineStyle: 'solid',
//         outlineOffset: '2px',
//       },
//     },
//   }
// })

// const variants = {
//   solid: variantSolid,
//   outline: variantOutline,
// }

// export const stepperTheme = defineMultiStyleConfig({
//   defaultProps: {
//     variant: 'outline',
//     colorScheme: 'primary',
//     size: 'md',
//   },
//   variants,
// })

const $size = cssVar('stepper-indicator-size')
const $accentColor = cssVar('stepper-accent-color')

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    // saas ui parts
    'container',
    'item',
    'content',
    // default parts
    'stepper',
    'step',
    'title',
    'description',
    'indicator',
    'separator',
    'icon',
    'number',
  ])

const baseStyle = definePartsStyle(({ colorScheme: c }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  content: {
    ['&[data-orientation=vertical]']: {
      mt: 2,
      ms: 3,
      borderLeftWidth: '1px',
      ps: 6,
    },
  },
  stepper: {
    gap: '2',
    [$accentColor.variable]: `colors.${c}.500`,
    _dark: {
      [$accentColor.variable]: `colors.${c}.500`,
    },
  },
  separator: {
    transitionProperty: 'common',
    transitionDuration: 'normal',
    ['&[data-orientation=horizontal]']: {
      height: '1px',
    },
    ['&[data-orientation=vertical]']: {
      width: '1px',
    },
    ['.sui-steps__item .chakra-step &[data-orientation=vertical]']: {
      display: 'none',
    },
    ['.sui-steps__item &[data-orientation=vertical]']: {
      position: 'static',
      minH: 4,
      ms: 3,
    },
  },
  step: {
    ['&[data-orientation=vertical]']: {
      alignItems: 'center',
    },
  },
  indicator: {
    ['.sui-steps__item &']: {
      ms: '-2px',
    },
  },
}))

const variantOutline = definePartsStyle((props) => ({}))

const variantSolid = definePartsStyle((props) => ({
  indicator: {
    '&[data-status=active]': {
      borderWidth: '0',
      bg: $accentColor.reference,
      color: 'chakra-inverse-text',
    },
    '&[data-status=complete]': {
      bg: $accentColor.reference,
      color: 'chakra-inverse-text',
    },
    '&[data-status=incomplete]': {
      borderWidth: '0',
      bg: 'blackAlpha.200',
      _dark: {
        bg: 'whiteAlpha.200',
      },
    },
  },
}))

const variantSubtle = definePartsStyle((props) => {
  const { theme, colorScheme: c } = props
  return {
    stepper: {
      [$accentColor.variable]: `colors.${c}.100`,
    },
    indicator: {
      '&[data-status=active]': {
        borderWidth: '0',
        bg: $accentColor.reference,
        color: `${c}.500`,
        _dark: {
          bg: transparentize(`${c}.200`, 0.16)(theme),
        },
      },
      '&[data-status=complete]': {
        bg: $accentColor.reference,
        color: `${c}.500`,
        _dark: {
          bg: transparentize(`${c}.200`, 0.24)(theme),
          color: `${c}.200`,
        },
      },
      '&[data-status=incomplete]': {
        borderWidth: '0',
        bg: 'blackAlpha.200',
        color: 'blackAlpha.700',
        _dark: {
          bg: 'whiteAlpha.200',
          color: 'whiteAlpha.600',
        },
      },
    },
  }
})

export const stepperTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'outline',
    colorScheme: 'primary',
    size: 'md',
  },
  baseStyle,
  variants: {
    outline: variantOutline,
    solid: variantSolid,
    subtle: variantSubtle,
  },
  sizes: {
    xs: definePartsStyle({
      stepper: {
        [$size.variable]: 'sizes.4',
      },
    }),
    sm: definePartsStyle({
      stepper: {
        [$size.variable]: 'sizes.6',
      },
    }),
    md: definePartsStyle({
      stepper: {
        [$size.variable]: 'sizes.7',
      },
    }),
    lg: definePartsStyle({
      stepper: {
        [$size.variable]: 'sizes.8',
      },
    }),
  },
})
