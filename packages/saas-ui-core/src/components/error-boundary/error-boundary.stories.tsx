import * as React from 'react'

import { Meta } from '@storybook/react'

import { ErrorBoundary, ErrorProvider } from './'

export default {
  title: 'Utilities/ErrorBoundary',
  component: ErrorBoundary,
  decorators: [
    (Story) => {
      return (
        <ErrorProvider onError={(err) => console.log('ERROR', err)}>
          <Story />
        </ErrorProvider>
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
        <div>
          <h1>Whoops, this was unexpected</h1>
          <p>Something terribly went wrong, but it's not your fault.</p>
        </div>
      }
    >
      <Err />
    </ErrorBoundary>
  )
}
