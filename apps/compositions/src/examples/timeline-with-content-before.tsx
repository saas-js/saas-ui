'use client'

import { For, Stack } from '@chakra-ui/react'
import { Timeline } from '@saas-ui/react'

export const TimelineWithContentBefore = () => {
  return (
    <Stack gap="8">
      <For each={['sm', 'md', 'lg']}>
        {(size) => (
          <Timeline.Root size={size} key={size}>
            <Timeline.Item>
              <Timeline.Content width="auto">
                <Timeline.Title whiteSpace="nowrap">Nov 1994</Timeline.Title>
              </Timeline.Content>
              <Timeline.Connector>1</Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Content width="auto">
                <Timeline.Title whiteSpace="nowrap">Nov 2010</Timeline.Title>
              </Timeline.Content>
              <Timeline.Connector>2</Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline.Root>
        )}
      </For>
    </Stack>
  )
}
