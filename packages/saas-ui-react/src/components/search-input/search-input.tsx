import React, { forwardRef } from 'react'

import {
  Group,
  IconButton,
  type IconButtonProps,
  Input,
  InputElement,
  InputProps,
  mergeRefs,
  useControllableState,
} from '@chakra-ui/react'
import { callAll } from '@saas-ui/core/utils'

import { CloseIcon, SearchIcon } from '#components/icons'

export interface SearchInputProps extends InputProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  icon?: React.ReactElement
  resetIcon?: React.ReactElement
  endElement?: React.ReactElement
  onReset?: () => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const {
      placeholder = 'Search',
      value: valueProp,
      defaultValue: defaultValueProp,
      size,
      variant,
      width = 'full',
      icon = <SearchIcon />,
      resetIcon,
      endElement: endElementProp,
      onChange: onChangeProp,
      onReset: onResetProp,
      onKeyDown: onKeyDownProp,
      disabled,
      ...inputProps
    } = props

    const inputRef = React.useRef<HTMLInputElement>(null)

    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue: defaultValueProp,
    })

    const onChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
      },
      [setValue],
    )

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
          setValue('')
          onReset()
        }
      },
      [onResetProp, setValue],
    )

    const onReset = () => {
      setValue('')
      onResetProp?.()
      inputRef.current?.focus()
    }

    const showReset = value && !props.disabled

    const endElement = showReset ? (
      <SearchInputResetButton size={size}>{resetIcon}</SearchInputResetButton>
    ) : (
      endElementProp
    )

    return (
      <Group width={width}>
        <InputElement
          placement="start"
          px="0"
          aspectRatio="9/10"
          fontSize={size}
        >
          {icon}
        </InputElement>
        <Input
          type="text"
          placeholder={placeholder}
          variant={variant}
          size={size}
          value={value}
          disabled={disabled}
          ref={mergeRefs(ref, inputRef)}
          onChange={callAll(onChange, onChangeProp)}
          onKeyDown={callAll(onKeyDown, onKeyDownProp)}
          ps="calc(var(--input-height) - var(--input-height) / 10)"
          pe="calc(var(--input-height) - var(--input-height) / 10)"
          {...inputProps}
        />
        <InputElement placement="end">{endElement}</InputElement>
      </Group>
    )
  },
)

const SearchInputResetButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { children = <CloseIcon />, ...rest } = props

    return (
      <IconButton
        ref={ref}
        variant="ghost"
        aria-label="Reset search"
        me="-2"
        aspectRatio="square"
        height="calc(100% - {spacing.2})"
        {...rest}
      >
        {children}
      </IconButton>
    )
  },
)

SearchInput.displayName = 'SearchInput'
