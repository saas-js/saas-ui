import * as React from 'react'
import { useRef } from 'react'
import { useCalendarCell } from '@react-aria/calendar'
import { isSameMonth, CalendarDate } from '@internationalized/date'
import { Button, Box } from '@chakra-ui/react'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'

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
  const { cellProps, buttonProps, isSelected, isInvalid, formattedDate } =
    useCalendarCell({ date }, state, ref)

  const isOutsideMonth = !isSameMonth(currentMonth, date)

  return (
    <Box as="td" {...cellProps} textAlign="center">
      <Button
        {...buttonProps}
        ref={ref}
        hidden={isOutsideMonth}
        size="sm"
        colorScheme={isInvalid ? 'red' : isSelected ? 'primary' : 'gray'}
        variant={isSelected ? 'solid' : 'ghost'}
        fontWeight="normal"
        width="100%"
      >
        {formattedDate}
      </Button>
    </Box>
  )
}
