import * as React from 'react'

import {
  forwardRef,
  InputGroup,
  InputGroupProps,
  InputRightElement,
  Portal,
  SystemCSSProperties,
} from '@chakra-ui/react'

import { FieldButton } from './button'
import { DatePickerCalendar } from './calendar'
import { DateField, DatePickerTimeField } from './date-field'
import { DatePickerDialog, DatePickerTrigger } from './date-picker-dialog'
import { DatePicker, DatePickerProps } from './date-picker'
import { useDatePickerContext } from './date-picker-context'
import { SegmentedInput } from './segmented-input'
import { CalendarIcon } from './icons'

export interface DateInputProps extends DatePickerProps {
  /**
   * The icon to use in the calendar button
   */
  calendarIcon?: React.ReactNode
  /**
   * If `true`, the `DatePickerDialog` will open in a portal.
   * Also accepts a `z-index` value that will be passed to the dialog.
   */
  portal?: boolean | SystemCSSProperties['zIndex']
}

/**
 * A Date form input with Calendar popover to allow users to enter or select a date value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker-input
 */
export const DateInput = forwardRef<DateInputProps, 'div'>((props, ref) => {
  const { children, calendarIcon, size, variant, portal, ...rest } = props

  const zIndex = typeof portal === 'boolean' ? undefined : portal

  const dialog = (
    <DatePickerDialog zIndex={zIndex}>
      <>
        <DatePickerCalendar />
        {children}
      </>
    </DatePickerDialog>
  )

  return (
    <DatePicker placement="bottom-end" granularity="day" {...rest}>
      <DatePickerInput
        calendarIcon={calendarIcon}
        size={size}
        variant={variant}
        ref={ref}
      />

      {portal ? <Portal>{dialog}</Portal> : dialog}
    </DatePicker>
  )
})

DateInput.displayName = 'DateInput'

/**
 * DateTimeInput
 *
 * A Date form input with Calendar popover to allow users to enter or select a date and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker-input
 */
export const DateTimeInput = forwardRef<DateInputProps, 'div'>((props, ref) => {
  const { children, ...rest } = props
  return (
    <DateInput ref={ref} granularity="minute" {...rest}>
      <>
        <DatePickerTimeField />
        {children}
      </>
    </DateInput>
  )
})

DateTimeInput.displayName = 'DateTimeInput'

interface DatePickerInputProps extends InputGroupProps {
  calendarIcon?: React.ReactNode
}

/**
 * DatePickerInput
 *
 * A Date form input with Calendar popover to allow users to enter or select a date and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker-input
 */
export const DatePickerInput = forwardRef<DatePickerInputProps, 'div'>(
  (props, ref) => {
    const { calendarIcon, size, variant, ...rest } = props
    const {
      locale,
      state,
      groupProps,
      fieldProps,
      buttonProps,
      datePickerRef,
    } = useDatePickerContext()

    const themeProps = { size, variant }

    return (
      <InputGroup {...rest} {...groupProps} {...themeProps} ref={datePickerRef}>
        <SegmentedInput {...themeProps}>
          <DateField locale={locale} {...fieldProps} ref={ref} />
        </SegmentedInput>
        <InputRightElement py="1">
          <DatePickerTrigger>
            <FieldButton
              variant="ghost"
              flex="1"
              height="100%"
              {...buttonProps}
              isActive={state.isOpen}
            >
              {calendarIcon || <CalendarIcon />}
            </FieldButton>
          </DatePickerTrigger>
        </InputRightElement>
      </InputGroup>
    )
  }
)

DatePickerInput.displayName = 'DatePickerInput'
