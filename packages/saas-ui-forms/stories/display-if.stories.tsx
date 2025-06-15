import * as React from 'react'

import * as Yup from 'yup'
import { Container } from '@chakra-ui/react'

import { DisplayIf, Field, Form, FormLayout, SubmitButton } from '../src'
import { yupResolver } from '../yup/src'
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

const postSchema = Yup.object().shape({
  title: Yup.string().required().meta({ placeholder: 'Title' }).label('Title'),
  description: Yup.string().meta({ type: 'textarea' }).label('Description'),
})

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
          resolver={yupResolver(postSchema)}
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
