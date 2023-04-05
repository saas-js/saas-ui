import React, { useState } from 'react'

import { forwardRef, InputGroup, Input, InputProps } from '@chakra-ui/react'

import { ViewIcon, ViewOffIcon } from '@saas-ui/core/icons'

import { InputRightButton } from '../input-right-button'

interface PasswordOptions {
  viewIcon?: React.ReactNode
  viewOffIcon?: React.ReactNode
  leftAddon?: React.ReactNode
}

export interface PasswordInputProps extends InputProps, PasswordOptions {}

export const PasswordInput = forwardRef<PasswordInputProps, 'div'>(
  (props, ref) => {
    const {
      viewIcon,
      viewOffIcon,
      autoComplete,
      w,
      width,
      size,
      variant,
      leftAddon,
      ...inputProps
    } = props
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const label = show ? 'Hide password' : 'Show password'

    let icon
    if (show) {
      icon = viewIcon || <ViewIcon />
    } else {
      icon = viewOffIcon || <ViewOffIcon />
    }

    const groupProps = {
      width: w || width,
      size,
      variant,
    }

    return (
      <InputGroup {...groupProps}>
        {leftAddon}
        <Input
          {...inputProps}
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

PasswordInput.displayName = 'PasswordInput'
