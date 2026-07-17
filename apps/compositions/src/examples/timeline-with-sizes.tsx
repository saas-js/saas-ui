'use client'

import { Badge, For, Span, Stack, Timeline } from '@chakra-ui/react'
import { Avatar } from 'compositions/ui/avatar'
import { LuCheck } from 'react-icons/lu'

export const TimelineWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={['sm', 'md', 'lg', 'xl']}>
        {(size) => (
          <Timeline.Root key={size} size={size}>
            <Timeline.Item>
              <Timeline.Connector>
                <Avatar
                  size="full"
                  name="Sage"
                  src="https://bit.ly/sage-adebayo"
                />
              </Timeline.Connector>
              <Timeline.Content textStyle="xs">
                <Timeline.Title>
                  <Span fontWeight="medium">sage</Span>
                  created a new project
                </Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Connector>
                <LuCheck />
              </Timeline.Connector>
              <Timeline.Content textStyle="xs">
                <Timeline.Title mt={size === 'sm' ? '-2px' : undefined}>
                  <Span fontWeight="medium">sage</Span>
                  changed status from <Badge size="sm">
                    In progress
                  </Badge> to{' '}
                  <Badge colorPalette="teal" size="sm">
                    Completed
                  </Badge>
                </Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline.Root>
        )}
      </For>
    </Stack>
  )
}
