import React, { useState } from 'react'

import { forwardRef } from '@chakra-ui/system'
import { InputGroup, Input, InputProps } from '@chakra-ui/input'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { InputRightButton } from '@saas-ui/input-right-button'

interface PasswordOptions {
  viewIcon?: React.ReactNode
  viewOffIcon?: React.ReactNode
}

export interface PasswordInputProps extends InputProps, PasswordOptions {}

export const PasswordInput = forwardRef<PasswordInputProps, 'div'>(
  ({ viewIcon, viewOffIcon, autoComplete, ...props }, ref) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const label = show ? 'Hide password' : 'Show password'

    let icon
    if (show) {
      icon = viewIcon || <ViewIcon />
    } else {
      icon = viewOffIcon || <ViewOffIcon />
    }

    return (
      <InputGroup>
        <Input
          {...props}
          ref={ref}
          type={show ? 'text' : 'password'}
          autoComplete={show ? 'off' : autoComplete}
        />

        <InputRightButton
          onClick={handleClick}
          aria-label={label}
          variant="ghost"
        >
          {icon}
        </InputRightButton>
      </InputGroup>
    )
  }
)
