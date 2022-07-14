import { SaasProvider } from '@saas-ui/react'
import '@testing-library/jest-dom/extend-expect'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'
import * as React from 'react'
import { userEvent } from './user-event'

expect.extend(toHaveNoViolations)

export interface ChakraRenderOptions extends RenderOptions {
  withSaasProvider?: boolean
}

export function render(
  ui: React.ReactElement,
  { withSaasProvider = true, ...options }: ChakraRenderOptions = {
    withSaasProvider: true,
  }
): ReturnType<typeof rtlRender> & { user: ReturnType<typeof userEvent.setup> } {
  const { wrapper: Wrapper = React.Fragment, ...rtlOptions } = options
  const user = userEvent.setup()

  const MaybeSaasProvider = withSaasProvider ? SaasProvider : React.Fragment

  const result = rtlRender(
    <MaybeSaasProvider>
      <Wrapper>{ui}</Wrapper>
    </MaybeSaasProvider>,
    rtlOptions
  )
  return { user, ...result }
}
