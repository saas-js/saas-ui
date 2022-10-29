import * as React from 'react'
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { useDatePickerStyles } from './date-picker-context'
import { CalendarProvider } from './calendar-context'
import {
  CalendarHeader,
  CalendarNext,
  CalendarPrevious,
  CalendarTitle,
} from './calendar'
import { CalendarGrid } from './calendar-grid'
import { useRangeCalendar } from './use-range-calendar'

interface RangeCalendarProps
  extends Omit<HTMLChakraProps<'div'>, 'value' | 'defaultValue' | 'onChange'> {}

export const DateRangePickerCalendar: React.FC<RangeCalendarProps> = (
  props
) => {
  return (
    <RangeCalendarContainer {...props}>
      <CalendarHeader>
        <CalendarTitle />
        <CalendarPrevious />
        <CalendarNext />
      </CalendarHeader>

      <chakra.div display="flex" alignItems="flex-start" gap="8">
        <CalendarGrid />
        <CalendarGrid offset={{ months: 1 }} />
      </chakra.div>
    </RangeCalendarContainer>
  )
}

export const RangeCalendarContainer: React.FC<RangeCalendarProps> = (props) => {
  const { children, ...rest } = props

  const styles = useDatePickerStyles()

  const calendarStyles = {
    ...styles.calendar,
  }

  const context = useRangeCalendar(rest)

  const { calendarProps, ref } = context

  return (
    <CalendarProvider value={context}>
      <chakra.div {...calendarProps} ref={ref} __css={calendarStyles}>
        {children}
      </chakra.div>
    </CalendarProvider>
  )
}
