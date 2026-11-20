'use client'

import * as React from 'react'

import {
  Box,
  Button,
  CloseButton,
  Container,
  Drawer,
  Flex,
  HStack,
  Heading,
  IconButton,
  Link,
  Portal,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { FaGithub } from 'react-icons/fa'
import { FiMoon, FiSliders, FiSun } from 'react-icons/fi'

import { Configuration } from './configuration'
import { Logo } from './logo'
import { CodePreview } from './preview/code'
import { ColorsPreview } from './preview/colors'
import { ComponentsPreview } from './preview/components'
import { FigmaPreview } from './preview/figma'
import { PalettesPreview } from './preview/palettes'

function ColorModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // Both icons render and CSS picks one, so SSR output never depends on the
  // theme, which is only known on the client.
  return (
    <IconButton
      variant="ghost"
      aria-label="Toggle color mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Box asChild _dark={{ display: 'none' }}>
        <FiMoon />
      </Box>
      <Box asChild display="none" _dark={{ display: 'block' }}>
        <FiSun />
      </Box>
    </IconButton>
  )
}

function Header(props: { onConfigure: () => void }) {
  return (
    <Flex
      as="header"
      position="sticky"
      top="0"
      zIndex="10"
      height="14"
      px={{ base: '4', md: '6' }}
      align="center"
      gap="4"
      bg="bg/80"
      backdropFilter="blur(12px)"
      borderBottomWidth="1px"
    >
      <Link href="https://saas-ui.dev" aria-label="Saas UI">
        <Logo color="fg" />
      </Link>
      <Box flex="1" />
      <HStack gap="1">
        <Button
          variant="ghost"
          size="sm"
          display={{ base: 'none', md: 'inline-flex' }}
          asChild
        >
          <a href="https://saas-ui.dev/docs/theming/appearance">Docs</a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          display={{ base: 'none', md: 'inline-flex' }}
          asChild
        >
          <a href="https://saas-ui.dev">Saas UI</a>
        </Button>
        <IconButton variant="ghost" aria-label="Saas UI on GitHub" asChild>
          <a href="https://github.com/saas-js/saas-ui">
            <FaGithub />
          </a>
        </IconButton>
        <ColorModeToggle />
        <IconButton
          variant="outline"
          aria-label="Configure palette"
          display={{ base: 'inline-flex', lg: 'none' }}
          onClick={props.onConfigure}
        >
          <FiSliders />
        </IconButton>
      </HStack>
    </Flex>
  )
}

const tabs = [
  { value: 'colors', label: 'Scales', content: <ColorsPreview /> },
  { value: 'palettes', label: 'Palettes', content: <PalettesPreview /> },
  { value: 'components', label: 'Components', content: <ComponentsPreview /> },
  { value: 'code', label: 'Code', content: <CodePreview /> },
  { value: 'figma', label: 'Figma', content: <FigmaPreview /> },
]

export function PaletteApp() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <Flex direction="column" minH="100dvh" bg="bg">
      <Header onConfigure={() => setDrawerOpen(true)} />

      <Flex flex="1" align="stretch">
        <Box as="main" flex="1" minW="0">
          <Container maxW="6xl" py={{ base: '8', md: '12' }}>
            <Stack gap="3" mb="10" maxW="2xl">
              <Heading as="h1" size={{ base: '2xl', md: '3xl' }}>
                Color palette generator
              </Heading>
              <Text color="fg.muted" fontSize="lg">
                Pick a brand color. Get OKLCH scales, semantic palettes and a
                complete Saas UI appearance you can paste into your Chakra UI
                theme.
              </Text>
            </Stack>

            <Tabs.Root defaultValue="colors" variant="line" lazyMount>
              <Tabs.List mb="8" overflowX="auto">
                {tabs.map((tab) => (
                  <Tabs.Trigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Content key={tab.value} value={tab.value} p="0">
                  {tab.content}
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Container>
        </Box>

        <Box
          as="aside"
          display={{ base: 'none', lg: 'block' }}
          width="340px"
          flexShrink="0"
          borderLeftWidth="1px"
          bg="bg.surface"
        >
          <Box
            position="sticky"
            top="14"
            maxH="calc(100dvh - var(--chakra-sizes-14))"
            overflowY="auto"
            p="6"
          >
            <Configuration />
          </Box>
        </Box>
      </Flex>

      <Drawer.Root
        open={drawerOpen}
        onOpenChange={(details) => setDrawerOpen(details.open)}
        placement="end"
        size="sm"
        lazyMount
        unmountOnExit
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Configure</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Configuration hideTitle />
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Flex>
  )
}
