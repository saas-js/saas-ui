import * as React from 'react'
import { useCalendarGrid } from '@react-aria/calendar'
import { endOfMonth, DateDuration } from '@internationalized/date'

import { CalendarCell } from './calendar-cell'
import { chakra } from '@chakra-ui/react'
import { useCalendarContext } from './calendar-context'
import { useDatePickerStyles } from './date-picker-context'

export interface CalendarGridProps {
  offset?: DateDuration
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ offset = {} }) => {
  const { state, firstDayOfWeek } = useCalendarContext()

  const startDate = state.visibleRange.start.add(offset)
  const endDate = endOfMonth(startDate)

  const { gridProps, headerProps, weekDays, weeksInMonth } = useCalendarGrid(
    {
      startDate,
      endDate,
      firstDayOfWeek,
    },
    state
  )

  const styles = useDatePickerStyles()

  const gridStyles = {
    ...styles.grid,
  }

  return (
    <chakra.table {...gridProps} __css={gridStyles}>
      <chakra.thead {...headerProps}>
        <chakra.tr>
          {weekDays.map((day, index) => (
            <chakra.th key={index} __css={styles.weekday}>
              {day}
            </chakra.th>
          ))}
        </chakra.tr>
      </chakra.thead>
      <chakra.tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <chakra.tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    currentMonth={startDate}
                  />
                ) : (
                  <chakra.td key={i} __css={{ padding: 0 }} />
                )
              )}
          </chakra.tr>
        ))}
      </chakra.tbody>
    </chakra.table>
  )
}
