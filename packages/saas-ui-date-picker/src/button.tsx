import * as React from 'react'
import {
  Button,
  ButtonProps,
  forwardRef,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'

interface FieldButtonProps extends ButtonProps {
  onPress?(e: any): void
  onFocusChange?(isFocused: boolean): void
}

export const FieldButton = forwardRef<FieldButtonProps, 'button'>(
  (props, ref) => {
    const { onPress: onClick, onFocusChange, onFocus, onBlur, ...rest } = props

    return (
      <Button
        ref={ref}
        size="sm"
        h="1.75rem"
        mr="2"
        onClick={onClick}
        onFocus={() =>
          callAllHandlers(() => onFocusChange?.(true), props.onFocus)
        }
        onBlur={() =>
          callAllHandlers(() => onFocusChange?.(false), props.onBlur)
        }
        {...rest}
      >
        {props.children}
      </Button>
    )
  }
)

export interface NavButtonProps extends IconButtonProps {
  onPress?(e: any): void
  onFocusChange?(isFocused: boolean): void
}

export const NavButton = forwardRef<NavButtonProps, 'button'>((props, ref) => {
  const { onPress: onClick, onFocusChange, onFocus, onBlur, ...rest } = props

  return (
    <IconButton
      ref={ref}
      size="sm"
      variant="ghost"
      onClick={onClick}
      onFocus={() =>
        callAllHandlers(() => onFocusChange?.(true), props.onFocus)
      }
      onBlur={() => callAllHandlers(() => onFocusChange?.(false), props.onBlur)}
      {...rest}
    >
      {props.children}
    </IconButton>
  )
})
