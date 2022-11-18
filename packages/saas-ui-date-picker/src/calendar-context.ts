import { createContext } from '@chakra-ui/react-utils'
import { CalendarAria } from '@react-aria/calendar'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'

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
