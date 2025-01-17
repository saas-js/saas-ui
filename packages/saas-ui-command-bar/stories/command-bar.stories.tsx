import * as React from 'react'
import { StoryObj, Meta } from '@storybook/react'
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
  Modal,
  ModalContent,
  ModalOverlay,
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

type Story = StoryObj<CommandBarProps>

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

const Template: Story['render'] = (args) => {
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

const DialogTemplate: Story['render'] = (args) => {
  const { isOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  const [isLoading, setLoading] = React.useState(false)

  return (
    <>
      <Button onClick={onToggle}>Open Command Bar</Button>

      <CommandBar
        onChange={(value) => console.log(value)}
        isOpen={isOpen}
        onClose={onClose}
        closeOnSelect
        {...args}
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

export const DialogSize = DialogTemplate.bind({})
DialogSize.args = {
  size: 'xl',
}

export const Loading = () => {
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!isLoading) return
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [isLoading])

  return (
    <CommandBar>
      <CommandBarContent>
        <CommandBarInput
          placeholder="Type a command or search..."
          onChange={() => {
            setLoading(true)
          }}
        />
        <CommandBarList>
          {isLoading && <CommandBarLoading>Loading...</CommandBarLoading>}
          <CommandBarEmpty hidden={isLoading}>
            No results found.
          </CommandBarEmpty>
        </CommandBarList>
      </CommandBarContent>
    </CommandBar>
  )
}

export const DisabledItems = () => {
  const [isLoading, setLoading] = React.useState(false)

  return (
    <CommandBar onSelect={(item) => console.log(item)}>
      <CommandBarContent>
        <CommandBarInput placeholder="Type a command or search..." />

        <CommandBarList>
          {isLoading && <CommandBarLoading>Hang on…</CommandBarLoading>}

          <CommandBarEmpty>No results found.</CommandBarEmpty>

          <CommandBarGroup heading="Fruits">
            <CommandBarItem isDisabled>Apple</CommandBarItem>
            <CommandBarItem>Orange</CommandBarItem>
            <CommandBarSeparator />
            <CommandBarItem isDisabled>Pear</CommandBarItem>
            <CommandBarItem>Blueberry</CommandBarItem>
          </CommandBarGroup>

          <CommandBarItem>Fish</CommandBarItem>
        </CommandBarList>
      </CommandBarContent>
    </CommandBar>
  )
}

export const Overlay = () => {
  const [isLoading, setLoading] = React.useState(false)

  return (
    <CommandBar isOpen onSelect={(item) => console.log(item)}>
      <CommandBarDialog overlay>
        <CommandBarContent>
          <CommandBarInput placeholder="Type a command or search..." />

          <CommandBarList>
            {isLoading && <CommandBarLoading>Hang on…</CommandBarLoading>}

            <CommandBarEmpty>No results found.</CommandBarEmpty>

            <CommandBarGroup heading="Fruits">
              <CommandBarItem>Apple</CommandBarItem>
              <CommandBarItem>Orange</CommandBarItem>
              <CommandBarSeparator />
              <CommandBarItem isDisabled>Pear</CommandBarItem>
              <CommandBarItem>Blueberry</CommandBarItem>
            </CommandBarGroup>

            <CommandBarItem>Fish</CommandBarItem>
          </CommandBarList>
        </CommandBarContent>
      </CommandBarDialog>
    </CommandBar>
  )
}
