import * as React from 'react'

import { CalendarIcon } from '@chakra-ui/icons'
import {
  forwardRef,
  InputGroup,
  InputGroupProps,
  InputRightElement,
} from '@chakra-ui/react'

import { FieldButton } from './button'
import { DatePickerCalendar } from './calendar'
import { DateField, SegmentedInput, DatePickerTimeField } from './date-field'
import { DatePickerDialog, DatePickerTrigger } from './date-picker-dialog'
import { DatePicker, DatePickerContainerProps } from './date-picker'
import { useDatePickerContext } from './date-picker-context'

export interface DateInputProps extends DatePickerContainerProps {
  calendarIcon?: React.ReactNode
}

/**
 * DateInput
 *
 * A Date form input with Calendar popover to allow users to enter or select a date value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker-input
 */
export const DateInput = forwardRef<DateInputProps, 'div'>((props, ref) => {
  const { calendarIcon, ...rest } = props
  return (
    <DatePicker placement="bottom-end" granularity="day" {...rest}>
      <DatePickerInput calendarIcon={calendarIcon} ref={ref} />
      <DatePickerDialog>
        <DatePickerCalendar />
      </DatePickerDialog>
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
  const { calendarIcon, ...rest } = props
  return (
    <DatePicker placement="bottom-end" granularity="minute" {...rest}>
      <DatePickerInput calendarIcon={calendarIcon} ref={ref} />
      <DatePickerDialog>
        <DatePickerCalendar />
        <DatePickerTimeField />
      </DatePickerDialog>
    </DatePicker>
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
    const { calendarIcon, ...rest } = props
    const { state, groupProps, fieldProps, buttonProps, datePickerRef } =
      useDatePickerContext()

    return (
      <InputGroup {...rest} {...groupProps} ref={datePickerRef}>
        <SegmentedInput pr="3rem">
          <DateField {...fieldProps} ref={ref} />
        </SegmentedInput>
        <InputRightElement>
          <DatePickerTrigger>
            <FieldButton {...buttonProps} isActive={state.isOpen}>
              {calendarIcon || <CalendarIcon />}
            </FieldButton>
          </DatePickerTrigger>
        </InputRightElement>
      </InputGroup>
    )
  }
)

DatePickerInput.displayName = 'DatePickerInput'
