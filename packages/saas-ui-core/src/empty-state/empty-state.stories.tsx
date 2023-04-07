import { Container, Stack } from '@chakra-ui/react'
import * as React from 'react'

import { FiMail, FiAlertTriangle } from 'react-icons/fi'

import {
  EmptyState,
  EmptyStateContainer,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  EmptyStateFooter,
} from './empty-state'
import { Button } from '@chakra-ui/react'

export default {
  title: 'Components/Layout/EmptyState',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => (
  <Stack spacing="8">
    <EmptyState
      colorScheme="purple"
      icon={FiMail}
      title="Inbox Zero!"
      description="Your inbox is empty, go get some coffee ☕️"
      actions={
        <>
          <Button colorScheme="purple">Home</Button>
          <Button>Back</Button>
        </>
      }
    />
  </Stack>
)

export const Center = () => (
  <Stack spacing="8">
    <EmptyState
      colorScheme="purple"
      icon={FiMail}
      title="Inbox Zero!"
      description="Your inbox is empty, go get some coffee ☕️"
      actions={
        <>
          <Button colorScheme="purple">Home</Button>
          <Button>Back</Button>
        </>
      }
      variant="centered"
    />
  </Stack>
)

export const Composed = () => (
  <Stack spacing="8">
    <EmptyStateContainer colorScheme="purple">
      <EmptyStateBody>
        <EmptyStateIcon as={FiAlertTriangle} color="purple.500" />

        <EmptyStateTitle>Whoops, something went wrong</EmptyStateTitle>
        <EmptyStateDescription>Where do you want to go?</EmptyStateDescription>
        <EmptyStateActions>
          <Button colorScheme="purple">Home</Button>
          <Button variant="ghost">Back</Button>
        </EmptyStateActions>
      </EmptyStateBody>
    </EmptyStateContainer>
  </Stack>
)
