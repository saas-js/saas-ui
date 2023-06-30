import { composeStories } from '@storybook/testing-react'
import { render, fireEvent, act } from '@saas-ui/test-utils'

import * as stories from '../stories/auth.stories'
const { Basic, Providers, Password, Signup, SignupWithCustomFields } =
  composeStories(stories)

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

  expect(getByText('Check your mailbox')).toBeVisible()
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
  const { getByRole } = render(<Signup />)

  expect(getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
})

test('shows password form', () => {
  const { getByText } = render(<Password />)

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

  expect(getByText('Password is a required field')).toBeVisible()
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
  const { getByText } = render(<SignupWithCustomFields />)

  expect(
    getByText('By signing up your agree to our terms and conditions.')
  ).toBeVisible()
})
