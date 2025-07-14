import * as React from 'react'
import { SystemStyleObject } from '@chakra-ui/styled-system'
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
import { createContext, dataAttr } from '@chakra-ui/utils'
import {
  Calendar,
  CalendarDate,
  getDayOfWeek,
  isSameDay,
  now,
} from '@internationalized/date'
import { isDateInRange } from './date-utils'
import { usePopoverContext } from '@chakra-ui/react'

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
  firstDayOfWeek?: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
  createCalendar?(name: string): Calendar
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
  const { dialogProps, state, datePickerRef } = useContext()

  React.useEffect(() => {
    if (state.isOpen) {
      setTimeout(() => {
        const parent = datePickerRef.current?.parentNode
        const el =
          parent?.querySelector<HTMLElement>('[data-selected]') ||
          parent?.querySelector<HTMLElement>('[data-today]') ||
          parent?.querySelector<HTMLElement>(
            'td button:not([aria-disabled="true"])'
          )

        el?.focus()
      }, 0)
    }
  }, [datePickerRef, state.isOpen])

  return {
    dialogProps: {
      ...dialogProps,
    },
  }
}

export const useDatePickerInput = () => {
  const popover = usePopoverContext()
  const { onClick, ...triggerProps } = popover.getTriggerProps()

  const context = useDatePickerContext()

  const { state, locale, groupProps, datePickerRef } = context

  const buttonProps = {
    ...context.buttonProps,
    ...triggerProps,
  }

  return {
    fieldProps: context.fieldProps,
    groupProps,
    buttonProps,
    datePickerRef,
    locale,
    state,
  }
}

export const useDateRangePickerInput = () => {
  const popover = usePopoverContext()
  const { onClick, ...triggerProps } = popover.getTriggerProps()

  const context = useDateRangePickerContext()

  const { state, locale, groupProps, datePickerRef } = context

  const buttonProps = {
    ...context.buttonProps,
    ...triggerProps,
  }

  return {
    groupProps,
    buttonProps,
    datePickerRef,
    locale,
    state,
    startFieldProps: context.startFieldProps,
    endFieldProps: context.endFieldProps,
  }
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

  const {
    cellProps,
    buttonProps,
    isSelected,
    isInvalid,
    formattedDate,
    isOutsideVisibleRange,
    isUnavailable,
  } = useAriaCalendarCell({ date }, state, ref)

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
      ['data-selection-start']: dataAttr(isSelectionStart ?? undefined),
      ['data-selection-end']: dataAttr(isSelectionEnd ?? undefined),
      ['data-range-start']: dataAttr(isRangeStart),
      ['data-range-end']: dataAttr(isRangeEnd),
      ['data-highlighted']: dataAttr(isRange ?? undefined),
      ['data-today']: dataAttr(isSameDay(date, now(context.timeZone))),
      ['data-outside-visible-range']: dataAttr(isOutsideVisibleRange),
      ['data-unavailable']: dataAttr(isUnavailable),
    },
    isSelected,
    isInvalid,
    formattedDate,
  }
}
