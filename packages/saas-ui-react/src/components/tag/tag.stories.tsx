import React from 'react'

import { HStack, Icon, VStack } from '@chakra-ui/react'
import { LuGitBranch, LuPlus } from 'react-icons/lu'

import { Avatar } from '../avatar'
import { Tag } from './tag.tsx'

export default {
  title: 'Components/Tag',
  component: Tag,
}

export const Default = {
  args: {
    children: 'Tag',
  },
}

export const Sizes = () => {
  return (
    <VStack>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
      <Tag size="xl">XLarge</Tag>
    </VStack>
  )
}

export const Variants = () => {
  return (
    <VStack>
      <Tag variant="solid">Tag</Tag>
      <Tag variant="outline">Tag</Tag>
      <Tag variant="subtle">Tag</Tag>
    </VStack>
  )
}

const colors = [
  'neutral',
  'slate',
  'gray',
  'zinc',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]

export const Colors = () => {
  return (
    <VStack>
      {colors.map((color) => (
        <HStack>
          <Tag variant="solid" colorPalette={color}>
            Tag
          </Tag>
          <Tag variant="outline" colorPalette={color}>
            Tag
          </Tag>
          <Tag variant="subtle" colorPalette={color}>
            Tag
          </Tag>
        </HStack>
      ))}
    </VStack>
  )
}

export const Closable = () => {
  return (
    <VStack>
      <Tag size="sm" closable>
        Frontend
      </Tag>
      <Tag size="md" closable>
        Frontend
      </Tag>
      <Tag size="lg" closable>
        Frontend
      </Tag>
      <Tag size="xl" closable>
        Frontend
      </Tag>
    </VStack>
  )
}

export const WithIcon = () => {
  return (
    <Tag
      startElement={
        <Icon color="green.500">
          <LuGitBranch />
        </Icon>
      }
      size="lg"
    >
      2 PRs
    </Tag>
  )
}

export const WithAvatar = () => {
  return (
    <HStack>
      <Tag
        startElement={
          <Avatar name="John Doe" size="full" colorPalette="accent" />
        }
        size="sm"
      >
        John Doe
      </Tag>
      <Tag
        startElement={
          <Avatar name="John Doe" size="full" colorPalette="accent" />
        }
        size="md"
      >
        John Doe
      </Tag>
      <Tag
        startElement={
          <Avatar name="John Doe" size="full" colorPalette="accent" />
        }
        size="lg"
      >
        John Doe
      </Tag>
      <Tag
        startElement={
          <Avatar name="John Doe" size="full" colorPalette="accent" />
        }
        size="xl"
      >
        John Doe
      </Tag>
    </HStack>
  )
}
