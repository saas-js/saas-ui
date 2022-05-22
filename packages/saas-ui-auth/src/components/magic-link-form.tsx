import * as React from 'react'

import { __DEV__ } from '@chakra-ui/utils'

import {
  Form,
  FormLayout,
  Field,
  FormProps,
  SubmitHandler,
  FieldErrors,
} from '@saas-ui/forms'
import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

import { useLogin, AuthActionEnum } from '../provider'

export interface MagicLinkFormProps
  extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver' | 'children'> {
  action?: AuthActionEnum
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: FieldErrors<SubmitParams>) => void
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

if (__DEV__) {
  MagicLinkSuccess.displayName = 'MagicLinkSuccess'
}

export const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
  action = 'logIn',
  onSuccess = () => null,
  onError = () => null,
  onValidationError,
  submitLabel = 'Continue with Email',
  defaultValues,
  renderSuccess = (data) => <MagicLinkSuccess email={data?.email} />,
  children,
  ...formProps
}) => {
  const [{ isLoading, isResolved, data }, submit] = useLogin({
    action,
  })

  const handleSubmit: SubmitHandler<SubmitParams> = ({ email }) => {
    return submit({ email }).then(onSuccess).catch(onError)
  }

  // Succesful magic link login might not always return data
  // so we check if the action resolved without errors
  if (isResolved) {
    return renderSuccess(data)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ email: '', ...defaultValues }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="email"
          label="Email"
          type="email"
          rules={{ required: true }}
        />

        {children}

        <LoginButton
          type="submit"
          isLoading={isLoading}
          width="full"
          label={submitLabel}
        />
      </FormLayout>
    </Form>
  )
}

if (__DEV__) {
  MagicLinkForm.displayName = 'MagicLinkForm'
}
