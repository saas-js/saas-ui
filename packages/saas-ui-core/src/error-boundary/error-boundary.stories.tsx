import * as React from 'react'

import { Button, EmptyState } from '@chakra-ui/react'
import { Meta } from '@storybook/react'

import { system } from '../preset.ts'
import { SuiProvider } from '../provider/sui-provider.tsx'
import { ErrorBoundary } from './'

export default {
  title: 'Utilities/ErrorBoundary',
  component: ErrorBoundary,
  decorators: [
    (Story) => {
      return (
        <SuiProvider
          value={system}
          onError={(err) => console.log('ERROR', err)}
        >
          <Story />
        </SuiProvider>
      )
    },
  ],
} as Meta

const Err = () => {
  throw new Error('Test error')
  return null
}

export const Basic = () => {
  return (
    <ErrorBoundary>
      <Err />
    </ErrorBoundary>
  )
}

export const CustomFallback = () => {
  return (
    <ErrorBoundary
      fallback={
        <EmptyState.Root>
          <EmptyState.Title>Whoops, this was not expected</EmptyState.Title>
          <EmptyState.Description>
            Something terribly went wrong, but it's not your fault.
          </EmptyState.Description>
          <EmptyState.Content>
            <Button>Refresh</Button>
          </EmptyState.Content>
        </EmptyState.Root>
      }
    >
      <Err />
    </ErrorBoundary>
  )
}
