import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/property.stories'

const { Basic } = testStories<typeof stories>(stories)

it('renders label and value', () => {
  const { getByText } = render(<Basic />)

  const label = getByText('Name')
  expect(label).toBeInTheDocument()
  const value = getByText('Elliot Alderson')
  expect(value).toBeInTheDocument()
})
