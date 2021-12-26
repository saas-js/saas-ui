import * as React from 'react'

import { useFormContext } from 'react-hook-form'

import { Button, ButtonProps } from '@saas-ui/button'

import { forwardRef } from '@chakra-ui/system'

export const SubmitButton = forwardRef<ButtonProps, 'button'>(
  ({ children, ...props }, ref) => {
    const data = useFormContext()

    return (
      <Button
        type="submit"
        isLoading={data.formState.isSubmitting}
        isPrimary
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
