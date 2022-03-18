import { render } from '@saas-ui/test-utils'

import { ClerkAuthProvider } from '../src'

test('Does not crash', () => {
  const { getByText } = render(
    <ClerkAuthProvider>{() => <>Test</>}</ClerkAuthProvider>
  )
  const children = getByText(/Test/)
  expect(children).toBeInTheDocument()
})
