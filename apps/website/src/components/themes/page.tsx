import * as React from 'react'

import {
  Stack,
  Flex,
  Box,
  Text,
  HStack,
  Card,
  Heading,
  RadioGroup,
  Radio,
  FormLabel,
  Tooltip,
  Checkbox,
  Tag,
  ThemeProvider,
} from '@chakra-ui/react'

import SEO from '@/components/seo'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import Section from '@/components/marketing/section-wrapper'

import {
  Br,
  SaasProvider,
  StructuredList,
  StructuredListCell,
  StructuredListHeader,
  StructuredListItem,
} from '@saas-ui/react'
import { ThemesIssues } from './issues'
import { ThemesMembers } from './members'
import { ThemeNotifications } from './notifications'
import dynamic from 'next/dynamic'

import Frame, { FrameContextConsumer } from 'react-frame-component'
import { CacheProvider } from '@chakra-ui/next-js'

import { baseTheme as SaasUITheme } from '@saas-ui/theme'
const ChakraUITheme = {}
import { theme as GlassTheme } from '@saas-ui/theme-glass'
import { createPortal } from 'react-dom'

export const ThemesPage = () => {
  const [theme, setTheme] = React.useState(SaasUITheme)

  const shadowRef = React.useRef<ShadowRoot>()

  return (
    <Box>
      <SEO
        title="Saas UI"
        description="Professionally crafted Chakra UI themes"
        titleTemplate="Professionally crafted Chakra UI themes"
      />
      <BackgroundGradientRadial
        top="-1000px"
        bottom="auto"
        opacity="0.3"
        _dark={{ opacity: 0.5 }}
      />
      <HStack>
        <Section pos="relative" zIndex="1" innerWidth="container.xl">
          <Heading mb="6" size="xl">
            Themes
          </Heading>
          <Box mb="8">
            <Text fontSize="xl" fontWeight="normal" maxW="container.sm" mb="4">
              A collection of clean and minimalist Chakra UI themes
              <Br />
              that help you build modern and visually pleasing interfaces.{' '}
            </Text>
            <Text fontSize="sm" color="muted">
              Compatible with Chakra UI and Saas UI projects.
            </Text>
          </Box>

          <ThemeSelector />

          <ColorScheme />
        </Section>
        <Box
          overflow="hidden"
          flex="1"
          height="$100vh"
          position="relative"
          zIndex="1"
        >
          <ShadowRoot ref={shadowRef}>
            {/* <Frame width="100%" height="100%">
            <FrameContextConsumer>
              {({ document }) => {
                console.log('wut') */}
            {/* return ( */}
            <CacheProvider container={shadowRef.current}>
              <SaasProvider theme={theme}>
                <HStack gap="8" alignItems="flex-start" mt="72px">
                  <Flex flex="1" gap="8" flexDirection="column">
                    <ThemesIssues />
                    <ThemesMembers />
                    <ThemeNotifications />
                  </Flex>
                  <Flex flex="1" gap="8" flexDirection="column">
                    <Card height="300px"></Card>
                    <Card height="600px"></Card>
                    <Card height="200px"></Card>
                  </Flex>
                  <Flex flex="1" gap="8" flexDirection="column">
                    <Card height="200px"></Card>
                    <Card height="400px"></Card>
                    <Card height="600px"></Card>
                  </Flex>
                </HStack>
              </SaasProvider>
            </CacheProvider>
            {/*       )
         //       }}
        //     </FrameContextConsumer>
        //   </Frame> */}
          </ShadowRoot>
        </Box>
      </HStack>
    </Box>
  )
}

function ShadowRoot(props: {
  children: React.ReactNode
  ref: React.Ref<ShadowRoot>
}) {
  const rootRef = React.useRef<Element>()

  const [root, setRoot] = React.useState<ShadowRoot | null>(null)

  React.useLayoutEffect(() => {
    if (!root) {
      const el = document.createElement('div')
      rootRef.current = el
      document.body.appendChild(rootRef.current)
      console.log(rootRef.current)
      const shadowRoot = rootRef.current.attachShadow({ mode: 'open' })

      // root.adoptedStyleSheets = [sheet];

      setRoot(shadowRoot)
    }
  }, [root])

  React.useImperativeHandle(props.ref, () => root, [root])

  if (root) {
    return createPortal(props.children, root)
  }

  return null
}

const themes = [
  {
    id: 'saas-ui',
    title: 'Saas UI',
  },
  {
    id: 'glass',
    title: 'Glass',
  },
  {
    id: 'chakra-ui',
    title: 'Chakra UI',
  },
]

const ThemeSelector = () => {
  const [checked, setChecked] = React.useState('saas-ui')
  return (
    <Box width="400px">
      <FormLabel>Select your theme</FormLabel>
      <RadioGroup name="theme">
        <StructuredList
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          gap="2"
          orientation="horizontal"
        >
          {themes.map((variant) => {
            const isChecked = checked === variant.id
            return (
              <StructuredListItem
                key={variant.id}
                onClick={() => setChecked(variant.id)}
                borderRadius="md"
                borderWidth="1px"
                mb="2"
                data-checked={isChecked ? true : undefined}
                _checked={{
                  borderColor: 'whiteAlpha.500',
                }}
              >
                <StructuredListCell flex="1">
                  <Text fontWeight="medium">{variant.title}</Text>
                </StructuredListCell>
              </StructuredListItem>
            )
          })}
        </StructuredList>
      </RadioGroup>
    </Box>
  )
}

const colorSchemes = [
  {
    id: 'default',
    title: 'Default',
    mode: 'dark',
    color: 'primary.500',
    bg: 'transparent',
  },
  {
    id: 'earth',
    title: 'Earth',
    mode: 'light',
    color: 'teal.500',
    bg: 'white',
  },
  {
    id: 'galaxy',
    title: 'Galaxy',
    mode: 'dark',
    color: 'primary.500',
    bg: '#242038',
  },
  {
    id: 'galaxy-light',
    title: 'Galaxy Light',
    mode: 'light',
    color: 'primary.500',
    bg: 'white',
  },
]

const ColorScheme = () => {
  const [checked, setChecked] = React.useState('default')
  return (
    <Box width="400px">
      <FormLabel>Color scheme</FormLabel>
      <RadioGroup name="theme">
        <StructuredList
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          gap="2"
          orientation="horizontal"
        >
          {colorSchemes.map((variant) => {
            const isChecked = checked === variant.id
            return (
              <Tooltip key={variant.id} label={variant.title}>
                <StructuredListItem
                  display="flex"
                  onClick={() => setChecked(variant.id)}
                  borderRadius="md"
                  borderWidth="1px"
                  mb="2"
                  data-checked={isChecked ? true : undefined}
                  _checked={{
                    borderColor: 'whiteAlpha.500',
                  }}
                >
                  <StructuredListCell alignSelf="flex-start">
                    <Box
                      w="3"
                      h="3"
                      bg={variant.color}
                      border="2px"
                      borderColor={variant.bg}
                      rounded="full"
                    />
                  </StructuredListCell>
                </StructuredListItem>
              </Tooltip>
            )
          })}
        </StructuredList>
      </RadioGroup>
    </Box>
  )
}
