import { Container, Stack } from '@chakra-ui/react'
import * as React from 'react'

import { Divider, DividerLabel } from './divider'

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

export const Basic = () => (
  <Stack spacing="8">
    <Divider />

    <Divider>
      <DividerLabel>Divider label</DividerLabel>
    </Divider>
  </Stack>
)

export const Vertical = () => (
  <Stack alignItems="start" direction="row" height="200px">
    <Divider orientation="vertical" />
    <Divider orientation="vertical">
      <DividerLabel>Divider label</DividerLabel>
    </Divider>
  </Stack>
)
