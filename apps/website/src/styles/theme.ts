import { extendTheme, ThemeTypings } from '@chakra-ui/react'

import { theme as baseTheme } from '@saas-ui-pro/react'

import '@fontsource/inter/variable.css'

import { mode, transparentize, blacken } from '@chakra-ui/theme-tools'

import Badge from './components/badge'
import Button from './components/button'
import CTA from './components/cta'
import Features, { Feature } from './components/features'
import Section from './components/section'
import SectionTitle from './components/section-title'

import colors from './colors'

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

const textStyles = {
  pageTitle: {
    fontSize: { base: '2xl', sm: '3xl', md: '5xl', lg: '6xl' },
    fontWeight: 'extrabold',
    lineHeight: '1.2',
    letterSpacing: '-2%',
  },
  h2: {
    fontSize: ['36px', '48px'],
    fontWeight: '900',
    lineHeight: '110%',
    letterSpacing: '-1%',
  },
  subtitle: {
    fontSize: { base: 'sm', sm: 'sm', md: '2xl' },
    fontWeight: 'normal',
  },
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
        codeBackground: {
          default: blacken('purple.600', 70)(baseTheme),
          _dark: 'gray.900',
        },
        muted: {
          default: 'gray.600',
          _dark: 'gray.400',
        },
        'chakra-body-bg': {
          default: 'app-background',
        },
        'chakra-body-text': {
          default: 'gray.900',
          _dark: 'white',
        },
        'app-background': {
          default: 'white',
          _dark: 'black',
        },
      },
    },
    styles,
    textStyles,
    fonts: {
      ...baseTheme.fonts,
      body: 'InterVariable, sans-serif',
      heading: 'InterVariable, sans-serif',
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
      Badge,
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
