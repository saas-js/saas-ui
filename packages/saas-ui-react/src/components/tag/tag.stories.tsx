import React from 'react'

import { HStack, Icon, VStack } from '@chakra-ui/react'
import { LuGitBranch, LuPlus } from 'react-icons/lu'

import { Status } from '#components/status/status.js'

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
    <HStack>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
      <Tag size="xl">XLarge</Tag>
    </HStack>
  )
}

export const Variants = () => {
  return (
    <HStack>
      <Tag variant="solid">Tag</Tag>
      <Tag variant="outline">Tag</Tag>
      <Tag variant="subtle">Tag</Tag>
    </HStack>
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
    <VStack alignItems="flex-start">
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
    <HStack>
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
    </HStack>
  )
}

export const WithIcon = () => {
  return (
    <HStack>
      <Tag
        startElement={
          <Icon color="green.500">
            <LuGitBranch />
          </Icon>
        }
        size="sm"
      >
        2 PRs
      </Tag>
      <Tag
        startElement={
          <Icon color="green.500">
            <LuGitBranch />
          </Icon>
        }
        size="md"
      >
        2 PRs
      </Tag>
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
      <Tag
        startElement={
          <Icon color="green.500">
            <LuGitBranch />
          </Icon>
        }
        size="xl"
      >
        2 PRs
      </Tag>
    </HStack>
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

export const WithStatus = () => {
  return (
    <HStack>
      <Tag startElement={<Status value="success" />} size="sm">
        John Doe
      </Tag>
      <Tag startElement={<Status value="success" />} size="md">
        John Doe
      </Tag>
      <Tag startElement={<Status value="success" />} size="lg">
        John Doe
      </Tag>
      <Tag startElement={<Status value="success" />} size="xl">
        John Doe
      </Tag>
    </HStack>
  )
}
