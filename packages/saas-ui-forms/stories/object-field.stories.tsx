import { Container } from '@chakra-ui/layout'
import { yupResolver } from '@hookform/resolvers/yup'
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

import { yupForm } from '@saas-ui/forms/yup'

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
        defaultValues={{
          post: {},
        }}
        resolver={yupResolver(objectSchema)}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <ObjectField name="post" label="Post">
            <Field name="title" label="Title" />
            <Field name="description" label="Description" />
          </ObjectField>

          <SubmitButton label="Save post" />
        </FormLayout>
      </Form>
    </>
  )
}

export const AutoObjectField = () => {
  return (
    <>
      <AutoForm
        defaultValues={{
          post: {},
        }}
        onSubmit={onSubmit}
        {...yupForm(objectSchema)}
      />
    </>
  )
}

export const HideLabel = () => {
  return (
    <>
      <Form
        defaultValues={{
          post: {},
        }}
        resolver={yupResolver(objectSchema)}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <ObjectField name="post" label="Post" hideLabel>
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

export const NestedObjectField = () => {
  return (
    <>
      <Form
        defaultValues={{
          post: {},
        }}
        resolver={yupResolver(nestedSchema)}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <ObjectField name="post" label="Post">
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
