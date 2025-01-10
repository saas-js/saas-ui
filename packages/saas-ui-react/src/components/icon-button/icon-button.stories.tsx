import React from 'react'

import { HStack, Stack } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'

import { IconButton } from './index.ts'

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

export const Default = {
  args: {
    children: <LuPlus />,
  },
}

export const Variants = {
  render: () => (
    <Stack gap="4">
      <HStack>
        <IconButton variant="glass" colorPalette="indigo">
          <LuPlus />
        </IconButton>
        <IconButton variant="surface">
          <LuPlus />
        </IconButton>
      </HStack>
      <HStack>
        <IconButton variant="solid">
          <LuPlus />
        </IconButton>
        <IconButton variant="glass">
          <LuPlus />
        </IconButton>
        <IconButton variant="surface">
          <LuPlus />
        </IconButton>
        <IconButton variant="outline">
          <LuPlus />
        </IconButton>
        <IconButton variant="subtle">
          <LuPlus />
        </IconButton>
        <IconButton variant="ghost">
          <LuPlus />
        </IconButton>
      </HStack>
      <HStack>
        <IconButton variant="solid" colorPalette="neutral">
          <LuPlus />
        </IconButton>
        <IconButton variant="glass" colorPalette="neutral">
          <LuPlus />
        </IconButton>
        <IconButton variant="surface" colorPalette="neutral">
          <LuPlus />
        </IconButton>
        <IconButton variant="outline" colorPalette="neutral">
          <LuPlus />
        </IconButton>
        <IconButton variant="subtle" colorPalette="neutral">
          <LuPlus />
        </IconButton>
        <IconButton variant="ghost" colorPalette="neutral">
          <LuPlus />
        </IconButton>
      </HStack>
      <HStack>
        <IconButton variant="solid" colorPalette="blue">
          <LuPlus />
        </IconButton>
        <IconButton variant="glass" colorPalette="blue">
          <LuPlus />
        </IconButton>
        <IconButton variant="surface" colorPalette="blue">
          <LuPlus />
        </IconButton>
        <IconButton variant="outline" colorPalette="blue">
          <LuPlus />
        </IconButton>
        <IconButton variant="subtle" colorPalette="blue">
          <LuPlus />
        </IconButton>
        <IconButton variant="ghost" colorPalette="blue">
          <LuPlus />
        </IconButton>
      </HStack>
    </Stack>
  ),
}

export const Sizes = {
  render: () => (
    <HStack>
      <IconButton size="xs">
        <LuPlus />
      </IconButton>
      <IconButton size="sm">
        <LuPlus />
      </IconButton>
      <IconButton size="md">
        <LuPlus />
      </IconButton>
      <IconButton size="lg">
        <LuPlus />
      </IconButton>
      <IconButton size="xl">
        <LuPlus />
      </IconButton>
    </HStack>
  ),
}
