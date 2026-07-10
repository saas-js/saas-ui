import * as React from 'react'

import { Container } from '@chakra-ui/react'

import { Form, FormLayout, SubmitButton } from '../src'
import { onSubmit } from './helpers'

export default {
  title: 'Forms/ObjectField',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

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
      <Form
        schema={{
          properties: {
            post: {
              type: 'object',
              properties: {
                title: { type: 'string', label: 'Title' },
                description: { type: 'string', label: 'Description' },
              },
            },
          },
        }}
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
        schema={{
          properties: {
            post: {
              type: 'object',
              properties: {
                title: { type: 'string', label: 'Title' },
                description: { type: 'string', label: 'Description' },
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
