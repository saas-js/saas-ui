import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { DatePickerStatic, DateValue, DatePickerCalendar } from '../src'
import { Container, Heading, VStack } from '@chakra-ui/react'

import { Card } from '@saas-ui/card'

export default {
  title: 'Components/DateTime/DatePickerStatic',
  component: DatePickerStatic,
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

  const [value, setValue] = React.useState<DateValue | null>(null)

  return (
    <Card p="4">
      <Heading size="md" mb="8">
        {value?.toString() ?? 'Select a date'}
      </Heading>
      <DatePickerStatic onChange={setValue} {...rest}>
        <DatePickerCalendar />
      </DatePickerStatic>
    </Card>
  )
}

export const Basic = Template.bind({})
Basic.args = {}
