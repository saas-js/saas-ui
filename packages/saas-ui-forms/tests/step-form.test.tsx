import * as React from 'react'

import {
  render,
  act,
  testStories,
  waitFor,
  fireEvent,
} from '@saas-ui/test-utils'
import * as stories from '../stories/step-form.stories'
import { vi } from 'vitest'

const { Basic } = testStories(stories, {
  snapshots: false,
  a11y: false,
})

test('should go to the next step', async () => {
  const onSubmit = vi.fn()
  const { getByText, getByLabelText, user } = render(
    <Basic onSubmit={async () => onSubmit()} />
  )

  const name = getByLabelText('Name')

  fireEvent.change(name, { target: { value: 'Test' } })

  const email = getByLabelText('Email')

  fireEvent.change(email, { target: { value: 'hello@saas-ui.dev' } })

  const next = getByText('Next')

  await act(async () => {
    return await user.click(next)
  })

  expect(onSubmit).not.toBeCalled()

  await waitFor(() => {
    getByLabelText('Password')
  })

  const password = getByLabelText('Password')

  fireEvent.change(password, { target: { value: 'Test12345' } })

  const complete = getByText('Complete')

  await act(async () => {
    return await user.click(complete)
  })

  expect(onSubmit).toBeCalled()
})
