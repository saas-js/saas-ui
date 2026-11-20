import { Button, Grid, List, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

const features = [
  'Generate hue or opacity palettes',
  'Automatic contrast calculation and correction',
  'Color stop editor for unlimited customisation',
  'Choose the number of colors',
]

export function FigmaPreview() {
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '1fr 360px' }}
      gap="10"
      alignItems="start"
    >
      <Stack gap="6">
        <Text textStyle="xl">
          Working in Figma? Supa Palette creates harmonious, accessible palettes
          for Chakra UI right inside your design files.
        </Text>
        <List.Root gap="3" variant="plain" color="fg.muted">
          {features.map((feature) => (
            <List.Item key={feature}>
              <List.Indicator asChild color="accent.solid">
                <FiCheck />
              </List.Indicator>
              {feature}
            </List.Item>
          ))}
        </List.Root>
        <div>
          <Button variant="solid" colorPalette="accent" asChild>
            <a href="https://gumroad.com/a/507971507/pucdw">
              More information
              <FiArrowRight />
            </a>
          </Button>
        </div>
      </Stack>
      <Stack
        position="relative"
        display={{ base: 'none', lg: 'flex' }}
        width="360px"
        height="573px"
      >
        <Image
          src="/screen-1-dark.webp"
          alt="The Supa Palette plugin in Figma"
          fill
          sizes="360px"
        />
      </Stack>
    </Grid>
  )
}
