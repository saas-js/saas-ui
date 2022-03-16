import { Container } from '@chakra-ui/layout'
import * as React from 'react'

import * as Yup from 'yup'

import { yupForm } from '@saas-ui/forms/yup'

import { AutoForm } from '../src'

import { onSubmit } from './helpers'

export default {
  title: 'Components/Forms/AutoForm',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const basicSchema = {
  firstName: {
    type: 'text',
    label: 'First name',
    rules: {
      required: true,
    },
  },
  lastName: {
    type: 'text',
    label: 'Last name',
  },
  items: {
    type: 'array',
    items: {
      type: 'text',
    },
  },
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

export const Basic = () => (
  <>
    <AutoForm
      defaultValues={{
        firstName: '',
        lastName: '',
      }}
      schema={basicSchema}
      onSubmit={onSubmit}
    />
  </>
)

export const SubmitLabel = () => (
  <>
    <AutoForm
      defaultValues={{
        firstName: '',
        lastName: '',
      }}
      schema={basicSchema}
      submitLabel={'Save'}
      onSubmit={onSubmit}
    />
  </>
)

export const YupSchema = () => (
  <>
    <AutoForm
      defaultValues={{
        firstName: '',
        lastName: '',
      }}
      onSubmit={onSubmit}
      {...yupForm(schema)}
    />
  </>
)
