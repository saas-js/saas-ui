import * as React from 'react'

import { Button, Card, Container, Text } from '@chakra-ui/react'

import { LoadingOverlay } from './index.ts'

export default {
  title: 'Components/LoadingOverlay',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => (
  <Card.Root width="400px" height="200px" overflow="hidden">
    <LoadingOverlay.Root>
      <LoadingOverlay.Spinner />
    </LoadingOverlay.Root>
  </Card.Root>
)

export const Overlay = () => (
  <Card.Root width="400px" height="200px" pos="relative" p="4">
    <Text>This content will be overlayed.</Text>
    <LoadingOverlay.Root variant="overlay">
      <LoadingOverlay.Spinner />
    </LoadingOverlay.Root>
  </Card.Root>
)

export const Fullscreen = () => (
  <LoadingOverlay.Root variant="fullscreen">
    <LoadingOverlay.Spinner />
  </LoadingOverlay.Root>
)

export const WithText = () => (
  <Card.Root width="400px" height="200px">
    <LoadingOverlay.Root borderRadius="md">
      <LoadingOverlay.Text>Loading...</LoadingOverlay.Text>
    </LoadingOverlay.Root>
  </Card.Root>
)

export const ExitAnimation = () => {
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 4000)
    }
  }, [loading])

  return (
    <Card.Root width="400px" height="200px" pos="relative" p="4">
      <Button onClick={() => setLoading(true)}>Show loader</Button>
      <LoadingOverlay.Root variant="overlay" loading={loading}>
        <LoadingOverlay.Spinner />
      </LoadingOverlay.Root>
    </Card.Root>
  )
}
