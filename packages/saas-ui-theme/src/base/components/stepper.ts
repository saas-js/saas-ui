import { orient, transparentize } from '@chakra-ui/theme-tools'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { stepperAnatomy } from '../../anatomy'

export const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(stepperAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { orientation, size } = props

  const borderWidth = size === 'lg' ? 2 : 1

  const content = orient({
    orientation,
    vertical: {
      borderLeftWidth: borderWidth,
      ms: size === 'lg' ? 4 : 3,
      ps: 5,
    },
    horizontal: {},
  })

  const steps = orient({
    orientation,
    vertical: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    horizontal: {
      flexDirection: 'row',
      alignItems: { base: 'flex-start', sm: 'center' },
      position: 'relative',
    },
  })

  const step = orient({
    orientation,
    vertical: {
      flexDirection: 'row',
    },
    horizontal: {
      flexDirection: { base: 'column', sm: 'row' },
      flex: { base: '1 1', sm: 'inherit' },
      position: 'relative',
      _before: {
        content: '""',
        transitionProperty: 'common',
        transitionDuration: 'normal',
        borderTopWidth: borderWidth,
        borderColor: 'inherit',
        display: 'block',
        position: { base: 'absolute', sm: 'static' },

        left: { base: 'calc(-50% + 24px)', sm: 0 },
        right: { base: 'calc(50% + 24px)', sm: 0 },
        top: 6,
      },
      '&:first-of-type:before': {
        display: 'none',
      },
    },
  })

  const title = orient({
    orientation,
    vertical: {},
    horizontal: {
      mt: { base: 2, sm: 0 },
      textAlign: 'center',
    },
  })

  const separator = orient({
    orientation,
    vertical: {
      minHeight: 4,
      borderLeftWidth: borderWidth,
      borderTopWidth: 0,
      mx: size === 'lg' ? 4 : 3,
    },
    horizontal: {
      borderTopWidth: borderWidth,
      mx: { base: 0, sm: 3 },
      mt: { base: 5, sm: 0 },
      alignSelf: { base: 'flex-start', sm: 'center' },
      flex: { base: 'inherit', sm: 1 },
    },
  })

  const icon = orient({
    orientation,
    vertical: { me: 2 },
    horizontal: {
      me: { base: 0, sm: 2 },
    },
  })

  return {
    container: {
      flexDirection: 'column',
    },
    steps,
    step: {
      ...step,
      py: 2,
    },
    title,
    separator: {
      ...separator,
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    icon: {
      ...icon,
      bg: 'whiteAlpha.400',
      lineHeight: 1,
      flexShrink: 0,
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    content,
  }
})

const variantSubtle = definePartsStyle((props) => {
  const { theme, colorScheme: c } = props
  return {
    icon: {
      bg: 'blackAlpha.300',
      color: 'blackAlpha.600',
      _dark: {
        bg: 'whiteAlpha.200',
        color: 'whiteAplha.600',
      },
      '[data-active] &': {
        bg: `${c}.100}`,
        color: `${c}.500`,
        _dark: {
          bg: transparentize(`${c}.200`, 0.16)(theme),
          color: `${c}.200`,
        },
      },
      '[data-completed] &': {
        bg: `${c}.100`,
        color: `${c}.500`,
        _dark: {
          bg: transparentize(`${c}.200`, 0.16)(theme),
          color: `${c}.200`,
        },
      },
    },
  }
})

const variantSolid = definePartsStyle((props) => {
  const { colorScheme: c } = props

  return {
    icon: {
      bg: `gray.500`,
      color: `white`,
      _dark: {
        color: `gray.800`,
      },
      '[data-active] &': {
        bg: `${c}.500`,
        _dark: {
          bg: `${c}.200`,
        },
      },
      '[data-completed] &': {
        bg: `${c}.500`,
        _dark: {
          bg: `${c}.200`,
        },
      },
    },
    separator: {
      '&[data-active]': {
        borderColor: `${c}.500`,
        _dark: {
          borderColor: `${c}.200`,
        },
      },
    },
    step: {
      '&[data-active]:before, &[data-completed]:before': {
        borderColor: `${c}.500`,
        _dark: {
          borderColor: `${c}.200`,
        },
      },
    },
  }
})

const variants = {
  subtle: variantSubtle,
  solid: variantSolid,
}

const sizes = {
  md: definePartsStyle({
    icon: {
      boxSize: 6,
      fontSize: 'sm',
    },
    title: {
      fontSize: 'md',
    },
    step: {
      _before: {
        top: 5,
      },
    },
  }),
  lg: definePartsStyle({
    icon: {
      boxSize: 8,
    },
    title: {
      fontSize: 'lg',
    },
  }),
}

export const stepperTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'solid',
    colorScheme: 'blue',
    size: 'lg',
    /* @ts-expect-error */
    orientation: 'horizontal',
  },
  baseStyle,
  variants,
  sizes,
})
