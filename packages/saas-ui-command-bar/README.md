# @saas-ui/command-bar

Fast, composable, unstyled command menu for Chakra UI.

Built with `cmdk`

## Installation

```sh
$ yarn add @saas-ui/command-bar

#or

$ npm i @saas-ui/command-bar  --save
```

## Usage

```tsx
import { Command } from '@saas-ui/command-bar'

const CmdBar = () => {
  const disclosure = useDisclosure()

  const command = useHotkeys(
    'cmd+k',
    () => {
      disclosure.onOpen()
    },
    [disclosure]
  )

  return (
    <Command.Dialog {...disclosure}>
      <Command.Input />

      <Command.List>
        {loading && <Command.Loading>Hang on…</Command.Loading>}

        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Fruits">
          <Command.Item>Apple</Command.Item>
          <Command.Item>Orange</Command.Item>
          <Command.Separator />
          <Command.Item>Pear</Command.Item>
          <Command.Item>Blueberry</Command.Item>
        </Command.Group>

        <Command.Item>Fish</Command.Item>
      </Command.List>
    </Command.Dialog>
  )
}
```

## License

MIT - Appulse Software
