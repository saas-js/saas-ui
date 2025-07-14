import React from 'react'

import { Button, Center, Stack, Text } from '@chakra-ui/react'
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

export const MultiLineDescription = () => {
  return (
    <EmptyState
      colorPalette="red"
      icon={<LuBadgeX />}
      title="404. Not found"
      description={
        <>
          <Text>The page you are looking for does not exist.</Text>
          <Text>Please try again.</Text>
        </>
      }
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
    <Center h="100dvh">
      <EmptyState
        icon={<LuFolder />}
        title="Projects"
        maxW="md"
        description={
          <>
            <Text>
              Projects are a collection of resources that you can use to manage
              your data.
            </Text>
            <Text>Create a project to get started.</Text>
          </>
        }
        align="start"
      >
        <Button variant="surface" size="sm">
          Create project
        </Button>
      </EmptyState>
    </Center>
  )
}
