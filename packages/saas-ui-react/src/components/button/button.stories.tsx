import React from 'react'

import { Box, HStack, Stack } from '@chakra-ui/react'

import { Button } from './index.ts'

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
        <Button variant="solid" colorPalette="neutral">
          Solid
        </Button>
        <Button variant="glass" colorPalette="neutral">
          Glass
        </Button>
        <Button variant="surface" colorPalette="neutral">
          Surface
        </Button>
        <Button variant="outline" colorPalette="neutral">
          Outline
        </Button>
        <Button variant="subtle" colorPalette="neutral">
          Subtle
        </Button>
        <Button variant="ghost" colorPalette="neutral">
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
