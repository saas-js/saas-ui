import * as React from 'react'

import {
  chakra,
  forwardRef,
  Menu,
  MenuProps,
  MenuList,
  MenuListProps,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  ButtonProps,
  omitThemingProps,
  useMultiStyleConfig,
  MenuItemOptionProps,
  useFormControlContext,
  ThemingProps,
  useMenuButton,
} from '@chakra-ui/react'
import { cx, dataAttr } from '@chakra-ui/utils'
import { ChevronDownIcon } from '@saas-ui/core'

import { FieldOption } from '../types'

import {
  SelectOptions,
  SelectProvider,
  SelectStylesProvider,
  useSelect,
  useSelectContext,
  useSelectStyles,
} from './select-context'

export interface SelectOption
  extends Omit<MenuItemOptionProps, 'value'>,
    FieldOption {}

export interface SelectProps
  extends Omit<MenuProps, 'children' | 'variant' | 'size'>,
    ThemingProps<'SuiSelect'>,
    SelectOptions {}

export interface SelectButtonProps
  extends Omit<ButtonProps, 'size' | 'variant'> {}

/**
 * Button that opens the select menu and displays the selected value.
 *
 * @see https://saas-ui.dev/docs/components/forms/select
 */
export const SelectButton = forwardRef<SelectButtonProps, 'button'>(
  (props, ref) => {
    const {
      displayValue,
      renderValue,
      placeholder,
      isDisabled: isSelectDisabled,
    } = useSelectContext()

    const context = useFormControlContext()

    const styles = useSelectStyles()

    const {
      isInvalid,
      isReadOnly,
      isDisabled,
      isFocused,
      isRequired,
      id,
      onBlur,
      onFocus,
    } = context || {}

    const { rightIcon = <ChevronDownIcon />, ...rest } = props

    /* @ts-ignore */
    const focusStyles = styles.field?._focusVisible
    /* @ts-ignore */
    const readOnlyStyles = styles.field?._readOnly
    /* @ts-ignore */
    const invalid = styles.field?._invalid

    const height = styles.field?.h || styles.field?.height

    const buttonStyles: any = {
      fontWeight: 'normal',
      textAlign: 'left',
      color: 'inherit',
      _active: {
        bg: 'transparent',
      },
      minH: height,
      _focus: focusStyles,
      _expanded: focusStyles,
      _readOnly: readOnlyStyles,
      _invalid: invalid,
      minW: 0,
      ...styles.field,
      h: 'auto',
      ...props.sx,
    }

    const buttonProps = useMenuButton(rest, ref)

    // Using a Button, so we can simply use leftIcon and rightIcon
    return (
      <Button
        {...buttonProps}
        sx={buttonStyles}
        id={id || buttonProps.id}
        {...rest}
        onFocus={onFocus}
        onBlur={onBlur}
        isDisabled={isDisabled || isSelectDisabled}
        data-invalid={dataAttr(isInvalid)}
        data-read-only={dataAttr(isReadOnly)}
        data-focus={dataAttr(isFocused)}
        data-required={dataAttr(isRequired)}
        rightIcon={rightIcon}
      >
        <chakra.span
          __css={{
            display: 'block',
            pointerEvents: 'none',
            flex: '1 1 auto',
            minW: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {renderValue(displayValue) || placeholder}
        </chakra.span>
      </Button>
    )
  }
)

SelectButton.displayName = 'SelectButton'

/**
 * Allow users to select a value from a list of options.
 *
 * @see https://saas-ui.dev/docs/components/forms/select
 */
export const Select = forwardRef<SelectProps, 'select'>((props, ref) => {
  const { name, children, isDisabled, multiple, ...rest } = props

  const styles = useMultiStyleConfig('SuiSelect', props)

  const menuProps = omitThemingProps(rest)

  const context = useSelect(props)

  const { value, controlProps } = context

  return (
    <SelectProvider value={context}>
      <SelectStylesProvider value={styles}>
        <Menu {...menuProps} closeOnSelect={!multiple}>
          <chakra.div className={cx('sui-select')}>
            {children}
            <chakra.input
              {...controlProps}
              ref={ref}
              name={name}
              type="hidden"
              value={value || ''}
              className="saas-select__input"
            />
          </chakra.div>
        </Menu>
      </SelectStylesProvider>
    </SelectProvider>
  )
})

export interface SelectListProps extends MenuListProps {}

/**
 * The list of options to choose from.
 *
 * @see https://saas-ui.dev/docs/components/forms/select
 */
export const SelectList: React.FC<SelectListProps> = (props) => {
  const { defaultValue, value, options, multiple, onChange } =
    useSelectContext()

  return (
    <MenuList maxH="100vh" overflowY="auto" {...props}>
      <MenuOptionGroup
        defaultValue={(defaultValue || value) as string | string[] | undefined}
        value={value}
        onChange={onChange}
        type={multiple ? 'checkbox' : 'radio'}
      >
        {options
          ? options.map(({ value, label, ...rest }, i) => (
              <SelectOption key={i} value={value} {...rest}>
                {label || value}
              </SelectOption>
            ))
          : props.children}
      </MenuOptionGroup>
    </MenuList>
  )
}

Select.displayName = 'Select'

/**
 * An option in a select list
 *
 * @see https://saas-ui.dev/docs/components/forms/select
 */
export const SelectOption = forwardRef<MenuItemOptionProps, 'button'>(
  (props, ref) => {
    return <MenuItemOption ref={ref} {...props} />
  }
)
SelectOption.id = 'MenuItemOption'
SelectOption.displayName = 'SelectOption'
