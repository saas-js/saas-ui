# @saas-ui/palette

Color palette generator for Chakra UI

## How it works

This library creates a color object based on a single input color. The object can be directly used to extend your Chakra theme.

## Installation

```sh
$ yarn add @saas-ui/palette

#or

$ npm i @saas-ui/palette --save
```

## Usage

1. Setup your Chakra theme, [Theme documentation](https://chakra-ui.com/docs/theming/theme)

2. Create your palette

```jsx theme.jsx
import { extendTheme } from '@chakra-ui/react'
import { createPalette } from '@saas-ui/palette'

const colors = createPalette('#6d28d9')

const theme = extendTheme({
  colors,
})

export default theme
```

## Configuration

```jsx
const colors = createPalette('#6d28d9', {
  blackLuminance: 0.005, // defaults to 0
  colors: {
    red: '#d00b00', // override default colors
    indigo: '#4B0082', // add custom colors
  },
})
```

### Default colors

```js
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'cyan',
  'blue',
  'purple',
  'pink',
]
```

## Thanks to

This library was inspired by https://palx.jxnblk.com/

## License

MIT - Appulse Software
