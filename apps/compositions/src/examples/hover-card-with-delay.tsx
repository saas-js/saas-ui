'use client'

import { Stack, Text } from '@chakra-ui/react'
import { Avatar, HoverCard, Link } from '@saas-ui/react'

export const HoverCardWithDelay = () => {
  return (
    <HoverCard.Root size="sm" openDelay={1000} closeDelay={100}>
      Follow{' '}
      <HoverCard.Trigger asChild>
        <Link href="#" colorPalette="accent">
          @saas_js
        </Link>
      </HoverCard.Trigger>{' '}
      for updates
      <HoverCard.Content>
        <HoverCard.Arrow />
        <Stack gap="4" direction="row">
          <Avatar
            name="Saas UI"
            src="https://pbs.twimg.com/profile_images/1542114663420383235/Otz6CbhI_400x400.png"
          />
          <Stack gap="0">
            <Text textStyle="sm" fontWeight="semibold">
              Saas UI
            </Text>
            <Text textStyle="xs" color="fg.muted" mb="2">
              @saas_js
            </Text>
            <Text textStyle="sm" color="fg.muted">
              Design system and React components for startups.
            </Text>
          </Stack>
        </Stack>
      </HoverCard.Content>
    </HoverCard.Root>
  )
}
