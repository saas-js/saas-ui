import { Box, SkipNavContent, SkipNavLink, Stack, Text } from '@chakra-ui/react'

export const SkipNavCustomId = () => {
  return (
    <Stack gap="4">
      <SkipNavLink id="main-content">Skip to Main Content</SkipNavLink>

      <Box p="4" borderWidth="1px" borderRadius="panel.md" bg="bg.muted">
        <Text fontWeight="medium">Header &amp; Navigation</Text>
        <Text textStyle="sm" color="fg.muted">
          Both components use the same <code>main-content</code> id.
        </Text>
      </Box>

      <SkipNavContent id="main-content" />

      <Box p="4" borderWidth="1px" borderRadius="panel.md">
        <Text fontWeight="medium">Main Content</Text>
        <Text textStyle="sm" color="fg.muted">
          The id must match on both sides, otherwise the link does nothing.
        </Text>
      </Box>
    </Stack>
  )
}
