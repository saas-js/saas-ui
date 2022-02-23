import { Container, Box, Stack, Text } from '@chakra-ui/layout'
import * as React from 'react'

import { Loading } from '../src'

export default {
  title: 'Components/Feedback/Loading',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const basic = () => (
  <Stack height="200px">
    <Loading />
  </Stack>
)

export const overlay = () => (
  <Box height="200px" pos="relative" p="4">
    <Text>This content will be overlayed.</Text>
    <Loading variant="overlay" />
  </Box>
)
