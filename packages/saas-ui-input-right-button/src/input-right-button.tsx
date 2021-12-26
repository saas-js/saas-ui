import * as React from 'react'

import { Button, ButtonProps } from '@saas-ui/button'

import { InputRightElement } from '@chakra-ui/input'

export const InputRightButton: React.FC<ButtonProps> = (props) => {
  return (
    <InputRightElement w="auto" px="1" py="1" alignItems="stretch">
      <Button height="auto" {...props} />
    </InputRightElement>
  )
}
