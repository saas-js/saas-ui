import * as React from 'react'

import { render, testStories, fireEvent } from '@saas-ui/test-utils'
import * as stories from '../stories/display-if.stories'

const { Basic } = testStories<typeof stories>(stories)

test('should validate', async () => {
  const onSubmit = jest.fn()
  const { getByText, getByLabelText, user } = render(
    <Basic onSubmit={onSubmit} />
  )

  const title = getByLabelText('Title')

  fireEvent.change(title, { target: { value: 'test' } })

  const description = getByLabelText('Description')

  expect(description).toBeVisible()
})
