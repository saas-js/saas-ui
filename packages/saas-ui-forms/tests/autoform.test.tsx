import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/auto-form.stories'

testStories<typeof stories>(stories)

test('should render with object schema', async () => {
  const { getByText } = render(<stories.Basic />)

  expect(getByText('First name')).toBeInTheDocument()
  expect(getByText('Last name')).toBeInTheDocument()
  expect(getByText('Email address')).toBeInTheDocument()
})

test('should render with yup schema', async () => {
  const { getByText } = render(<stories.YupSchema />)

  expect(getByText('First name')).toBeInTheDocument()
  expect(getByText('Last name')).toBeInTheDocument()
  expect(getByText('Email address')).toBeInTheDocument()
})

test('should render with zod schema', async () => {
  const { getByText } = render(<stories.ZodSchema />)

  expect(getByText('First name')).toBeInTheDocument()
  expect(getByText('Last name')).toBeInTheDocument()
  expect(getByText('Email address')).toBeInTheDocument()
})
