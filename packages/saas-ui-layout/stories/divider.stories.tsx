import { Container, Stack } from '@chakra-ui/react'
import * as React from 'react'

import { Divider } from '../src'

export default {
  title: 'Components/Layout/Divider',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const basic = () => (
  <Stack spacing="8">
    <Divider />

    <Divider label="Divider label" />
  </Stack>
)

export const vertical = () => (
  <Stack alignItems="start" direction="row" height="200px">
    <Divider orientation="vertical" />
    <Divider orientation="vertical" label="Divider label" />
  </Stack>
)
