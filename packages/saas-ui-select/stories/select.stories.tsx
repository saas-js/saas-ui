import { Container, Icon, MenuItemOption } from '@chakra-ui/react'
import * as React from 'react'

import { ComponentStory } from '@storybook/react'

import { Select } from '../src/select'
import { NativeSelect } from '../src/native-select'

import { FiSmile } from 'react-icons/fi'

export default {
  title: 'Components/Forms/Select',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const options = Array.from({ length: 100 }).map((_node, index) => ({
  value: String(index),
  label: `Option ${index + 1}`,
}))

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const basic = Template.bind({})
basic.args = {
  /**
   * Description
   */
  name: 'select',
  options,
}

export const defaultValue = () => (
  <>
    <Select name="select" options={options} defaultValue="1" />
  </>
)

export const placeholder = () => (
  <>
    <Select name="select" options={options} placeholder="Select an option..." />
  </>
)

export const disabled = () => (
  <>
    <Select name="select" options={options} placeholder="Disabled" isDisabled />
  </>
)

export const multi = () => (
  <>
    <Select
      name="select"
      options={options}
      placeholder="Select multiple..."
      multiple
    />
  </>
)

export const multiWithDefaultValue = () => (
  <>
    <Select
      name="select"
      options={options}
      placeholder="Select multiple..."
      multiple
      defaultValue={['1']}
    />
  </>
)

export const withIcons = () => (
  <>
    <Select
      name="select"
      options={options}
      value="1"
      leftIcon={<Icon as={FiSmile} />}
    />
  </>
)

export const withChildren = () => (
  <>
    <Select name="select" value="1">
      <MenuItemOption value="1">Option 1</MenuItemOption>
      <MenuItemOption value="2">Option 1</MenuItemOption>
    </Select>
  </>
)

export const withEmptyOption = () => (
  <>
    <Select name="select">
      <MenuItemOption>None</MenuItemOption>
      <MenuItemOption value="1">Option 1</MenuItemOption>
      <MenuItemOption value="2">Option 1</MenuItemOption>
    </Select>
  </>
)

export const nativeSelect = () => (
  <>
    <NativeSelect name="select" options={options} />
  </>
)
