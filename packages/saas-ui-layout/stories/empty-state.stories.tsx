import { Container, Stack } from '@chakra-ui/layout'
import * as React from 'react'

import { EmailIcon, WarningIcon } from '@chakra-ui/icons'

import {
  EmptyState,
  EmptyStateContainer,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  EmptyStateFooter,
} from '../src'
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

export const basic = () => (
  <Stack spacing="8">
    <EmptyState
      colorScheme="purple"
      icon={EmailIcon}
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

export const center = () => (
  <Stack spacing="8">
    <EmptyState
      colorScheme="purple"
      icon={EmailIcon}
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

export const composed = () => (
  <Stack spacing="8">
    <EmptyStateContainer colorScheme="purple">
      <EmptyStateBody>
        <EmptyStateIcon as={WarningIcon} color="purple.500" />

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
