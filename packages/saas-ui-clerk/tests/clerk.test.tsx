import * as React from 'react'
import { render } from '@saas-ui/test-utils'

import { ClerkAuthProvider } from '../src'

test('Renders', () => {
  const { getByText } = render(
    <ClerkAuthProvider frontendApi="clerk.splendid.sunbird-84.lcl.dev">
      {() => {
        return <>Test</>
      }}
    </ClerkAuthProvider>
  )
  // const children = getByText(/Test/)
  // expect(children).toBeInTheDocument()
})
