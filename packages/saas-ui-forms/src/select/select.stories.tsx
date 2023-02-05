import {
  Container,
  Icon,
  MenuItemOption,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import * as React from 'react'

import { ComponentStory } from '@storybook/react'

import { Select } from '../src/select'
import { NativeSelect } from '../src/native-select'

import { FiSmile } from 'react-icons/fi'

export default {
  title: 'Components/Forms/Select',
  decorators: [
    (Story: any) => (
      <Container mt="40px" maxW="320px">
        <Story />
      </Container>
    ),
  ],
}

const getOptions = (length = 6) =>
  Array.from({ length }).map((_node, index) => ({
    value: String(index),
    label: `Option ${index + 1}`,
  }))

const options = getOptions()

const Template: ComponentStory<typeof Select> = (args) => (
  <Select placeholder="Select an option..." {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  name: 'select',
  options,
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  name: 'select',
  options,
  defaultValue: 1,
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  name: 'select',
  options,
  placeholder: 'Select an option...',
}

export const Disabled = Template.bind({})
Disabled.args = {
  name: 'select',
  options,
  placeholder: 'Disabled.',
  isDisabled: true,
}

export const Multi = Template.bind({})
Multi.args = {
  name: 'select',
  options,
  placeholder: 'Multiple.',
  multiple: true,
}

export const MultiWithDefaultValue = Template.bind({})
MultiWithDefaultValue.args = {
  name: 'select',
  options,
  placeholder: 'Select an option...',
  multiple: true,
  defaultValue: ['1'],
}

export const MultiWithTags = Template.bind({})
MultiWithTags.args = {
  name: 'select',
  options,
  placeholder: 'Select options...',
  multiple: true,
  renderValue: (selected) => {
    if (selected?.length) {
      return (
        <Wrap py="1">
          {selected.map((value) => (
            <WrapItem>
              <Tag>{value}</Tag>
            </WrapItem>
          ))}
        </Wrap>
      )
    }
  },
}

export const WithIcons = Template.bind({})
WithIcons.args = {
  name: 'select',
  options,
  value: 1,
  leftIcon: <Icon as={FiSmile} />,
}

export const MaxHeight = Template.bind({})
MaxHeight.args = {
  name: 'select',
  options: getOptions(100),
}

export const WithChildren = () => {
  return (
    <Select name="select" value="1">
      <MenuItemOption value="1">Option 1</MenuItemOption>
      <MenuItemOption value="2">Option 1</MenuItemOption>
    </Select>
  )
}

export const WithEmptyOption = () => {
  return (
    <Select name="select" value="1">
      <MenuItemOption value="">None</MenuItemOption>
      <MenuItemOption value="1">Option 1</MenuItemOption>
      <MenuItemOption value="2">Option 1</MenuItemOption>
    </Select>
  )
}

export const WithNativeSelect = () => (
  <>
    <NativeSelect name="select" options={options} aria-label="Select" />
  </>
)
