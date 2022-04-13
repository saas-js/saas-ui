import * as React from 'react'

import {
  forwardRef,
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  MenuListProps,
  MenuItemOption,
  MenuOptionGroup,
  MenuOptionGroupProps,
  Button,
  ButtonProps,
  omitThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { __DEV__ } from '@chakra-ui/utils'

interface Option {
  value: string
  label?: string
}

interface SelectOptions {
  /**
   * An array of options
   * If you leave this empty the children prop will be rendered.
   */
  options?: Option[]
  /**
   * Props passed to the MenuList.
   */
  menuListProps?: MenuListProps
  /**
   * Customize how the value is rendered.
   * @type (value?: string[]) => React.ReactElement
   */
  renderValue?: (value?: string[]) => React.ReactElement | undefined
}

export interface SelectProps
  extends Omit<MenuProps, 'children'>,
    Pick<ButtonProps, 'isDisabled' | 'leftIcon' | 'rightIcon'>,
    Pick<MenuOptionGroupProps, 'onChange'>,
    SelectOptions {}

const SelectButton = forwardRef((props, ref) => {
  const styles = useMultiStyleConfig('Input', props)

  const height = styles.field.h || styles.field.height

  const buttonStyles = {
    fontWeight: 'normal',
    textAlign: 'left',
    color: 'inherit',
    _active: {
      bg: 'transparent',
    },
    minH: height,
    ...styles.field,
    h: 'auto',
  }

  // Using a Button, so we can simply use leftIcon and rightIcon
  return <Button {...props} ref={ref} sx={buttonStyles} />
})

if (__DEV__) {
  SelectButton.displayName = 'SelectButton'
}

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
    menuListProps,
    renderValue = (value) => value?.join(', '),
    ...rest
  } = props
  const menuProps = omitThemingProps(rest)

  const [currentValue, setCurrentValue] = React.useState(value || defaultValue)

  const handleChange = (value: string | string[]) => {
    setCurrentValue(value)
    onChange?.(value)
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

  const displayValue = currentValue
    ? (Array.isArray(currentValue) ? currentValue : [currentValue]).map(
        getDisplayValue
      )
    : []

  return (
    <Menu {...menuProps} closeOnSelect={!multiple}>
      <MenuButton as={SelectButton} ref={ref} {...buttonProps}>
        {renderValue(displayValue) || placeholder}
      </MenuButton>
      <MenuList maxH="60vh" overflowY="auto" {...menuListProps}>
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

if (__DEV__) {
  Select.displayName = 'Select'
}
