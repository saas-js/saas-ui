import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { DateInput } from '../src'
import { Container, FormControl, FormLabel } from '@chakra-ui/react'

export default {
  title: 'Components/DatePicker/DateInput',
  component: DateInput,
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

const Template: Story = (args) => (
  <FormControl>
    <FormLabel>Date</FormLabel>
    <DateInput {...args} />
  </FormControl>
)

export const Default = Template.bind({})
Default.args = {}
