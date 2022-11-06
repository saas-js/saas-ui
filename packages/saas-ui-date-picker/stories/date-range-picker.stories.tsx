import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Button, Container, Portal, VStack } from '@chakra-ui/react'

import {
  DateRangePicker,
  DateRangePickerTimeField,
  DateRangeValue,
  DateRangePickerCalendar,
  DatePickerDialog,
  DatePickerTrigger,
} from '../src'

export default {
  title: 'Components/DateTime/DateRangePicker',
  component: DateRangePicker,
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
  const [value, setValue] = React.useState<DateRangeValue>()
  return (
    <DateRangePicker onChange={setValue} {...rest}>
      <DatePickerTrigger>
        <Button>
          {value
            ? `${value.start.toString()} - ${value.end.toString()}`
            : 'Open DatePicker'}
        </Button>
      </DatePickerTrigger>
      <Portal>
        <DatePickerDialog>
          <DateRangePickerCalendar />
          {children}
        </DatePickerDialog>
      </Portal>
    </DateRangePicker>
  )
}

export const Basic = Template.bind({})
Basic.args = {}

export const WithTime = Template.bind({})
WithTime.args = {
  children: <DateRangePickerTimeField />,
}

export const WithTime24H = Template.bind({})
WithTime24H.args = {
  hourCycle: 24,
  children: <DateRangePickerTimeField />,
}
