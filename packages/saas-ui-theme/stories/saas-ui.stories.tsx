import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Radio,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  VStack,
  Kbd,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Spacer,
  Heading,
  Editable,
  EditablePreview,
  EditableInput,
  MenuItemOption,
  ButtonGroup,
  Tag,
  IconButton,
  Portal,
  Card,
  CardHeader,
  CardFooter,
  Image,
  useClipboard,
  Divider,
} from '@chakra-ui/react'
import {
  Select,
  PropertyList,
  Property,
  PersonaAvatar,
  SearchInput,
  Link,
  useSnackbar,
} from '@saas-ui/react'
import {
  FiAlignCenter,
  FiAlignLeft,
  FiAlignRight,
  FiBold,
  FiChevronDown,
  FiItalic,
  FiLink,
  FiMoreVertical,
  FiUnderline,
} from 'react-icons/fi'

import { theme } from '../src/saas-ui'
import { FaGithub } from 'react-icons/fa'

export default {
  title: 'Themes/SaasUI',
  decorators: [(Story: any) => <Story />],
  parameters: {
    theme,
    layout: 'fullscreen',
  },
} as Meta

export const SaasUI: Story = () => {
  const snackbar = useSnackbar()

  const { onCopy } = useClipboard('npm i @saas-ui/react')

  return (
    <Box p="20" fontSize="md" position="relative">
      <Stack
        spacing="4"
        justifySelf="flex-start"
        alignSelf="flex-start"
        width="400px"
        alignItems="flex-start"
        position="absolute"
        zIndex="2"
      >
        <Stack spacing="1">
          <Heading>Saas UI Theme</Heading>
          <Text color="muted" fontSize="lg">
            Minimalist Chakra UI theme for modern dashboard apps.
          </Text>
        </Stack>

        <ButtonGroup>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              onCopy()

              snackbar.success('Copied to clipboard')
            }}
          >
            npm i @saas-ui/react
          </Button>
          <Button
            variant="ghost"
            leftIcon={<FaGithub />}
            size="lg"
            as="a"
            href="https://github.com/saas-js/saas-ui/tree/main/packages/saas-ui-theme"
          >
            Source
          </Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing="4" position="absolute" top="20">
        <VStack alignItems="flex-end" spacing="4">
          <HStack spacing="4" alignItems="flex-end">
            <VStack alignItems="flex-end" spacing="4">
              <Checkbox isChecked />
              <HStack>
                <Button variant="primary">Primary</Button>
              </HStack>
              <HStack>
                <Button variant="outline">Secondary</Button>
              </HStack>
            </VStack>

            <Card width="240px" position="relative" overflow="hidden">
              <Image src="/mountains.jpg" objectFit="cover" mb="0" />
              <CardFooter
                position="absolute"
                bottom="0"
                width="100%"
                bgGradient="linear(to-t, blackAlpha.900, transparent)"
                py="2"
                px="2"
                color="white"
                height="76px"
                alignItems="flex-end"
              >
                <Text flex="1" fontSize="md">
                  South Tirol
                </Text>
                <Button variant="primary" size="xs">
                  Book now
                </Button>
              </CardFooter>
            </Card>
          </HStack>

          <HStack alignItems="flex-end" spacing="4">
            <VStack alignItems="flex-end">
              <Switch defaultChecked />

              <Menu defaultIsOpen>
                <MenuButton
                  as={Button}
                  variant="outline"
                  rightIcon={<FiChevronDown />}
                >
                  Filter
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem fontSize="md">Status</MenuItem>
                    <MenuItem fontSize="md">Created at</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </VStack>
            <Upgrade />
          </HStack>
        </VStack>
        <Slider
          aria-label="slider-ex-1"
          defaultValue={30}
          width="570px"
          ms="auto"
          alignSelf="flex-end"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <VStack alignItems="flex-end">
          <HStack alignItems="flex-end" spacing="4">
            <VStack alignItems="flex-end" spacing="4">
              <Radio isChecked />
              <HStack spacing="0.5">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </HStack>
              <ButtonGroup isAttached size="md">
                <Button>All</Button>
                <Button>Leads</Button>
                <Button>Customers</Button>
              </ButtonGroup>
              <Profile />
            </VStack>
            <Members />
          </HStack>
        </VStack>
        <VStack alignItems="flex-end">
          <HStack spacing="4" alignItems="flex-start">
            <Progress colorScheme="green" size="xs" value={80} width="300px" />
            <Card px="1" py="1">
              <ButtonGroup size="sm" variant="ghost">
                <ButtonGroup spacing="1" variant="ghost">
                  <IconButton
                    icon={<FiAlignLeft />}
                    aria-label="Align left"
                    isActive
                  />
                  <IconButton
                    icon={<FiAlignCenter />}
                    aria-label="Align center"
                  />
                  <IconButton
                    icon={<FiAlignRight />}
                    aria-label="Align right"
                  />
                </ButtonGroup>
                <Divider orientation="vertical" />
                <ButtonGroup spacing="1" variant="ghost">
                  <IconButton icon={<FiBold />} aria-label="Bold" />
                  <IconButton icon={<FiItalic />} aria-label="Italic" />
                  <IconButton icon={<FiUnderline />} aria-label="Underline" />
                </ButtonGroup>
                <Divider orientation="vertical" />
                <IconButton icon={<FiLink />} aria-label="Create link" />
                <Spacer />
                <Button variant="primary">Save</Button>
              </ButtonGroup>
            </Card>
          </HStack>
        </VStack>
      </Stack>
    </Box>
  )
}

const Upgrade = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <Alert
        status="info"
        alignItems="flex-start"
        colorScheme="primary"
        width="460px"
      >
        <Box width="100%">
          <HStack mb="2" spacing="0">
            <AlertIcon />
            <AlertTitle>This feature requires the Pro plan</AlertTitle>
          </HStack>

          <AlertDescription>
            Upgrade your subscription to start using this feature.
          </AlertDescription>
        </Box>
        <Box>
          <Button
            variant="outline"
            colorScheme="primary"
            size="sm"
            onClick={onOpen}
          >
            Upgrade
          </Button>
        </Box>
      </Alert>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={onClose}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

const members = [
  {
    name: 'Renata Alink',
    email: 'hello@saas-ui.dev',
    presence: 'online',
    status: 'owner',
    avatar: '/showcase-avatar.jpg',
  },
  {
    name: 'Selini Shanta',
    email: 'selini@saas-ui.dev',
    status: 'invited',
    avatar: '/showcase-avatar2.jpg',
  },
]

const Members = () => {
  return (
    <Card width="600px">
      <CardHeader>
        <Stack spacing="1">
          <Heading size="sm" fontWeight="semibold">
            Members
          </Heading>
          <Text color="muted">Manage and invite your colleagues</Text>
        </Stack>
      </CardHeader>
      <ButtonGroup px="3" py="3" borderTopWidth="1px">
        <Box>
          <SearchInput placeholder="Filter by name or email" size="sm" />
        </Box>
        <Spacer />
        <Button colorScheme="primary" variant="solid">
          Invite people
        </Button>
      </ButtonGroup>
      {/* <List>
        {members.map((member) => (
          <ListItem
            px="4"
            py="2"
            pe="14"
            borderBottomWidth="1px"
            sx={{ '&:last-of-type': { borderWidth: 0 } }}
          >
            <ListItemIcon>
              <PersonaAvatar
                name={member.name}
                presence={member.presence}
                src={member.avatar}
                size="xs"
              />
            </ListItemIcon>
            <ListItemLabel
              primary={member.name || member.email}
              secondary={member.name ? member.email : null}
            ></ListItemLabel>
            <ListItemTertiary>
              <Tag size="sm">{member.status}</Tag>
            </ListItemTertiary>
            <ListItemAction>
              <Box>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical />}
                    px="0"
                    minW="8"
                  />
                  <MenuList>
                    <MenuItem>Remove</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </ListItemAction>
          </ListItem>
        ))}
      </List> */}
    </Card>
  )
}

const Profile = () => {
  return (
    <Card width="320px">
      <CardHeader pb="2">
        <Stack spacing="1">
          <Heading size="sm" fontWeight="semibold">
            Details
          </Heading>
        </Stack>
      </CardHeader>
      <PropertyList px="4">
        <Property
          label="Name"
          value={
            <Editable defaultValue="Eelco">
              <EditablePreview />
              <EditableInput />
            </Editable>
          }
        />
        <Property
          label="Status"
          value={
            <Select value="Open" size="xs">
              <MenuItemOption value="Open">Open</MenuItemOption>
              <MenuItemOption value="Closed">Closed</MenuItemOption>
            </Select>
          }
        />
      </PropertyList>
    </Card>
  )
}
