import * as React from 'react'
import { useRef } from 'react'
import { useCalendarCell } from '@react-aria/calendar'
import { isSameMonth, CalendarDate } from '@internationalized/date'
import { chakra, Button } from '@chakra-ui/react'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import { dataAttr } from '@chakra-ui/utils'

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

  const styles = {
    _selected: {},
  }

  return (
    <chakra.td
      as="td"
      {...cellProps}
      data-selected={dataAttr(isSelected)}
      __css={{ textAlign: 'center', padding: 0 }}
    >
      <Button
        {...buttonProps}
        ref={ref}
        hidden={isOutsideMonth}
        size="sm"
        colorScheme={isInvalid ? 'red' : isSelected ? 'primary' : 'gray'}
        variant={isSelected ? 'solid' : 'ghost'}
        fontWeight="normal"
        width="100%"
        sx={
          {
            // ['[data-selected] &']: {
            //   bg: 'primary.200',
            //   borderRadius: 'none',
            //   color: 'black',
            // },
            // '[data-selected]:first-of-type &': {
            //   borderStartRadius: 'md',
            // },
            // '[data-selected]:last-of-type &': {
            //   borderEndRadius: 'md',
            // },
          }
        }
      >
        {formattedDate}
      </Button>
    </chakra.td>
  )
}
