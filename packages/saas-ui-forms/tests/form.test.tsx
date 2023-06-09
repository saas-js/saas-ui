import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/form.stories'
import { vi } from 'vitest'

const { WithValidationRules, WithZodSchema, WithYupSchema } =
  testStories(stories)

test('should validate', async () => {
  const onSubmit = vi.fn()
  const { getByText, user } = render(
    <WithValidationRules onSubmit={onSubmit} />
  )

  const submit = getByText('Submit')

  await user.click(submit)

  expect(onSubmit).not.toBeCalled()

  expect(getByText('Title is required')).toBeInTheDocument()
  expect(getByText('Description is required')).toBeInTheDocument()
})

test('should validate with zod schema', async () => {
  const onSubmit = vi.fn()
  const { getByText, getAllByText, user } = render(
    <WithZodSchema onSubmit={onSubmit} />
  )

  const submit = getByText('Submit')

  await user.click(submit)

  expect(onSubmit).not.toBeCalled()

  expect(getAllByText('Required')).toHaveLength(1)
})

test('should validate with yup schema', async () => {
  const onSubmit = vi.fn()
  const { getByText, getAllByText, user } = render(
    <WithYupSchema onSubmit={onSubmit} />
  )

  const submit = getByText('Submit')

  await user.click(submit)

  expect(onSubmit).not.toBeCalled()

  expect(getAllByText('Too short')).toHaveLength(2)
})
