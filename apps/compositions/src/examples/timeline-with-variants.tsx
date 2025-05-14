'use client'

import { Badge, For, Span, Stack } from '@chakra-ui/react'
import { Avatar, Timeline } from '@saas-ui/react'
import { LuCheck } from 'react-icons/lu'

export const TimelineWithVariants = () => {
  return (
    <Stack gap="16">
      <For each={['subtle', 'solid', 'outline', 'plain']}>
        {(variant) => (
          <Timeline.Root variant={variant} key={variant}>
            <Timeline.Item>
              <Timeline.Connector>
                <Avatar
                  size="full"
                  name="Sage"
                  src="https://bit.ly/sage-adebayo"
                />
              </Timeline.Connector>
              <Timeline.Content>
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
              <Timeline.Content>
                <Timeline.Title>
                  <Span fontWeight="medium">sage</Span>
                  changed status from <Badge>In progress</Badge> to{' '}
                  <Badge colorPalette="teal">Completed</Badge>
                </Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline.Root>
        )}
      </For>
    </Stack>
  )
}
