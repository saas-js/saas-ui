import { Container, Stack, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Story } from '@storybook/react'

import { FiSearch, FiX } from 'react-icons/fi'

import { SearchInput } from '../src'

export default {
  title: 'Components/Forms/SearchInput',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const Template: Story = (props: any) => {
  const [value, setValue] = useState('')

  return (
    <SearchInput
      value={value}
      onChange={({ target }) => setValue(target.value)}
      onReset={() => setValue('')}
      {...props}
    />
  )
}

export const Basic = Template.bind({})

export const Sizes = () => {
  return (
    <Stack>
      <Template size="lg" />
      <Template size="md" />
      <Template size="sm" />
    </Stack>
  )
}

export const FeatherIcons = () => (
  <Template icon={<Icon as={FiSearch} />} resetIcon={<Icon as={FiX} />} />
)
