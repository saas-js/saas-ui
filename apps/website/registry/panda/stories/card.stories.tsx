import { Box, Flex, Grid, LinkOverlay } from '@saas-ui/panda-preset/jsx'
import { Meta } from '@storybook/react'
import { FaGithub, FaSlack } from 'react-icons/fa6'
import { FiMoreVertical } from 'react-icons/fi'
import { LuArrowRight } from 'react-icons/lu'
import { Button, Card, Heading, Icon, Image, Text } from 'src/components'
import AccessibilityImage from 'src/stories/assets/accessibility.png?url'

export default {
  title: 'Components/Card',
  component: Card.Root,
} satisfies Meta

export const Media = () => (
  <>
    <Card.Root maxW="400px" position="relative" overflow="clip" w={'full'}>
      <Card.Header
        flexDirection="row"
        position="absolute"
        top="0"
        left="0"
        right="0"
        backdropFilter="blur(10px)"
        className="dark"
      >
        <Button
          p={'0!'}
          aria-label="More"
          size="sm"
          variant="plain"
          alignSelf="flex-start"
          color={'fg.inverted'}
        >
          <FiMoreVertical />
        </Button>
      </Card.Header>
      <Image height="256px" src={AccessibilityImage} objectFit="cover" />
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
        <Flex alignItems="center" gap={2}>
          <Text flex="1" textStyle="sm" color="fg.inverted">
            South Tirol
          </Text>
          <Button variant="solid" colorPalette="accent" size="sm">
            Book now
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  </>
)

export const Outline = () => (
  <Grid columns={[1, null, 2]} gap="2">
    <Card.Root variant="outline">
      <Card.Header>
        <Icon me="2" boxSize="6">
          <FaGithub />
        </Icon>
        <Heading textStyle="md">Github</Heading>
      </Card.Header>
      <Card.Body>
        <Text color="fg.muted" textStyle="md">
          Link pull requests
        </Text>
      </Card.Body>
      <Card.Footer>
        <Flex alignItems="center" gap={2}>
          <Button colorScheme="gray" variant="surface">
            Enable
          </Button>
          <Button variant="ghost">Learn more</Button>
        </Flex>
      </Card.Footer>
    </Card.Root>
    <Card.Root variant="outline">
      <Card.Header>
        <Icon me="2" boxSize="6">
          <FaSlack />
        </Icon>
        <Heading textStyle="md">Slack</Heading>
      </Card.Header>
      <Card.Body>
        <Text color="fg.muted" textStyle="md">
          Send push notifications
        </Text>
      </Card.Body>
      <Card.Footer>
        <Flex alignItems="center" gap={2}>
          <Button colorScheme="gray" variant="surface">
            Enable
          </Button>
          <Button variant="ghost">Learn more</Button>
        </Flex>
      </Card.Footer>
    </Card.Root>
  </Grid>
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
      <Flex alignItems="center" gap={2}>
        <Button variant="solid" colorPalette="accent">
          Continue
        </Button>
        <Button variant="ghost">Dismiss</Button>
      </Flex>
    </Card.Footer>
  </Card.Root>
)

export const Interactive = () => (
  <Card.Root asChild width="100%" maxW="400px" role="button" variant="elevated">
    <Box className="group">
      <Card.Header>
        <Image src="/chakra-ui-logomark-colored.svg" boxSize="4" me="2" />
        <LinkOverlay href="#">
          <Heading textStyle="sm">Chakra UI</Heading>
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
        <Button variant="plain" _groupHover={{ colorPalette: 'teal' }}>
          Learn more
          <Icon
            transform="translateX(-5px)"
            transitionProperty="common"
            transitionDuration="moderate"
            css={{ _groupHover: { transform: 'translateX(0)' } }}
          >
            <LuArrowRight />
          </Icon>
        </Button>
      </Card.Footer>
    </Box>
  </Card.Root>
)
