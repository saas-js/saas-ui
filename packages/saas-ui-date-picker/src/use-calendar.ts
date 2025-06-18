import type {} from '@react-types/button'

import { AriaCalendarProps } from '@react-aria/calendar'
import { useCalendar as useAriaCalendar } from '@react-aria/calendar'
import { useCalendarState } from '@react-stately/calendar'
import { useRef, useState, useMemo, useEffect } from 'react'
import { useDatePickerContext } from './date-picker-context'
import { DateValue } from './types'
import { CalendarAction } from './calendar-context'
import { GregorianCalendar } from '@internationalized/date'
import { useControllableState } from '@chakra-ui/react'

export const defaultCreateCalendar = (name: string) => {
  switch (name) {
    case 'gregory':
      return new GregorianCalendar()
    default:
      throw new Error(`Unsupported calendar ${name}`)
  }
}

export const useCalendar = (props: AriaCalendarProps<DateValue>) => {
  const {
    locale,
    calendarProps: contextCalendarProps,
    createCalendar = defaultCreateCalendar,
  } = useDatePickerContext()

  const [action, setAction] = useState<CalendarAction>('calendar')

  const [focusedValue, setFocusedValue] =
    useControllableState<DateValue | null>({
      value: props.focusedValue,
      defaultValue: props.defaultFocusedValue ?? contextCalendarProps.value,
      onChange: props.onFocusChange as any,
    })

  const state = useCalendarState({
    ...contextCalendarProps,
    focusedValue: focusedValue ?? undefined,
    onFocusChange: setFocusedValue,
    locale,
    createCalendar,
  })

  useEffect(() => {
    if (state.value) {
      setFocusedValue(state.value)
    }
  }, [state.value])

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
