import {
  Container,
  Input,
  InputGroup,
  Icon,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import * as React from 'react'

import { ComponentStory } from '@storybook/react'

import { InputRightButton } from './'

import { FiEye } from 'react-icons/fi'

export default {
  title: 'Components/Forms/InputRightButton',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const Template: ComponentStory<typeof InputRightButton> = (args) => (
  <FormControl>
    <FormLabel>Input Right Button</FormLabel>
    <InputGroup>
      <Input />
      <InputRightButton {...args} />
    </InputGroup>
  </FormControl>
)

export const Basic = Template.bind({})
Basic.args = {
  children: 'Save',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children: <Icon as={FiEye} />,
  'aria-label': 'Show password',
}
