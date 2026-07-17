import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import '@testing-library/jest-dom'
import { type RenderOptions, render as rtlRender } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'

import { userEvent } from './user-event'

expect.extend(toHaveNoViolations)

export interface ChakraRenderOptions extends RenderOptions {
  withSaasProvider?: boolean
}

export function render(
  ui: React.ReactElement,
  { withSaasProvider = true, ...options }: ChakraRenderOptions = {
    withSaasProvider: true,
  },
): ReturnType<typeof rtlRender> & { user: ReturnType<typeof userEvent.setup> } {
  const { wrapper: Wrapper = React.Fragment, ...rtlOptions } = options
  const user = userEvent.setup()

  const MaybeSaasProvider = withSaasProvider
    ? ({ children }: React.PropsWithChildren) => (
        <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
      )
    : React.Fragment

  const result = rtlRender(
    <MaybeSaasProvider>
      <Wrapper>{ui}</Wrapper>
    </MaybeSaasProvider>,
    rtlOptions,
  )
  return { user, ...result }
}
