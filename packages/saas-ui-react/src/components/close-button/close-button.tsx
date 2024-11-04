import { forwardRef } from 'react'

import type { ButtonProps } from '@chakra-ui/react'
import { IconButton as ChakraIconButton } from '@chakra-ui/react'

import { CloseIcon } from '../icons/icons.tsx'

export interface CloseButtonProps extends ButtonProps {}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <ChakraIconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
        {props.children ?? <CloseIcon />}
      </ChakraIconButton>
    )
  },
)
