import { Heading, Highlight, Stack, Text } from '@saas-ui/react'

export const HeadingWithHighlight = () => {
  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        <Highlight query="Saas UI" styles={{ color: 'accent.solid' }}>
          Build modern SaaS applications with Saas UI
        </Highlight>
      </Heading>
      <Text fontSize="md" color="fg.muted">
        Saas UI provides enterprise-ready components and patterns to help you
        build professional applications faster than ever.
      </Text>
    </Stack>
  )
}
