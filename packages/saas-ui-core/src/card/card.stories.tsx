import * as React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
  Image,
  Heading,
  Icon,
  SimpleGrid,
  ButtonGroup,
  HStack,
} from '@chakra-ui/react'
import { HamburgerIcon } from '../icons'

import { FaGithub, FaSlack } from 'react-icons/fa'

import { FaXTwitter } from 'react-icons/fa6'
import { Persona } from '../persona'
import { FiArrowRight } from 'react-icons/fi'

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

export const Header = () => (
  <>
    <Card maxW="400px">
      <CardHeader as={HStack}>
        <Persona
          name="Eelco Wiersma"
          secondaryLabel="Algarve, Portugal"
          size="md"
          flex="1"
        />
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="More"
          size="sm"
          variant="ghost"
          alignSelf="flex-start"
        />
      </CardHeader>
      <Image height="256px" src="/portugal.jpg" objectFit="cover" />
      <CardBody>
        <Text fontSize="md">
          Currently building amazing things in the sunny Algarve.
        </Text>
      </CardBody>
      <CardFooter>
        <Button variant="solid" colorScheme="primary">
          Contact
        </Button>
        <Spacer />
        <IconButton icon={<FaXTwitter />} aria-label="Twitter" />
      </CardFooter>
    </Card>
  </>
)

export const Outline = () => (
  <SimpleGrid columns={[1, null, 2]} gap="2">
    <Card variant="outline">
      <CardHeader as={HStack}>
        <Icon as={FaGithub} me="2" boxSize="6" />
        <Heading size="md">Github</Heading>
      </CardHeader>
      <CardBody py={2}>
        <Text color="muted" size="md">
          Link pull requests
        </Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button colorScheme="gray" variant="solid">
            Enable
          </Button>
          <Button as={Link} variant="link" isExternal>
            Learn more
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
    <Card variant="outline">
      <CardHeader as={HStack}>
        <Icon as={FaSlack} me="2" boxSize="6" />
        <Heading size="md">Slack</Heading>
      </CardHeader>
      <CardBody py={2}>
        <Text color="muted" size="md">
          Send push notifications
        </Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button colorScheme="gray" variant="solid">
            Enable
          </Button>
          <Button as={Link} variant="link" isExternal>
            Learn more
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  </SimpleGrid>
)

export const Footer = () => (
  <Card colorScheme="primary">
    <CardHeader>
      <Heading size="sm">Getting started</Heading>
    </CardHeader>
    <CardBody>
      <Text fontSize="md">
        Welcome to Saas UI, in the next steps we will walk you through all the
        basic features of Saas UI.
      </Text>
    </CardBody>
    <CardFooter>
      <ButtonGroup>
        <Button variant="primary">Continue</Button>
        <Button variant="ghost">Dismiss</Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
)

export const Interactive = () => (
  <Card as={LinkBox} width="100%" maxW="400px" role="group" variant="elevated">
    <CardHeader as={HStack}>
      <Avatar src="/chakra-ui-logomark-colored.svg" size="sm" me="2" />
      <LinkOverlay href="#">
        <Heading size="sm">Chakra UI</Heading>
      </LinkOverlay>
    </CardHeader>
    <CardBody>
      <Text fontSize="md" color="muted">
        Chakra UI is a simple, modular and accessible component library that
        gives you the building blocks you need to build your React applications.
      </Text>
    </CardBody>
    <CardFooter>
      <Button
        rightIcon={
          <Icon
            as={FiArrowRight}
            transform="translateX(-5px)"
            transitionProperty="common"
            transitionDuration="normal"
            _groupHover={{ transform: 'translateX(0)' }}
            sx={{ '.saas-card:hover &': { transform: 'translateX(0)' } }}
          />
        }
        variant="link"
        _groupHover={{ color: 'teal.400' }}
      >
        Learn more
      </Button>
    </CardFooter>
  </Card>
)
