# @saas-ui/use-hotkeys

Easy to use and scalable keyboard shortcuts for React.

## How it works

Create a config object containing all the keyboard shortcuts in your app. The keys in the config can be used as shortcuts with the included hook throughout your app.

Other features

- Supports shifted keys like ?, =, @.
- ⌥ ⇧ ⌃ ⌘ shorthands are supported.
- Won't trigger inside inputs / content editable elements.
- Hooks also work without a global config object.
- The HotkeysList can also be used to list other options, like markdown support.

## Installation

```sh
$ yarn add @saas-ui/use-hotkeys

#or

$ npm i @saas-ui/use-hotkeys --save
```

## Usage

### 1 Standalone usage

```jsx
import { useHotkeys } from '@saas-ui/use-hotkeys'

const Component = () => {
  useHotkeys('/', () => {
    // do something
  })

  return null
}
```

### 2. Typesafe hotkeys config (optional)

```tsx
// hotkeys.ts
import { createHotkeys } from '@saas-ui/use-hotkeys'

export const {
  hotkeys,
  HotkeysProvider,
  useHotkeysContext,
  useHotkeys,
  Hotkey,
} = createHotkeys({
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
})
```

```tsx
// App.tsx
export default const App = () => {
  return (
    ...
      <HotkeysProvider>
        {children}
      </HotkeysProvider>
    ...
  )
}
```

```tsx
// MyComponent.tsx
import { useHotkeys, Hotkey } from './hotkeys'

export const MyComponent = () => {
  const searchRef = React.useRef<HTMLInputElement>(null)

  const help = useHotkeys('general.help', () => {
    onOpen()
  })

  return (
    <div>
      <div>Press {help} for help.</div>

      <Hotkey
        command="general.search"
        callback={() => searchRef.current?.focus()}
      >
        <input ref={searchRef} placeholder="Search..." />
      </Hotkey>
    </div>
  )
}
```

## License

MIT - Appulse Software
