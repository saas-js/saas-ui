import * as React from 'react'

import {
  chakra,
  forwardRef,
  SimpleGrid,
  HTMLChakraProps,
  SimpleGridProps,
} from '@chakra-ui/react'

import { useYears, useYear } from './use-calendar-years'
import { useDatePickerStyles } from './date-picker-context'

export interface CalendarYearGrid
  extends HTMLChakraProps<'div'>,
    Pick<SimpleGridProps, 'columns'> {}

export const CalendarYearGrid = forwardRef<CalendarYearGrid, 'div'>(
  (props, ref) => {
    const { columns, gap, columnGap, ...rest } = props
    const styles = useDatePickerStyles()

    const { years } = useYears()

    const yearsStyles = {
      overflow: 'auto',
      maxH: '250px',
      ...styles.years,
    }

    return (
      <chakra.div ref={ref} {...rest} __css={yearsStyles}>
        <SimpleGrid columns={4} gap="2" columnGap="3">
          {years.map((year) => (
            <CalendarYear key={year} year={year} />
          ))}
        </SimpleGrid>
      </chakra.div>
    )
  }
)

interface YearProps {
  year: number
}

const CalendarYear: React.FC<YearProps> = (props) => {
  const styles = useDatePickerStyles()

  const { year } = props
  const buttonProps = useYear(props)

  return (
    <chakra.button {...buttonProps} __css={styles.year}>
      {year}
    </chakra.button>
  )
}
