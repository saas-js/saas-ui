import {
  Container,
  Stack,
  Box,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react'
import * as React from 'react'

const { useEffect, useRef } = React

import {
  HotkeysList,
  HotkeysSearch,
  HotkeysListItems,
  HotkeysConfig,
  useHotkeysContext,
  useHotkeys,
  createHotkeys,
} from '../src'

const hotkeys: HotkeysConfig = {
  general: {
    title: 'General',
    hotkeys: {
      help: { label: 'Help', command: '?' },
      search: { label: 'Search', command: '⌘ K' },
    },
  },
  navigation: {
    title: 'Navigation',
    hotkeys: {
      inbox: { label: 'Inbox', command: 'N then I' },
    },
  },
  markdown: {
    title: 'Markdown',
    hotkeys: {
      bold: { label: 'Bold', command: '**text**' },
    },
  },
}

const {
  HotkeysProvider,
  useHotkeys: useHotkeysShortcut,
  Hotkey,
} = createHotkeys(hotkeys)

export default {
  title: 'Components/Navigation/Hotkeys',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <HotkeysProvider>
          <Story />
        </HotkeysProvider>
      </Container>
    ),
  ],
}

export const Basic = () => {
  const { isOpen, onOpen } = useDisclosure()

  const searchRef = useRef<HTMLInputElement>(null)

  const { hotkeys } = useHotkeysContext()
  const help = useHotkeysShortcut('general.help', () => {
    onOpen()
  })

  useHotkeysShortcut('general.search', () => {
    searchRef.current?.focus()
  })

  return (
    <Stack>
      <Text>
        Press <strong>{help}</strong> for help
      </Text>

      <Box hidden={!isOpen}>
        <HotkeysList hotkeys={hotkeys}>
          <HotkeysSearch ref={searchRef} />
          <HotkeysListItems />
        </HotkeysList>
      </Box>
    </Stack>
  )
}

export const List = () => {
  const { hotkeys } = useHotkeysContext()

  return (
    <Box>
      <HotkeysList hotkeys={hotkeys}>
        <HotkeysSearch />
        <HotkeysListItems />
      </HotkeysList>
    </Box>
  )
}

export const ListModal = () => {
  const searchRef = useRef<HTMLInputElement | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const help = useHotkeysShortcut('general.help', () => {
    onOpen()
  })

  const { hotkeys } = useHotkeysContext()

  return (
    <Box>
      <Text>
        Press <strong>{help}</strong> for help
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={searchRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Keyboard shortcuts</ModalHeader>

          <ModalBody>
            <HotkeysList hotkeys={hotkeys}>
              <HotkeysSearch ref={searchRef} />
              <HotkeysListItems />
            </HotkeysList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export const ListDrawer = () => {
  const searchRef = useRef<HTMLInputElement | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const help = useHotkeysShortcut('general.help', () => {
    onOpen()
  })

  const { hotkeys } = useHotkeysContext()

  return (
    <Box>
      <Text>
        Press <strong>{help}</strong> for help
      </Text>

      <Drawer isOpen={isOpen} onClose={onClose} initialFocusRef={searchRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Keyboard shortcuts</DrawerHeader>

          <DrawerBody>
            <HotkeysList hotkeys={hotkeys}>
              <HotkeysSearch ref={searchRef} />
              <HotkeysListItems />
            </HotkeysList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export const WithoutShortcut = () => {
  const ref = useRef<HTMLInputElement | null>(null)
  useHotkeys('⌘ k', () => {
    ref.current?.focus()
  })

  return (
    <Box>
      <Input placeholder={`Press ⌘ k to focus`} ref={ref} />
    </Box>
  )
}

export const IgnoreKeyInsideInput = () => {
  const ref = useRef<HTMLInputElement | null>(null)
  useHotkeys('k', () => {
    alert('K pressed')
  })

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <Box>
      <Input placeholder={`Type k`} ref={ref} />
    </Box>
  )
}

export const KeySequence = () => {
  const ref = useRef<HTMLInputElement | null>(null)
  useHotkeys('A then B', () => {
    ref.current?.focus()
  })

  return (
    <Box>
      <Input placeholder={`Press A then B to focus`} ref={ref} />
    </Box>
  )
}

export const SingleAndKeySequence = () => {
  const ref = useRef<HTMLInputElement | null>(null)

  useHotkeys('A', () => {
    ref.current?.focus()
  })

  useHotkeys('A then B', () => {
    // this shouldn't trigger
    alert('A then B pressed')
  })

  return (
    <Box>
      <Input placeholder={`Press A to focus`} ref={ref} />
    </Box>
  )
}

export const MultipleKeys = () => {
  const ref = useRef<HTMLInputElement | null>(null)

  useHotkeys('ctrl+shift+d', () => {
    ref.current?.focus()
  })

  return (
    <Box>
      <Input placeholder={`Press ctrl+shift+d to focus`} ref={ref} />
    </Box>
  )
}

export const PreventDefault = () => {
  const ref = useRef<HTMLInputElement | null>(null)

  useHotkeys(
    ['ctrl+f', 'cmd+f'],
    () => {
      ref.current?.focus()
    },
    { preventDefault: true }
  )

  return (
    <Box>
      <Input placeholder={`Press ctrl+f or cmd+f to focus`} ref={ref} />
    </Box>
  )
}

export const TargetEl = () => {
  const [ref, setRef] = React.useState<HTMLInputElement | null>(null)

  useHotkeys(
    ['esc'],
    () => {
      ref?.blur()
    },
    { targetElement: ref },
    [ref]
  )

  return (
    <Box>
      <Input placeholder={`Press esc to exit`} ref={setRef} />
    </Box>
  )
}

export const PressAndHold = () => {
  const [presses, setPresses] = React.useState(0)
  useHotkeys(
    'Cmd+Z',
    () => {
      setPresses((prev) => prev + 1)
    },
    {
      preventDefault: true,
    }
  )

  return <Box>{presses} presses</Box>
}

export const PressAndHoldRelease = () => {
  const [presses, setPresses] = React.useState(0)
  useHotkeys(
    'Cmd+Z',
    () => {
      setPresses((prev) => prev + 1)
    },
    {
      preventDefault: true,
    }
  )

  useHotkeys('ArrowUp', () => {
    setPresses(0)
  })

  return <Box>{presses} presses (Arrow up to reset)</Box>
}

export const WithHotkey = () => {
  const searchRef = React.useRef<HTMLInputElement>(null)

  return (
    <Hotkey
      command="general.search"
      callback={() => searchRef.current?.focus()}
    >
      {({ keys, ariaKeyshortcuts }) => (
        <Input
          ref={searchRef}
          placeholder={Array.isArray(keys) ? keys[0] : keys}
          aria-keyshortcuts={ariaKeyshortcuts}
        />
      )}
    </Hotkey>
  )
}
