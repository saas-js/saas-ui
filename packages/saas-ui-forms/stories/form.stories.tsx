import { Container } from '@chakra-ui/layout'
import * as React from 'react'

import * as Yup from 'yup'

import { Form, AutoForm, FormLayout, Field, SubmitButton } from '../src'

import { handleSubmit } from './helpers'

export default {
  title: 'Components/Forms/Form',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('First name'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Last name'),
})

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email address'),
  password: Yup.string()
    .required()
    .label('Password')
    .meta({ type: 'password' }),
})

export const basic = () => (
  <>
    <Form
      defaultValues={{
        title: 'Form',
        description: 'A basic layout',
      }}
      onSubmit={handleSubmit}
    >
      <FormLayout>
        <Field name="title" label="Title" />
        <Field name="description" label="Description" />
      </FormLayout>
    </Form>
  </>
)

export const autoForm = () => (
  <>
    <AutoForm
      defaultValues={{
        firstName: null,
        lastName: null,
      }}
      schema={schema}
      onSubmit={handleSubmit}
    />
  </>
)

export const submitLabel = () => (
  <>
    <AutoForm
      defaultValues={{
        email: null,
        password: null,
      }}
      schema={loginSchema}
      submitLabel={'Log in'}
      onSubmit={handleSubmit}
    />
  </>
)
