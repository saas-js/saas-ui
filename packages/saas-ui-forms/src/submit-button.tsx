import * as React from 'react'

import { useFormContext } from 'react-hook-form'

import { Button, ButtonProps } from '@saas-ui/button'

import { forwardRef } from '@chakra-ui/system'
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

export const SubmitButton = forwardRef<SubmitButtonProps, 'button'>(
  (props, ref) => {
    const { children, disableIfUntouched, disableIfInvalid, ...rest } = props
    const { formState } = useFormContext()

    const isDisabled =
      (disableIfUntouched && !formState.isDirty) ||
      (disableIfInvalid && !formState.isValid)

    return (
      <Button
        type="submit"
        isLoading={formState.isSubmitting}
        colorScheme="primary"
        ref={ref}
        isDisabled={isDisabled}
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

SubmitButton.defaultProps = {
  label: 'Submit',
  disableIfUntouched: false,
  disableIfInvalid: false,
}

if (__DEV__) {
  SubmitButton.displayName = 'SubmitButton'
}
