import { Container } from '@chakra-ui/layout'
import * as React from 'react'

import * as Yup from 'yup'

import {
  Form,
  AutoForm,
  FormLayout,
  Field,
  ObjectField,
  SubmitButton,
} from '../src'

import { onSubmit } from './helpers'

export default {
  title: 'Components/Forms/ObjectField',
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

const objectSchema = Yup.object().shape({
  post: postSchema,
})

export const autoObjectField = () => {
  return (
    <>
      <AutoForm
        defaultValues={{
          post: {},
        }}
        schema={objectSchema}
        onSubmit={onSubmit}
      />
    </>
  )
}

export const objectField = () => {
  return (
    <>
      <Form
        defaultValues={{
          post: {},
        }}
        schema={objectSchema}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <ObjectField name="post">
            <Field name="title" label="Title" />
            <Field name="description" label="Description" />
          </ObjectField>

          <SubmitButton label="Save post" />
        </FormLayout>
      </Form>
    </>
  )
}

const metaSchema = Yup.object().shape({
  author: Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
  }),
})

const nestedSchema = Yup.object().shape({
  post: postSchema.shape({
    meta: metaSchema,
  }),
})

export const nestedObjectField = () => {
  return (
    <>
      <Form
        defaultValues={{
          post: {},
        }}
        schema={nestedSchema}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <ObjectField name="post">
            <Field name="title" label="Title" />
            <Field name="description" label="Description" />
            <ObjectField name="meta">
              <ObjectField name="author" label="Author">
                <Field name="name" label="Name" />
                <Field name="email" label="Email" />
              </ObjectField>
            </ObjectField>
          </ObjectField>

          <SubmitButton label="Save post" />
        </FormLayout>
      </Form>
    </>
  )
}
