import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  FiUser,
  FiCircle,
  FiUserCheck,
  FiTag,
  FiBarChart,
  FiCalendar,
} from 'react-icons/fi'
import {
  CommandBar,
  CommandBarContent,
  CommandBarDialog,
  CommandBarEmpty,
  CommandBarGroup,
  CommandBarInput,
  CommandBarItem,
  CommandBarList,
  CommandBarLoading,
  CommandBarProps,
  CommandBarSeparator,
} from '../src'
import {
  Box,
  Button,
  Container,
  Kbd,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'

export default {
  title: 'Components/Navigation/CommandBar',
  component: CommandBar,
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      )
    },
  ],
} as Meta

const items = [
  {
    icon: <FiUserCheck />,
    label: 'Assign to...',
    shortcut: ['A'],
  },
  {
    icon: <FiUser />,
    label: 'Assign to me',
    shortcut: ['I'],
  },
  {
    icon: <FiCircle />,
    label: 'Change status...',
    shortcut: ['S'],
  },
  {
    icon: <FiBarChart />,
    label: 'Change priority...',
    shortcut: ['P'],
  },
  {
    icon: <FiTag />,
    label: 'Change labels...',
    shortcut: ['L'],
  },
  {
    icon: <FiTag />,
    label: 'Remove label...',
    shortcut: ['⇧', 'L'],
  },
  {
    icon: <FiCalendar />,
    label: 'Set due date...',
    shortcut: ['⇧', 'D'],
  },
]

const Template: Story<CommandBarProps> = (args) => {
  const [isLoading, setLoading] = React.useState(false)

  return (
    <CommandBar>
      <CommandBarContent>
        <CommandBarInput placeholder="Type a command or search..." />

        <CommandBarList>
          {isLoading && <CommandBarLoading>Hang on…</CommandBarLoading>}

          <CommandBarEmpty>No results found.</CommandBarEmpty>

          <CommandBarGroup heading="Fruits">
            <CommandBarItem>Apple</CommandBarItem>
            <CommandBarItem>Orange</CommandBarItem>
            <CommandBarSeparator />
            <CommandBarItem>Pear</CommandBarItem>
            <CommandBarItem>Blueberry</CommandBarItem>
          </CommandBarGroup>

          <CommandBarItem>Fish</CommandBarItem>
        </CommandBarList>
      </CommandBarContent>
    </CommandBar>
  )
}

const DialogTemplate: Story<CommandBarProps> = (args) => {
  const { isOpen, onClose, onToggle } = useDisclosure()

  const [isLoading, setLoading] = React.useState(false)

  return (
    <>
      <Button onClick={onToggle}>Open Command Bar</Button>

      <CommandBar
        onValueChange={(value) => console.log(value)}
        isOpen={isOpen}
        onClose={onClose}
        closeOnSelect
      >
        <CommandBarDialog>
          <CommandBarContent>
            <CommandBarInput
              placeholder="Type a command or search..."
              autoFocus
            />

            <CommandBarList>
              {isLoading && <CommandBarLoading>Hang on…</CommandBarLoading>}

              <CommandBarEmpty>No results found.</CommandBarEmpty>

              {items.map(({ icon, label, shortcut }) => {
                return (
                  <CommandBarItem key={label} value={label}>
                    {icon}
                    {label}
                    <Box ms="auto">
                      {shortcut.map((key) => {
                        return <Kbd key={key}>{key}</Kbd>
                      })}
                    </Box>
                  </CommandBarItem>
                )
              })}
            </CommandBarList>
          </CommandBarContent>
        </CommandBarDialog>
      </CommandBar>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const Dialog = DialogTemplate.bind({})
Dialog.args = {}

export const Loading = () => {
  return (
    <CommandBar>
      <CommandBarContent>
        <CommandBarInput placeholder="Type a command or search..." />

        <CommandBarList>
          <CommandBarLoading>Loading...</CommandBarLoading>

          <CommandBarEmpty>No results found.</CommandBarEmpty>

          <CommandBarGroup heading="Fruits">
            <CommandBarItem>Apple</CommandBarItem>
            <CommandBarItem>Orange</CommandBarItem>
            <CommandBarSeparator />
            <CommandBarItem>Pear</CommandBarItem>
            <CommandBarItem>Blueberry</CommandBarItem>
          </CommandBarGroup>

          <CommandBarItem>Fish</CommandBarItem>
        </CommandBarList>
      </CommandBarContent>
    </CommandBar>
  )
}
