'use client'

import { forwardRef, useRef } from 'react'

import { mergeRefs, useControllableState } from '@chakra-ui/react'
import { LuEye, LuEyeOff } from 'react-icons/lu'

import {
  IconButton,
  type IconButtonProps,
} from '#components/icon-button/index.ts'
import {
  InputGroup,
  type InputGroupProps,
} from '#components/input-group/index.ts'
import { Input, type InputProps } from '#components/input/index.ts'

export interface PasswordInputProps
  extends InputProps,
    PasswordVisibilityProps {
  rootProps?: InputGroupProps
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      ...rest
    } = props

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    })

    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <InputGroup
        width="full"
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
            onPointerDown={(e) => {
              if (rest.disabled) return
              if (e.button !== 0) return
              e.preventDefault()
              setVisible(!visible)
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        }
        {...rootProps}
      >
        <Input
          {...rest}
          ref={mergeRefs(ref, inputRef)}
          type={visible ? 'text' : 'password'}
        />
      </InputGroup>
    )
  },
)

export interface PasswordVisibilityProps {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode }
}

const VisibilityTrigger = forwardRef<HTMLButtonElement, IconButtonProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        tabIndex={-1}
        ref={ref}
        me="-2"
        aspectRatio="square"
        size="sm"
        variant="ghost"
        colorPalette="gray"
        height="calc(100% - {spacing.2})"
        aria-label="Toggle password visibility"
        {...props}
      />
    )
  },
)
