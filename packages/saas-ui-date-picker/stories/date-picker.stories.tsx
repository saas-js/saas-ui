import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { DatePicker, DateValue } from '../src'
import { Button, Container } from '@chakra-ui/react'
import { DatePickerDialog, DatePickerTrigger } from '../src/date-picker-dialog'
import { DatePickerCalendar } from '../src/calendar'

import { addDays, format, isAfter, isBefore, subDays } from 'date-fns'
import { DatePickerTimeField } from '../src/date-field'

export default {
  title: 'Components/DatePicker/DatePicker',
  component: DatePicker,
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      )
    },
  ],
} as Meta

const Template: Story = (args) => {
  const { children, ...rest } = args
  const [value, setValue] = React.useState<Date | undefined>()

  return (
    <DatePicker {...rest} value={value} onChange={setValue}>
      <DatePickerTrigger>
        <Button>{value ? format(value, 'P') : 'Open DatePicker'}</Button>
      </DatePickerTrigger>
      <DatePickerDialog>
        <DatePickerCalendar />
        {children}
      </DatePickerDialog>
    </DatePicker>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const WithTime = Template.bind({})
WithTime.args = {
  children: <DatePickerTimeField />,
}

export const WithTime24H = Template.bind({})
WithTime24H.args = {
  hourCycle: 24,
  children: <DatePickerTimeField />,
}

const now = new Date()
const disabledRanges = [
  [now, addDays(now, 5)],
  [addDays(now, 14), addDays(now, 16)],
  [addDays(now, 23), addDays(now, 24)],
]

const isDateUnavailable = (value: DateValue) => {
  const date = value.toDate('UTC')
  return disabledRanges.some(
    (interval) => isAfter(date, interval[0]) && isBefore(date, interval[1])
  )
}

export const UnavailableDates = Template.bind({})
UnavailableDates.args = {
  minValue: subDays(now, 7),
  maxValue: addDays(now, 30),
  isDateUnavailable,
}
