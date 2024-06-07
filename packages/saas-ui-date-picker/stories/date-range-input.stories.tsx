import * as React from 'react'
import { Meta } from '@storybook/react'

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

export const Basic = () => {
  const [value, setValue] = React.useState<DateRangeValue>()
  return (
    <FormControl>
      <FormLabel>Date range</FormLabel>
      <DateRangeInput value={value} onChange={setValue}></DateRangeInput>
    </FormControl>
  )
}

export const DateTime = () => {
  const [value, setValue] = React.useState<DateRangeValue>()
  return (
    <FormControl>
      <FormLabel>Date range</FormLabel>
      <DateRangeInput value={value} onChange={setValue} granularity="minute">
        <DateRangePickerTimeField />
      </DateRangeInput>
    </FormControl>
  )
}

export const DateTimeNoTimezone = () => {
  const [value, setValue] = React.useState<DateRangeValue>()
  return (
    <FormControl>
      <FormLabel>Date range</FormLabel>
      <DateRangeInput
        value={value}
        onChange={setValue}
        defaultValue={{
          start: parseAbsoluteToLocal(new Date().toISOString()),
          end: null,
        }}
        granularity="minute"
        hideTimeZone
      >
        <DateRangePickerTimeField />
      </DateRangeInput>
    </FormControl>
  )
}
