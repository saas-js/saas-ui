import { dataAttr } from '@chakra-ui/utils'
import { DateValue, isSameYear } from '@internationalized/date'
import * as React from 'react'
import { useDatePickerContext } from './date-picker-context'

export const useYears = () => {
  const { state } = useDatePickerContext()

  const date = state.dateValue || new Date()

  const years = []
  for (let i = 1900; i < 2100; i++) {
    years.push(i)
  }

  return {
    date,
    years,
  }
}

export interface UseYearProps {
  year: number
}

export const useYear = (props: UseYearProps) => {
  const { year } = props

  const { state } = useDatePickerContext()

  const [currentYear, setYear] = React.useState(year)

  const ref = React.useRef<HTMLButtonElement>(null)

  const isCurrent = false // isSameYear(date, currentYear)

  React.useEffect(() => {
    if (isCurrent) {
      ref.current?.scrollIntoView({ block: 'center', inline: 'center' })
    }
  }, [isCurrent])

  const onClick = () => {
    // goToDate(setYear(date, year))
    // onDateSelect(setYear(date, year))
    // setAction('calendar')
  }

  return {
    ref,
    ['data-active']: dataAttr(isCurrent),
    onClick,
  }
}
