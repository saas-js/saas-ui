import * as React from 'react'

import { render, act, fireEvent, testStories } from '@saas-ui/test-utils'
import * as stories from './search-input.stories'

const { Basic } = testStories<typeof stories>(stories)

test('should reset the value', async () => {
  const { getByText, getByLabelText, getByPlaceholderText, getByRole } = render(
    <Basic />
  )

  const input = getByPlaceholderText('Search')

  await act(async () => {
    fireEvent.change(input, { target: { value: 'query' } })
  })

  const reset = getByLabelText('Reset search')

  await act(async () => {
    fireEvent.click(reset)
  })

  expect(getByPlaceholderText('Search')).toHaveValue('')
})
