import { AriaRangeCalendarProps } from '@react-aria/calendar'
import { useRangeCalendar as useAriaRangeCalendar } from '@react-aria/calendar'
import { useRangeCalendarState } from '@react-stately/calendar'
import { useRef, useState, useMemo } from 'react'
import { useDateRangePickerContext } from './date-picker-context'
import { DateValue } from './types'
import { CalendarAction } from './calendar-context'
import { defaultCreateCalendar } from './use-calendar'

export const useRangeCalendar = (props: AriaRangeCalendarProps<DateValue>) => {
  const {
    locale,
    calendarProps: contextCalendarProps,
    createCalendar = defaultCreateCalendar,
  } = useDateRangePickerContext()

  const [action, setAction] = useState<CalendarAction>('calendar')

  const state = useRangeCalendarState({
    ...contextCalendarProps,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)
  const {
    calendarProps,
    prevButtonProps,
    nextButtonProps,
    errorMessageProps,
    title,
  } = useAriaRangeCalendar(props, state, ref)

  const titleProps = useMemo(() => {
    return {
      onClick() {
        setAction(action === 'calendar' ? 'years' : 'calendar')
      },
    }
  }, [action])

  return {
    state,
    locale,
    calendarProps,
    prevButtonProps,
    nextButtonProps,
    errorMessageProps,
    titleProps,
    title,
    ref,
    action,
  }
}
