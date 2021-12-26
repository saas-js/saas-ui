import { Container } from '@chakra-ui/react'
import * as React from 'react'

import { NumberInput } from '../src'

export default {
  title: 'Components/Forms/NumberInput',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const basic = () => (
  <>
    <NumberInput name="number" />
  </>
)
