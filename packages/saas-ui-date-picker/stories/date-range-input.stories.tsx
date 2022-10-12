import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { DateRangeInput } from '../src'
import { Container, FormControl, FormLabel } from '@chakra-ui/react'

import { format } from 'date-fns'

export default {
  title: 'Components/DatePicker/DateRangeInput',
  component: DateRangeInput,
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
    <FormControl>
      <FormLabel>Date range</FormLabel>
      <DateRangeInput value={value} onChange={setValue} {...args} />
    </FormControl>
  )
}

export const Default = Template.bind({})
Default.args = {}
