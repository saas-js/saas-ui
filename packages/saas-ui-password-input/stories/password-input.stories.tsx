import { Container, FormControl, FormLabel, Icon } from '@chakra-ui/react'
import * as React from 'react'

import { FiEye, FiEyeOff } from 'react-icons/fi'

import { PasswordInput } from '../src'

export default {
  title: 'Components/Forms/PasswordInput',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <PasswordInput name="password" placeholder="Password" />
  </FormControl>
)

export const ReactIcons = () => (
  <>
    <PasswordInput
      name="password"
      placeholder="Password"
      viewIcon={<Icon as={FiEye} />}
      viewOffIcon={<Icon as={FiEyeOff} />}
    />
  </>
)

export const Variant = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <PasswordInput name="password" variant="flushed" />
  </FormControl>
)

export const CustomWidth = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <PasswordInput name="password" width="200px" />
  </FormControl>
)
