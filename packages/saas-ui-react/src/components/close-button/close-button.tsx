import { forwardRef } from 'react'

import {
  IconButton as ChakraIconButton,
  type IconButtonProps,
} from '../icon-button'
import { CloseIcon } from '../icons/icons.tsx'

export interface CloseButtonProps extends IconButtonProps {}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <ChakraIconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
        {props.children ?? <CloseIcon />}
      </ChakraIconButton>
    )
  },
)
