import * as React from 'react'
import { useRef } from 'react'
import {
  useDatePickerState,
  DatePickerStateOptions,
  DatePickerState,
} from '@react-stately/datepicker'
import { useDatePicker } from '@react-aria/datepicker'

import {
  ThemingProps,
  PopoverProps,
  useMultiStyleConfig,
  Popover,
  useControllableState,
} from '@chakra-ui/react'
import {
  DatePickerProvider,
  DatePickerStylesProvider,
} from './date-picker-context'
import { parseDate } from './date'

type DateValue = DatePickerState['dateValue']

export interface DatePickerContainerProps
  extends ThemingProps<'DatePicker'>,
    Omit<PopoverProps, 'variant' | 'size'>,
    Omit<DatePickerStateOptions, 'value' | 'defaultValue' | 'onChange'> {
  value?: Date | number | string
  defaultValue?: Date | number | string
  onChange?(value: Date): void
}

export const DatePickerContainer: React.FC<DatePickerContainerProps> = (
  props
) => {
  const { value: valueProp, defaultValue, onChange, ...rest } = props
  const styles = useMultiStyleConfig('DatePicker', props)

  const [value, setValue] = useControllableState<DateValue>({
    defaultValue: defaultValue ? parseDate(defaultValue) : undefined,
    value: valueProp ? parseDate(valueProp) : undefined,
    onChange: (value) => onChange?.(value.toDate('UTC')),
  })

  const state = useDatePickerState({
    value,
    onChange: setValue,
    shouldCloseOnSelect: false,
  })

  const datePickerRef = useRef<HTMLDivElement>(null)

  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(
    {
      ['aria-label']: 'Date Picker',
      ...rest,
    },
    state,
    datePickerRef
  )

  const context = {
    state,
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    datePickerRef,
  }

  return (
    <DatePickerProvider value={context}>
      <DatePickerStylesProvider value={styles}>
        <Popover
          {...props}
          onOpen={() => state.setOpen(true)}
          onClose={() => state.setOpen(false)}
        />
      </DatePickerStylesProvider>
    </DatePickerProvider>
  )
}

export interface DatePickerProps extends DatePickerContainerProps {}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { children, ...rest } = props
  return <DatePickerContainer {...rest}>{children}</DatePickerContainer>
}
