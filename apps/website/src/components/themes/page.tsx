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
  useColorMode,
  useControllableState,
  SimpleGrid,
  Grid,
  GridItem,
  useClipboard,
  IconButton,
} from '@chakra-ui/react'

import SEO from '@/components/seo'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import Section from '@/components/marketing/section-wrapper'

import {
  Br,
  SaasProvider,
  StructuredList,
  StructuredListButton,
  StructuredListCell,
  StructuredListHeader,
  StructuredListItem,
} from '@saas-ui/react'
import { ThemesIssues } from './issues'
import { ThemesMembers } from './members'
import { ThemeNotifications } from './notifications'

import root from 'react-shadow/emotion'

import { theme as SaasUITheme } from '@saas-ui/react'
import { theme as GlassTheme } from '@saas-ui/theme-glass'
import { PaymentOptions, PaymentSuccessful } from './payment'
import { DiskUsage, Files } from './files'
import { UserProfileCard } from './profile'
import { Revenue } from './stats'
import { HotelCard } from './booking'
import { Activity } from './activity'
import { FiCheck, FiCopy } from 'react-icons/fi'

export const ThemesPage = () => {
  const [theme, setTheme] = React.useState<object>(SaasUITheme)
  const [themeId, setThemeId] = useControllableState({
    defaultValue: 'saas-ui',
    onChange(themeId) {
      updateTheme(themeId, primaryColor)
    },
  })
  const [primaryColor, setPrimaryColor] = useControllableState({
    defaultValue: 'purple',
    onChange(primaryColor) {
      console.log('change', theme, primaryColor)
      updateTheme(themeId, primaryColor)
    },
  })

  const colorScheme = useColorMode()

  const updateTheme = (theme, primaryColor) => {
    switch (theme) {
      case 'saas-ui':
        setTheme({
          ...SaasUITheme,
          colors: {
            ...SaasUITheme.colors,
            primary: SaasUITheme.colors[primaryColor],
          },
        })
        break
      case 'glass':
        setTheme({
          ...GlassTheme,
          colors: {
            ...GlassTheme.colors,
            primary: GlassTheme.colors[primaryColor],
          },
        })
        break
    }
  }

  const gc = useClipboard('npm i @saas-ui/theme-glass')

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

          <ThemeSelector onChange={setThemeId} />

          <PrimaryColorSelector onChange={setPrimaryColor} />

          <Box height="20" mt="8">
            {themeId === 'glass' ? (
              <Box
                rounded="full"
                borderWidth="1px"
                py="2"
                px="3"
                display="inline-block"
                fontSize="md"
              >
                npm i @saas-ui/theme-glass
                <IconButton
                  variant="ghost"
                  rounded="full"
                  ml="2"
                  size="sm"
                  icon={gc.hasCopied ? <FiCheck /> : <FiCopy />}
                  onClick={gc.onCopy}
                  aria-label="Copy to clipboard"
                />
              </Box>
            ) : null}
          </Box>
        </Section>
        <Box
          overflow="hidden"
          flex="1"
          height="$100vh"
          position="relative"
          zIndex="1"
          pb="20"
        >
          <root.div className="shadow-root">
            <SaasProvider theme={theme}>
              <HStack
                gap="8"
                alignItems="flex-start"
                mt="72px"
                data-theme={colorScheme.colorMode}
                data-theme-id={themeId}
              >
                <Flex flex="1" gap="8" flexDirection="column">
                  <ThemesIssues />
                  <ThemesMembers />
                  <ThemeNotifications />
                  <Grid templateColumns="repeat(12, 1fr)" gap="8">
                    <GridItem colSpan={5}>
                      <PaymentOptions />
                    </GridItem>
                    <GridItem colSpan={7}>
                      <PaymentSuccessful />
                    </GridItem>
                  </Grid>
                </Flex>
                <Flex flex="1" gap="8" flexDirection="column">
                  <HStack
                    alignItems="stretch"
                    justifyContent="stretch"
                    spacing="8"
                  >
                    <DiskUsage />
                    <UserProfileCard />
                  </HStack>

                  <Files />
                  <Revenue />
                  <HotelCard />
                  <Activity />
                </Flex>
              </HStack>
            </SaasProvider>
          </root.div>
        </Box>
      </HStack>
    </Box>
  )
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
]

const ThemeSelector = ({ onChange }: { onChange: (theme: string) => void }) => {
  const [checked, setChecked] = useControllableState({
    defaultValue: 'saas-ui',
    onChange,
  })
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
                  borderColor: 'blackAlpha.500',
                  _dark: {
                    borderColor: 'whiteAlpha.500',
                  },
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
    id: 'primary',
    title: 'Purple',
    mode: 'dark',
    color: 'primary.500',
    bg: 'transparent',
  },
  {
    id: 'teal',
    title: 'Teal',
    mode: 'light',
    color: 'teal.500',
    bg: 'white',
  },
  {
    id: 'orange',
    title: 'Orange',
    mode: 'light',
    color: 'orange.500',
    bg: '#242038',
  },
  {
    id: 'red',
    title: 'Red',
    mode: 'light',
    color: 'red.500',
    bg: 'white',
  },
]

const PrimaryColorSelector = ({ onChange }) => {
  const [checked, setChecked] = useControllableState({
    defaultValue: 'primary',
    onChange,
  })
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
              <StructuredListItem
                key={variant.id}
                display="flex"
                borderRadius="md"
                borderWidth="1px"
                mb="2"
                data-checked={isChecked ? true : undefined}
                _checked={{
                  borderColor: 'blackAlpha.500',
                  _dark: {
                    borderColor: 'whiteAlpha.500',
                  },
                }}
                p="0"
              >
                <Tooltip label={variant.title}>
                  <StructuredListButton
                    onClick={() => setChecked(variant.id)}
                    w="6"
                    h="6"
                    p="0"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <StructuredListCell px="0">
                      <Box w="3" h="3" bg={variant.color} rounded="full" />
                    </StructuredListCell>
                  </StructuredListButton>
                </Tooltip>
              </StructuredListItem>
            )
          })}
        </StructuredList>
      </RadioGroup>
    </Box>
  )
}
