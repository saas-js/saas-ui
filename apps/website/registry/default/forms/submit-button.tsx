'use client'

import * as React from 'react'

import { Button, type ButtonProps } from '#registry/default/ui/button/index.ts'

import { useFormContext } from './form-context'

export interface SubmitButtonProps extends ButtonProps {
  loadingText?: React.ReactNode
  /**
   * Disable the button while the form is invalid/pristine. Defaults to `true`.
   * Set to `false` to always allow clicking (e.g. to trigger validation).
   */
  disableIfInvalid?: boolean
}

/**
 * Submit button bound to the app form from context (provided by `<Form>`).
 * Shows a loading state while submitting and (by default) disables until the
 * form can submit.
 */
export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  SubmitButtonProps
>(function SubmitButton(props, ref) {
  const {
    children = 'Submit',
    loadingText,
    disabled,
    disableIfInvalid = true,
    ...rest
  } = props

  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {({ isSubmitting, canSubmit }) => (
        <Button
          ref={ref}
          type="submit"
          variant="solid"
          colorPalette="accent"
          loading={isSubmitting}
          loadingText={loadingText}
          disabled={disabled ?? (disableIfInvalid ? !canSubmit : false)}
          {...rest}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
})
