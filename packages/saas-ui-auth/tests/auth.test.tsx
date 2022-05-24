import * as React from 'react'

import { render, testStories, fireEvent, act } from '@saas-ui/test-utils'
import * as stories from '../stories/auth.stories'

const { Basic, Providers, Password, PasswordWithCustomFields } =
  testStories<typeof stories>(stories)

test('shows success after submitting email', async () => {
  const { getByText, getByLabelText, getByRole } = render(<Basic />)

  const input = getByLabelText('Email')
  const submit = getByRole('button', {
    name: 'Log in',
  })

  await act(async () => {
    fireEvent.change(input, { target: { value: 'hello@saas-ui.dev' } })
    fireEvent.click(submit)
  })

  expect(getByText('Check your mailbox!')).toBeVisible()
})

test('shows providers', async () => {
  const { getByText } = render(<Providers />)

  expect(getByText('Continue with Google')).toBeVisible()
  expect(getByText('Continue with Github')).toBeVisible()
})

test('shows error on invalid input', async () => {
  const { getByLabelText, getByRole } = render(<Basic />)

  const input = getByLabelText('Email')
  const submit = getByRole('button', {
    name: 'Log in',
  })

  await act(async () => {
    fireEvent.click(submit)
  })
  expect(input).toHaveAttribute('aria-invalid')
})

test('opens sign up action', async () => {
  const { getByText, getByRole } = render(<Basic />)

  const link = getByText('Sign up')

  await act(async () => {
    fireEvent.click(link)
  })

  expect(getByRole('button', { name: 'Sign up' })).toBeVisible()
})

test('shows signup view', () => {
  const { getByRole } = render(<Basic view="signup" />)

  expect(getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
})

test('shows password form', () => {
  const { getByText } = render(<Basic type="password" />)

  expect(getByText('Password')).toBeInTheDocument()
})

test('shows error messages on invalid input', async () => {
  const { getByText, getByLabelText, getByRole } = render(<Password />)

  const input = getByLabelText('Email')
  const submit = getByRole('button', {
    name: 'Log in',
  })

  await act(async () => {
    fireEvent.click(submit)
  })

  expect(input).toHaveAttribute('aria-invalid')

  expect(getByText('Email is a required field')).toBeVisible()

  expect(getByText('Password must be at least 4 characters')).toBeVisible()
})

test('shows password reset form', async () => {
  const { getByText } = render(<Password />)

  const link = getByText('Forgot password?')

  await act(async () => {
    fireEvent.click(link)
  })

  expect(getByText('Reset password')).toBeVisible()
})

test('renders custom field', async () => {
  const { getByText } = render(<PasswordWithCustomFields />)

  expect(getByText('Remember me')).toBeVisible()
})
