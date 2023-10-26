import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from './address.stories'

const { Basic } = testStories<typeof stories>(stories)

const address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'

test('renders Web3Address component with truncated address', () => {
  const { getByText } = render(<Basic address={address} />)
  const addr = getByText(/0x71C7\.\.\.976F/)
  expect(addr).toBeInTheDocument()
})
