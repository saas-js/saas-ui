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

export const basic = Template.bind({})
basic.args = {
  /**
   * Description
   */
  name: 'pin-input',
}

export const pinLength = Template.bind({})
pinLength.args = {
  /**
   * Description
   */
  name: 'pin-input',
  pinLength: 10,
}
