import * as React from 'react'

import { CalendarIcon } from '@chakra-ui/icons'
import {
  InputGroup,
  InputGroupProps,
  InputRightElement,
} from '@chakra-ui/react'

import { FieldButton } from './button'
import { DatePickerCalendar } from './calendar'
import { DateField, SegmentedInput, DatePickerTimeField } from './date-field'
import {
  DatePickerAnchor,
  DatePickerDialog,
  DatePickerTrigger,
} from './date-picker-dialog'
import { DatePicker, DatePickerContainerProps } from './date-picker'
import { useDatePickerContext } from './date-picker-context'

export interface DateInputProps extends DatePickerContainerProps {}

export const DateInput: React.FC<DateInputProps> = (props) => {
  return (
    <DatePicker placement="bottom-end" {...props}>
      <DatePickerInput />
      <DatePickerDialog>
        <DatePickerCalendar />
      </DatePickerDialog>
    </DatePicker>
  )
}

export const DateTimeInput: React.FC<DateInputProps> = (props) => {
  return (
    <DatePicker placement="bottom-end" {...props}>
      <DatePickerInput />
      <DatePickerDialog>
        <DatePickerCalendar />
        <DatePickerTimeField />
      </DatePickerDialog>
    </DatePicker>
  )
}

interface DatePickerInputProps extends InputGroupProps {
  calendarIcon?: React.ReactNode
}

export const DatePickerInput: React.FC<DatePickerInputProps> = (props) => {
  const { calendarIcon, ...rest } = props
  const { state, groupProps, fieldProps, buttonProps, datePickerRef } =
    useDatePickerContext()

  return (
    <InputGroup {...rest} {...groupProps} ref={datePickerRef}>
      <SegmentedInput pr="3rem">
        <DateField {...fieldProps} />
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
