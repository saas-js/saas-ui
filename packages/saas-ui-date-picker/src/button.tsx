import * as React from 'react'
import {
  Button,
  ButtonProps,
  forwardRef,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { Pressable } from '@react-aria/interactions'

interface FieldButtonProps extends ButtonProps {
  onPress?(e: any): void
  onFocusChange?(isFocused: boolean): void
}

export const FieldButton = forwardRef<FieldButtonProps, 'button'>(
  (props, ref) => {
    const { onPress, onFocusChange, onFocus, onBlur, ...rest } = props

    return (
      <Pressable onPress={onPress}>
        <Button
          ref={ref}
          size="sm"
          h="1.75rem"
          mr="2"
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
      </Pressable>
    )
  }
)

export interface NavButtonProps extends IconButtonProps {
  onPress?(e: any): void
  onFocusChange?(isFocused: boolean): void
}

export const NavButton = forwardRef<NavButtonProps, 'button'>((props, ref) => {
  const { onPress, onFocusChange, onFocus, onBlur, ...rest } = props

  return (
    <Pressable onPress={onPress}>
      <IconButton
        ref={ref}
        size="sm"
        variant="ghost"
        onFocus={() =>
          callAllHandlers(() => onFocusChange?.(true), props.onFocus)
        }
        onBlur={() =>
          callAllHandlers(() => onFocusChange?.(false), props.onBlur)
        }
        {...rest}
      >
        {props.children}
      </IconButton>
    </Pressable>
  )
})
