# @saas-ui/hotkeys

Easy manageable keyboard shortcuts for Chakra UI

## Todo

This package is still in development and might not work 100% as expected.
If you find any issues, please open an issues here on Github.

- [ ] Add tests
- [ ] Test compatibility with all Chakra UI components, like Menu's

## How it works

Create a config object containing all the keyboard shortcuts in your app. The keys in the config can be used as shortcuts with the included hook throughout your app. Comes with an HotkeysList component to list all available key combinations for your users.

Other features

- Supports shifted keys like ?, =, @.
- ⌥ ⇧ ⌃ ⌘ shorthands are supported.
- Won't trigger inside inputs / content editable elements.
- Hooks also work without a global config object.
- The HotkeysList can also be used to list other options, like markdown support.

## Installation

```sh
$ yarn add @saas-ui/hotkeys

#or

$ npm i @saas-ui/hotkeys --save
```

## Usage

### 1. Setup your hotkeys config (optional)

```tsx
// app.tsx
import { HotkeysProvider, HotkeysListOptions } from '@saas-ui/hotkeys'

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

export default const App = () => {
  return (
    ...
      <HotkeysProvider hotkeys={hotkeys}>
        {children}
      </HotkeysProvider>
    ...
  )
}
```

### 2. Setup your hooks

```tsx
import {
  useHotkeysShortcut,
  useHotkeysContext,
  HotkeysLiist,
  HostkeysSearch,
  HotkeysListItems,
} from '@saas-ui/hotkeys'

export const MyComponent = () => {
  const help = useHotkeysShortcut('general.help', () => {
    onOpen()
  })

  useHotkeysShortcut('general.search', () => {
    searchRef.current?.focus()
  })

  return <>Press {help} for help.</>
}
```

### 3. Using the HotkeysList component

```tsx
import {
  useHotkeysShortcut,
  useHotkeysContext,
  HotkeysLiist,
  HostkeysSearch,
  HotkeysListItems,
} from '@saas-ui/hotkeys'

export const HotkeysListModal = () => {
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
```

### 4 Standalone usage

If you're not using Chakra UI or don't want to use the provider, you can use the `useHotkeys` hook standalone.

```jsx
import { useHotkeys } from '@saas-ui/hotkeys'

const Component = () => {
  useHotkeys('/', () => {
    // do something
  })

  return null
}
```

## License

MIT - Appulse Software
