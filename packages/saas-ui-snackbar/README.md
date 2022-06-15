# @saas-ui/snackbar

A Snackbar component for Chakra UI.

Snackbar wraps @chakra-ui/toast with a bunch of convenience methods.

## Installation

```sh
$ yarn add @saas-ui/snackbar

#or

$ npm i @saas-ui/snackbar --save
```

## Usage

```tsx
import { useSnackbar } from '@saas-ui/snackbar'

export default const App = () => {
  const snackbar = useSnackbar()

  return (
    <Box>
      <Button onClick={() => snackbar.success('Success!')}>Show snackbar</Button>
    </Box>
  )
}
```

## Docs

https://www.saas-ui.dev/docs/feedback/snackbar

## Source

https://github.com/saas-js/saas-ui/tree/next/packages/saas-ui-snackbar

## License

MIT - Appulse Software
