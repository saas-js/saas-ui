import { Button, Input, Stack, Text } from '@chakra-ui/react'
import { Theme } from 'compositions/ui/theme'

export const ThemeWithRadius = () => {
  return (
    <Stack gap="6">
      <Theme hasBackground={false} controlRadius={0}>
        <Text textStyle="sm" color="fg.muted" mb="2">
          controlRadius: 0
        </Text>
        <Stack direction="row" align="center">
          <Input placeholder="Email" maxW="3xs" />
          <Button>Subscribe</Button>
        </Stack>
      </Theme>

      <Theme hasBackground={false} controlRadius={2}>
        <Text textStyle="sm" color="fg.muted" mb="2">
          controlRadius: 2
        </Text>
        <Stack direction="row" align="center">
          <Input placeholder="Email" maxW="3xs" />
          <Button>Subscribe</Button>
        </Stack>
      </Theme>
    </Stack>
  )
}
