import { Container } from '@chakra-ui/layout'
import * as React from 'react'

import * as Yup from 'yup'

import { yupForm } from '@saas-ui/forms/yup'

import * as z from 'zod'
import { zodForm, zodMeta } from '@saas-ui/forms/zod'

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

export const ZodSchema = () => (
  <>
    <AutoForm
      defaultValues={{
        firstName: '',
        lastName: '',
      }}
      onSubmit={onSubmit}
      {...zodForm(zodSchema)}
    />
  </>
)

export const ZodSchemaNested = () => (
  <>
    <AutoForm
      defaultValues={{
        title: '',
        author: {
          name: '',
          email: '',
        },
      }}
      onSubmit={onSubmit}
      {...zodForm(
        z.object({
          title: z
            .string()
            .min(2, 'Too short')
            .max(25, 'Too long')
            .describe('Title'),
          author: z
            .object({
              name: z.string().describe('Name'),
              email: z.string().describe('Email'),
            })
            .describe('Author'),
        })
      )}
    />
  </>
)

export const ZodSchemaArray = () => (
  <>
    <AutoForm
      defaultValues={{
        description: '',
        todos: [{ todo: '' }],
      }}
      onSubmit={onSubmit}
      {...zodForm(
        z.object({
          description: z
            .string()
            .min(2, 'Too short')
            .max(25, 'Too long')
            .describe('Description'),
          todos: z
            .array(
              z.object({
                todo: z.string().describe('Todo'),
              })
            )
            .min(1, 'Add minimal 1 todo')
            .max(10, 'Maximum 10 todos')
            .describe('Todos'),
        })
      )}
    />
  </>
)

export const ZodSchemaMeta = () => (
  <>
    <AutoForm
      defaultValues={{
        description: '',
      }}
      onSubmit={onSubmit}
      {...zodForm(
        z.object({
          description: z
            .string()
            .min(2, 'Too short')
            .describe(zodMeta({ label: 'Description', type: 'textarea' })),
        })
      )}
    />
  </>
)
