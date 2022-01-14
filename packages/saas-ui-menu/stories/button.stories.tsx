import { Container, HStack, Stack } from '@chakra-ui/layout'
import * as React from 'react'

import { Menu } from '../src'

export default {
  title: 'Components/Forms/Menu',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const basic = () => <Stack align="start"></Stack>
