import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/button.stories'

import { Button } from '../src'

testStories<typeof stories>(stories)

test('should render a label', async () => {
  const { getByText, getByLabelText, getByRole } = render(
    <Button label="Button" />
  )

  expect(getByText('Button')).toBeVisible()
})

test('should render children', async () => {
  const { getByText, getByLabelText, getByRole } = render(
    <Button label="Button">Children</Button>
  )

  expect(getByText('Children')).toBeInTheDocument()
})
