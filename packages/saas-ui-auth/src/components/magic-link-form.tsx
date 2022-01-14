import * as React from 'react'
import { useLogin } from '../provider'

import { Form, FormLayout, Field } from '@saas-ui/forms'
import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

export interface MagicLinkFormProps {
  schema?: any
  action?: 'login' | 'signup'
  onSuccess?: (error: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
  submitLabel?: string
  defaultValues?: Record<string, any>
  renderSuccess?: (data: any) => React.ReactElement
}

interface SubmitParams {
  email: string
}

export function MagicLinkSuccess({ email }: any) {
  const description = (
    <>
      {`We've sent a magic link to ${email || 'your email address'}.`}
      <br />
      Click on the link to continue.
    </>
  )

  return (
    <AuthFormSuccess title="Check your mailbox!" description={description} />
  )
}

export const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
  schema,
  action = 'login',
  onSuccess = () => {},
  onError = () => {},
  onValidationError,
  submitLabel = 'Continue with Email',
  defaultValues,
  renderSuccess = (data) => <MagicLinkSuccess email={data?.email} />,
  children,
  ...formProps
}) => {
  const [{ isLoading, data }, submit] = useLogin({
    action,
  })

  const handleSubmit = ({ email }: SubmitParams) => {
    return submit({ email }).then(onSuccess).catch(onError)
  }

  if (data) {
    return renderSuccess(data)
  }

  return (
    <Form
      schema={schema}
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ email: '', ...defaultValues }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="email"
          placeholder="Email address"
          type="email"
          rules={{ required: true }}
        />

        {children}

        <LoginButton
          type="submit"
          isLoading={isLoading}
          isFullWidth
          label={submitLabel}
        />
      </FormLayout>
    </Form>
  )
}
