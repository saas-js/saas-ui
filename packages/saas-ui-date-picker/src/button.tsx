import * as React from 'react'
import {
  Button,
  ButtonProps,
  forwardRef,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react'

interface FieldButtonProps extends ButtonProps {
  onPress?(e: any): void
}

export const FieldButton = forwardRef<FieldButtonProps, 'button'>(
  (props, ref) => {
    const { onPress: onClick, ...rest } = props

    return (
      <Button
        ref={ref}
        size="sm"
        h="1.75rem"
        mr="2"
        onClick={onClick}
        {...rest}
      >
        {props.children}
      </Button>
    )
  }
)

export interface NavButtonProps extends IconButtonProps {
  onPress?(e: any): void
}

export const NavButton = forwardRef<NavButtonProps, 'button'>((props, ref) => {
  const { onPress: onClick, ...rest } = props

  return (
    <IconButton ref={ref} size="sm" variant="ghost" onClick={onClick} {...rest}>
      {props.children}
    </IconButton>
  )
})
