import { DateRangeValue, DateValue } from './types'

export const isDateInRange = (date: DateValue, range: DateRangeValue) => {
  if (!date || !range) {
    return false
  }
  return date.compare(range?.start) >= 0 && date.compare(range?.end) <= 0
}

// export const parseDate = <TDateValue = DateValue>(
//   date: TDateValue,
//   tz = getLocalTimeZone()
// ): DateValue | undefined => {
//   let parsedDate: string

//   if (date instanceof Date) {
//     parsedDate = date.toISOString()
//   } else if (typeof date === 'number') {
//     parsedDate = new Date(date).toISOString()
//   } else if (typeof date === 'string') {
//     parsedDate = date
//   } else {
//     // parsedDate = date.toString()
//     console.warn('Failed to parse date', date)
//     return
//   }

//   return parseAbsolute(parsedDate, tz)
// }

// export const formatDate = <
//   TDateValue extends DateValue = DateValue,
//   TFormattedValue = FormattedValue
// >(
//   value: TDateValue | null
// ): TFormattedValue | null => {
//   return value ? value.toDate('UTC') : null
// }

// export type RangeValue = {
//   start: Date | number | string
//   end: Date | number | string
// }

// export const parseRange = (range: RangeValue, tz = getLocalTimeZone()) => {
//   return {
//     start: parseDate(range.start, tz),
//     end: parseDate(range.end, tz),
//   }
// }
