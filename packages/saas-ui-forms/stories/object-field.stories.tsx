import { Container } from '@chakra-ui/react'
import * as React from 'react'

import * as Yup from 'yup'

import { Form, FormLayout, SubmitButton } from '../src'

import { Form as YupForm } from '@saas-ui/forms/yup'

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

const postSchema = Yup.object()
  .shape({
    title: Yup.string()
      .required()
      .meta({ placeholder: 'Title' })
      .label('Title'),
    description: Yup.string().meta({ type: 'textarea' }).label('Description'),
  })
  .label('Post')

const objectSchema = Yup.object().shape({
  post: postSchema,
})

export const Basic = () => {
  return (
    <>
      <Form
        schema={{
          properties: {
            name: 'post',
            type: 'object',
            properties: {
              title: {
                type: 'string',
                label: 'Title',
              },
              description: {
                type: 'string',
                label: 'Description',
              },
            },
          },
        }}
        defaultValues={{
          post: {
            title: '',
            description: '',
          },
        }}
        onSubmit={onSubmit}
      >
        {({ Field, ObjectField }) => (
          <FormLayout>
            <ObjectField name="post" label="Post">
              <Field name="post.title" label="Title" />
              <Field name="post.description" label="Description" />
            </ObjectField>

            <SubmitButton>Save post</SubmitButton>
          </FormLayout>
        )}
      </Form>
    </>
  )
}

export const AutoObjectField = () => {
  return (
    <>
      <YupForm
        schema={objectSchema}
        defaultValues={{
          post: {},
        }}
        fields={{
          post: {
            hideLabel: true,
          },
        }}
        onSubmit={onSubmit}
      />
    </>
  )
}

export const HideLabel = () => {
  return (
    <>
      <Form
        schema={objectSchema}
        defaultValues={{
          post: {
            title: '',
            description: '',
          },
        }}
        onSubmit={onSubmit}
      >
        {({ Field, ObjectField }) => (
          <FormLayout>
            <ObjectField name="post" label="Post" hideLabel>
              <Field name="post.title" label="Title" />
              <Field name="post.description" label="Description" />
            </ObjectField>

            <SubmitButton>Save post</SubmitButton>
          </FormLayout>
        )}
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

export const NestedObjectField = () => {
  return (
    <>
      <YupForm
        schema={nestedSchema}
        defaultValues={{
          post: {},
        }}
        onSubmit={onSubmit}
      >
        {({ Field, ObjectField }) => (
          <FormLayout>
            <ObjectField name="post" label="Post">
              <Field name="post.title" label="Title" />
              <Field name="post.description" label="Description" />
              <ObjectField name="post.meta">
                <ObjectField name="post.meta.author" label="Author">
                  <Field name="post.meta.author.name" label="Name" />
                  <Field name="post.meta.author.email" label="Email" />
                </ObjectField>
              </ObjectField>
            </ObjectField>

            <SubmitButton>Save post</SubmitButton>
          </FormLayout>
        )}
      </YupForm>
    </>
  )
}
