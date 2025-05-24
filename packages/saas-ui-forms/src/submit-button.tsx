import { forwardRef } from 'react'

import { Button, ButtonProps } from '@saas-ui/react/button'
import { useFormContext } from 'react-hook-form'

import { useFieldProps } from './form-context.tsx'

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
export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (props, ref) => {
    const {
      variant = 'glass',
      colorPalette = 'accent',
      children = 'Submit',
      disableIfUntouched: disableIfUntouchedProp = false,
      disableIfInvalid: disableIfInvalidProp = false,
      disabled: disabledProp,
      loading,
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
      disabledProp

    return (
      <Button
        ref={ref}
        variant={variant as any}
        colorPalette={colorPalette}
        type="submit"
        loading={formState.isSubmitting || loading}
        disabled={isDisabled}
        children={children}
        {...rest}
        {...fieldProps}
      />
    )
  },
)

SubmitButton.displayName = 'SubmitButton'
