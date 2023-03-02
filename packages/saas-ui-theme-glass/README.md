# @saas-ui/theme-glass

A Linear inspired theme for Chakra UI.

## Installation

```sh
$ yarn add @saas-ui/theme-glass

#or

$ npm i @saas-ui/theme-glass  --save
```

## Usage

### Usage with Chakra UI

```ts
import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/theme-glass'

export const theme = extendTheme(
  {
    // your overrides
  },
  baseTheme
)
```

### Usage with Saas UI

```ts
import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/react'
import { theme as glassTheme } from '@saas-ui/theme-glass'

export const theme = extendTheme(
  {
    // your overrides
  },
  glassTheme,
  baseTheme
)
```

## Docs

https://chakra-ui.com/docs/styled-system/customize-theme

https://saas-ui.dev/docs/core/theming/saas-ui-theme

## Source

https://github.com/saas-js/saas-ui/tree/main/packages/saas-ui-theme-glass

## License

MIT - Appulse Software
