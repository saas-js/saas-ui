import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { ErrorBoundary } from './'

import { EmptyState } from '../empty-state'
import { SaasProvider, useSaas } from '../provider'

export default {
  title: 'Utilities/ErrorBoundary',
  component: ErrorBoundary,
  decorators: [
    (Story) => {
      return (
        <SaasProvider onError={(err) => console.log('ERROR', err)}>
          <Story />
        </SaasProvider>
      )
    },
  ],
} as Meta

const Err = () => {
  throw new Error('Test error')
  return null
}

export const Basic: Story = () => {
  return (
    <ErrorBoundary>
      <Err />
    </ErrorBoundary>
  )
}

export const CustomFallback: Story = () => {
  return (
    <ErrorBoundary
      fallback={
        <EmptyState
          title="Whoops, this was not expected"
          description="Something terribly went wrong, but it's not your fault."
          variant="centered"
        />
      }
    >
      <Err />
    </ErrorBoundary>
  )
}
