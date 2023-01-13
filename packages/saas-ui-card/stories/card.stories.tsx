import * as React from 'react'
import {
  Avatar,
  Button,
  Link,
  IconButton,
  Text,
  LinkBox,
  LinkOverlay,
  Container,
  Stack,
  Spacer,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

import { FaGithub, FaSlack } from 'react-icons/fa'

import { FaTwitter } from 'react-icons/fa'

import {
  Card,
  CardHeader,
  CardTitle,
  CardMedia,
  CardBody,
  CardFooter,
} from '../'

export default {
  title: 'Components/Data Display/Card',
  decorators: [
    (Story: any) => (
      <Container mt="40px" maxW="container.md">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => (
  <>
    <Card title="Basic card">
      <CardBody>Card body</CardBody>
    </Card>
  </>
)

export const Actions = () => (
  <>
    <Card title="Card with actions">
      <CardBody>Card body</CardBody>
      <CardFooter alignItems="flex-end">
        <Button variant="solid">Footer button</Button>
        <Button>Footer button</Button>
      </CardFooter>
    </Card>
  </>
)

export const Header = () => (
  <>
    <Card>
      <CardHeader
        title="Eelco Wiersma"
        subtitle="Algarve, Portugal"
        avatar={<Avatar name="Eelco Wiersma" />}
        action={<IconButton icon={<HamburgerIcon />} aria-label="More" />}
      />
      <CardMedia height="256px" bgImage="/portugal.jpg" />
      <CardBody>
        <Text textStyle="secondary">
          Currently building amazing things in the sunny Algarve.
        </Text>
      </CardBody>
      <CardFooter>
        <Button variant="solid">Contact</Button>
        <Spacer />
        <IconButton icon={<FaTwitter />} aria-label="Twitter" />
      </CardFooter>
    </Card>
  </>
)

export const Outline = () => (
  <Stack direction="row">
    <Card title="Github" variant="outline" avatar={<FaGithub />} minW="300px">
      <CardBody py={2}>Link pull requests</CardBody>
      <CardFooter spacing={4}>
        <Button variant="outline" colorScheme="green">
          Enabled
        </Button>
        <Button as={Link} variant="link" isExternal>
          Learn more
        </Button>
      </CardFooter>
    </Card>
    <Card title="Slack" variant="outline" avatar={<FaSlack />} minW="300px">
      <CardBody py={2}>Send push notifications</CardBody>
      <CardFooter spacing={4}>
        <Button colorScheme="gray" variant="solid">
          Enable
        </Button>
        <Button as={Link} variant="link" isExternal>
          Learn more
        </Button>
      </CardFooter>
    </Card>
  </Stack>
)

export const Solid = () => (
  <Stack>
    <Card variant="solid" colorScheme="purple">
      <CardHeader
        title={<CardTitle fontSize="xl">Getting started</CardTitle>}
        action={<IconButton icon={<CloseIcon />} aria-label="close" />}
      />
      <CardBody>
        <Text fontSize="md">
          Welcome to Saas UI, in the next steps we will walk you through all the
          basic features of Saas UI.
        </Text>
      </CardBody>
      <CardFooter>
        <Button variant="subtle" colorScheme="white">
          Continue
        </Button>
        <Button>Dismiss</Button>
      </CardFooter>
    </Card>
  </Stack>
)

export const Shadow = () => (
  <Stack direction="row" spacing={8}>
    <Card title="Card" shadow="sm" flex="1">
      <CardBody>Shadow sm</CardBody>
    </Card>
    <Card title="Card" shadow="md" flex="1">
      <CardBody>Shadow md</CardBody>
    </Card>
    <Card title="Card" shadow="lg" flex="1">
      <CardBody>Shadow lg</CardBody>
    </Card>
  </Stack>
)

export const Clickable = () => (
  <Stack>
    <Card title={<LinkOverlay href="#">Link</LinkOverlay>} as={LinkBox}>
      <CardBody>Solid card</CardBody>
    </Card>
  </Stack>
)
