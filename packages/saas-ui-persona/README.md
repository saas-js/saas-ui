# @saas-ui/persona

A Persona component for Chakra UI

## Todo

This package is still in development and might not work 100% as expected.
If you find any issues, please open an issues here on Github.

- [ ] Add tests

## Installation

```sh
$ yarn add @saas-ui/persona

#or

$ npm i @saas-ui/persona --save
```

## Usage

```tsx
import { Persona } from '@saas-ui/persona'

export default const App = () => {
  return (
    <Box>
      <Persona
        name="Eelco Wiersma"
        secondaryLabel="Founder"
        tertiaryLabel="On a roadtrip"
        presence="offline"
        isOutOfOffice
        />
    </Box>
  )
}
```

## License

MIT - Appulse Software
