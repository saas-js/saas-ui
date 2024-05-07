import { Container, Stack, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { StoryObj } from '@storybook/react'

import { FiSearch, FiX } from 'react-icons/fi'

import { SearchInput, SearchInputProps } from './search-input'

export default {
  title: 'Components/Forms/SearchInput',
  component: SearchInput,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

type Story = StoryObj<SearchInputProps>

export const Basic: Story = {}

export const Sizes: Story = {
  render: () => {
    return (
      <Stack>
        <SearchInput size="lg" />
        <SearchInput size="md" />
        <SearchInput size="sm" />
      </Stack>
    )
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const FeatherIcons: Story = {
  args: {
    icon: <Icon as={FiSearch} />,
    resetIcon: <Icon as={FiX} />,
  },
}

export const Controlled: Story = {
  render: (props: any) => {
    const [value, setValue] = useState('')
    return (
      <SearchInput
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onReset={() => setValue('')}
        {...props}
      />
    )
  },
}
