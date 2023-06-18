import {
  Container,
  Icon,
  MenuItemOption,
  Stack,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import * as React from 'react'

import { StoryFn } from '@storybook/react'

import { Select, SelectButton, SelectList, SelectOption } from './select'
import { NativeSelect } from './native-select'

import { FiSmile } from 'react-icons/fi'

const Template: StoryFn<typeof Select> = (args) => (
  <Select placeholder="Select an option..." {...args}>
    <SelectButton />
    <SelectList />
  </Select>
)

export default {
  title: 'Components/Forms/Select',
  component: Template,
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

export const Basic = {
  args: {
    name: 'select',
    options,
  },
}

export const DefaultValue = {
  args: {
    name: 'select',
    options,
    defaultValue: '1',
  },
}

export const Placeholder = {
  args: {
    name: 'select',
    options,
    placeholder: 'Select an option...',
  },
}
export const Disabled = {
  args: {
    name: 'select',
    options,
    placeholder: 'Disabled.',
    isDisabled: true,
  },
}

export const Multi = {
  args: {
    name: 'select',
    options,
    placeholder: 'Multiple.',
    multiple: true,
  },
}

export const MultiWithDefaultValue = {
  args: {
    name: 'select',
    options,
    placeholder: 'Select an option...',
    multiple: true,
    defaultValue: ['1'],
  },
}

export const MultiWithTags = {
  args: {
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
                <Tag variant="solid">{value}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        )
      }
    },
  },
}

export const Test = {
  render: () => (
    <Tag variant="outline" colorScheme="teal">
      Test
    </Tag>
  ),
}

export const WithIcons = {
  render: (args) => (
    <Select placeholder="Select an option..." {...args}>
      <SelectButton leftIcon={<Icon as={FiSmile} />} />
      <SelectList />
    </Select>
  ),
  args: {
    name: 'select',
    options,
    value: '1',
  },
}

export const MaxHeight = {
  args: {
    name: 'select',
    options: getOptions(100),
  },
}

export const WithChildren = {
  render: () => (
    <Select name="select" defaultValue="1">
      <SelectButton />
      <SelectList>
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
      </SelectList>
    </Select>
  ),
}

export const WithEmptyOption = {
  render: () => (
    <Select name="select" defaultValue="1">
      <SelectButton />
      <SelectList>
        <SelectOption value="">None</SelectOption>
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
      </SelectList>
    </Select>
  ),
}

export const WithNativeSelect = {
  render: () => (
    <NativeSelect name="select" options={options} aria-label="Select" />
  ),
}

export const Sizes = {
  render: () => (
    <Stack>
      <Select name="select" defaultValue="1" size="xs">
        <SelectButton />
        <SelectList>
          <SelectOption value="">None</SelectOption>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </SelectList>
      </Select>
      <Select name="select" defaultValue="1" size="sm">
        <SelectButton />
        <SelectList>
          <SelectOption value="">None</SelectOption>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </SelectList>
      </Select>
      <Select name="select" defaultValue="1" size="md">
        <SelectButton />
        <SelectList>
          <SelectOption value="">None</SelectOption>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </SelectList>
      </Select>
      <Select name="select" defaultValue="1" size="lg">
        <SelectButton />
        <SelectList>
          <SelectOption value="">None</SelectOption>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </SelectList>
      </Select>
    </Stack>
  ),
}

export const Variants = {
  render: () => (
    <Stack>
      <Select name="select" defaultValue="1" variant="outline">
        <SelectButton />
        <SelectList>
          <SelectOption value="">None</SelectOption>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </SelectList>
      </Select>
      <Select name="select" defaultValue="1" variant="flushed">
        <SelectButton />
        <SelectList>
          <SelectOption value="">None</SelectOption>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </SelectList>
      </Select>
      <Select name="select" defaultValue="1" variant="filled">
        <SelectButton />
        <SelectList>
          <SelectOption value="">None</SelectOption>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </SelectList>
      </Select>
      <Select name="select" defaultValue="1" variant="unstyled">
        <SelectButton />
        <SelectList>
          <SelectOption value="">None</SelectOption>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </SelectList>
      </Select>
    </Stack>
  ),
}
