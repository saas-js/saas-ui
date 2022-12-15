import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  DatePicker,
  DateValue,
  getLocalTimeZone,
  isWeekend,
  today,
  now,
  DatePickerDialog,
  DatePickerTrigger,
  DatePickerCalendar,
  DatePickerTimeField,
} from '../src'
import { Button, Container, Portal, VStack } from '@chakra-ui/react'

export default {
  title: 'Components/DateTime/DatePicker',
  component: DatePicker,
  decorators: [
    (Story) => {
      return (
        <Container>
          <VStack>
            <Story />
          </VStack>
        </Container>
      )
    },
  ],
} as Meta

const Template: Story = (args) => {
  const { children, ...rest } = args
  const [value, setValue] = React.useState<DateValue | null>(
    now(getLocalTimeZone())
  )

  return (
    <DatePicker {...rest} value={value} onChange={setValue}>
      <DatePickerTrigger>
        <Button>{value ? value.toString() : 'Open DatePicker'}</Button>
      </DatePickerTrigger>
      <Portal>
        <DatePickerDialog>
          <DatePickerCalendar />
          {children}
        </DatePickerDialog>
      </Portal>
    </DatePicker>
  )
}

export const Basic = Template.bind({})
Basic.args = {}

export const WithTime = Template.bind({})
WithTime.args = {
  children: <DatePickerTimeField />,
}

export const WithTime24H = Template.bind({})
WithTime24H.args = {
  hourCycle: 24,
  children: <DatePickerTimeField />,
}

const getRange = () => {
  const now = today(getLocalTimeZone())
  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ]
  const isDateUnavailable = (date) =>
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    )

  return { now, isDateUnavailable }
}

// storybook doesn't like the DateValue of react-aria on args, so we wrap the Template instead.
export const UnavailableDates = () => {
  const { now, isDateUnavailable } = React.useMemo(() => getRange(), [])
  const props = {
    minValue: now.subtract({ days: 7 }),
    maxValue: now.add({ days: 30 }),
    isDateUnavailable,
  }
  return <Template {...props} />
}

/* date-fns
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

*/
