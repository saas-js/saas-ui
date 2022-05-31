import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/form.stories'

const { WithValidationRules, WithYupSchema } =
  testStories<typeof stories>(stories)

test('should validate', async () => {
  const onSubmit = jest.fn()
  const { getByText, user } = render(
    <WithValidationRules onSubmit={onSubmit} />
  )

  const submit = getByText('Submit')

  await user.click(submit)

  expect(onSubmit).not.toBeCalled()

  expect(getByText('Title is required')).toBeInTheDocument()
  expect(getByText('Description is required')).toBeInTheDocument()
})

test('should validate with schema', async () => {
  const onSubmit = jest.fn()
  const { getByText, getAllByText, user } = render(
    <WithYupSchema onSubmit={onSubmit} />
  )

  const submit = getByText('Submit')

  await user.click(submit)

  expect(onSubmit).not.toBeCalled()

  expect(getAllByText('Too short')).toHaveLength(2)
})
