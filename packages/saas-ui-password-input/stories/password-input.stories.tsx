import { Container, Icon } from '@chakra-ui/react'
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

export const basic = () => (
  <>
    <PasswordInput name="password" placeholder="Password" />
  </>
)

export const reactIcons = () => (
  <>
    <PasswordInput
      name="password"
      placeholder="Password"
      viewIcon={<Icon as={FiEye} />}
      viewOffIcon={<Icon as={FiEyeOff} />}
    />
  </>
)
