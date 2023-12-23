import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineCssVars,
} from '@chakra-ui/styled-system'

import { timelineAnatomy } from '../../anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(timelineAnatomy.keys)

const $rowStart = cssVar('timeline-row-start', 'minmax(0,1fr)')
const $rowEnd = cssVar('timeline-row-end', 'minmax(0,1fr)')

const $colStart = cssVar('timeline-col-start', 'minmax(0,1fr)')
const $colEnd = cssVar('timeline-col-end', 'minmax(0,1fr)')

const baseStyle = definePartsStyle((props) => {
  return {
    container: {
      display: 'flex',
      [$rowStart.variable]: 'minmax(0,1fr)',
      [$rowEnd.variable]: 'minmax(0,1fr)',
      [$colStart.variable]: 'auto',
      [$colEnd.variable]: '2fr',
      flexDirection: 'column',
      justifyItems: 'center',
    },
    item: {
      display: 'grid',
      alignItems: 'center',
      justifyItems: 'start',
      gridTemplateRows: `${$rowStart.reference}`,
      gridTemplateColumns: `${$colStart.reference} ${$colEnd.reference}`,
      position: 'relative',
    },
    separator: {
      mx: 1,
      minW: '24px',
      flexShrink: 0,
      gridColumnStart: 1,
      gap: 2,
      height: '100%',
      _before: {
        content: '""',
        display: 'block',
        flex: 1,
        minH: '0.5em',
      },
      _after: {
        content: '""',
        display: 'block',
        flex: 1,
        minH: '0.5em',
      },

      '&:has(.sui-timeline__track:first-of-type):before': {
        display: 'none',
      },
      '&:has(.sui-timeline__track:last-of-type):after': {
        display: 'none',
      },
    },
    icon: {
      color: 'gray.300',
      _dark: {
        color: 'gray.600',
      },
    },
    dot: {
      width: '9px',
      height: '9px',
      bg: 'currentColor',
      borderRadius: 'full',
    },
    track: {
      bg: 'gray.300',
      width: '1px',
      flex: 1,
      minH: '0.5em',
      _dark: {
        bg: 'gray.600',
      },
    },
    content: {
      px: '2',
      _first: {
        gridColumnStart: 1,
      },
      _last: {
        gridColumnStart: 2,
        justifySelf: 'start',
      },
    },
  }
})

const variantSolid = definePartsStyle((props) => {
  return {
    icon: {},
  }
})

const variantOutline = definePartsStyle((props) => {
  return {
    dot: {
      bg: 'transparent',
      borderColor: 'currentColor',
      borderWidth: '2px',
    },
  }
})

export const timelineTheme = defineMultiStyleConfig({
  defaultProps: { variant: 'solid', size: 'sm' },
  baseStyle,
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
  sizes: {
    sm: {
      icon: {
        minH: '8px',
        minW: '8px',
      },
    },
  },
})
