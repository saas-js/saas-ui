import { HStack, Stack } from '@saas-ui/panda-preset/jsx'
import { Button } from 'src/components'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Default = {
  args: {
    children: 'Default button',
  },
}

export const Variants = {
  render: () => (
    <Stack gap="4">
      <HStack>
        <Button variant="glass" colorPalette="indigo">
          Primary
        </Button>
        <Button variant="surface">Secondary</Button>
      </HStack>
      <HStack>
        <Button variant="solid">Solid</Button>
        <Button variant="glass">Glass</Button>
        <Button variant="surface">Surface</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="ghost">Ghost</Button>
      </HStack>
      <HStack>
        <Button variant="solid" colorPalette="gray">
          Solid
        </Button>
        <Button variant="glass" colorPalette="gray">
          Glass
        </Button>
        <Button variant="surface" colorPalette="gray">
          Surface
        </Button>
        <Button variant="outline" colorPalette="gray">
          Outline
        </Button>
        <Button variant="subtle" colorPalette="gray">
          Subtle
        </Button>
        <Button variant="ghost" colorPalette="gray">
          Ghost
        </Button>
      </HStack>
      <HStack>
        <Button variant="solid" colorPalette="blue">
          Solid
        </Button>
        <Button variant="glass" colorPalette="blue">
          Glass
        </Button>
        <Button variant="surface" colorPalette="blue">
          Surface
        </Button>
        <Button variant="outline" colorPalette="blue">
          Outline
        </Button>
        <Button variant="subtle" colorPalette="blue">
          Subtle
        </Button>
        <Button variant="ghost" colorPalette="blue">
          Ghost
        </Button>
      </HStack>
    </Stack>
  ),
}

export const Sizes = {
  render: () => (
    <HStack>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </HStack>
  ),
}
