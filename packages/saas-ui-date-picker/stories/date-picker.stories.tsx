import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { DatePicker } from '../src'
import { Button, Container } from '@chakra-ui/react'
import { DatePickerDialog, DatePickerTrigger } from '../src/date-picker-dialog'
import { DatePickerCalendar } from '../src/calendar'

import { format } from 'date-fns'

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
  const [value, setValue] = React.useState<Date | undefined>()

  return (
    <DatePicker {...args} value={value} onChange={setValue}>
      <DatePickerTrigger>
        <Button>{value ? format(value, 'P') : 'Open DatePicker'}</Button>
      </DatePickerTrigger>
      <DatePickerDialog>
        <DatePickerCalendar />
      </DatePickerDialog>
    </DatePicker>
  )
}

export const Default = Template.bind({})
Default.args = {}
