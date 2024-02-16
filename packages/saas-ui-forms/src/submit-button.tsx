import * as React from 'react'

import { useFormContext } from 'react-hook-form'

import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'
import { useFieldProps } from './form-context'

export interface SubmitButtonProps extends ButtonProps {
  /**
   * Disable the submit button if the form is untouched.
   */
  disableIfUntouched?: boolean
  /**
   * Disable the submit button if the form is invalid.
   */
  disableIfInvalid?: boolean
}
/**
 * A button with type submit and default color scheme primary and isLoading state when the form is submitting.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/form
 */
export const SubmitButton = forwardRef<SubmitButtonProps, 'button'>(
  (props, ref) => {
    const {
      variant = 'primary',
      children = 'Submit',
      disableIfUntouched: disableIfUntouchedProp = false,
      disableIfInvalid: disableIfInvalidProp = false,
      isDisabled: isDisabledProp,
      isLoading,
      ...rest
    } = props
    const { formState } = useFormContext()

    const field = useFieldProps('submit') as SubmitButtonProps

    const {
      disableIfUntouched: disableIfUntouchedOverride,
      disableIfInvalid: disableIfInvalidOverride,
      ...fieldProps
    } = field

    const disableIfUntouched =
      disableIfUntouchedOverride ?? disableIfUntouchedProp
    const disableIfInvalid = disableIfInvalidOverride ?? disableIfInvalidProp

    const isDisabled =
      (disableIfUntouched && !formState.isDirty) ||
      (disableIfInvalid && !formState.isValid) ||
      isDisabledProp

    return (
      <Button
        ref={ref}
        variant={variant}
        type="submit"
        isLoading={formState.isSubmitting || isLoading}
        isDisabled={isDisabled}
        children={children}
        {...rest}
        {...fieldProps}
      />
    )
  }
)

SubmitButton.displayName = 'SubmitButton'
