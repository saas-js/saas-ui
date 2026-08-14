# `@saas-ui/chakra-preset`

The Saas UI Chakra preset provides tokens, semantic tokens, recipes, slot
recipes, utilities, and the default Chakra system. It does not bundle Saas UI
React components.

For a new application, let the CLI install compatible dependency versions and
local provider setup:

```sh
npx @saas-ui/cli@rc init
```

The underlying provider boundary is:

```tsx
import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'

export function Provider(props: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
}
```

Use the provider installed by `saas-ui init` when the application needs the
local link adapter or color-mode integration. Install editable custom components
separately:

```sh
npx @saas-ui/cli@rc add sidebar app-shell page
```

The package exports `defaultSystem` (also aliased as `system`), `defaultConfig`,
recipe values, and their variant-prop types. Templates bind directly to those
recipe exports so consumers do not need Chakra type generation to use them.

Existing `@saas-ui/react` users should follow the
[migration guide](https://github.com/saas-js/saas-ui/blob/v3/MIGRATION.md).

## License

MIT
