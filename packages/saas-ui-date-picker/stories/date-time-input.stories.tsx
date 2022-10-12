import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { DateInput, DateTimeInput } from '../src'
import { Container } from '@chakra-ui/react'

export default {
  title: 'Components/DatePicker/DateTimeInput',
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

const Template: Story = (args) => <DateTimeInput {...args} />

export const Default = Template.bind({})
Default.args = {}
