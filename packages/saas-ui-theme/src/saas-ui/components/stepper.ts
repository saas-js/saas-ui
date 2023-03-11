import {
  defineMultiStyleConfig,
  definePartsStyle,
} from '../../base/components/stepper'

const variantSolid = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      bg: `gray.500`,
      _dark: {
        bg: `gray.600`,
      },
      color: 'white',
      '[data-active] &': {
        bg: `${c}.500`,
        _dark: {
          bg: `${c}.500`,
        },
      },
      '[data-completed] &': {
        bg: `${c}.500`,
        _dark: {
          bg: `${c}.500`,
        },
      },
    },
    separator: {
      '&[data-active]': {
        borderColor: `${c}.500`,
      },
    },
    step: {
      '&[data-active]:before, &[data-completed]': {
        borderColor: `${c}.500`,
      },
    },
  }
})

const variantOutline = definePartsStyle((props) => {
  const { colorScheme: c } = props
  const styles = variantSolid(props)

  return {
    ...styles,
    icon: {
      ...styles.icon,
      '[data-active] &': {
        ...styles.icon['[data-active] &'],
        outlineColor: `${c}.500`,
        outlineWidth: '1px',
        outlineStyle: 'solid',
        outlineOffset: '2px',
      },
    },
  }
})

const variants = {
  solid: variantSolid,
  outline: variantOutline,
}

export const stepperTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'outline',
    colorScheme: 'primary',
    size: 'md',
  },
  variants,
})
