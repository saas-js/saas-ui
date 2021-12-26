import { Container } from '@chakra-ui/react'
import * as React from 'react'

import { Form, DisplayField } from '../src'

export default {
  title: 'Components/Forms/DisplayField',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

import { handleSubmit } from './helpers'

export const basic = () => (
  <Form defaultValues={{ title: 'Display field' }} onSubmit={handleSubmit}>
    <DisplayField name="title" label="Title" />
  </Form>
)
