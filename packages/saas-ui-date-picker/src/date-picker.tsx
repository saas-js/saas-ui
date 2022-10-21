import * as React from 'react'
import { useRef } from 'react'
import {
  useDatePickerState,
  DatePickerStateOptions,
} from '@react-stately/datepicker'
import { useDatePicker } from '@react-aria/datepicker'
import { useLocale } from '@react-aria/i18n'
import {
  ThemingProps,
  PopoverProps,
  useMultiStyleConfig,
  Popover,
  useControllableState,
  useTheme,
} from '@chakra-ui/react'
import {
  DatePickerProvider,
  DatePickerStylesProvider,
} from './date-picker-context'

import { DateValue, FormattedValue } from './types'

import { datePickerStyleConfig } from './date-picker-styles'
import { getLocalTimeZone } from '@internationalized/date'

export interface DatePickerContainerProps
  extends ThemingProps<'DatePicker'>,
    Omit<PopoverProps, 'variant' | 'size'>,
    Omit<
      DatePickerStateOptions,
      'value' | 'defaultValue' | 'minValue' | 'maxValue' | 'onChange'
    > {
  value?: DateValue | null
  minValue?: DateValue
  maxValue?: DateValue
  defaultValue?: DateValue
  onChange?(value: DateValue | null): void
  locale?: string
  timeZone?: string
}

export const DatePickerContainer = (props: DatePickerContainerProps) => {
  const {
    value: valueProp,
    minValue,
    maxValue,
    defaultValue,
    onChange,
    ...rest
  } = props

  const {
    locale: localeProp,
    timeZone = getLocalTimeZone(),
    hourCycle = 12,
  } = props

  const { locale } = useLocale()

  const styles = useMultiStyleConfig('DatePicker', {
    styleConfig: datePickerStyleConfig,
    ...props,
  })

  const [value, setValue] = useControllableState<DateValue | null>({
    defaultValue,
    value: valueProp ? valueProp : null,
    onChange,
  })

  const state = useDatePickerState({
    value: value ? value : undefined,
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
      value: value ? value : undefined,
      minValue,
      maxValue,
      onChange: setValue,
      ...rest,
    },
    state,
    datePickerRef
  )

  const context = {
    locale: localeProp || locale,
    state,
    hourCycle,
    timeZone,
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

export interface DatePickerProps<
  TDateValue = DateValue,
  TFormattedValue = FormattedValue
> extends DatePickerContainerProps {}

/**
 * DatePicker
 *
 * Allow users to select a date and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker
 */
export const DatePicker = DatePickerContainer
