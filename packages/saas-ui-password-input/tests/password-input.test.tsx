import * as React from 'react'

import { render, act, fireEvent, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/password-input.stories'

const { Basic } = testStories<typeof stories>(stories)

test('should render correct aria labels', async () => {
  const { getByText, getByLabelText, getByPlaceholderText, getByRole } = render(
    <Basic />
  )

  const toggle = getByLabelText('Show password')

  await act(async () => {
    fireEvent.click(toggle)
  })

  expect(toggle).toHaveAttribute('aria-label', 'Hide password')
})
