import { Text, Theme } from '@chakra-ui/react'
import { Button, Input, Popover } from '@saas-ui/react'

export const ThemeWithPortalled = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content asChild>
        <Theme hasBackground={false} appearance="dark" colorPalette="teal">
          <Popover.Arrow />
          <Popover.Body spaceY="4">
            <Popover.Title fontWeight="medium">Naruto Form</Popover.Title>
            <Text>
              Naruto is a Japanese manga series written and illustrated by
              Masashi Kishimoto.
            </Text>
            <Input placeholder="Search" />
            <Button>Click me</Button>
          </Popover.Body>
        </Theme>
      </Popover.Content>
    </Popover.Root>
  )
}
