import * as React from 'react'
import { chakra, forwardRef, HTMLChakraProps } from '@chakra-ui/react'
import { NavButton, NavButtonProps } from './button'
import { CalendarGrid } from './calendar-grid'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useDatePickerStyles } from './date-picker-context'
import { CalendarProvider, useCalendarContext } from './calendar-context'
import { useCalendar } from './use-calendar'
import { CalendarYearGrid } from './calendar-years'

export interface DatePickerCalendarProps
  extends Omit<HTMLChakraProps<'div'>, 'defaultValue' | 'onChange'> {}

export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = (
  props
) => {
  return (
    <CalendarContainer {...props}>
      <CalendarHeader>
        <CalendarTitle />
        <CalendarPrevious />
        <CalendarNext />
      </CalendarHeader>
      <CalendarGrid />
    </CalendarContainer>
  )
}

export const CalendarContainer: React.FC<DatePickerCalendarProps> = (props) => {
  const { children, ...rest } = props

  const styles = useDatePickerStyles()

  const calendarStyles = {
    ...styles.calendar,
  }

  const context = useCalendar(props)

  const { calendarProps, ref } = context

  return (
    <CalendarProvider value={context}>
      <chakra.div {...rest} {...calendarProps} ref={ref} __css={calendarStyles}>
        {children}
      </chakra.div>
    </CalendarProvider>
  )
}

interface CalendarContentProps {}

const CalendarContent: React.FC<CalendarContentProps> = (props) => {
  const { action } = useCalendarContext()
  return action === 'calendar' ? <CalendarGrid /> : <CalendarYearGrid />
}

export interface CalendarHeaderProps extends HTMLChakraProps<'div'> {}

export const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const { children, ...rest } = props
  const styles = useDatePickerStyles()

  const headerStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    pb: 4,
    ...styles.header,
  }

  return (
    <chakra.div {...rest} __css={headerStyles}>
      {children}
    </chakra.div>
  )
}

export interface CalendarTitleProps extends HTMLChakraProps<'h5'> {}

export const CalendarTitle: React.FC<CalendarTitleProps> = (props) => {
  const { title } = useCalendarContext()

  const styles = useDatePickerStyles()

  const titleStyles = {
    ...styles.title,
  }

  return (
    <chakra.h5 {...props} __css={titleStyles}>
      {title}
    </chakra.h5>
  )
}

export interface CalendarNextProps extends Omit<NavButtonProps, 'aria-label'> {}

export const CalendarNext = forwardRef<CalendarNextProps, 'button'>(
  (props, ref) => {
    const { icon = <ChevronRightIcon boxSize={5} />, ...rest } = props
    const { nextButtonProps } = useCalendarContext()
    return (
      <NavButton
        ref={ref}
        aria-label="Next"
        {...nextButtonProps}
        icon={icon}
        {...rest}
      />
    )
  }
)

export interface CalendarNextProps extends Omit<NavButtonProps, 'aria-label'> {}

export const CalendarPrevious = forwardRef<CalendarNextProps, 'button'>(
  (props, ref) => {
    const { icon = <ChevronLeftIcon boxSize={5} />, ...rest } = props
    const { prevButtonProps } = useCalendarContext()
    return (
      <NavButton
        ref={ref}
        aria-label="Previous"
        {...prevButtonProps}
        icon={icon}
        {...rest}
      />
    )
  }
)
