import * as React from 'react'
import { Story, Meta } from '@storybook/react'

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
import { Button, Container, useDisclosure } from '@chakra-ui/react'

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

              <CommandBarGroup heading="Fruits">
                <CommandBarItem onSelect={(value) => console.log(value)}>
                  Apple
                </CommandBarItem>
                <CommandBarItem>Orange</CommandBarItem>
                <CommandBarSeparator />
                <CommandBarItem>Pear</CommandBarItem>
                <CommandBarItem>Blueberry</CommandBarItem>
              </CommandBarGroup>

              <CommandBarItem>Fish</CommandBarItem>
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
          <CommandBarLoading>Hang on…</CommandBarLoading>

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
