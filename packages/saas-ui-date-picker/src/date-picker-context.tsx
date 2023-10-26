import * as React from 'react'
import { createContext } from '@chakra-ui/react-utils'
import { SystemStyleObject } from '@chakra-ui/system'
import {
  DatePickerState,
  DateRangePickerState,
} from '@react-stately/datepicker'
import { DatePickerAria, DateRangePickerAria } from '@react-aria/datepicker'
import {
  AriaCalendarCellProps,
  useCalendarCell as useAriaCalendarCell,
} from '@react-aria/calendar'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import { dataAttr } from '@chakra-ui/utils'
import {
  CalendarDate,
  getDayOfWeek,
  getLocalTimeZone,
  isSameDay,
  now,
} from '@internationalized/date'
import { isDateInRange } from './date-utils'

export const [DatePickerStylesProvider, useDatePickerStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: 'DatePickerStylesContext',
})

interface BaseContextValue {
  action?: 'date' | 'year'
  datePickerRef: React.RefObject<HTMLDivElement>
  locale: string
  hourCycle: 12 | 24
  timeZone: string
}

export interface DatePickerProviderValue
  extends BaseContextValue,
    DatePickerAria {
  state: DatePickerState
}

export interface DateRangePickerProviderValue
  extends BaseContextValue,
    DateRangePickerAria {
  state: DateRangePickerState
}

const [DatePickerProvider, useContext] = createContext<
  DatePickerProviderValue | DateRangePickerProviderValue
>({
  name: 'DatePickerProvider',
})

export { DatePickerProvider }

export const useDatePickerContext = () => {
  const context = useContext()
  if ('dateRange' in context.state) {
    throw new Error(
      'useDatePickerContext must be used within a DatePickerProvider'
    )
  }
  return context as DatePickerProviderValue
}

export const useDateRangePickerContext = () => {
  const context = useContext()
  if (!('dateRange' in context.state)) {
    throw new Error(
      'useDateRangePickerContext must be used within a DateRangePicker'
    )
  }
  return context as DateRangePickerProviderValue
}

export const useDatePickerDialog = () => {
  const { dialogProps } = useContext()
  return { dialogProps }
}

export interface UseCalenderCellProps extends AriaCalendarCellProps {
  currentMonth: CalendarDate
}

export const useCalendarCell = (
  props: UseCalenderCellProps,
  state: CalendarState | RangeCalendarState,
  ref: React.RefObject<HTMLElement>
) => {
  const context = useContext()
  const { date, currentMonth } = props

  const { cellProps, buttonProps, isSelected, isInvalid, formattedDate } =
    useAriaCalendarCell({ date }, state, ref)

  const highlightedRange = 'highlightedRange' in state && state.highlightedRange
  const dayOfWeek = getDayOfWeek(props.date, context.locale)

  const isSelectionStart =
    isSelected && highlightedRange && isSameDay(date, highlightedRange.start)
  const isSelectionEnd =
    isSelected && highlightedRange && isSameDay(date, highlightedRange.end)
  const isRangeStart = isSelected && (dayOfWeek === 0 || date.day === 1)
  const isRangeEnd =
    isSelected &&
    (dayOfWeek === 6 ||
      date.day === currentMonth.calendar.getDaysInMonth(currentMonth))
  const isRange =
    isSelected && highlightedRange && isDateInRange(date, highlightedRange)

  return {
    cellProps,
    buttonProps: {
      ...buttonProps,
      ['data-selected']: dataAttr(isSelected),
      ['data-invalid']: dataAttr(isInvalid),
      ['data-selection-start']: dataAttr(isSelectionStart),
      ['data-selection-end']: dataAttr(isSelectionEnd),
      ['data-range-start']: dataAttr(isRangeStart),
      ['data-range-end']: dataAttr(isRangeEnd),
      ['data-highlighted']: dataAttr(isRange),
      ['data-today']: dataAttr(isSameDay(date, now(context.timeZone))),
    },
    isSelected,
    isInvalid,
    formattedDate,
  }
}
