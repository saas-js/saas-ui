import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/card.stories'

const { Basic, Actions } = testStories<typeof stories>(stories)

test('should render a title and body', async () => {
  const { getByText } = render(<Basic />)

  expect(getByText('Basic card')).toBeInTheDocument()
  expect(getByText('Card body')).toBeInTheDocument()
})

test('should render actions', async () => {
  const { getAllByRole } = render(<Actions />)

  const buttons = getAllByRole('button', {
    name: 'Footer button',
  })

  buttons.forEach((button) => {
    expect(button).toBeInTheDocument()
  })
})
