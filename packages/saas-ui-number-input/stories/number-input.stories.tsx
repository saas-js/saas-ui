import { Container } from '@chakra-ui/react'
import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { NumberInput } from '../src'

export default {
  title: 'Components/Forms/NumberInput',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = (args) => <NumberInput aria-label="Number" {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const HideStepper = Template.bind({})
HideStepper.args = {
  hideStepper: true,
}

export const MinMax = Template.bind({})
MinMax.args = {
  defaultValue: 5,
  min: 0,
  max: 10,
}

export const WithFormatter = Template.bind({})
WithFormatter.args = {
  format: (value) => `$${value}`, // use any currency formatter here
  parse: (value) => value.replace('$', ''),
}
