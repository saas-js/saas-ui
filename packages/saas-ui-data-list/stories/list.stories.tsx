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
} from 'react-icons/fi'

import {
  DataList,
  DataListItem,
  DataListItemButton,
  DataListItemIcon,
  DataListItemLabel,
  DataListItemTertiary,
  DataListItemAction,
  DataListHeader,
} from '../src'

import { Collapse, useCollapse } from '@saas-ui/collapse'

export default {
  title: 'Components/Data display/DataList',
  component: DataList,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = (args) => (
  <DataList bg={useColorModeValue('gray.200', 'gray.700')} {...args} />
)

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

export const basic = Template.bind({})
basic.args = {
  items: users.map(({ name, position, role }) => ({
    icon: <Avatar name={name} size="sm" />,
    primary: name,
    secondary: position,
    tertiary: <Tag>{role}</Tag>,
    action: <IconButton icon={<FiSettings />} aria-label="settings" />,
    onClick: () => {},
  })),
}

export const withIcons = Template.bind({})
withIcons.args = {
  items: users.map(({ name, position, role }) => ({
    icon: <FiUser />,
    primary: name,
    secondary: position,
    tertiary: <Tag>{role}</Tag>,
    action: <IconButton icon={<FiSettings />} aria-label="settings" />,
    onClick: () => {},
  })),
}

export const composed = () => {
  return (
    <Box
      bg={useColorModeValue('gray.200', 'gray.700')}
      width="100%"
      maxW="320px"
    >
      <Box as="nav">
        <DataList>
          <DataListItem as="a" href="#home">
            <DataListItemIcon>
              <Icon as={FiHome} />
            </DataListItemIcon>
            <DataListItemLabel>Home</DataListItemLabel>
          </DataListItem>
          <DataListItem as="a" href="#inbox">
            <DataListItemIcon>
              <FiInbox />
            </DataListItemIcon>
            <DataListItemLabel>Inbox</DataListItemLabel>
            <DataListItemTertiary>
              <Badge borderRadius="full">20</Badge>
            </DataListItemTertiary>
            <DataListItemAction></DataListItemAction>
          </DataListItem>
        </DataList>
      </Box>
      <Divider />
      <Box as="nav">
        <DataList>
          <DataListItem as="a" href="#spam">
            <DataListItemLabel>Spam</DataListItemLabel>
            <DataListItemAction></DataListItemAction>
          </DataListItem>
          <DataListItem as="a" href="#trash">
            <DataListItemLabel>Trash</DataListItemLabel>
            <DataListItemAction></DataListItemAction>
          </DataListItem>
        </DataList>
      </Box>
    </Box>
  )
}

export const nested = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box
      bg={useColorModeValue('gray.200', 'gray.700')}
      width="100%"
      maxW="320px"
    >
      <Box as="nav">
        <DataList>
          <DataListItem as="a" href="#home">
            <DataListItemIcon>
              <Icon as={FiHome} />
            </DataListItemIcon>
            <DataListItemLabel>Home</DataListItemLabel>
          </DataListItem>
          <DataListItem onClick={onToggle}>
            <DataListItemIcon>
              <FiInbox />
            </DataListItemIcon>
            <DataListItemLabel>Inbox</DataListItemLabel>
            <DataListItemTertiary>
              <Badge borderRadius="full">20</Badge>
            </DataListItemTertiary>
            <DataListItemAction>
              {isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </DataListItemAction>
          </DataListItem>
          <Collapse in={isOpen}>
            <DataList>
              <DataListItem as="a" href="#inbox/all" ps="16">
                <DataListItemLabel>All messages</DataListItemLabel>
                <DataListItemAction></DataListItemAction>
              </DataListItem>
              <DataListItem as="a" href="#inbox/me" ps="16">
                <DataListItemLabel>My messages</DataListItemLabel>
                <DataListItemAction></DataListItemAction>
              </DataListItem>
            </DataList>
          </Collapse>
        </DataList>
      </Box>
    </Box>
  )
}

export const customStyles = () => {
  const { isOpen, getToggleProps, getCollapseProps } = useCollapse()

  const theme = useTheme()

  return (
    <Box
      bg={useColorModeValue('gray.200', 'gray.700')}
      width="100%"
      maxW="320px"
    >
      <Box as="nav" p="2" role="navigation">
        <DataList p="0">
          <DataListItem p="2px">
            <DataListItemButton
              py="1"
              px="4"
              borderRadius="md"
              color="teal.300"
              bg={transparentize('teal.500', 0.3)(theme)}
              _hover={{ bg: transparentize('teal.500', 0.3)(theme) }}
            >
              <DataListItemIcon size="16px">
                <FiHome />
              </DataListItemIcon>
              <DataListItemLabel fontWeight="bold">Home</DataListItemLabel>
            </DataListItemButton>
          </DataListItem>
          <DataListItem p="2px">
            <DataListItemButton py="1" px="4" borderRadius="md">
              <DataListItemIcon size="16px">
                <FiInbox />
              </DataListItemIcon>
              <DataListItemLabel>Inbox</DataListItemLabel>
              <DataListItemTertiary>
                <Badge borderRadius="full">20</Badge>
              </DataListItemTertiary>
            </DataListItemButton>
          </DataListItem>
        </DataList>
      </Box>
      <Box as="nav" p="2" role="navigation">
        <DataList p="0">
          <DataListHeader
            as={DataListItemButton}
            borderRadius="md"
            py="1"
            action={isOpen ? <FiChevronDown /> : <FiChevronRight />}
            {...getToggleProps()}
          >
            Teams
          </DataListHeader>
          <Collapse {...getCollapseProps()}>
            <DataListItem p="2px">
              <DataListItemButton
                py="1"
                px="4"
                borderRadius="md"
                as="a"
                href="#sales"
              >
                <DataListItemLabel>Sales</DataListItemLabel>
                <DataListItemAction></DataListItemAction>
              </DataListItemButton>
            </DataListItem>
            <DataListItem p="2px">
              <DataListItemButton
                py="1"
                px="4"
                borderRadius="md"
                as="a"
                href="#support"
              >
                <DataListItemLabel>Support</DataListItemLabel>
                <DataListItemAction></DataListItemAction>
              </DataListItemButton>
            </DataListItem>
          </Collapse>
        </DataList>
      </Box>
    </Box>
  )
}
