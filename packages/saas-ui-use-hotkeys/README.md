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

### 2. Setup your hotkeys config (optional)

```tsx
// app.tsx
import { HotkeysProvider, HotkeysConfig } from '@saas-ui/use-hotkeys'

const hotkeys: HotkeysConfig = {
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

### 3. Setup your hooks

```tsx
import { useHotkeysShortcut, useHotkeysContext } from '@saas-ui/hotkeys'

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

## License

MIT - Appulse Software
