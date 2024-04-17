import { Container, Icon, Stack, Tag, Wrap, WrapItem } from '@chakra-ui/react'
import * as React from 'react'

import { StoryObj } from '@storybook/react'

import {
  Select,
  SelectButton,
  SelectList,
  SelectOption,
  SelectProps,
} from './select'
import { NativeSelect } from './native-select'

import { FiSmile } from 'react-icons/fi'

type Story<Multiple extends boolean = false> = StoryObj<SelectProps<Multiple>>

export default {
  title: 'Components/Forms/Select',
  component: Select,
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

export const Basic: Story = {
  args: {
    name: 'select',
    options,
    children: (
      <>
        <SelectButton />
        <SelectList />
      </>
    ),
  },
}

export const DefaultValue: Story = {
  args: {
    name: 'select',
    options,
    defaultValue: '1',
    children: (
      <>
        <SelectButton />
        <SelectList />
      </>
    ),
  },
}

export const Placeholder: Story = {
  args: {
    name: 'select',
    options,
    placeholder: 'Select an option...',
    children: (
      <>
        <SelectButton />
        <SelectList />
      </>
    ),
  },
}
export const Disabled: Story = {
  args: {
    name: 'select',
    options,
    placeholder: 'Disabled.',
    isDisabled: true,
    children: (
      <>
        <SelectButton />
        <SelectList />
      </>
    ),
  },
}

export const Multi: Story<true> = {
  args: {
    name: 'select',
    options,
    placeholder: 'Multiple.',
    multiple: true,
    children: (
      <>
        <SelectButton />
        <SelectList />
      </>
    ),
  },
}

export const MultiWithDefaultValue: Story<true> = {
  args: {
    name: 'select',
    options,
    placeholder: 'Select an option...',
    multiple: true,
    defaultValue: ['1'],
    children: (
      <>
        <SelectButton />
        <SelectList />
      </>
    ),
  },
}

export const MultiWithTags: Story<true> = {
  args: {
    name: 'select',
    options,
    placeholder: 'Select options...',
    multiple: true,
    children: (
      <>
        <SelectButton />
        <SelectList />
      </>
    ),
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

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('1')

    return (
      <Select
        placeholder="Select an option..."
        value={value}
        onChange={(value) => setValue(value)}
        {...args}
      >
        <SelectButton />
        <SelectList />
      </Select>
    )
  },
  args: {
    name: 'select',
    options,
  },
}

export const ControlledMulti: Story<true> = {
  render: (args) => {
    const [value, setValue] = React.useState(['1'])

    return (
      <Select
        placeholder="Select an option..."
        value={value}
        onChange={(value) => setValue(value)}
        {...args}
      >
        <SelectButton />
        <SelectList />
      </Select>
    )
  },
  args: {
    name: 'select',
    options,
    multiple: true,
  },
}

export const WithIcons: Story = {
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

export const MaxHeight: Story = {
  args: {
    name: 'select',
    options: getOptions(100),
    placeholder: 'Select an option...',
    children: (
      <>
        <SelectButton />
        <SelectList />
      </>
    ),
  },
}

export const WithChildren: Story = {
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

export const WithEmptyOption: Story = {
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

export const WithNativeSelect: Story = {
  render: () => (
    <NativeSelect name="select" options={options} aria-label="Select" />
  ),
}

export const Sizes: Story = {
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

export const Variants: Story = {
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
