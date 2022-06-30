import { Container } from '@chakra-ui/react'
import * as React from 'react'

import { ComponentStory } from '@storybook/react'

import { PinInput } from '../src'

export default {
  title: 'Components/Forms/PinInput',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const Template: ComponentStory<typeof PinInput> = (args) => (
  <PinInput {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  /**
   * Description
   */
  name: 'pin-input',
}

export const PinLength = Template.bind({})
PinLength.args = {
  /**
   * Description
   */
  name: 'pin-input',
  pinLength: 10,
}
