import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  DateRangeInput,
  DateRangePickerTimeField,
  DateRangeValue,
  parseAbsoluteToLocal,
} from '../src'
import { Container, FormControl, FormLabel, VStack } from '@chakra-ui/react'

export default {
  title: 'Components/DateTime/DateRangeInput',
  component: DateRangeInput,
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
  const [value, setValue] = React.useState<DateRangeValue>()
  return (
    <FormControl>
      <FormLabel>Date range</FormLabel>
      <DateRangeInput value={value} onChange={setValue} {...args} />
    </FormControl>
  )
}

export const Basic = Template.bind({})
Basic.args = {}

export const DateTime = () => {
  return (
    <Template granularity="minute">
      <DateRangePickerTimeField />
    </Template>
  )
}

export const DateTimeNoTimezone = () => {
  return (
    <Template
      defaultValue={{
        start: parseAbsoluteToLocal(new Date().toISOString()),
        end: null,
      }}
      granularity="minute"
      hideTimeZone
    >
      <DateRangePickerTimeField />
    </Template>
  )
}
