import { extendTheme } from '@chakra-ui/react'

import { theme as baseTheme } from '@saas-ui-pro/react'

import '@fontsource-variable/inter'

import { mode, blacken } from '@chakra-ui/theme-tools'
import Button from './components/button'
import CTA from './components/cta'
import Features, { Feature } from './components/features'
import Section from './components/section'
import SectionTitle from './components/section-title'

import colors from './colors'
import { textStyles } from './typography'

import mdx from './mdx'

const styles = {
  global: (props: any) => ({
    body: {
      webkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
      minHeight: 'auto',
      fontSize: 'lg',
    },
    '.parity-banner': {
      position: 'relative',
      top: '60px',
      zIndex: 10,
    },
  }),
}

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    breakpoints,
    colors,
    semanticTokens: {
      colors: {
        /**
         * @deprecated use `code-bg` instead
         */
        codeBackground: {
          default: blacken('purple.600', 70)(baseTheme),
          _dark: 'gray.900',
        },
        'code-bg': {
          default: blacken('purple.600', 70)(baseTheme),
          _dark: 'gray.900',
        },
        muted: {
          default: 'gray.500',
          _dark: 'gray.400',
        },
        emphasized: {
          default: 'gray.600',
          _dark: 'gray.400',
        },
        border: {
          muted: {
            default: 'gray.600',
            _dark: 'gray.400',
          },
          emphasized: {
            default: 'gray.600',
            _dark: 'gray.400',
          },
        },
        'app-background': {
          default: 'white',
          _dark: 'black',
        },
        'chakra-body-bg': {
          default: 'app-background',
        },
        'chakra-body-text': {
          default: 'gray.900',
          _dark: 'white',
        },
        'component-canvas-bg': {
          default: 'gray.50',
          _dark: 'gray.900',
        },
      },
    },
    styles,
    textStyles,
    fonts: {
      ...baseTheme.fonts,
      body: '"Inter Variable", Inter, sans-serif',
      heading: '"Inter Variable", Inter, sans-serif',
    },
    sizes: {
      ...baseTheme.sizes,
      container: breakpoints,
    },
    mdx,
    components: {
      Container: {
        baseStyle: {
          maxW: 'container.lg',
        },
      },
      Heading: {
        baseStyle: {
          fontWeight: 'semibold',
        },
        sizes: {
          lg: {
            fontSize: ['2xl', null, '2xl'],
            lineHeight: [1.33, null, 1.2],
          },
        },
      },
      Button,
      CTA,
      Section,
      SectionTitle,
      Features,
      Feature,
      Menu: {
        baseStyle: {
          item: {
            fontSize: 'sm',
          },
        },
      },
      Modal: {
        baseStyle: (props: any) => ({
          container: {
            bg: mode('white', 'gray.800'),
          },
        }),
      },
      Code: {
        defaultProps: {
          variant: 'solid',
        },
      },
    },
  },
  baseTheme
)

export default theme
