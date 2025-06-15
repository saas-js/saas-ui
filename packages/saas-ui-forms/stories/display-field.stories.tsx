import * as React from 'react'

import { Container } from '@chakra-ui/react'

import { DisplayField, Form } from '../src'
import { onSubmit } from './helpers'

export default {
  title: 'Forms/DisplayField',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => (
  <Form defaultValues={{ title: 'Display field' }} onSubmit={onSubmit}>
    <DisplayField name="title" label="Title" />
  </Form>
)
