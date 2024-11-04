import React, { useState } from 'react'

import { Container, Stack } from '@chakra-ui/react'
import { StoryObj } from '@storybook/react'
import { RiCloseLine, RiSearch2Line } from 'react-icons/ri'

import { SearchInput, SearchInputProps } from './search-input'

export default {
  title: 'Components/SearchInput',
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
        <SearchInput size="xs" />
      </Stack>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const CustomIcons: Story = {
  args: {
    icon: <RiSearch2Line />,
    resetIcon: <RiCloseLine />,
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
