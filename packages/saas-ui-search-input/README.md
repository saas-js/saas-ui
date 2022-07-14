# @saas-ui/search-input

A Search Input component for Chakra UI

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

## Docs

https://www.saas-ui.dev/docs/forms/search-input

## Source

https://github.com/saas-js/saas-ui/tree/next/packages/saas-ui-search-input

## License

MIT - Appulse Software
