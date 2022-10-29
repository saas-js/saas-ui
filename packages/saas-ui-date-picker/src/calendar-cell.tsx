import * as React from 'react'
import { useRef } from 'react'
import { isSameMonth, CalendarDate } from '@internationalized/date'
import { chakra } from '@chakra-ui/react'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import { useDatePickerStyles, useCalendarCell } from './date-picker-context'

interface CalendarCellProps {
  state: CalendarState | RangeCalendarState
  date: CalendarDate
  currentMonth: CalendarDate
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  state,
  date,
  currentMonth,
}) => {
  const ref = useRef<HTMLButtonElement>(null)

  const { cellProps, buttonProps, formattedDate } = useCalendarCell(
    {
      date,
      currentMonth,
    },
    state,
    ref
  )

  const isOutsideMonth = !isSameMonth(currentMonth, date)

  const styles = useDatePickerStyles()

  const cellStyles = {
    textAlign: 'center',
    padding: 0,
    ...styles.day,
  }

  const buttonStyles = {
    ...styles.dayButton,
  }

  return (
    <chakra.td as="td" {...cellProps} __css={cellStyles}>
      <chakra.button
        {...buttonProps}
        type="button"
        ref={ref}
        hidden={isOutsideMonth}
        width="100%"
        __css={buttonStyles}
      >
        <chakra.span __css={styles.dayLabel}>{formattedDate}</chakra.span>
      </chakra.button>
    </chakra.td>
  )
}
