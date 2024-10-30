import * as React from 'react'

import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Collapsible,
  Container,
  HStack,
  RadioGroup,
  Switch,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'
import {
  FiChevronDown,
  FiChevronRight,
  FiHome,
  FiInbox,
  FiMail,
  FiMessageSquare,
} from 'react-icons/fi'

import * as GridList from './namespace'

console.log(GridList)
export default {
  title: 'Components/Data display/GridList',
  component: GridList.Root,
  // decorators: [
  //   (Story: any) => (
  //     <Container mt="40px">
  //       <Story />
  //     </Container>
  //   ),
  // ],
} as Meta

type Story = StoryObj<GridList.RootProps>

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

export const Basic: Story = {
  args: {
    children: (
      <>
        <GridList.Item>
          <GridList.Cell>
            <Text fontWeight="bold">Elliot Alderson</Text>
            <Text fontSize="sm" color="muted">
              Hacker
            </Text>
          </GridList.Cell>
          <GridList.Cell>
            <Tag.Root>
              <Tag.Label>admin</Tag.Label>
            </Tag.Root>
          </GridList.Cell>
        </GridList.Item>
        <GridList.Item>
          <GridList.Cell>
            <Text fontWeight="bold">Tyrell Wellick</Text>
            <Text fontSize="sm" color="muted">
              CEO
            </Text>
          </GridList.Cell>
          <GridList.Cell>
            <Tag.Root>
              <Tag.Label>owner</Tag.Label>
            </Tag.Root>
          </GridList.Cell>
        </GridList.Item>
      </>
    ),
  },
}

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <GridList.Item>
          <GridList.Cell width="14">
            <Avatar.Root>
              <Avatar.Icon />
            </Avatar.Root>
          </GridList.Cell>
          <GridList.Cell flex="1">
            <Text fontWeight="bold">Elliot Alderson</Text>
            <Text fontSize="sm" color="muted">
              Hacker
            </Text>
          </GridList.Cell>
          <GridList.Cell>
            <Tag.Root>admin</Tag.Root>
          </GridList.Cell>
        </GridList.Item>
        <GridList.Item>
          <GridList.Cell width="14">
            <Avatar.Root>
              <Avatar.Icon />
            </Avatar.Root>
          </GridList.Cell>
          <GridList.Cell flex="1">
            <Text fontWeight="bold">Tyrell Wellick</Text>
            <Text fontSize="sm" color="muted">
              CEO
            </Text>
          </GridList.Cell>
          <GridList.Cell>
            <Tag.Root>owner</Tag.Root>
          </GridList.Cell>
        </GridList.Item>
      </>
    ),
  },
}

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <GridList.Header>Users</GridList.Header>
        <GridList.Item>
          <GridList.Cell width="14">
            <Avatar.Root>
              <Avatar.Icon />
            </Avatar.Root>
          </GridList.Cell>
          <GridList.Cell flex="1">
            <Text fontWeight="bold">Elliot Alderson</Text>
            <Text fontSize="sm" color="muted">
              Hacker
            </Text>
          </GridList.Cell>
          <GridList.Cell>
            <Tag.Root>
              <Tag.Label>admin</Tag.Label>
            </Tag.Root>
          </GridList.Cell>
        </GridList.Item>
        <GridList.Item>
          <GridList.Cell width="14">
            <Avatar.Root>
              <Avatar.Icon />
            </Avatar.Root>
          </GridList.Cell>
          <GridList.Cell flex="1">
            <Text fontWeight="bold">Tyrell Wellick</Text>
            <Text fontSize="sm" color="muted">
              CEO
            </Text>
          </GridList.Cell>
          <GridList.Cell>
            <Tag.Root>
              <Tag.Label>owner</Tag.Label>
            </Tag.Root>
          </GridList.Cell>
        </GridList.Item>
      </>
    ),
  },
}

export const Nested: Story = {
  render: () => {
    const { open, onToggle } = useDisclosure()

    return (
      <Card.Root width="100%" maxW="320px">
        <Box as="nav">
          <GridList.Root>
            <GridList.Item as="a" href="#home">
              <GridList.Cell>
                <FiHome />
              </GridList.Cell>
              <GridList.Cell flex="1" px="3" py="2">
                Home
              </GridList.Cell>
            </GridList.Item>
            <GridList.Item onClick={onToggle}>
              <GridList.Cell>
                <FiInbox />
              </GridList.Cell>
              <GridList.Cell flex="1" px="3" py="2">
                Inbox
              </GridList.Cell>
              <GridList.Cell px="3">
                <Badge borderRadius="full">20</Badge>
              </GridList.Cell>
              <GridList.Cell>
                {open ? <FiChevronDown /> : <FiChevronRight />}
              </GridList.Cell>
            </GridList.Item>
            <Collapsible.Root open={open}>
              <Collapsible.Content>
                <GridList.Root>
                  <GridList.Item as="a" href="#inbox/all">
                    <GridList.Cell ps="12" py="2">
                      All messages
                    </GridList.Cell>
                  </GridList.Item>
                  <GridList.Item as="a" href="#inbox/me">
                    <GridList.Cell ps="12" py="2">
                      My messages
                    </GridList.Cell>
                  </GridList.Item>
                </GridList.Root>
              </Collapsible.Content>
            </Collapsible.Root>
          </GridList.Root>
        </Box>
      </Card.Root>
    )
  },
}

// export const CustomStyles: Story = {
//   render: () => {
//     const { isOpen, getToggleProps, getCollapseProps } = useCollapse()

//     const theme = useTheme()

//     const bg = useColorModeValue('teal.200', 'teal.500')

//     return (
//       <Card width="100%" maxW="320px" height="400px">
//         <Box as="nav" p="2" role="navigation" aria-label="Main navigation">
//           <GridList p="0">
//             <GridListItem p="2px">
//               <GridListButton
//                 borderRadius="md"
//                 color={useColorModeValue('teal.500', 'teal.300')}
//                 bg={transparentize(bg, 0.3)(theme)}
//                 _hover={{ bg: transparentize(bg, 0.3)(theme) }}
//               >
//                 <GridListIcon size="16px" as={FiHome} />
//                 <GridListCell fontWeight="bold" flex="1">
//                   Home
//                 </GridListCell>
//               </GridListButton>
//             </GridListItem>
//             <GridListItem p="2px">
//               <GridListButton borderRadius="md">
//                 <GridListIcon size="16px" as={FiInbox} />
//                 <GridListCell flex="1">Inbox</GridListCell>
//                 <GridListCell>
//                   <Badge borderRadius="full">20</Badge>
//                 </GridListCell>
//               </GridListButton>
//             </GridListItem>
//           </GridList>
//         </Box>
//         <Box as="nav" role="navigation" aria-label="Teams navigation">
//           <GridList px="0">
//             <GridListItem py="0">
//               <GridListHeader
//                 as={GridListButton}
//                 borderRadius="md"
//                 py="1"
//                 action={isOpen ? <FiChevronDown /> : <FiChevronRight />}
//                 {...getToggleProps()}
//                 level={1}
//               >
//                 Teams
//               </GridListHeader>
//             </GridListItem>
//             <GridListItem px="2" py="2px">
//               <GridList flex="1" p="0">
//                 <Collapse {...getCollapseProps()}>
//                   <GridListItem py="2px" px="0">
//                     <GridListButton
//                       py="2"
//                       px="3"
//                       borderRadius="md"
//                       as="a"
//                       href="#sales"
//                     >
//                       <GridListCell>Sales</GridListCell>
//                     </GridListButton>
//                   </GridListItem>
//                   <GridListItem py="2px" px="0">
//                     <GridListButton
//                       py="2"
//                       px="3"
//                       borderRadius="md"
//                       as="a"
//                       href="#support"
//                     >
//                       <GridListCell>Support</GridListCell>
//                     </GridListButton>
//                   </GridListItem>
//                 </Collapse>
//               </GridList>
//             </GridListItem>
//           </GridList>
//         </Box>
//       </Card>
//     )
//   },
// }

export const WithCheckbox: Story = {
  render: () => {
    return (
      <Card.Root width="320px">
        <GridList.Root>
          {['Release V2', 'Learn Saas UI'].map((todo) => {
            const [checked, setChecked] = React.useState(false)
            return (
              <GridList.Item
                key={todo}
                onClick={() => setChecked(!checked)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setChecked(!checked)
                  }
                }}
              >
                <GridList.Cell display="flex" alignItems="center">
                  <Checkbox.Root checked={checked}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </GridList.Cell>
                <GridList.Cell flex="1">
                  <Text fontWeight="medium">{todo}</Text>
                </GridList.Cell>
              </GridList.Item>
            )
          })}
        </GridList.Root>
      </Card.Root>
    )
  },
}

const tshirtVariants = [
  {
    id: '1',
    title: 'Red T-Shirt',
    description: 'A bright and bold red t-shirt',
  },
  {
    id: '2',
    title: 'Blue T-Shirt',
    description: 'A cool and calming blue t-shirt',
  },
  {
    id: '3',
    title: 'Green T-Shirt',
    description: 'A fresh and lively green t-shirt',
  },
]

export const WithRadio: Story = {
  render: () => {
    const [checked, setChecked] = React.useState('1')
    return (
      <Box width="400px">
        <RadioGroup.Root name="variant" value={checked}>
          <GridList.Root>
            {tshirtVariants.map((variant) => {
              const isChecked = checked === variant.id
              return (
                <GridList.Item
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
                  <GridList.Cell flex="1">
                    <Text fontWeight="medium">{variant.title}</Text>
                    <Text color="muted">{variant.description}</Text>
                  </GridList.Cell>
                  <GridList.Cell alignSelf="flex-start" mt="1">
                    <RadioGroup.Item value={variant.id}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                    </RadioGroup.Item>
                  </GridList.Cell>
                </GridList.Item>
              )
            })}
          </GridList.Root>
        </RadioGroup.Root>
      </Box>
    )
  },
}

export const WithSwitch: Story = {
  render: () => {
    return (
      <Card.Root width="100%" maxW="320px">
        <GridList.Root>
          <GridList.Header>Notifications</GridList.Header>
          <GridList.Item>
            <GridList.Cell>
              <FiMail size="4" />
            </GridList.Cell>
            <GridList.Cell flex="1">Email</GridList.Cell>
            <GridList.Cell>
              <Switch.Root aria-label="Email">
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
            </GridList.Cell>
          </GridList.Item>
          <GridList.Item>
            <GridList.Cell>
              <FiMessageSquare size="4" />
            </GridList.Cell>
            <GridList.Cell flex="1">Chat</GridList.Cell>
            <GridList.Cell>
              <Switch.Root aria-label="Chat">
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
            </GridList.Cell>
          </GridList.Item>
        </GridList.Root>
      </Card.Root>
    )
  },
}

export const TruncatedText: Story = {
  render: () => {
    return (
      <Card.Root width="320px">
        <GridList.Root>
          <GridList.Header>Inbox</GridList.Header>
          <GridList.Item>
            <GridList.Cell width="14">
              <Avatar.Root size="sm">
                <Avatar.Icon />
              </Avatar.Root>
            </GridList.Cell>
            <GridList.Cell flex="1">
              <Text fontWeight="bold">A bug is never just a mistake.</Text>
              <Text fontSize="sm" color="muted" lineClamp={2}>
                <Text as="span" color="app-text">
                  Elliot Alderson
                </Text>{' '}
                — It represents something bigger. An error of thinking that
                makes you who you are.
              </Text>
            </GridList.Cell>
          </GridList.Item>
          <GridList.Item href="#">
            <GridList.Cell width="14">
              <Avatar.Root size="sm">
                <Avatar.Icon />
              </Avatar.Root>
            </GridList.Cell>
            <GridList.Cell flex="1">
              <Text fontWeight="bold">Hi</Text>
              <Text fontSize="sm" color="muted" lineClamp={2}>
                <Text as="span" color="app-text">
                  Tyrell Wellick
                </Text>{' '}
                — Unfortunately, we’re all human. Except me, of course.
              </Text>
            </GridList.Cell>
          </GridList.Item>
        </GridList.Root>
      </Card.Root>
    )
  },
}

export const StickyHeaders: Story = {
  render: () => {
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

    const renderIssue = (issue: any) => {
      return (
        <GridList.Item
          borderBottom="1px"
          borderColor="gray.100"
          fontSize="sm"
          _dark={{
            borderColor: 'whiteAlpha.100',
          }}
        >
          <GridList.Cell color="muted">{issue.id}</GridList.Cell>
          <GridList.Cell flex="1">
            <Text lineClamp={1}>{issue.title}</Text>
          </GridList.Cell>
          <GridList.Cell color="muted" as={HStack}>
            {issue.labels.map((label: any) => (
              <Tag.Root
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
                <Tag.Label>{label}</Tag.Label>
              </Tag.Root>
            ))}
          </GridList.Cell>
          <GridList.Cell color="muted">{issue.date}</GridList.Cell>
        </GridList.Item>
      )
    }

    return (
      <Card.Root width="100%" overflowY="auto" maxH="240px">
        <GridList.Root py="0">
          <GridList.Header
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
          </GridList.Header>
          {inProgress.map(renderIssue)}
          <GridList.Header
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
          </GridList.Header>
          {todo.map(renderIssue)}
        </GridList.Root>
      </Card.Root>
    )
  },
}

export const KeyboardNavigation: Story = {
  render: () => {
    const onClick = () => console.log('Clicked list item!')

    return (
      <Box
        width="full"
        minH="400px"
        height="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card.Root width="320px">
          <Button mt="4">Focus Target Before</Button>

          <GridList.Root>
            <GridList.Item onClick={onClick}>
              <GridList.Cell flex="1">
                <Text fontWeight="bold">Elliot Alderson</Text>
                <Text fontSize="sm" color="muted">
                  Hacker
                </Text>
              </GridList.Cell>
            </GridList.Item>
            <GridList.Item onClick={onClick}>
              <GridList.Cell flex="1">
                <Text fontWeight="bold">Tyrell Wellick</Text>
                <Text fontSize="sm" color="muted">
                  CEO
                </Text>
              </GridList.Cell>
            </GridList.Item>
            <GridList.Item isDisabled onClick={onClick}>
              <GridList.Cell flex="1">
                <Text fontWeight="bold">Tyrell Wellick</Text>
                <Text fontSize="sm" color="muted">
                  CEO
                </Text>
              </GridList.Cell>
            </GridList.Item>
          </GridList.Root>
          <Button>Focus Target Before</Button>
        </Card.Root>
      </Box>
    )
  },
}
