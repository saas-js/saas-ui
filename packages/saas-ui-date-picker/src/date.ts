import {
  parseAbsolute,
  getLocalTimeZone,
  DateValue,
} from '@internationalized/date'

export const parseDate = (
  date: Date | number | string,
  tz = getLocalTimeZone()
) => {
  let parsedDate: string

  if (date instanceof Date) {
    parsedDate = date.toISOString()
  } else if (typeof date === 'number') {
    parsedDate = new Date(date).toISOString()
  } else {
    parsedDate = date
  }

  return parseAbsolute(parsedDate, tz)
}

export const formatDate = (value: DateValue | null) => {
  return value ? value.toDate('UTC') : null
}

export type RangeValue = {
  start: Date | number | string
  end: Date | number | string
}

export const parseRange = (range: RangeValue, tz = getLocalTimeZone()) => {
  return {
    start: parseDate(range.start, tz),
    end: parseDate(range.end, tz),
  }
}
