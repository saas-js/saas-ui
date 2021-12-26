import { Container, Stack, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'

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

const Template = (props: any) => {
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

export const basic = () => <Template />

export const sizes = () => {
  return (
    <Stack>
      <Template size="lg" />
      <Template size="md" />
      <Template size="sm" />
    </Stack>
  )
}

export const featherIcons = () => (
  <Template icon={<Icon as={FiSearch} />} resetIcon={<Icon as={FiX} />} />
)
