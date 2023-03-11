import {
  Container,
  FormControl,
  FormLabel,
  Icon,
  InputLeftAddon,
  InputLeftElement,
} from '@chakra-ui/react'
import { Story } from '@storybook/react'
import * as React from 'react'

import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'

import { PasswordInput } from './password-input'

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

export const Basic: Story = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <PasswordInput name="password" placeholder="Password" />
  </FormControl>
)

export const ReactIcons: Story = () => (
  <>
    <PasswordInput
      name="password"
      placeholder="Password"
      viewIcon={<Icon as={FiEye} />}
      viewOffIcon={<Icon as={FiEyeOff} />}
    />
  </>
)

export const Variant: Story = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <PasswordInput name="password" variant="flushed" />
  </FormControl>
)

export const CustomWidth: Story = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <PasswordInput name="password" width="200px" />
  </FormControl>
)

export const LeftAddon: Story = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <PasswordInput
      name="password"
      leftAddon={
        <InputLeftElement>
          <FiLock />
        </InputLeftElement>
      }
    />
  </FormControl>
)
