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
import React, { useEffect, useRef } from 'react'

import {
  HotkeysProvider,
  HotkeysList,
  HotkeysSearch,
  HotkeysListItems,
  HotkeysListOptions,
  useHotkeysShortcut,
  useHotkeysContext,
} from '../'

const hotkeys: HotkeysListOptions = {
  general: {
    title: 'General',
    hotkeys: {
      help: { label: 'Help', command: '?' },
      search: { label: 'Search', command: '⌘ K' },
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

export const basic = () => {
  const { isOpen, onOpen } = useDisclosure()

  const searchRef = useRef<HTMLInputElement>()

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

export const hotkeysList = () => {
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

export const hotkeysListModal = () => {
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

export const hotkeysListDrawer = () => {
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

export const keyWithoutShortcut = () => {
  const ref = useRef<HTMLInputElement | null>(null)
  const key = useHotkeysShortcut('cmd+k', () => {
    ref.current.focus()
  })

  return (
    <Box>
      <Input placeholder={`Press ${key} to focus`} ref={ref} />
    </Box>
  )
}

export const ignoreKeyInsideInput = () => {
  const ref = useRef<HTMLInputElement | null>(null)
  const key = useHotkeysShortcut('k', () => {
    alert('K pressed')
  })

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <Box>
      <Input placeholder={`Type ${key}`} ref={ref} />
    </Box>
  )
}
