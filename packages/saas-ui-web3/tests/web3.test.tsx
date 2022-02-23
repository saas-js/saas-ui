import { render } from '@saas-ui/test-utils'

import { Web3Address } from '../src'

const address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'

test('renders Web3Address component with truncated address', () => {
  const { getByText } = render(<Web3Address address={address} />)
  const addr = getByText(/0x71C7\.\.\.976F/)
  expect(addr).toBeInTheDocument()
})
