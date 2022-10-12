import * as React from 'react'
import { useRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useCalendarState } from '@react-stately/calendar'
import { useCalendar } from '@react-aria/calendar'
import { useLocale } from '@react-aria/i18n'
import { createCalendar } from '@internationalized/date'
import { NavButton } from './button'
import { CalendarGrid } from './calendar-grid'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Heading } from '@chakra-ui/react'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerCalendarProps {}

export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = (
  props
) => {
  const { locale } = useLocale()

  const { calendarProps: contextCalendarProps } = useDatePickerContext()

  const state = useCalendarState({
    ...contextCalendarProps,
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state)

  const calendarStyles = {}

  const leftIcon = <ChevronLeftIcon />
  const rightIcon = <ChevronRightIcon />

  return (
    <chakra.div {...calendarProps} ref={ref}>
      <chakra.div display="flex" alignItems="center" paddingBottom="4">
        <NavButton
          {...prevButtonProps}
          aria-label="Previous month"
          icon={leftIcon}
        />
        <Heading as="h2" size="sm" flex="1" textAlign="center">
          {title}
        </Heading>
        <NavButton
          {...nextButtonProps}
          aria-label="Next month"
          icon={rightIcon}
        />
      </chakra.div>
      <CalendarGrid state={state} />
    </chakra.div>
  )
}
