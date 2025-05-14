import React from 'react'

import { Button, Stack } from '@chakra-ui/react'
import { LuBadgeX, LuFolder } from 'react-icons/lu'

import { EmptyState } from './index.ts'

export default {
  title: 'Components/Empty State',
  component: EmptyState,
}

export const Basic = () => {
  return (
    <EmptyState
      colorPalette="red"
      icon={<LuBadgeX />}
      title="404. Not found"
      description="The page you are looking for does not exist."
    />
  )
}

export const Actions = () => {
  return (
    <EmptyState
      icon={<LuFolder />}
      title="No projects"
      description="Create your first project to get started."
    >
      <Button variant="surface" size="sm">
        Create project
      </Button>
    </EmptyState>
  )
}

export const Sizes = () => {
  return (
    <Stack>
      <EmptyState
        size="sm"
        colorPalette="red"
        icon={<LuBadgeX />}
        title="404. Not found"
        description="The page you are looking for does not exist."
      />
      <EmptyState
        size="md"
        colorPalette="red"
        icon={<LuBadgeX />}
        title="404. Not found"
        description="The page you are looking for does not exist."
      />
      <EmptyState
        size="lg"
        colorPalette="red"
        icon={<LuBadgeX />}
        title="404. Not found"
        description="The page you are looking for does not exist."
      />
    </Stack>
  )
}

export const Alignment = () => {
  return (
    <EmptyState
      icon={<LuFolder />}
      title="No projects"
      description="Create your first project to get started."
      align="start"
    >
      <Button variant="surface" size="sm">
        Create project
      </Button>
    </EmptyState>
  )
}
