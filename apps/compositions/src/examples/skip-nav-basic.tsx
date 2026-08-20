import { Box, SkipNavContent, SkipNavLink, Stack, Text } from '@chakra-ui/react'

export const SkipNavBasic = () => {
  return (
    <Stack gap="4">
      <SkipNavLink>Skip to Content</SkipNavLink>

      <Box p="4" borderWidth="1px" borderRadius="panel.md" bg="bg.muted">
        <Text fontWeight="medium">Navigation</Text>
        <Text textStyle="sm" color="fg.muted">
          Repeated on every page, so keyboard users want to skip past it.
        </Text>
      </Box>

      <SkipNavContent />

      <Box p="4" borderWidth="1px" borderRadius="panel.md">
        <Text fontWeight="medium">Main Content</Text>
        <Text textStyle="sm" color="fg.muted">
          Focus lands here when the skip link is activated.
        </Text>
      </Box>
    </Stack>
  )
}
