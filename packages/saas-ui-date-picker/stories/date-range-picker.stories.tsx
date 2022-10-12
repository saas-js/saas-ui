import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { DateRangePicker } from '../src'
import { Button, Container } from '@chakra-ui/react'
import { DatePickerDialog, DatePickerTrigger } from '../src/date-picker-dialog'
import { DateRangePickerCalendar } from '../src/date-range-calendar'

import { format } from 'date-fns'

export default {
  title: 'Components/DatePicker/DateRangePicker',
  component: DateRangePicker,
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
  const [value, setValue] = React.useState<
    { start: Date; end: Date } | undefined
  >()
  return (
    <DateRangePicker onChange={setValue} {...args}>
      <DatePickerTrigger>
        <Button>
          {value
            ? `${format(value.start, 'P')} - ${format(value.end, 'P')}`
            : 'Open DatePicker'}
        </Button>
      </DatePickerTrigger>
      <DatePickerDialog>
        <DateRangePickerCalendar />
      </DatePickerDialog>
    </DateRangePicker>
  )
}

export const Default = Template.bind({})
Default.args = {}
