import {
  DatePickerState,
  DateRangePickerState,
} from '@react-stately/datepicker'

export type DateValue = DatePickerState['dateValue']
export type FormattedValue = DateValue | Date | string | number

export type DateRangeValue = DateRangePickerState['dateRange']
export type TimeRangeValue = DateRangePickerState['timeRange']
