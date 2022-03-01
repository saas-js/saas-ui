import { Container, Box, Stack, Text, Button } from '@chakra-ui/react'
import * as React from 'react'

import { Loader } from '../src'

export default {
  title: 'Components/Feedback/Loader',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => (
  <Stack height="200px">
    <Loader />
  </Stack>
)

export const Overlay = () => (
  <Box height="200px" pos="relative" p="4">
    <Text>This content will be overlayed.</Text>
    <Loader variant="overlay" />
  </Box>
)

export const Fullscreen = () => <Loader variant="fullscreen" />

export const WithText = () => (
  <Stack height="200px">
    <Loader>Loading...</Loader>
  </Stack>
)

export const ExitAnimation = () => {
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setLoading(false)
      }, 4000)
    }
  }, [isLoading])

  return (
    <Box height="200px" pos="relative" p="4">
      <Button onClick={() => setLoading(true)}>Show loader</Button>
      <Loader variant="fullscreen" isLoading={isLoading} />
    </Box>
  )
}
