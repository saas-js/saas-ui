import { extendTheme } from '@chakra-ui/react'

import { theme as baseTheme } from '@saas-ui/theme'

import {
  createBreakpoints,
  mode,
  transparentize,
  blacken,
} from '@chakra-ui/theme-tools'

import deepmerge from 'deepmerge'

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
      color: mode('gray.900', 'white')(props),
      bg: mode('white', 'gray.900')(props),
      minHeight: 'auto',
    },
    'div#__next, div#__next > div': {
      height: '100%',
    },
  }),
}

const textStyles = {
  h1: {
    fontSize: ['4xl', null, '6xl'],
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
  h3: {
    fontSize: ['lg', 'xl'],
    fontWeight: '900',
    lineHeight: '110%',
    letterSpacing: '-1%',
  },
  subtitle: {
    fontSize: ['lg', null, '2xl'],
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
    breakpoints: createBreakpoints(breakpoints),
    colors,
    semanticTokens: {
      colors: {
        codeBackground: {
          default: blacken('purple.600', 70)(baseTheme),
          _dark: 'gray.800',
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
      Button,
      CTA,
      Section,
      SectionTitle,
      Features,
      Feature,
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
