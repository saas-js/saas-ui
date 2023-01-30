import * as React from 'react'

import { useFormContext } from 'react-hook-form'

import { Button, ButtonProps } from '@saas-ui/button'

import { __DEV__ } from '@chakra-ui/utils'

export interface SubmitButtonProps extends ButtonProps {
  /**
   * Disable the submit button if the form is untouched.
   *
   * Change the default behavior by updating
   * `SubmitButton.defaultProps.disableIfUntouched`
   */
  disableIfUntouched?: boolean
  /**
   * Disable the submit button if the form is invalid.
   *
   * Change the default behavior by updating
   * `SubmitButton.defaultProps.disableIfInvalid`
   */
  disableIfInvalid?: boolean
}

export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  SubmitButtonProps
>((props, ref) => {
  const {
    children,
    disableIfUntouched,
    disableIfInvalid,
    isDisabled: isDisabledProp,
    isLoading,
    ...rest
  } = props
  const { formState } = useFormContext()

  const isDisabled =
    (disableIfUntouched && !formState.isDirty) ||
    (disableIfInvalid && !formState.isValid) ||
    isDisabledProp

  return (
    <Button
      {...rest}
      ref={ref}
      type="submit"
      isLoading={formState.isSubmitting || isLoading}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  )
})

SubmitButton.defaultProps = {
  variant: 'primary',
  children: 'Submit',
  disableIfUntouched: false,
  disableIfInvalid: false,
}

if (__DEV__) {
  SubmitButton.displayName = 'SubmitButton'
}
