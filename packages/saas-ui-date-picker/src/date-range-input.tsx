import * as React from 'react'
import { FieldButton } from './button'
import { DateRangePickerCalendar } from './date-range-calendar'
import { DateField, SegmentedInput, TimeField } from './date-field'
import {
  DatePickerAnchor,
  DatePickerDialog,
  DatePickerTrigger,
} from './date-picker-dialog'
import { CalendarIcon } from '@chakra-ui/icons'
import {
  chakra,
  InputGroup,
  InputRightElement,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { useDateRangePickerContext } from './date-picker-context'
import {
  DateRangePicker,
  DateRangePickerContainerProps,
} from './date-range-picker'

export interface DateRangeInputProps extends DateRangePickerContainerProps {}

export const DateRangeInput: React.FC<DateRangeInputProps> = (props) => {
  return (
    <DateRangePicker placement="bottom-start" {...props}>
      <DateRangePickerInput />
      <DatePickerDialog>
        <DateRangePickerCalendar />
      </DatePickerDialog>
    </DateRangePicker>
  )
}

const DateRangePickerInput = () => {
  const {
    state,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    datePickerRef,
  } = useDateRangePickerContext()
  return (
    <InputGroup
      {...groupProps}
      ref={datePickerRef}
      width="auto"
      display="inline-flex"
    >
      <DatePickerAnchor>
        <SegmentedInput pr="3rem">
          <DateField {...startFieldProps} />
          <chakra.span aria-hidden="true" paddingX="1">
            –
          </chakra.span>
          <DateField {...endFieldProps} />
        </SegmentedInput>
      </DatePickerAnchor>
      <InputRightElement>
        <DatePickerTrigger>
          <FieldButton {...buttonProps} isActive={state.isOpen}>
            <CalendarIcon />
          </FieldButton>
        </DatePickerTrigger>
      </InputRightElement>
    </InputGroup>
  )
}
