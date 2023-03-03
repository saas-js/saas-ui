import { Container, Box, Stack, Text, Button } from '@chakra-ui/react'
import * as React from 'react'

import { LoadingOverlay, LoadingSpinner, LoadingText } from './loading-overlay'

export default {
  title: 'Components/Feedback/LoadingOverlay',
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
    <LoadingOverlay>
      <LoadingSpinner />
    </LoadingOverlay>
  </Stack>
)

export const Overlay = () => (
  <Box height="200px" pos="relative" p="4">
    <Text>This content will be overlayed.</Text>
    <LoadingOverlay variant="overlay">
      <LoadingSpinner />
    </LoadingOverlay>
  </Box>
)

export const Fullscreen = () => (
  <LoadingOverlay variant="fullscreen">
    <LoadingSpinner />
  </LoadingOverlay>
)

export const WithText = () => (
  <Stack height="200px">
    <LoadingOverlay>
      <LoadingText>Loading...</LoadingText>
    </LoadingOverlay>
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
      <LoadingOverlay variant="fullscreen" isLoading={isLoading}>
        <LoadingSpinner />
      </LoadingOverlay>
    </Box>
  )
}
