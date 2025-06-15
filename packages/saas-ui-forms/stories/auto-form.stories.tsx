import * as React from 'react'

import * as Yup from 'yup'
import * as z from 'zod'
import { Container } from '@chakra-ui/react'

import { Form, ObjectSchema, SubmitButton } from '../src'
import { createYupForm } from '../yup/src'
import { createZodForm, zodMeta } from '../zod/src'
import { onSubmit } from './helpers'

export default {
  title: 'Forms/AutoForm',
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
  role: {
    type: 'select',
    label: 'Role',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
  emails: {
    type: 'array',
    label: 'Emails',
    items: {
      type: 'object',
      properties: {
        address: {
          label: 'Email address',
        },
      },
    },
  },
} as const satisfies ObjectSchema

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
  emails: Yup.array()
    .of(
      Yup.object().shape({
        address: Yup.string().label('Email address'),
      }),
    )
    .label('Email addresses'),
})

const YupForm = createYupForm()

const zodSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .describe('First name'),
  lastName: z
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .describe('Last name'),
  role: z.enum(['admin', 'user']).default('user').describe('Role'),
  emails: z
    .object({
      address: z.string().describe('Email address'),
    })
    .array()
    .describe('Email addresses'),
})

const ZodForm = createZodForm()

export const Basic = () => (
  <Form
    defaultValues={{
      firstName: '',
      lastName: '',
      emails: [
        {
          address: '',
        },
      ],
      role: 'user',
    }}
    schema={basicSchema}
    onSubmit={onSubmit}
  />
)

export const CustomSubmit = () => (
  <Form
    defaultValues={{
      firstName: '',
      lastName: '',
      role: '',
      emails: [
        {
          address: '',
        },
      ],
    }}
    schema={basicSchema}
    onSubmit={onSubmit}
    fields={{
      role: {
        placeholder: 'Select a role',
      },
      submit: {
        children: 'Save',
        variant: 'subtle',
      },
    }}
  />
)

export const YupSchema = () => (
  <YupForm
    schema={schema}
    defaultValues={{
      firstName: '',
      lastName: '',
      emails: [
        {
          address: '',
        },
      ],
    }}
    onSubmit={onSubmit}
  />
)

export const ZodSchema = () => (
  <ZodForm
    schema={zodSchema}
    defaultValues={{
      firstName: '',
      lastName: '',
      emails: [
        {
          address: '',
        },
      ],
    }}
    onSubmit={onSubmit}
  />
)

export const ZodSchemaNested = () => (
  <ZodForm
    schema={z.object({
      title: z
        .string()
        .min(2, 'Too short')
        .max(25, 'Too long')
        .describe('Title'),
      author: z
        .object({
          name: z.string().describe('Name'),
          email: z.string().email().describe('Email'),
        })
        .describe('Author'),
    })}
    defaultValues={{
      title: '',
      author: {
        name: '',
        email: '',
      },
    }}
    fields={{
      author: {
        type: 'object',
        columns: 2,
      },
      'author.email': {
        type: 'email',
      },
    }}
    onSubmit={onSubmit}
  />
)

export const ZodSchemaArray = () => (
  <ZodForm
    schema={z.object({
      description: z
        .string()
        .min(2, 'Too short')
        .max(25, 'Too long')
        .describe('Description'),
      todos: z
        .array(
          z.object({
            todo: z.string().describe('Todo'),
          }),
        )
        .min(1, 'Add minimal 1 todo')
        .max(10, 'Maximum 10 todos')
        .describe('Todos'),
    })}
    defaultValues={{
      description: '',
      todos: [{ todo: '' }],
    }}
    fields={{
      'todos.$.todo': {
        type: 'textarea',
      },
      submit: {
        children: 'Save',
      },
    }}
    onSubmit={onSubmit}
  />
)

export const ZodSchemaMeta = () => (
  <ZodForm
    schema={z.object({
      description: z
        .string()
        .min(2, 'Too short')
        .describe(zodMeta({ label: 'Description', type: 'textarea' })),
    })}
    defaultValues={{
      description: '',
    }}
    onSubmit={onSubmit}
  />
)
