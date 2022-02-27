import { useState, useCallback, useMemo, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Code,
  Text,
  Link,
  IconButton,
  Button,
  useColorModeValue,
  Badge,
  Spinner,
  SpinnerProps,
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { ColorWrapper, ColorPalette, ColorPalettes } from '@/components/palette'
import Page from '@/components/page'
import Section from '@/components/section'

import { usePalette } from '@/providers/palette'

import { FaTwitter, FaGithub } from 'react-icons/fa'
import CopyButton from '@/components/copy-button'

const baseColor = '#6d28d9'
const grayColor = '#1f2937'

export default function ColorsPage() {
  const [{ colors: palette, color: base, options }, setPalette] = usePalette()

  const [{ color, gray, blackLuminance }, setState] = useState({
    color: base || baseColor,
    gray: options?.colors?.gray || grayColor,
    blackLuminance: options?.blackLuminance || 0.005,
  })

  const updatePalette = useMemo(
    () =>
      debounce((color: any, options) => {
        if (color.match(/#[0-9a-fA-F]{6}/)) {
          setPalette(color, options)
        }
      }, 200),
    [setPalette]
  )

  useEffect(() => {
    updatePalette(color, {
      colors: {
        gray,
        primary: color,
      },
      blackLuminance,
    })
  }, [color, gray, blackLuminance, updatePalette])

  const handleChange = useCallback((key: string) => {
    return (e: any) => {
      setState((state) => ({
        ...state,
        [key]: e.target?.value,
      }))
    }
  }, [])

  useEffect(() => {
    return () => {
      updatePalette.cancel()
    }
  }, [updatePalette])

  const nav = (
    <>
      <Button
        as="a"
        href="https://saas-ui.dev/docs/introduction"
        variant="ghost"
      >
        Documentation
      </Button>

      <IconButton
        as="a"
        href="https://twitter.com/intent/tweet?text=Check%20out%20this%20color%20palette%20generator%20for%20%40chakra_ui.%20Build%20by%20%40saas_js%0Ahttps%3A//palette.saas-ui.dev"
        icon={<FaTwitter />}
        variant="ghost"
        aria-label="Share on Twitter"
      />

      <IconButton
        as="a"
        href="https://github.com/saas-js/saas-ui"
        icon={<FaGithub />}
        variant="ghost"
        aria-label="Star on Github"
      />
    </>
  )

  const code = exampleCode({ color, gray, blackLuminance })

  const json = JSON.stringify(palette, undefined, 2)

  const colors = [
    'gray',
    'red',
    'green',
    'blue',
    'teal',
    'pink',
    'purple',
    'cyan',
    'orange',
    'yellow',
  ]

  return (
    <Page
      title="Color Palette Generator"
      description="Quickly generate custom color palettes for Chakra UI."
      nav={nav}
    >
      <Section title="Usage">
        <Text mb="2">
          Configure your base colors below and copy the generated{' '}
          <Code colorScheme="primary">code</Code>
          or <Code colorScheme="primary">JSON</Code> to your project.
        </Text>
        <Text>
          More information about customizing your theme can be found on the{' '}
          <Link
            href="https://chakra-ui.com/docs/theming/customize-theme"
            color={useColorModeValue('primary.500', 'primary.200')}
          >
            Chakra UI website
          </Link>
          .
        </Text>
      </Section>
      <Section title="Configuration">
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Base color</FormLabel>
            <HStack>
              <Input
                type="color"
                onChange={handleChange('color')}
                value={color}
                w="10"
                p="0"
              />
              <Input
                type="text"
                onChange={handleChange('color')}
                value={color}
              />
            </HStack>
            <FormHelperText>
              Select your brand primary color here, all other colors will be
              generated based of this.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Gray color</FormLabel>
            <HStack>
              <Input
                type="color"
                onChange={handleChange('gray')}
                value={gray}
                w="10"
                p="0"
              />
              <Input type="text" onChange={handleChange('gray')} value={gray} />
            </HStack>
            <FormHelperText>
              Choose a gray tint that compliments your base color to make your
              theme pop.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Black luminance</FormLabel>
            <NumberInput
              onChange={(value) =>
                setState((state) => ({
                  ...state,
                  blackLuminance: parseFloat(value),
                }))
              }
              value={blackLuminance}
              min={0}
              max={1}
              step={0.001}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>
              Slightly increase the luminance to make your blacks more organic.
            </FormHelperText>
          </FormControl>
        </VStack>
      </Section>
      <Tabs colorScheme="primary">
        <TabList mb="4">
          <Tab>Colors</Tab>
          <Tab>Components</Tab>
          <Tab>Code</Tab>
          <Tab>JSON</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Section title="Black & White">
              <ColorWrapper>
                <ColorPalette color="black" name="Black" />
                <ColorPalette color="white" name="White" />
              </ColorWrapper>
            </Section>
            <Section title="Gray">
              <ColorWrapper>
                <ColorPalettes color="gray" />
              </ColorWrapper>
            </Section>
            <Section title="Red">
              <ColorWrapper>
                <ColorPalettes color="red" />
              </ColorWrapper>
            </Section>
            <Section title="Orange">
              <ColorWrapper>
                <ColorPalettes color="orange" />
              </ColorWrapper>
            </Section>
            <Section title="Yellow">
              <ColorWrapper>
                <ColorPalettes color="yellow" />
              </ColorWrapper>
            </Section>
            <Section title="Green">
              <ColorWrapper>
                <ColorPalettes color="green" />
              </ColorWrapper>
            </Section>
            <Section title="Teal">
              <ColorWrapper>
                <ColorPalettes color="teal" />
              </ColorWrapper>
            </Section>
            <Section title="Cyan">
              <ColorWrapper>
                <ColorPalettes color="cyan" />
              </ColorWrapper>
            </Section>
            <Section title="Blue">
              <ColorWrapper>
                <ColorPalettes color="blue" />
              </ColorWrapper>
            </Section>
            <Section title="Purple">
              <ColorWrapper>
                <ColorPalettes color="purple" />
              </ColorWrapper>
            </Section>
            <Section title="Pink">
              <ColorWrapper>
                <ColorPalettes color="pink" />
              </ColorWrapper>
            </Section>
          </TabPanel>
          <TabPanel>
            <VStack spacing="8" alignItems="stretch">
              <HStack>
                {colors.map((colorScheme) => (
                  <Button
                    key={colorScheme}
                    colorScheme={colorScheme}
                    variant="solid"
                  >
                    {colorScheme}
                  </Button>
                ))}
              </HStack>
              <HStack>
                {colors.map((colorScheme) => (
                  <Button
                    key={colorScheme}
                    colorScheme={colorScheme}
                    variant="outline"
                  >
                    {colorScheme}
                  </Button>
                ))}
              </HStack>
              <HStack>
                {colors.map((colorScheme) => (
                  <Button
                    key={colorScheme}
                    colorScheme={colorScheme}
                    variant="subtle"
                  >
                    {colorScheme}
                  </Button>
                ))}
              </HStack>
              <HStack>
                {colors.map((colorScheme) => (
                  <Badge
                    key={colorScheme}
                    colorScheme={colorScheme}
                    variant="solid"
                  >
                    {colorScheme}
                  </Badge>
                ))}
              </HStack>
              <HStack>
                {colors.map((colorScheme) => (
                  <Badge key={colorScheme} colorScheme={colorScheme} mr={2}>
                    {colorScheme}
                  </Badge>
                ))}
              </HStack>
              <HStack>
                {colors.map((colorScheme) => (
                  <Badge
                    key={colorScheme}
                    colorScheme={colorScheme}
                    variant="outline"
                  >
                    {colorScheme}
                  </Badge>
                ))}
              </HStack>
              <HStack>
                {colors.map((colorScheme) => (
                  <StyledSpinner key={colorScheme} colorScheme={colorScheme} />
                ))}
              </HStack>
            </VStack>
          </TabPanel>
          <TabPanel position="relative">
            <Code w="100%" p={4}>
              <pre>{code}</pre>
            </Code>
            <CopyButton code={code} pos="absolute" top="8" right="8" />
          </TabPanel>
          <TabPanel position="relative">
            <Code w="100%" p={4}>
              <pre>{json}</pre>
            </Code>
            <CopyButton code={json} pos="absolute" top="8" right="8" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Page>
  )
}

const StyledSpinner = ({ colorScheme }: SpinnerProps) => {
  const color = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`)
  return <Spinner color={color} />
}

const exampleCode = ({ color, gray, blackLuminance }: any) => `
import { extendTheme } from '@chakra-ui/react'
import { createPalette } from '@saas-ui/palette'

const colors = createPalette('${color}', {
  blackLuminance: ${blackLuminance},
  colors: {
    gray: '${gray}'
  }
})

const theme = extendTheme({
  colors,
})

export default theme
`
