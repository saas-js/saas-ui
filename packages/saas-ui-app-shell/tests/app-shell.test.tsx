import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/app-shell.stories'

const { Basic } = testStories<typeof stories>(stories)

test('should render', async () => {
  const { getByText } = render(<Basic />)

  expect(getByText('Navbar')).toBeInTheDocument()
  expect(getByText('Sidebar')).toBeInTheDocument()
  expect(getByText('Footer')).toBeInTheDocument()
})
