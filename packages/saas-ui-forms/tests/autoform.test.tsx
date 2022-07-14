import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/auto-form.stories'

const { Basic, YupSchema, ZodSchema } = testStories<typeof stories>(stories)

test('should render with object schema', async () => {
  const { getByText } = render(<Basic />)

  expect(getByText('First name')).toBeInTheDocument()
  expect(getByText('Last name')).toBeInTheDocument()
  expect(getByText('Email address')).toBeInTheDocument()
})

test('should render with yup schema', async () => {
  const { getByText } = render(<YupSchema />)

  expect(getByText('First name')).toBeInTheDocument()
  expect(getByText('Last name')).toBeInTheDocument()
  expect(getByText('Email address')).toBeInTheDocument()
})

test('should render with zod schema', async () => {
  const { getByText } = render(<ZodSchema />)

  expect(getByText('First name')).toBeInTheDocument()
  expect(getByText('Last name')).toBeInTheDocument()
  expect(getByText('Email address')).toBeInTheDocument()
})
