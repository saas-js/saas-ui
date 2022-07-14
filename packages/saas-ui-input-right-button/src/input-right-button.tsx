import * as React from 'react'

import { forwardRef, InputRightElement } from '@chakra-ui/react'

import { __DEV__ } from '@chakra-ui/utils'

import { Button, ButtonProps } from '@saas-ui/button'

export type InputRightButtonProps = ButtonProps

export const InputRightButton = forwardRef<InputRightButtonProps, 'div'>(
  (props, ref) => {
    return (
      <InputRightElement w="auto" px="1" py="1" alignItems="stretch">
        <Button ref={ref} height="auto" {...props} />
      </InputRightElement>
    )
  }
)

InputRightButton.id = 'InputRightElement'

if (__DEV__) {
  InputRightButton.displayName = 'InputRightButton'
}
