import {
  Container,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from '@chakra-ui/react'
import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { NumberInput } from '.'

export default {
  title: 'Components/Forms/NumberInput',
  component: NumberInput,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

export const Basic = {}

export const HideStepper = {
  args: {
    hideStepper: true,
  },
}

export const MinMax = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 10,
  },
}
export const WithFormatter = {
  args: {
    format: (value: any) => `$${value}`, // use any currency formatter here
    parse: (value: any) => value.replace('$', ''),
  },
}

export const WithAddons = {
  args: {
    leftAddon: <InputLeftAddon>$</InputLeftAddon>,
    rightAddon: <InputRightAddon>USD</InputRightAddon>,
    hideStepper: true,
  },
}

export const WithElements = {
  args: {
    leftAddon: <InputLeftElement>$</InputLeftElement>,
    rightAddon: <InputRightElement>USD</InputRightElement>,
  },
}
