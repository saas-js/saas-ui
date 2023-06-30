import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from './app-shell.stories'

const { FullscreenVariant } = testStories<typeof stories>(stories)

test('should render', async () => {
  const { getByText } = render(<FullscreenVariant />)

  expect(getByText('Navbar')).toBeInTheDocument()
  expect(getByText('Sidebar')).toBeInTheDocument()
  expect(getByText('Footer')).toBeInTheDocument()
})
