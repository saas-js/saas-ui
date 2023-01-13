import { Container } from '@chakra-ui/react'
import { yupResolver } from '../yup/src'
import * as React from 'react'

import * as Yup from 'yup'

import { Form, FormLayout, Field, DisplayIf, SubmitButton } from '../src'

import { onSubmit } from './helpers'

export default {
  title: 'Components/Forms/DisplayIf',
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

export const Basic = () => {
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

          <SubmitButton label="Save post" />
        </FormLayout>
      </Form>
    </>
  )
}
