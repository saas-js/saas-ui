'use client'

import { Span } from '@chakra-ui/react'
import { Avatar, Button, Card, Icon, Input, Timeline } from '@saas-ui/react'
import { LuPen, LuX } from 'react-icons/lu'
import LoremIpsum from 'react-lorem-ipsum'

export const TimelineComposition = () => {
  return (
    <Timeline.Root size="lg" variant="subtle" maxW="md">
      <Timeline.Item>
        <Timeline.Connector>
          <Icon fontSize="xs">
            <LuPen />
          </Icon>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>
            <Avatar size="2xs" src="https://i.pravatar.cc/150?u=a" />
            Lucas Moras <Span color="fg.muted">has changed</Span>
            <Span fontWeight="medium">3 labels</Span> on
            <Span color="fg.muted">Jan 1, 2024</Span>
          </Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Icon fontSize="xs">
            <LuX />
          </Icon>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>
            <Avatar size="2xs" src="https://i.pravatar.cc/150?u=x" />
            Jenna Smith <Span color="fg.muted">removed</Span>
            <Span fontWeight="medium">Enas</Span>
            <Span color="fg.muted">on Jan 12, 2024</Span>
          </Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector bg="teal.solid" color="teal.contrast">
          <Icon fontSize="xs">
            <LuX />
          </Icon>
        </Timeline.Connector>
        <Timeline.Content gap="4">
          <Timeline.Title>
            <Avatar size="2xs" src="https://i.pravatar.cc/150?u=y" />
            Erica <Span color="fg.muted">commented</Span>
            <Span color="fg.muted">on Jan 12, 2024</Span>
          </Timeline.Title>
          <Card.Root size="sm">
            <Card.Body textStyle="sm" lineHeight="tall">
              <LoremIpsum p={1} avgWordsPerSentence={2} />
            </Card.Body>
            <Card.Footer>
              <Button size="xs" variant="surface" rounded="md">
                👏 2
              </Button>
            </Card.Footer>
          </Card.Root>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Avatar size="full" src="https://i.pravatar.cc/150?u=o" />
        </Timeline.Connector>
        <Timeline.Content gap="4" mt="-1" w="full">
          <Input size="sm" placeholder="Add comment..." />
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  )
}
