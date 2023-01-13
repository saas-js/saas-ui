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
  StructuredList,
  StructuredListItem,
  StructuredListItemButton,
  StructuredListItemIcon,
  StructuredListItemLabel,
  StructuredListItemTertiary,
  StructuredListItemAction,
  StructuredListHeader,
} from '../src'

import { Collapse, useCollapse } from '@saas-ui/collapse'

export default {
  title: 'Components/Data display/StructuredList',
  component: StructuredList,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = (args) => <StructuredList {...args} />

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
        <StructuredList>
          <StructuredListItem as="a" href="#home">
            <StructuredListItemIcon as={FiHome} />
            <StructuredListItemLabel>Home</StructuredListItemLabel>
          </StructuredListItem>
          <StructuredListItem as="a" href="#inbox">
            <StructuredListItemIcon as={FiInbox} />
            <StructuredListItemLabel>Inbox</StructuredListItemLabel>
            <StructuredListItemTertiary>
              <Badge borderRadius="full">20</Badge>
            </StructuredListItemTertiary>
            <StructuredListItemAction></StructuredListItemAction>
          </StructuredListItem>
        </StructuredList>
      </Box>
      <Divider />
      <Box as="nav" aria-label="Tag navigation">
        <StructuredList>
          <StructuredListItem as="a" href="#spam">
            <StructuredListItemLabel>Spam</StructuredListItemLabel>
            <StructuredListItemAction></StructuredListItemAction>
          </StructuredListItem>
          <StructuredListItem as="a" href="#trash">
            <StructuredListItemLabel>Trash</StructuredListItemLabel>
            <StructuredListItemAction></StructuredListItemAction>
          </StructuredListItem>
        </StructuredList>
      </Box>
    </Box>
  )
}

export const Nested = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box width="100%" maxW="320px">
      <Box as="nav">
        <StructuredList>
          <StructuredListItem as="a" href="#home">
            <StructuredListItemIcon as={FiHome} />
            <StructuredListItemLabel>Home</StructuredListItemLabel>
          </StructuredListItem>
          <StructuredListItem onClick={onToggle}>
            <StructuredListItemIcon as={FiInbox} />
            <StructuredListItemLabel>Inbox</StructuredListItemLabel>
            <StructuredListItemTertiary>
              <Badge borderRadius="full">20</Badge>
              {isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </StructuredListItemTertiary>
          </StructuredListItem>
          <Collapse in={isOpen}>
            <StructuredList>
              <StructuredListItem as="a" href="#inbox/all">
                <StructuredListItemLabel ps="12">
                  All messages
                </StructuredListItemLabel>
              </StructuredListItem>
              <StructuredListItem as="a" href="#inbox/me">
                <StructuredListItemLabel ps="12">
                  My messages
                </StructuredListItemLabel>
              </StructuredListItem>
            </StructuredList>
          </Collapse>
        </StructuredList>
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
        <StructuredList p="0">
          <StructuredListItem p="2px">
            <StructuredListItemButton
              py="1"
              px="4"
              borderRadius="md"
              color={useColorModeValue('teal.500', 'teal.300')}
              bg={transparentize(bg, 0.3)(theme)}
              _hover={{ bg: transparentize(bg, 0.3)(theme) }}
            >
              <StructuredListItemIcon size="16px" as={FiHome} />
              <StructuredListItemLabel fontWeight="bold">
                Home
              </StructuredListItemLabel>
            </StructuredListItemButton>
          </StructuredListItem>
          <StructuredListItem p="2px">
            <StructuredListItemButton py="1" px="4" borderRadius="md">
              <StructuredListItemIcon size="16px" as={FiInbox} />
              <StructuredListItemLabel>Inbox</StructuredListItemLabel>
              <StructuredListItemTertiary>
                <Badge borderRadius="full">20</Badge>
              </StructuredListItemTertiary>
            </StructuredListItemButton>
          </StructuredListItem>
        </StructuredList>
      </Box>
      <Box as="nav" p="2" role="navigation" aria-label="Teams navigation">
        <StructuredList p="0">
          <StructuredListItem>
            <StructuredListHeader
              as={StructuredListItemButton}
              borderRadius="md"
              py="1"
              action={isOpen ? <FiChevronDown /> : <FiChevronRight />}
              {...getToggleProps()}
              level={1}
            >
              Teams
            </StructuredListHeader>
          </StructuredListItem>
          <StructuredListItem>
            <StructuredList flex="1" p="0">
              <Collapse {...getCollapseProps()}>
                <StructuredListItem p="2px">
                  <StructuredListItemButton
                    py="1"
                    px="4"
                    borderRadius="md"
                    as="a"
                    href="#sales"
                  >
                    <StructuredListItemLabel>Sales</StructuredListItemLabel>
                  </StructuredListItemButton>
                </StructuredListItem>
                <StructuredListItem p="2px">
                  <StructuredListItemButton
                    py="1"
                    px="4"
                    borderRadius="md"
                    as="a"
                    href="#support"
                  >
                    <StructuredListItemLabel>Support</StructuredListItemLabel>
                  </StructuredListItemButton>
                </StructuredListItem>
              </Collapse>
            </StructuredList>
          </StructuredListItem>
        </StructuredList>
      </Box>
    </Box>
  )
}

export const WithSwitch = () => {
  return (
    <Box width="100%" maxW="320px">
      <StructuredList>
        <StructuredListHeader>Notifications</StructuredListHeader>
        <StructuredListItem action={<Switch aria-label="Email" />}>
          <StructuredListItemIcon as={FiMail} />
          <StructuredListItemLabel>Email</StructuredListItemLabel>
        </StructuredListItem>
        <StructuredListItem action={<Switch aria-label="Chat" />}>
          <StructuredListItemIcon as={FiMessageSquare} />
          <StructuredListItemLabel>Chat</StructuredListItemLabel>
        </StructuredListItem>
      </StructuredList>
    </Box>
  )
}
