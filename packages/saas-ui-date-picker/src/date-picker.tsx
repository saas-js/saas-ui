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
import { formatDate, parseDate } from './date'

type DateValue = DatePickerState['dateValue']

export interface DatePickerContainerProps
  extends ThemingProps<'DatePicker'>,
    Omit<PopoverProps, 'variant' | 'size'>,
    Omit<
      DatePickerStateOptions,
      'value' | 'defaultValue' | 'minValue' | 'maxValue' | 'onChange'
    > {
  value?: Date | number | string
  minValue?: Date | number | string
  maxValue?: Date | number | string
  defaultValue?: Date | number | string
  onChange?(value: Date | null): void
  parseDate?(date: Date | number | string, tz?: string): DateValue
  formatDate?(date: DateValue): DateValue | Date | number | string
}

export const DatePickerContainer: React.FC<DatePickerContainerProps> = (
  props
) => {
  const {
    value: valueProp,
    minValue: minValueProp,
    maxValue: maxValueProp,
    defaultValue: defaultValueProp,
    onChange,
    parseDate: parseDateProp = parseDate,
    formatDate: formatDateProp = formatDate,
    ...rest
  } = props
  const styles = useMultiStyleConfig('DatePicker', props)

  const defaultValue = defaultValueProp
    ? parseDateProp(defaultValueProp)
    : undefined
  const minValue = minValueProp ? parseDateProp(minValueProp) : undefined
  const maxValue = maxValueProp ? parseDateProp(maxValueProp) : undefined

  const [value, setValue] = useControllableState<DateValue | null>({
    defaultValue,
    value: valueProp ? parseDateProp(valueProp) : null,
    onChange: (value) => onChange?.(formatDateProp(value)),
  })

  const state = useDatePickerState({
    value,
    minValue,
    maxValue,
    defaultValue,
    onChange: setValue,
    ...rest,
  })

  const datePickerRef = useRef<HTMLDivElement>(null)

  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    descriptionProps,
    errorMessageProps,
    calendarProps,
  } = useDatePicker(
    {
      ['aria-label']: 'Date Picker',
      value,
      minValue,
      maxValue,
      onChange: setValue,
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
    descriptionProps,
    errorMessageProps,
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
