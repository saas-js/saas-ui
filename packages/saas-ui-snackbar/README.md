# @saas-ui/snackbar

A Snackbar component for Chakra UI.

Snackbar wraps @chakra-ui/toast with a bunch of convenience methods.

## Todo

This package is still in development and might not work 100% as expected.
If you find any issues, please open an issues here on Github.

- [ ] Add tests

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

## License

MIT - Appulse Software
