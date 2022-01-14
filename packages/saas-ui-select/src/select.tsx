import * as React from 'react'

import { useState } from 'react'
import {
  forwardRef,
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuItemOptionProps,
  MenuOptionGroup,
  MenuOptionGroupProps,
  Button,
  ButtonProps,
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  chakra,
  omitThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/system'

interface Option {
  value: string
  label?: string
}

interface SelectOptions {
  /**
   * An array of options
   * If you leave this empty the children prop will be rendered
   */
  options?: Option[]
  children?: React.ReactNode
}

export interface SelectProps
  extends Omit<MenuProps, 'children'>,
    Pick<ButtonProps, 'isDisabled' | 'leftIcon' | 'rightIcon'>,
    Pick<MenuOptionGroupProps, 'onChange'>,
    SelectOptions {}

const SelectButton = forwardRef((props, ref) => {
  const styles = useMultiStyleConfig('Input', props)

  const buttonStyles = {
    fontWeight: 'normal',
    textAlign: 'left',
    color: 'inherit',
    _active: {
      bg: 'transparent',
    },
    ...styles.field,
  }

  // Using a Button as, so we can simply use leftIcon and rightIcon
  return <Button {...props} ref={ref} sx={buttonStyles} />
})

export const Select = forwardRef<SelectProps, 'select'>((props, ref) => {
  const {
    options,
    children,
    onChange,
    defaultValue,
    value,
    placeholder,
    isDisabled,
    leftIcon,
    rightIcon = <ChevronDownIcon />,
    multiple,
    size,
    variant,
    ...rest
  } = props
  const menuProps = omitThemingProps(rest)

  const [currentValue, setCurrentValue] = useState(value || defaultValue)

  const handleChange = (value: string | string[]) => {
    setCurrentValue(value)
    onChange && onChange(value)
  }

  const buttonProps = {
    isDisabled,
    leftIcon,
    rightIcon,
    size,
    variant,
  }

  const getDisplayValue = React.useCallback(
    (value) => {
      if (!options) {
        return value
      }

      for (const option of options) {
        if (option.label && option.value === value) {
          return option.label
        }
      }

      return value
    },
    [options]
  )

  const displayValue = (
    Array.isArray(currentValue) ? currentValue : [currentValue]
  )
    .map(getDisplayValue)
    .join(', ')

  return (
    <Menu {...menuProps} closeOnSelect={!multiple}>
      <MenuButton as={SelectButton} ref={ref} {...buttonProps}>
        {displayValue || placeholder}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          defaultValue={
            (defaultValue || value) as string | string[] | undefined
          }
          onChange={handleChange}
          type={multiple ? 'checkbox' : 'radio'}
        >
          {options
            ? options.map(({ value, label, ...rest }, i) => (
                <MenuItemOption key={i} value={value} {...rest}>
                  {label || value}
                </MenuItemOption>
              ))
            : children}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
})
