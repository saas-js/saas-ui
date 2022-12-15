import { DatePickerState } from '@react-stately/datepicker'
import { RangeValue } from '@react-types/shared'

export type DateValue = DatePickerState['dateValue']
export type TimeValue = DatePickerState['timeValue']
export type FormattedValue = DateValue | Date | string | number

export type DateRangeValue = RangeValue<DateValue | null>
export type TimeRangeValue = RangeValue<TimeValue | null>
