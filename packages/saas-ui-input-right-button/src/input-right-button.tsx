import * as React from 'react'

import { forwardRef } from '@chakra-ui/system'
import { __DEV__ } from '@chakra-ui/utils'
import { InputRightElement } from '@chakra-ui/input'
import { Button, ButtonProps } from '@saas-ui/button'

export const InputRightButton = forwardRef<ButtonProps, 'div'>((props, ref) => {
  return (
    <InputRightElement w="auto" px="1" py="1" alignItems="stretch">
      <Button ref={ref} height="auto" {...props} />
    </InputRightElement>
  )
})

InputRightButton.id = 'InputRightElement'

if (__DEV__) {
  InputRightButton.displayName = 'InputRightButton'
}
