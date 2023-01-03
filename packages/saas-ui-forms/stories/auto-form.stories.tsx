import { Container } from '@chakra-ui/react'
import * as React from 'react'

import * as Yup from 'yup'

import { yupForm } from '../yup/src'

import * as z from 'zod'
import { zodForm, zodMeta } from '../zod/src'

import { AutoForm, SubmitButton } from '../src'

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
  emails: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        address: {
          label: 'Email address',
        },
      },
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
  emails: Yup.array()
    .of(
      Yup.object().shape({
        address: Yup.string().label('Email address'),
      })
    )
    .label('Email addresses'),
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
  emails: z
    .object({
      address: z.string().describe('Email address'),
    })
    .array()
    .describe('Email addresses'),
})

export const Basic = () => (
  <>
    <AutoForm
      defaultValues={{
        firstName: '',
        lastName: '',
        emails: [
          {
            address: '',
          },
        ],
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
        emails: [
          {
            address: '',
          },
        ],
      }}
      schema={basicSchema}
      submitLabel={'Save'}
      onSubmit={onSubmit}
    />
  </>
)

export const CustomSubmit = () => (
  <>
    <AutoForm
      defaultValues={{
        firstName: '',
        lastName: '',
        emails: [
          {
            address: '',
          },
        ],
      }}
      schema={basicSchema}
      submitLabel={null}
      onSubmit={onSubmit}
    >
      <SubmitButton colorScheme="secondary">Save</SubmitButton>
    </AutoForm>
  </>
)

export const YupSchema = () => (
  <>
    <AutoForm
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
        emails: [
          {
            address: '',
          },
        ],
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
