import { useState, useMemo, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Flex,
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { ColorWrapper, ColorPalette, ColorPalettes } from '@/components/Palette'
import Page from '@/components/Page'
import Section from '@/components/Section'

import { usePalette } from '@/providers/PaletteProvider'

export default function ColorsPage() {
  const [palette, setPalette] = usePalette()
  const [color, setColor] = useState(palette.base || '#6d28d9')

  const updatePalette = useMemo(
    () =>
      debounce((color) => {
        setColor(color)
        if (color.match(/#[0-9a-fA-F]{6}/)) {
          setPalette(color)
        }
      }, 200),
    []
  )

  const handleChange = (e: any) => {
    updatePalette(e.target.value)
  }

  useEffect(() => {
    return () => {
      updatePalette.cancel()
    }
  }, [])

  return (
    <Page title="SaaS UI Palette Generator">
      <Section title="Configuration">
        <FormControl id="color">
          <FormLabel>Base color</FormLabel>
          <Flex>
            <Input
              type="color"
              onChange={handleChange}
              value={color}
              w="10"
              p="0"
            />
            <Input type="text" onChange={handleChange} value={color} />
          </Flex>
        </FormControl>
      </Section>
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
    </Page>
  )
}
