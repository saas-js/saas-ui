import React from 'react'

import {
  Group,
  Heading,
  Icon,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'
import { FaGithub, FaSlack, FaXTwitter } from 'react-icons/fa6'
import { LuArrowRight, LuMoreVertical } from 'react-icons/lu'

import { Avatar } from '#components/avatar/avatar.js'

import { Button } from '../button/index.ts'
import { Persona } from '../persona/index.ts'
import { Card } from './index.ts'

export default {
  title: 'Components/Card',
  component: Card.Root,
  tags: ['autodocs'],
} satisfies Meta

type Story = StoryObj<typeof Card>

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
          <LuMoreVertical />
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

export const Outline = () => (
  <SimpleGrid columns={[1, null, 2]} gap="2">
    <Card.Root variant="outline">
      <Card.Header>
        <Icon me="2" boxSize="6">
          <FaGithub />
        </Icon>
        <Heading size="md">Github</Heading>
      </Card.Header>
      <Card.Body>
        <Text color="fg.muted" textStyle="md">
          Link pull requests
        </Text>
      </Card.Body>
      <Card.Footer>
        <Group>
          <Button colorScheme="gray" variant="surface">
            Enable
          </Button>
          <Button variant="ghost">Learn more</Button>
        </Group>
      </Card.Footer>
    </Card.Root>
    <Card.Root variant="outline">
      <Card.Header>
        <Icon me="2" boxSize="6">
          <FaSlack />
        </Icon>
        <Heading size="md">Slack</Heading>
      </Card.Header>
      <Card.Body>
        <Text color="fg.muted" textStyle="md">
          Send push notifications
        </Text>
      </Card.Body>
      <Card.Footer>
        <Group>
          <Button colorScheme="gray" variant="surface">
            Enable
          </Button>
          <Button variant="ghost">Learn more</Button>
        </Group>
      </Card.Footer>
    </Card.Root>
  </SimpleGrid>
)

export const Footer = () => (
  <Card.Root colorPalette="accent" variant="subtle" maxW="xl">
    <Card.Header>
      <Card.Title>Getting started</Card.Title>
    </Card.Header>
    <Card.Body>
      <Text textStyle="md">
        Welcome to Saas UI, in the next steps we will walk you through all the
        basic features of Saas UI.
      </Text>
    </Card.Body>
    <Card.Footer>
      <Group>
        <Button variant="solid" colorPalette="accent">
          Continue
        </Button>
        <Button variant="ghost">Dismiss</Button>
      </Group>
    </Card.Footer>
  </Card.Root>
)

export const Interactive = () => (
  <Card.Root asChild width="100%" maxW="400px" role="button" variant="elevated">
    <LinkBox>
      <Card.Header>
        <Avatar src="/chakra-ui-logomark-colored.svg" size="sm" me="2" />
        <LinkOverlay href="#">
          <Heading size="sm">Chakra UI</Heading>
        </LinkOverlay>
      </Card.Header>
      <Card.Body>
        <Text fontSize="md" color="muted">
          Chakra UI is a simple, modular and accessible component library that
          gives you the building blocks you need to build your React
          applications.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="plain" _parentHover={{ colorPalette: 'teal' }}>
          Learn more
          <Icon
            transform="translateX(-5px)"
            transitionProperty="common"
            transitionDuration="moderate"
            css={{ _parentHover: { transform: 'translateX(0)' } }}
          >
            <LuArrowRight />
          </Icon>
        </Button>
      </Card.Footer>
    </LinkBox>
  </Card.Root>
)
