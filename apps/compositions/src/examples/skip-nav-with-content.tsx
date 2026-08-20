import {
  Box,
  Heading,
  SkipNavContent,
  SkipNavLink,
  Stack,
  Text,
} from '@chakra-ui/react'

export const SkipNavWithContent = () => {
  return (
    <Stack gap="4">
      <SkipNavLink>Skip to Content</SkipNavLink>

      <Box p="4" borderWidth="1px" borderRadius="panel.md" bg="bg.muted">
        <Text fontWeight="medium">Site Header</Text>
        <Stack gap="1" mt="2">
          <Text textStyle="sm" color="fg.muted">
            Home
          </Text>
          <Text textStyle="sm" color="fg.muted">
            About
          </Text>
          <Text textStyle="sm" color="fg.muted">
            Pricing
          </Text>
          <Text textStyle="sm" color="fg.muted">
            Contact
          </Text>
        </Stack>
      </Box>

      <SkipNavContent>
        <Box p="6" borderWidth="1px" borderRadius="panel.md">
          <Heading size="lg" mb="2">
            Welcome
          </Heading>
          <Text textStyle="sm" color="fg.muted">
            Wrapping the main content makes the whole region the focus target,
            so screen readers continue reading from here.
          </Text>
        </Box>
      </SkipNavContent>
    </Stack>
  )
}
