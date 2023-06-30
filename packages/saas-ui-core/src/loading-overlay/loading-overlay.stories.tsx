import { Container, Box, Stack, Text, Button, Card } from '@chakra-ui/react'
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
  <Card height="200px" overflow="hidden">
    <LoadingOverlay>
      <LoadingSpinner />
    </LoadingOverlay>
  </Card>
)

export const Overlay = () => (
  <Card height="200px" pos="relative" p="4">
    <Text>This content will be overlayed.</Text>
    <LoadingOverlay variant="overlay">
      <LoadingSpinner />
    </LoadingOverlay>
  </Card>
)

export const Fullscreen = () => (
  <LoadingOverlay variant="fullscreen">
    <LoadingSpinner />
  </LoadingOverlay>
)

export const WithText = () => (
  <Card height="200px">
    <LoadingOverlay borderRadius="md">
      <LoadingText>Loading...</LoadingText>
    </LoadingOverlay>
  </Card>
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
    <Card height="200px" pos="relative" p="4">
      <Button onClick={() => setLoading(true)}>Show loader</Button>
      <LoadingOverlay variant="overlay" isLoading={isLoading}>
        <LoadingSpinner />
      </LoadingOverlay>
    </Card>
  )
}
