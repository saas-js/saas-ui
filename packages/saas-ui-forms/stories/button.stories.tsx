import {
  FiArrowRight,
  FiChevronDown,
  FiMail,
  FiPhone,
  FiSearch,
} from 'react-icons/fi'
import {
  Container,
  HStack,
  Stack,
  Button,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react'
import * as React from 'react'

export default {
  title: 'Components/Forms/Button',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => (
  <Stack align="start">
    <Button colorScheme="gray">Button</Button>
    <Button colorScheme="red">Button</Button>
    <Button colorScheme="green">Button</Button>
    <Button colorScheme="blue">Button</Button>
    <Button colorScheme="teal">Button</Button>
    <Button colorScheme="pink">Button</Button>
    <Button colorScheme="purple">Button</Button>
    <Button colorScheme="cyan">Button</Button>
    <Button colorScheme="orange">Button</Button>
    <Button colorScheme="yellow">Button</Button>
    <Button colorScheme="white">Button</Button>
  </Stack>
)

export const Outlines = () => (
  <Stack align="start">
    <Button variant="outline" colorScheme="red">
      Button
    </Button>
    <Button variant="outline" colorScheme="green">
      Button
    </Button>
    <Button variant="outline" colorScheme="blue">
      Button
    </Button>
    <Button variant="outline" colorScheme="teal">
      Button
    </Button>
    <Button variant="outline" colorScheme="pink">
      Button
    </Button>
    <Button variant="outline" colorScheme="purple">
      Button
    </Button>
    <Button variant="outline" colorScheme="cyan">
      Button
    </Button>
    <Button variant="outline" colorScheme="orange">
      Button
    </Button>
    <Button variant="outline" colorScheme="yellow">
      Button
    </Button>
    <Button variant="outline" colorScheme="white">
      Button
    </Button>
  </Stack>
)

export const Variants = () => (
  <Stack align="start">
    <HStack>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </HStack>
    <HStack spacing="24px">
      <Button colorScheme="primary" variant="solid">
        Solid
      </Button>
      <Button colorScheme="primary" variant="outline">
        Outline
      </Button>
      <Button colorScheme="primary" variant="subtle">
        Subtle
      </Button>
      <Button colorScheme="primary" variant="ghost">
        Ghost
      </Button>
      <Button colorScheme="primary" variant="link">
        Link
      </Button>
      <Button colorScheme="primary" variant="unstyled">
        Unstyled
      </Button>
    </HStack>
  </Stack>
)

export const WithSizes = () => (
  <HStack>
    <Button colorScheme="blue" size="xs">
      Button
    </Button>
    <Button colorScheme="blue" size="sm">
      Button
    </Button>
    <Button colorScheme="blue" size="md">
      Button
    </Button>
    <Button colorScheme="blue" size="lg">
      Button
    </Button>
  </HStack>
)

export const WithIcon = () => (
  <Stack direction="row" spacing={4}>
    <Button leftIcon={<FiMail />} colorScheme="teal" variant="solid">
      Email
    </Button>
    <Button rightIcon={<FiArrowRight />} colorScheme="teal" variant="outline">
      Call us
    </Button>
  </Stack>
)

export const WithLoading = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button size="lg" isLoading colorScheme="teal">
      Email
    </Button>

    <Button
      isLoading
      loadingText="Submitting..."
      colorScheme="teal"
      variant="outline"
    >
      Submit
    </Button>
  </Stack>
)

export const WithLoadingSpinnerPlacement = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button
      isLoading
      loadingText="Loading"
      colorScheme="teal"
      variant="outline"
      spinnerPlacement="start"
    >
      Submit
    </Button>
    <Button
      isLoading
      loadingText="Loading"
      colorScheme="teal"
      variant="outline"
      spinnerPlacement="end"
    >
      Continue
    </Button>
  </Stack>
)

export const WithDisabled = () => (
  <HStack spacing="24px">
    <Button isDisabled colorScheme="teal" variant="solid">
      Button
    </Button>
    <Button isDisabled colorScheme="teal" variant="outline">
      Button
    </Button>
    <Button isDisabled colorScheme="teal" variant="ghost">
      Button
    </Button>
    <Button isDisabled colorScheme="teal" variant="link">
      Button
    </Button>
  </HStack>
)

export const CustomComposition = () => (
  <Button
    size="md"
    height="48px"
    width="200px"
    border="2px solid"
    borderColor="green.500"
  >
    Button
  </Button>
)

export const WithIconButton = () => (
  <Stack direction="row">
    <IconButton aria-label="Search database" icon={<FiSearch />} />

    <IconButton
      colorScheme="blue"
      aria-label="Search database"
      icon={<FiSearch />}
    />

    <IconButton colorScheme="teal" aria-label="Call Segun" size="lg">
      <FiPhone />
    </IconButton>
  </Stack>
)

export const WithButtonGroup = () => (
  <ButtonGroup variant="outline">
    <Button colorScheme="blue">Save</Button>
    <Button>Cancel</Button>
  </ButtonGroup>
)

export const AttachedButtons = () => (
  <ButtonGroup size="sm" isAttached variant="outline">
    <Button marginEnd="-px">Save</Button>
    <IconButton
      fontSize="2xl"
      aria-label="Add to friends"
      icon={<FiChevronDown />}
    />
  </ButtonGroup>
)
