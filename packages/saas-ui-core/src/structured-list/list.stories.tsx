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

import { Collapse, useCollapse } from '../collapse'

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

// export const Nested = () => {
//   const { isOpen, onToggle } = useDisclosure()

//   return (
//     <Box width="100%" maxW="320px">
//       <Box as="nav">
//         <StructuredList>
//           <StructuredListItem as="a" href="#home">
//             <StructuredListItemIcon as={FiHome} />
//             <StructuredListItemLabel>Home</StructuredListItemLabel>
//           </StructuredListItem>
//           <StructuredListItem onClick={onToggle}>
//             <StructuredListItemIcon as={FiInbox} />
//             <StructuredListItemLabel>Inbox</StructuredListItemLabel>
//             <StructuredListItemTertiary>
//               <Badge borderRadius="full">20</Badge>
//               {isOpen ? <FiChevronDown /> : <FiChevronRight />}
//             </StructuredListItemTertiary>
//           </StructuredListItem>
//           <Collapse in={isOpen}>
//             <StructuredList>
//               <StructuredListItem as="a" href="#inbox/all">
//                 <StructuredListItemLabel ps="12">
//                   All messages
//                 </StructuredListItemLabel>
//               </StructuredListItem>
//               <StructuredListItem as="a" href="#inbox/me">
//                 <StructuredListItemLabel ps="12">
//                   My messages
//                 </StructuredListItemLabel>
//               </StructuredListItem>
//             </StructuredList>
//           </Collapse>
//         </StructuredList>
//       </Box>
//     </Box>
//   )
// }

// export const CustomStyles = () => {
//   const { isOpen, getToggleProps, getCollapseProps } = useCollapse()

//   const theme = useTheme()

//   const bg = useColorModeValue('teal.200', 'teal.500')

//   return (
//     <Box width="100%" maxW="320px">
//       <Box as="nav" p="2" role="navigation" aria-label="Main navigation">
//         <StructuredList p="0">
//           <StructuredListItem p="2px">
//             <StructuredListItemButton
//               py="1"
//               px="4"
//               borderRadius="md"
//               color={useColorModeValue('teal.500', 'teal.300')}
//               bg={transparentize(bg, 0.3)(theme)}
//               _hover={{ bg: transparentize(bg, 0.3)(theme) }}
//             >
//               <StructuredListItemIcon size="16px" as={FiHome} />
//               <StructuredListItemLabel fontWeight="bold">
//                 Home
//               </StructuredListItemLabel>
//             </StructuredListItemButton>
//           </StructuredListItem>
//           <StructuredListItem p="2px">
//             <StructuredListItemButton py="1" px="4" borderRadius="md">
//               <StructuredListItemIcon size="16px" as={FiInbox} />
//               <StructuredListItemLabel>Inbox</StructuredListItemLabel>
//               <StructuredListItemTertiary>
//                 <Badge borderRadius="full">20</Badge>
//               </StructuredListItemTertiary>
//             </StructuredListItemButton>
//           </StructuredListItem>
//         </StructuredList>
//       </Box>
//       <Box as="nav" p="2" role="navigation" aria-label="Teams navigation">
//         <StructuredList p="0">
//           <StructuredListItem>
//             <StructuredListHeader
//               as={StructuredListItemButton}
//               borderRadius="md"
//               py="1"
//               action={isOpen ? <FiChevronDown /> : <FiChevronRight />}
//               {...getToggleProps()}
//               level={1}
//             >
//               Teams
//             </StructuredListHeader>
//           </StructuredListItem>
//           <StructuredListItem>
//             <StructuredList flex="1" p="0">
//               <Collapse {...getCollapseProps()}>
//                 <StructuredListItem p="2px">
//                   <StructuredListItemButton
//                     py="1"
//                     px="4"
//                     borderRadius="md"
//                     as="a"
//                     href="#sales"
//                   >
//                     <StructuredListItemLabel>Sales</StructuredListItemLabel>
//                   </StructuredListItemButton>
//                 </StructuredListItem>
//                 <StructuredListItem p="2px">
//                   <StructuredListItemButton
//                     py="1"
//                     px="4"
//                     borderRadius="md"
//                     as="a"
//                     href="#support"
//                   >
//                     <StructuredListItemLabel>Support</StructuredListItemLabel>
//                   </StructuredListItemButton>
//                 </StructuredListItem>
//               </Collapse>
//             </StructuredList>
//           </StructuredListItem>
//         </StructuredList>
//       </Box>
//     </Box>
//   )
// }

export const WithSwitch = () => {
  return (
    <Box width="100%" maxW="320px">
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
    </Box>
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
        as={HStack}
        spacing="4"
        borderBottom="1px"
        borderColor="gray.100"
        fontSize="sm"
        _dark={{
          borderColor: 'whiteAlpha.100',
        }}
      >
        <StructuredListCell width="4" role="group">
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
          <Text>{issue.title}</Text>
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
