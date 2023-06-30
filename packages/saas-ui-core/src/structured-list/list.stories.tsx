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
  Text,
  Card,
  HStack,
  Checkbox,
  Radio,
  RadioGroup,
  Collapse,
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
  StructuredListButton,
  StructuredListCell,
  StructuredListHeader,
  StructuredListIcon,
} from './'

import { useCollapse } from '../collapse'

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
  children: (
    <>
      <StructuredListItem>
        <StructuredListCell>
          <Text fontWeight="bold">Elliot Alderson</Text>
          <Text fontSize="sm" color="muted">
            Hacker
          </Text>
        </StructuredListCell>
        <StructuredListCell>
          <Tag>admin</Tag>
        </StructuredListCell>
      </StructuredListItem>
      <StructuredListItem>
        <StructuredListCell>
          <Text fontWeight="bold">Tyrell Wellick</Text>
          <Text fontSize="sm" color="muted">
            CEO
          </Text>
        </StructuredListCell>
        <StructuredListCell>
          <Tag>owner</Tag>
        </StructuredListCell>
      </StructuredListItem>
    </>
  ),
}

export const WithIcons = Template.bind({})
WithIcons.args = {
  children: (
    <>
      <StructuredListItem>
        <StructuredListCell width="14">
          <Avatar name="Elliot Alderson" size="sm" />
        </StructuredListCell>
        <StructuredListCell flex="1">
          <Text fontWeight="bold">Elliot Alderson</Text>
          <Text fontSize="sm" color="muted">
            Hacker
          </Text>
        </StructuredListCell>
        <StructuredListCell>
          <Tag>admin</Tag>
        </StructuredListCell>
      </StructuredListItem>
      <StructuredListItem>
        <StructuredListCell width="14">
          <Avatar name="Tyrell Wellick" size="sm" />
        </StructuredListCell>
        <StructuredListCell flex="1">
          <Text fontWeight="bold">Tyrell Wellick</Text>
          <Text fontSize="sm" color="muted">
            CEO
          </Text>
        </StructuredListCell>
        <StructuredListCell>
          <Tag>owner</Tag>
        </StructuredListCell>
      </StructuredListItem>
    </>
  ),
}

export const WithHeader = Template.bind({})
WithHeader.args = {
  children: (
    <>
      <StructuredListHeader>Users</StructuredListHeader>
      <StructuredListItem>
        <StructuredListCell width="14">
          <Avatar name="Elliot Alderson" size="sm" />
        </StructuredListCell>
        <StructuredListCell flex="1">
          <Text fontWeight="bold">Elliot Alderson</Text>
          <Text fontSize="sm" color="muted">
            Hacker
          </Text>
        </StructuredListCell>
        <StructuredListCell>
          <Tag>admin</Tag>
        </StructuredListCell>
      </StructuredListItem>
      <StructuredListItem>
        <StructuredListCell width="14">
          <Avatar name="Tyrell Wellick" size="sm" />
        </StructuredListCell>
        <StructuredListCell flex="1">
          <Text fontWeight="bold">Tyrell Wellick</Text>
          <Text fontSize="sm" color="muted">
            CEO
          </Text>
        </StructuredListCell>
        <StructuredListCell>
          <Tag>owner</Tag>
        </StructuredListCell>
      </StructuredListItem>
    </>
  ),
}

export const Nested = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Card width="100%" maxW="320px">
      <Box as="nav">
        <StructuredList>
          <StructuredListItem as="a" href="#home">
            <StructuredListIcon as={FiHome} />
            <StructuredListCell flex="1" px="3" py="2">
              Home
            </StructuredListCell>
          </StructuredListItem>
          <StructuredListItem onClick={onToggle}>
            <StructuredListIcon as={FiInbox} />
            <StructuredListCell flex="1" px="3" py="2">
              Inbox
            </StructuredListCell>
            <StructuredListCell px="3">
              <Badge borderRadius="full">20</Badge>
            </StructuredListCell>
            <StructuredListCell>
              {isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </StructuredListCell>
          </StructuredListItem>
          <Collapse in={isOpen}>
            <StructuredList>
              <StructuredListItem as="a" href="#inbox/all">
                <StructuredListCell ps="12" py="2">
                  All messages
                </StructuredListCell>
              </StructuredListItem>
              <StructuredListItem as="a" href="#inbox/me">
                <StructuredListCell ps="12" py="2">
                  My messages
                </StructuredListCell>
              </StructuredListItem>
            </StructuredList>
          </Collapse>
        </StructuredList>
      </Box>
    </Card>
  )
}

export const CustomStyles = () => {
  const { isOpen, getToggleProps, getCollapseProps } = useCollapse()

  const theme = useTheme()

  const bg = useColorModeValue('teal.200', 'teal.500')

  return (
    <Card width="100%" maxW="320px" height="400px">
      <Box as="nav" p="2" role="navigation" aria-label="Main navigation">
        <StructuredList p="0">
          <StructuredListItem p="2px">
            <StructuredListButton
              borderRadius="md"
              color={useColorModeValue('teal.500', 'teal.300')}
              bg={transparentize(bg, 0.3)(theme)}
              _hover={{ bg: transparentize(bg, 0.3)(theme) }}
            >
              <StructuredListIcon size="16px" as={FiHome} />
              <StructuredListCell fontWeight="bold" flex="1">
                Home
              </StructuredListCell>
            </StructuredListButton>
          </StructuredListItem>
          <StructuredListItem p="2px">
            <StructuredListButton borderRadius="md">
              <StructuredListIcon size="16px" as={FiInbox} />
              <StructuredListCell flex="1">Inbox</StructuredListCell>
              <StructuredListCell>
                <Badge borderRadius="full">20</Badge>
              </StructuredListCell>
            </StructuredListButton>
          </StructuredListItem>
        </StructuredList>
      </Box>
      <Box as="nav" role="navigation" aria-label="Teams navigation">
        <StructuredList px="0">
          <StructuredListItem py="0">
            <StructuredListHeader
              as={StructuredListButton}
              borderRadius="md"
              py="1"
              action={isOpen ? <FiChevronDown /> : <FiChevronRight />}
              {...getToggleProps()}
              level={1}
            >
              Teams
            </StructuredListHeader>
          </StructuredListItem>
          <StructuredListItem px="2" py="2px">
            <StructuredList flex="1" p="0">
              <Collapse {...getCollapseProps()}>
                <StructuredListItem py="2px" px="0">
                  <StructuredListButton
                    py="2"
                    px="3"
                    borderRadius="md"
                    as="a"
                    href="#sales"
                  >
                    <StructuredListCell>Sales</StructuredListCell>
                  </StructuredListButton>
                </StructuredListItem>
                <StructuredListItem py="2px" px="0">
                  <StructuredListButton
                    py="2"
                    px="3"
                    borderRadius="md"
                    as="a"
                    href="#support"
                  >
                    <StructuredListCell>Support</StructuredListCell>
                  </StructuredListButton>
                </StructuredListItem>
              </Collapse>
            </StructuredList>
          </StructuredListItem>
        </StructuredList>
      </Box>
    </Card>
  )
}

export function WithCheckbox() {
  return (
    <Card width="320px">
      <StructuredList>
        {['Release V2', 'Learn Saas UI'].map((todo) => {
          const [checked, setChecked] = React.useState(false)
          return (
            <StructuredListItem key={todo} onClick={() => setChecked(!checked)}>
              <StructuredListCell display="flex" alignItems="center">
                <Checkbox isChecked={checked} />
              </StructuredListCell>
              <StructuredListCell flex="1">
                <Text fontWeight="medium">{todo}</Text>
              </StructuredListCell>
            </StructuredListItem>
          )
        })}
      </StructuredList>
    </Card>
  )
}

const tshirtVariants = [
  {
    id: 1,
    title: 'Red T-Shirt',
    description: 'A bright and bold red t-shirt',
  },
  {
    id: 2,
    title: 'Blue T-Shirt',
    description: 'A cool and calming blue t-shirt',
  },
  {
    id: 3,
    title: 'Green T-Shirt',
    description: 'A fresh and lively green t-shirt',
  },
]

export function WithRadio() {
  const [checked, setChecked] = React.useState(1)
  return (
    <Box width="400px">
      <RadioGroup name="variant">
        <StructuredList>
          {tshirtVariants.map((variant) => {
            const isChecked = checked === variant.id
            return (
              <StructuredListItem
                key={variant.id}
                onClick={() => setChecked(variant.id)}
                borderRadius="md"
                borderWidth="1px"
                mb="2"
                data-checked={isChecked ? true : undefined}
                _checked={{
                  borderColor: 'primary.500',
                }}
              >
                <StructuredListCell flex="1">
                  <Text fontWeight="medium">{variant.title}</Text>
                  <Text color="muted">{variant.description}</Text>
                </StructuredListCell>
                <StructuredListCell alignSelf="flex-start" mt="1">
                  <Radio isChecked={isChecked} />
                </StructuredListCell>
              </StructuredListItem>
            )
          })}
        </StructuredList>
      </RadioGroup>
    </Box>
  )
}

export const WithSwitch = () => {
  return (
    <Card width="100%" maxW="320px">
      <StructuredList>
        <StructuredListHeader>Notifications</StructuredListHeader>
        <StructuredListItem>
          <StructuredListIcon as={FiMail} size="4" />
          <StructuredListCell flex="1">Email</StructuredListCell>
          <StructuredListCell>
            <Switch aria-label="Email" />
          </StructuredListCell>
        </StructuredListItem>
        <StructuredListItem>
          <StructuredListIcon as={FiMessageSquare} size="4" />
          <StructuredListCell flex="1">Chat</StructuredListCell>
          <StructuredListCell>
            <Switch aria-label="Chat" />
          </StructuredListCell>
        </StructuredListItem>
      </StructuredList>
    </Card>
  )
}

export const TruncatedText = () => {
  return (
    <Card width="320px">
      <StructuredList>
        <StructuredListHeader>Inbox</StructuredListHeader>
        <StructuredListItem href="#">
          <StructuredListCell width="14">
            <Avatar name="Elliot Alderson" size="sm" />
          </StructuredListCell>
          <StructuredListCell flex="1">
            <Text fontWeight="bold">A bug is never just a mistake.</Text>
            <Text fontSize="sm" color="muted" noOfLines={2}>
              <Text as="span" color="app-text">
                Elliot Alderson
              </Text>{' '}
              — It represents something bigger. An error of thinking that makes
              you who you are.
            </Text>
          </StructuredListCell>
        </StructuredListItem>
        <StructuredListItem href="#">
          <StructuredListCell width="14">
            <Avatar name="Tyrell Wellick" size="sm" />
          </StructuredListCell>
          <StructuredListCell flex="1">
            <Text fontWeight="bold">Hi</Text>
            <Text fontSize="sm" color="muted" noOfLines={2}>
              <Text as="span" color="app-text">
                Tyrell Wellick
              </Text>{' '}
              — Unfortunately, we’re all human. Except me, of course.
            </Text>
          </StructuredListCell>
        </StructuredListItem>
      </StructuredList>
    </Card>
  )
}

export function StickyHeaders() {
  const issues = [
    {
      id: 'SUI-123',
      title: 'Research product trends',
      date: '10 Jan',
      labels: ['research', 'trends'],
      status: 'in-progress',
    },
    {
      id: 'SUI-133',
      title: 'Develop user interface',
      date: '3 Feb',
      labels: ['UI', 'development'],
      status: 'in-progress',
    },
    {
      id: 'SUI-134',
      title: 'Create user experience flows',
      date: '5 Feb',
      labels: ['UX', 'flows'],
      status: 'in-progress',
    },
    {
      id: 'SUI-135',
      title: 'Select materials for production',
      date: '7 Feb',
      labels: ['materials', 'production'],
      status: 'in-progress',
    },
    {
      id: 'SUI-136',
      title: 'Work with engineers on product specifications',
      date: '9 Feb',
      labels: ['engineering', 'specifications'],
      status: 'in-progress',
    },
    {
      id: 'SUI-137',
      title: 'Conduct user research',
      date: '11 Feb',
      labels: ['user research', 'testing'],
      status: 'in-progress',
    },
    {
      id: 'SUI-124',
      title: 'Brainstorm product ideas',
      date: '12 Jan',
      labels: ['brainstorming', 'ideas'],
      status: 'todo',
    },
    {
      id: 'SUI-125',
      title: 'Create initial sketches',
      date: '15 Jan',
      labels: ['sketches', 'design'],
      status: 'todo',
    },
    {
      id: 'SUI-126',
      title: 'Get feedback on sketches',
      date: '17 Jan',
      labels: ['feedback', 'design'],
      status: 'todo',
    },
    {
      id: 'SUI-127',
      title: 'Refine and finalize design',
      date: '20 Jan',
      labels: ['design', 'refinement'],
      status: 'todo',
    },
    {
      id: 'SUI-128',
      title: 'Create 3D model',
      date: '23 Jan',
      labels: ['3D', 'model'],
      status: 'todo',
    },
    {
      id: 'SUI-129',
      title: 'Test and iterate prototype',
      date: '25 Jan',
      labels: ['testing', 'prototype'],
      status: 'todo',
    },
    {
      id: 'SUI-130',
      title: 'Refine prototype based on feedback',
      date: '27 Jan',
      labels: ['feedback', 'iteration'],
      status: 'todo',
    },
    {
      id: 'SUI-131',
      title: 'Create final product',
      date: '30 Jan',
      labels: ['final', 'product'],
      status: 'todo',
    },
    {
      id: 'SUI-132',
      title: 'Test final product before launch',
      date: '1 Feb',
      labels: ['testing', 'final'],
      status: 'todo',
    },
  ]

  const inProgress = issues.filter(({ status }) => status === 'in-progress')
  const todo = issues.filter(({ status }) => status === 'todo')

  const renderIssue = (issue) => {
    return (
      <StructuredListItem
        href="#"
        borderBottom="1px"
        borderColor="gray.100"
        fontSize="sm"
        _dark={{
          borderColor: 'whiteAlpha.100',
        }}
      >
        <StructuredListCell width="4" role="group" px="0">
          <Checkbox
            opacity="0"
            _checked={{ opacity: 1 }}
            _groupHover={{ opacity: 1 }}
            size="md"
            rounded="sm"
          />
        </StructuredListCell>
        <StructuredListCell color="muted">{issue.id}</StructuredListCell>
        <StructuredListCell flex="1">
          <Text noOfLines={1}>{issue.title}</Text>
        </StructuredListCell>
        <StructuredListCell color="muted" as={HStack}>
          {issue.labels.map((label) => (
            <Tag
              key={label}
              bg="none"
              border="1px solid"
              borderColor="blackAlpha.100"
              color="muted"
              rounded="full"
              _dark={{
                borderColor: 'whiteAlpha.100',
              }}
            >
              {label}
            </Tag>
          ))}
        </StructuredListCell>
        <StructuredListCell color="muted">{issue.date}</StructuredListCell>
      </StructuredListItem>
    )
  }

  return (
    <Card width="100%" overflowY="auto" maxH="240px">
      <StructuredList py="0">
        <StructuredListHeader
          fontWeight="normal"
          bg="gray.200"
          _dark={{ bg: 'gray.700' }}
          color="app-text"
          position="sticky"
          top="0"
          zIndex="popover"
        >
          In Progress{' '}
          <Text as="span" color="muted">
            {inProgress.length}
          </Text>
        </StructuredListHeader>
        {inProgress.map(renderIssue)}
        <StructuredListHeader
          fontWeight="normal"
          bg="gray.200"
          _dark={{ bg: 'gray.700' }}
          color="app-text"
          position="sticky"
          top="0"
          zIndex="popover"
        >
          Todo{' '}
          <Text as="span" color="muted">
            {todo.length}
          </Text>
        </StructuredListHeader>
        {todo.map(renderIssue)}
      </StructuredList>
    </Card>
  )
}
