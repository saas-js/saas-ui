import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  Container,
  Box,
  Avatar,
  IconButton,
  Icon,
  Tag,
  Badge,
  Divider,
  Switch,
  useColorModeValue,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react'

import { transparentize } from '@chakra-ui/theme-tools'

import {
  FiUser,
  FiSettings,
  FiHome,
  FiInbox,
  FiChevronRight,
  FiChevronDown,
  FiMail,
  FiMessageSquare,
} from 'react-icons/fi'

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemLabel,
  ListItemTertiary,
  ListItemAction,
  ListHeader,
} from '../src'

import { Collapse, useCollapse } from '@saas-ui/collapse'

export default {
  title: 'Components/Data display/List',
  component: List,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = (args) => <List {...args} />

const users = [
  {
    name: 'Elliot Alderson',
    position: 'Hacker',
    role: 'admin',
  },
  {
    name: 'Martin Wallström',
    position: 'CEO',
    role: 'owner',
  },
]

export const Basic = Template.bind({})
Basic.args = {
  items: users.map(({ name, position, role }) => ({
    icon: <Avatar name={name} size="sm" />,
    primary: name,
    secondary: position,
    tertiary: <Tag>{role}</Tag>,
    action: <IconButton icon={<FiSettings />} aria-label="settings" />,
    onClick: () => null,
  })),
}

export const WithIcons = Template.bind({})
WithIcons.args = {
  items: users.map(({ name, position, role }) => ({
    icon: <Icon as={FiUser} />,
    primary: name,
    secondary: position,
    tertiary: <Tag>{role}</Tag>,
    action: <IconButton icon={<FiSettings />} aria-label="settings" />,
    onClick: () => null,
  })),
}

export const Composed = () => {
  return (
    <Box width="100%" maxW="320px">
      <Box as="nav" aria-label="Main navigation">
        <List>
          <ListItem as="a" href="#home">
            <ListItemIcon as={FiHome} />
            <ListItemLabel>Home</ListItemLabel>
          </ListItem>
          <ListItem as="a" href="#inbox">
            <ListItemIcon as={FiInbox} />
            <ListItemLabel>Inbox</ListItemLabel>
            <ListItemTertiary>
              <Badge borderRadius="full">20</Badge>
            </ListItemTertiary>
            <ListItemAction></ListItemAction>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box as="nav" aria-label="Tag navigation">
        <List>
          <ListItem as="a" href="#spam">
            <ListItemLabel>Spam</ListItemLabel>
            <ListItemAction></ListItemAction>
          </ListItem>
          <ListItem as="a" href="#trash">
            <ListItemLabel>Trash</ListItemLabel>
            <ListItemAction></ListItemAction>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export const Nested = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box width="100%" maxW="320px">
      <Box as="nav">
        <List>
          <ListItem as="a" href="#home">
            <ListItemIcon as={FiHome} />
            <ListItemLabel>Home</ListItemLabel>
          </ListItem>
          <ListItem onClick={onToggle}>
            <ListItemIcon as={FiInbox} />
            <ListItemLabel>Inbox</ListItemLabel>
            <ListItemTertiary>
              <Badge borderRadius="full">20</Badge>
              {isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </ListItemTertiary>
          </ListItem>
          <Collapse in={isOpen}>
            <List>
              <ListItem as="a" href="#inbox/all">
                <ListItemLabel ps="12">All messages</ListItemLabel>
              </ListItem>
              <ListItem as="a" href="#inbox/me">
                <ListItemLabel ps="12">My messages</ListItemLabel>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
    </Box>
  )
}

export const CustomStyles = () => {
  const { isOpen, getToggleProps, getCollapseProps } = useCollapse()

  const theme = useTheme()

  const bg = useColorModeValue('teal.200', 'teal.500')

  return (
    <Box width="100%" maxW="320px">
      <Box as="nav" p="2" role="navigation" aria-label="Main navigation">
        <List p="0">
          <ListItem p="2px">
            <ListItemButton
              py="1"
              px="4"
              borderRadius="md"
              color={useColorModeValue('teal.500', 'teal.300')}
              bg={transparentize(bg, 0.3)(theme)}
              _hover={{ bg: transparentize(bg, 0.3)(theme) }}
            >
              <ListItemIcon size="16px" as={FiHome} />
              <ListItemLabel fontWeight="bold">Home</ListItemLabel>
            </ListItemButton>
          </ListItem>
          <ListItem p="2px">
            <ListItemButton py="1" px="4" borderRadius="md">
              <ListItemIcon size="16px" as={FiInbox} />
              <ListItemLabel>Inbox</ListItemLabel>
              <ListItemTertiary>
                <Badge borderRadius="full">20</Badge>
              </ListItemTertiary>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box as="nav" p="2" role="navigation" aria-label="Teams navigation">
        <List p="0">
          <ListItem>
            <ListHeader
              as={ListItemButton}
              borderRadius="md"
              py="1"
              action={isOpen ? <FiChevronDown /> : <FiChevronRight />}
              {...getToggleProps()}
              level={1}
            >
              Teams
            </ListHeader>
          </ListItem>
          <ListItem>
            <List flex="1" p="0">
              <Collapse {...getCollapseProps()}>
                <ListItem p="2px">
                  <ListItemButton
                    py="1"
                    px="4"
                    borderRadius="md"
                    as="a"
                    href="#sales"
                  >
                    <ListItemLabel>Sales</ListItemLabel>
                  </ListItemButton>
                </ListItem>
                <ListItem p="2px">
                  <ListItemButton
                    py="1"
                    px="4"
                    borderRadius="md"
                    as="a"
                    href="#support"
                  >
                    <ListItemLabel>Support</ListItemLabel>
                  </ListItemButton>
                </ListItem>
              </Collapse>
            </List>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export const WithSwitch = () => {
  return (
    <Box width="100%" maxW="320px">
      <List>
        <ListHeader>Notifications</ListHeader>
        <ListItem action={<Switch aria-label="Email" />}>
          <ListItemIcon as={FiMail} />
          <ListItemLabel>Email</ListItemLabel>
        </ListItem>
        <ListItem action={<Switch aria-label="Chat" />}>
          <ListItemIcon as={FiMessageSquare} />
          <ListItemLabel>Chat</ListItemLabel>
        </ListItem>
      </List>
    </Box>
  )
}
