import * as React from 'react'
import { useRangeCalendarState } from '@react-stately/calendar'
import { useRangeCalendar } from '@react-aria/calendar'
import { useLocale } from '@react-aria/i18n'
import { createCalendar } from '@internationalized/date'
import { NavButton } from './button'
import { CalendarGrid } from './calendar-grid'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { chakra, Box, Heading } from '@chakra-ui/react'
import { useDatePickerContext } from './date-picker-context'

interface RangeCalendarProps {}

export const DateRangePickerCalendar: React.FC<RangeCalendarProps> = (
  props
) => {
  const { calendarProps: contextCalendarProps } = useDatePickerContext()

  const { locale } = useLocale()
  const state = useRangeCalendarState({
    ...contextCalendarProps,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  })

  const ref = React.useRef<HTMLDivElement>(null)
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref)

  return (
    <chakra.div {...calendarProps} ref={ref}>
      <Box display="flex" alignItems="center" paddingBottom="4">
        <NavButton
          aria-label="Previous month"
          {...prevButtonProps}
          icon={<ChevronLeftIcon w={6} h={6} />}
        />
        <Heading as="h2" size="sm" flex="1" textAlign="center">
          {title}
        </Heading>
        <NavButton
          aria-label="Next month"
          {...nextButtonProps}
          icon={<ChevronRightIcon w={6} h={6} />}
        />
      </Box>
      <Box display="flex" gap="8">
        <CalendarGrid state={state} />
        <CalendarGrid state={state} offset={{ months: 1 }} />
      </Box>
    </chakra.div>
  )
}
