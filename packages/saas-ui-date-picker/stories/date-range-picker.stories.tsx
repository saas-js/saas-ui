import * as React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import { Button, Container, Portal, VStack } from '@chakra-ui/react'

import {
  DateRangePicker,
  DateRangePickerTimeField,
  DateRangeValue,
  DateRangePickerCalendar,
  DatePickerDialog,
  DatePickerTrigger,
  type DateRangePickerProps,
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

type Story = StoryObj<
  Omit<DateRangePickerProps, 'children'> & { children?: React.ReactNode }
>['render']

const Template: Story = (args) => {
  const { children, ...rest } = args
  const [value, setValue] = React.useState<DateRangeValue | undefined>({
    start: null,
    end: null,
  })

  return (
    <DateRangePicker value={value} {...rest} onChange={setValue}>
      <DatePickerTrigger>
        <Button>
          {value
            ? `${value?.start?.toString()} - ${value?.end?.toString()}`
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

export const StartOfWeek = Template.bind({})
StartOfWeek.args = {
  firstDayOfWeek: 'sun',
}
