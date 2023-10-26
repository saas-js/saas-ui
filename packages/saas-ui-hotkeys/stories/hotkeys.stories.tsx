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
  HotkeysProvider,
  HotkeysList,
  HotkeysSearch,
  HotkeysListItems,
  HotkeysListOptions,
  useHotkeysShortcut,
  useHotkeysContext,
  useHotkeys,
} from '../src'

const hotkeys: HotkeysListOptions = {
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

export default {
  title: 'Components/Navigation/Hotkeys',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <HotkeysProvider hotkeys={hotkeys}>
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
  const key = useHotkeysShortcut('⌘ k', () => {
    ref.current?.focus()
  })

  return (
    <Box>
      <Input placeholder={`Press ${key} to focus`} ref={ref} />
    </Box>
  )
}

export const IgnoreKeyInsideInput = () => {
  const ref = useRef<HTMLInputElement | null>(null)
  const key = useHotkeysShortcut('k', () => {
    alert('K pressed')
  })

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <Box>
      <Input placeholder={`Type ${key}`} ref={ref} />
    </Box>
  )
}

export const KeySequence = () => {
  const ref = useRef<HTMLInputElement | null>(null)
  const key = useHotkeysShortcut('A then B', () => {
    ref.current?.focus()
  })

  return (
    <Box>
      <Input placeholder={`Press ${key} to focus`} ref={ref} />
    </Box>
  )
}

export const SingleAndKeySequence = () => {
  const ref = useRef<HTMLInputElement | null>(null)

  const key = useHotkeysShortcut('A', () => {
    ref.current?.focus()
  })

  useHotkeysShortcut('A then B', () => {
    // this shouldn't trigger
    alert('A then B pressed')
  })

  return (
    <Box>
      <Input placeholder={`Press ${key} to focus`} ref={ref} />
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
