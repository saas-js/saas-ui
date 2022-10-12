import * as React from 'react'
import { useCalendarGrid } from '@react-aria/calendar'
import {
  getWeeksInMonth,
  endOfMonth,
  DateDuration,
} from '@internationalized/date'
import { useLocale } from '@react-aria/i18n'
import { CalendarCell } from './calendar-cell'
import { chakra } from '@chakra-ui/react'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'

interface CalendarGridProps {
  state: CalendarState | RangeCalendarState
  offset?: DateDuration
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  state,
  offset = {},
}) => {
  const { locale } = useLocale()
  const startDate = state.visibleRange.start.add(offset)
  const endDate = endOfMonth(startDate)
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state
  )

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>
              <chakra.div fontWeight="normal" color="muted" fontSize="sm">
                {day}
              </chakra.div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
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
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
