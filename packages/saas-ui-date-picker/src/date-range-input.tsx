import * as React from 'react'
import { FieldButton } from './Button'
import { DateRangePickerCalendar } from './date-range-calendar'
import { DateField, SegmentedInput, TimeField } from './date-field'
import { DatePickerDialog } from './date-picker-dialog'
import { CalendarIcon } from '@chakra-ui/icons'
import { InputGroup, Box, InputRightElement } from '@chakra-ui/react'
import { useDatePickerContext } from './date-picker-context'
import {
  DateRangePicker,
  DateRangePickerContainerProps,
} from './date-range-picker'

export interface DateRangeInputProps extends DateRangePickerContainerProps {}

export const DateRangeInput: React.FC<DateRangeInputProps> = (props) => {
  return (
    <DateRangePicker {...props}>
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
  } = useDatePickerContext()
  return (
    <InputGroup
      {...groupProps}
      ref={datePickerRef}
      width="auto"
      display="inline-flex"
    >
      <SegmentedInput pr="5.5rem">
        <DateField {...startFieldProps} />
        <Box as="span" aria-hidden="true" paddingX="2">
          –
        </Box>
        <DateField {...endFieldProps} />
        {/* {state.validationState === 'invalid' && (
          <NotAllowedIcon color="red.600" position="absolute" right="12" />
        )} */}
      </SegmentedInput>
      <InputRightElement>
        <FieldButton {...buttonProps} isPressed={state.isOpen}>
          <CalendarIcon />
        </FieldButton>
      </InputRightElement>
    </InputGroup>
  )
}

const DateRangeTimeInput = () => {
  const { state } = useDatePickerContext()
  return (
    <Box display="flex" gap="2">
      <TimeField
        label="Start time"
        value={state.timeRange?.start || null}
        onChange={(v) => state.setTime('start', v)}
      />
      <TimeField
        label="End time"
        value={state.timeRange?.end || null}
        onChange={(v) => state.setTime('end', v)}
      />
    </Box>
  )
}
