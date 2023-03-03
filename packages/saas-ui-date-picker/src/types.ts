import { RangeValue } from '@react-types/shared'
import { DateValue, TimeValue } from '@react-types/datepicker'

export type { DateValue, TimeValue }

export type FormattedValue = DateValue | Date | string | number

export type DateRangeValue = RangeValue<DateValue | null>
export type TimeRangeValue = RangeValue<TimeValue | null>
