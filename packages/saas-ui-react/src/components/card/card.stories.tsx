import React from 'react'

import {
  Badge,
  Container,
  Group,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react-vite'
import { FaBug, FaGithub, FaSlack } from 'react-icons/fa6'
import { LuArrowRight, LuEllipsisVertical } from 'react-icons/lu'

import { Avatar } from '../avatar/index.ts'
import { Button } from '../button/index.ts'
import { IconBadge } from '../icon-badge/index.ts'
import { Persona } from '../persona/index.ts'
import { Card } from './index.ts'

export default {
  title: 'Components/Card',
  component: Card.Root,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Container maxW="3xl">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta

type Story = StoryObj<typeof Card>

const variants = ['outline', 'elevated', 'subtle', 'solid'] as const

export const Outline = () => {
  return (
    <Stack gap="8">
      {variants.map((variant) => (
        <SimpleGrid columns={[1, null, 3]} gap="2">
          <Card.Root variant={variant}>
            <Card.Header>
              <HStack>
                <IconBadge boxSize="10" fontSize="2xl" bg="bg">
                  <FaGithub />
                </IconBadge>
                <Stack gap="0">
                  <Card.Title>Github</Card.Title>
                  <Span textStyle="xs" opacity="0.6">
                    Enabled
                  </Span>
                </Stack>
              </HStack>
              <Card.Description>
                Automatically link pull requests to issues with two way sync.
              </Card.Description>
            </Card.Header>
          </Card.Root>
          <Card.Root variant={variant}>
            <Card.Header>
              <HStack>
                <IconBadge boxSize="10" fontSize="2xl" bg="bg">
                  <FaSlack />
                </IconBadge>
                <Stack gap="0">
                  <Card.Title>Slack</Card.Title>
                  <Span textStyle="xs" opacity="0.6">
                    Enabled
                  </Span>
                </Stack>
              </HStack>
              <Card.Description>
                Send notifications when issues are created or updated.
              </Card.Description>
            </Card.Header>
          </Card.Root>
          <Card.Root variant={variant}>
            <Card.Header>
              <HStack>
                <IconBadge boxSize="10" fontSize="2xl" bg="bg">
                  <FaBug />
                </IconBadge>
                <Stack gap="0">
                  <Card.Title>Sentry</Card.Title>
                  <Span textStyle="xs" opacity="0.6">
                    Disabled
                  </Span>
                </Stack>
              </HStack>
              <Card.Description>
                Automatically track errors and crashes in your application.
              </Card.Description>
            </Card.Header>
          </Card.Root>
        </SimpleGrid>
      ))}
    </Stack>
  )
}
export const Interactive = () => (
  <SimpleGrid columns={[1, null, 3]} gap="2">
    <Card.Root variant="outline" role="button" asChild>
      <LinkBox>
        <Card.Header>
          <HStack>
            <IconBadge boxSize="10" fontSize="2xl">
              <FaGithub />
            </IconBadge>
            <Stack gap="0">
              <Card.Title asChild>
                <LinkOverlay href="#">Github</LinkOverlay>
              </Card.Title>
              <Span color="fg.muted" textStyle="xs">
                Enabled
              </Span>
            </Stack>
          </HStack>
          <Card.Description>
            Automatically link pull requests to issues with two way sync.
          </Card.Description>
        </Card.Header>
      </LinkBox>
    </Card.Root>
    <Card.Root variant="outline" role="button" asChild>
      <LinkBox>
        <Card.Header>
          <HStack>
            <IconBadge boxSize="10" fontSize="2xl">
              <FaSlack />
            </IconBadge>
            <Stack gap="0">
              <Card.Title asChild>
                <LinkOverlay href="#">Slack</LinkOverlay>
              </Card.Title>
              <Span color="fg.muted" textStyle="xs">
                Enabled
              </Span>
            </Stack>
          </HStack>
          <Card.Description>
            Send notifications when issues are created or updated.
          </Card.Description>
        </Card.Header>
      </LinkBox>
    </Card.Root>
    <Card.Root variant="outline" role="button" asChild>
      <LinkBox>
        <Card.Header>
          <HStack>
            <IconBadge boxSize="10" fontSize="2xl">
              <FaBug />
            </IconBadge>
            <Stack gap="0">
              <Card.Title asChild>
                <LinkOverlay href="#">Sentry</LinkOverlay>
              </Card.Title>
              <Span color="fg.muted" textStyle="xs">
                Disabled
              </Span>
            </Stack>
          </HStack>
          <Card.Description>
            Automatically track errors and crashes in your application.
          </Card.Description>
        </Card.Header>
      </LinkBox>
    </Card.Root>
  </SimpleGrid>
)

export const Media = () => (
  <>
    <Card.Root maxW="400px" position="relative" overflow="clip">
      <Card.Header
        flexDirection="row"
        position="absolute"
        top="0"
        left="0"
        right="0"
        backdropFilter="blur(10px)"
        className="dark"
      >
        <Persona
          name="Eelco Wiersma"
          secondaryLabel="South Tirol, Italy"
          size="sm"
          flex="1"
        />
        <IconButton
          aria-label="More"
          size="sm"
          variant="ghost"
          alignSelf="flex-start"
        >
          <LuEllipsisVertical />
        </IconButton>
      </Card.Header>
      <Image height="256px" src="/mountains.jpg" objectFit="cover" />
      <Card.Body
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bgGradient="to-t"
        gradientFrom="black"
        gradientTo="transparent"
        height="140px"
        justifyContent="flex-end"
      >
        <Group>
          <Text flex="1" textStyle="sm" color="fg.inverted">
            South Tirol
          </Text>
          <Button variant="solid" colorPalette="accent" size="sm">
            Book now
          </Button>
        </Group>
      </Card.Body>
    </Card.Root>
  </>
)

export const Actions = () => (
  <Card.Root width="360px">
    <Card.Header>
      <HStack>
        <Badge>React</Badge>
        <Badge>Figma</Badge>
      </HStack>
      <Text textStyle="3xl" fontWeight="bold">
        $399
      </Text>
      <Card.Title>Team license</Card.Title>
      <Card.Description>
        Perfect for teams up to 10 users. Can be used on unlimited projects.
      </Card.Description>
    </Card.Header>
    <Card.Footer>
      <Button variant="solid" colorPalette="accent" width="full">
        Buy now
      </Button>
    </Card.Footer>
  </Card.Root>
)
