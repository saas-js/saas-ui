import * as React from 'react'

import { Container } from '@chakra-ui/react'

import { DisplayIf, Field, Form, FormLayout, SubmitButton } from '../src'
import { onSubmit } from './helpers'

export default {
  title: 'Forms/DisplayIf',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = {
  args: {
    onSubmit,
  },
  render({ onSubmit }: any) {
    return (
      <>
        <Form
          defaultValues={{
            title: '',
            description: '',
          }}
          onSubmit={onSubmit}
        >
          <FormLayout>
            <Field name="title" label="Title" />
            <DisplayIf name="title" condition={(value) => !!value}>
              <Field name="description" label="Description" />
            </DisplayIf>

            <SubmitButton>Save post</SubmitButton>
          </FormLayout>
        </Form>
      </>
    )
  },
}
