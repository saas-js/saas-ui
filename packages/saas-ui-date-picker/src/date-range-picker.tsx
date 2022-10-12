import * as React from 'react'
import {
  DateRangePickerStateOptions,
  useDateRangePickerState,
  DateRangePickerState,
} from '@react-stately/datepicker'
import { useDateRangePicker } from '@react-aria/datepicker'
import {
  useMultiStyleConfig,
  Popover,
  ThemingProps,
  PopoverProps,
  useControllableState,
} from '@chakra-ui/react'
import {
  DatePickerProvider,
  DatePickerStylesProvider,
} from './date-picker-context'
import { parseRange } from './date'

export type RangeValue = DateRangePickerState['dateRange']
export type TimeRangeValue = DateRangePickerState['timeRange']

export interface DateRangePickerContainerProps
  extends ThemingProps<'DatePicker'>,
    Omit<PopoverProps, 'variant' | 'size'>,
    Omit<DateRangePickerStateOptions, 'value' | 'defaultValue' | 'onChange'> {
  value?: {
    start: Date | number | string
    end: Date | number | string
  }
  defaultValue?: {
    start: Date | number | string
    end: Date | number | string
  }
  onChange?(value: { start: Date; end: Date }): void
}

export const DateRangePickerContainer: React.FC<
  DateRangePickerContainerProps
> = (props) => {
  const { value: valueProp, defaultValue, onChange, ...rest } = props
  const styles = useMultiStyleConfig('DatePicker', props)

  const [value, setValue] = useControllableState<RangeValue>({
    defaultValue: defaultValue ? parseRange(defaultValue) : undefined,
    value: valueProp ? parseRange(valueProp) : undefined,
    onChange: (value) =>
      onChange?.({
        start: value.start.toDate('UTC'),
        end: value.end.toDate('UTC'),
      }),
  })

  const state = useDateRangePickerState({
    value,
    onChange: setValue,
    shouldCloseOnSelect: false,
  })

  const datePickerRef = React.useRef<HTMLDivElement>(null)

  const {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(
    {
      ['aria-label']: 'Date Range Picker',
      ...rest,
    },
    state,
    datePickerRef
  )

  const context = {
    state,
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
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

export const DateRangePicker: React.FC<DateRangePickerContainerProps> = (
  props
) => {
  return <DateRangePickerContainer {...props} />
}
