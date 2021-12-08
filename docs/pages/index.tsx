import { useState, useCallback, useMemo, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
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
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { ColorWrapper, ColorPalette, ColorPalettes } from '@/components/Palette'
import Page from '@/components/Page'
import Section from '@/components/Section'

import { usePalette } from '@/providers/PaletteProvider'

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
    []
  )

  useEffect(() => {
    updatePalette(color, {
      colors: {
        gray,
      },
      blackLuminance,
    })
  }, [color, gray, blackLuminance])

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
  }, [])

  return (
    <Page
      title="Palette Generator"
      description="A color palette generator for Chakra UI"
    >
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
          </FormControl>
        </VStack>
      </Section>
      <Tabs>
        <TabList mb="4">
          <Tab>Colors</Tab>
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
            <Code w="100%" p={4}>
              <pre>{exampleCode({ color, gray, blackLuminance })}</pre>
            </Code>
          </TabPanel>
          <TabPanel>
            <Code w="100%" p={4}>
              <pre>{JSON.stringify(palette, undefined, 2)}</pre>
            </Code>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Page>
  )
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
