import { createContext } from '@chakra-ui/react-utils'
import { AriaCalendarProps, CalendarAria } from '@react-aria/calendar'
import { useCalendar as useAriaCalendar } from '@react-aria/calendar'
import {
  CalendarState,
  RangeCalendarState,
  useCalendarState,
} from '@react-stately/calendar'
import { createCalendar, DateDuration } from '@internationalized/date'
import { useRef, useState, useMemo } from 'react'
import { useDatePickerContext } from './date-picker-context'
import { DateValue } from './types'

interface CalendarProviderValue extends CalendarAria {
  state: CalendarState | RangeCalendarState
  locale: string
  titleProps: {
    onClick: () => void
  }
  action: CalendarAction
}

const [CalendarProvider, useCalendarContext] =
  createContext<CalendarProviderValue>({
    name: 'CalendarProvider',
  })

export { CalendarProvider, useCalendarContext }

export type CalendarAction = 'calendar' | 'years'

export const useCalendar = (props: AriaCalendarProps<DateValue>) => {
  const { locale, calendarProps: contextCalendarProps } = useDatePickerContext()

  const [action, setAction] = useState<CalendarAction>('calendar')

  const state = useCalendarState({
    ...contextCalendarProps,
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
  } = useAriaCalendar(props, state)

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
