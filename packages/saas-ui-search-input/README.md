# @saas-ui/search-input

A Search Input component for Chakra UI

## Todo

This package is still in development and might not work 100% as expected.
If you find any issues, please open an issues here on Github.

- [ ] Add tests

## Installation

```sh
$ yarn add @saas-ui/search-input

#or

$ npm i @saas-ui/search-input --save
```

## Usage

```tsx
import { SearchInput } from '@saas-ui/search-input'

export default const App = () => {
  const [value, setValue] = useState(null)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onReset = () => {
    setValue(null)
  }

  return (
    <Box>
      <SearchInput onChange={onChange} onReset={onReset} value={value} />
    </Box>
  )
}
```

## License

MIT - Appulse Software
