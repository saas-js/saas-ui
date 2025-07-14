import * as React from 'react'

import {
  Box,
  Container,
  Field as FieldPrimitive,
  HStack,
} from '@chakra-ui/react'
import { splitProps } from '@saas-ui/core/utils'
import { Tooltip } from '@saas-ui/react'
import { StoryObj } from '@storybook/react'
import { LuInfo } from 'react-icons/lu'
import { z } from 'zod'

import {
  FieldsProvider,
  FormLayout,
  SubmitButton,
  createField,
  defaultFieldTypes,
  useBaseField,
  useForm,
} from '../src'
import { GetBaseField } from '../src/types'
import { onSubmit } from './helpers'

export default {
  title: 'Forms/useForm',
  decorators: [
    (Story: any) => (
      <FieldsProvider
        value={{
          fields: defaultFieldTypes,
        }}
      >
        <Container mt="40px">
          <Story />
        </Container>
      </FieldsProvider>
    ),
  ],
}

type Story = StoryObj<typeof useForm>

export const Basic: Story = {
  render() {
    const form = useForm({
      defaultValues: {
        title: 'Form',
        description: 'A basic layout',
      },
      onSubmit,
    })

    return (
      <form.Form>
        <FormLayout>
          <form.Field name="title" label="Title" />
          <form.Field type="text" name="description" label="Description" />

          <SubmitButton />
        </FormLayout>
      </form.Form>
    )
  },
}

export const WithValidationRules: Story = {
  render() {
    const form = useForm({
      defaultValues: {
        title: '',
        description: '',
      },
      onSubmit,
    })

    return (
      <form.Form>
        <FormLayout>
          <form.Field
            name="title"
            label="Title"
            rules={{ required: 'Title is required' }}
          />
          <form.Field
            name="description"
            label="Description"
            rules={{ required: 'Description is required' }}
          />

          <SubmitButton />
        </FormLayout>
      </form.Form>
    )
  },
}

export const ConditionalFields = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    onSubmit,
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field type="text" name="name" label="Name" />

        <form.DisplayIf name="name" condition={(value) => !!value}>
          <form.Field type="text" name="description" label="Description" />
        </form.DisplayIf>

        <SubmitButton />
      </FormLayout>
    </form.Form>
  )
}

const CustomField = createField<HTMLDivElement, { customFieldProp?: string }>(
  (props, ref) => <div ref={ref}>{props.customFieldProp}</div>,
)

const getBaseField: GetBaseField<{ infoLabel?: string }> = () => {
  return {
    props: ['infoLabel'],
    Component: (props) => {
      const [{ children, infoLabel }, fieldProps] = splitProps(props, [
        'children',
        'infoLabel',
      ])

      const { rootProps, label, help, hideLabel, error } =
        useBaseField(fieldProps)

      return (
        <FieldPrimitive.Root {...rootProps} invalid={!!error}>
          {!hideLabel ? (
            <HStack alignItems="center" mb="2" gap="0">
              <FieldPrimitive.Label mb="0">{label}</FieldPrimitive.Label>
              {infoLabel ? (
                <Tooltip content={infoLabel}>
                  <span>
                    <LuInfo />
                  </span>
                </Tooltip>
              ) : null}
            </HStack>
          ) : null}
          <Box>
            {children}
            {help && !error?.message ? (
              <FieldPrimitive.HelperText>{help}</FieldPrimitive.HelperText>
            ) : null}
            {error?.message && (
              <FieldPrimitive.ErrorText>
                {error?.message}
              </FieldPrimitive.ErrorText>
            )}
          </Box>
        </FieldPrimitive.Root>
      )
    },
  }
}

export const WithCustomField: StoryObj<typeof useForm> = {
  render(props) {
    const form = useForm({
      defaultValues: {
        firstName: '',
        age: '',
        custom: '',
      },
      onSubmit,
    })
    return (
      <FieldsProvider
        value={{
          fields: {
            ...defaultFieldTypes,
            custom: CustomField,
          },
          getBaseField,
        }}
      >
        <form.Form>
          <FormLayout>
            <form.Field name="firstName" label="Name" />
            <form.Field name="age" label="Age" type="number" />
            <form.Field
              name="custom"
              type="custom"
              label="Custom"
              customFieldProp="custom"
              infoLabel="Hello there"
            />
            <SubmitButton />
          </FormLayout>
        </form.Form>
      </FieldsProvider>
    )
  },
}

const zodSchema = z.object({
  firstName: z.string().min(2),
  age: z.number(),
})

export const WithStandardSchema: StoryObj<typeof useForm> = {
  render() {
    const form = useForm({
      schema: zodSchema,
      defaultValues: {
        firstName: '',
        age: 16,
      },
      onSubmit,
    })
    return (
      <form.Form>
        <FormLayout>
          <form.Field name="firstName" label="Name" />
          <form.Field name="age" label="Age" type="number" />

          <SubmitButton />
        </FormLayout>
      </form.Form>
    )
  },
}

export const WithZodSchema: StoryObj<typeof useForm> = {
  render() {
    const form = useZodForm({
      schema: zodSchema,
      defaultValues: {
        firstName: '',
        age: '',
      },
      onSubmit,
    })
    return (
      <form.Form>
        <FormLayout>
          <form.Field name="firstName" label="Name" />
          <form.Field name="age" label="Age" type="number" />

          <SubmitButton />
        </FormLayout>
      </form.Form>
    )
  },
}

const signupSchema = z
  .object({
    email: z.string().email().describe('Email address'),
    password: z.string().describe('Password').min(8),
    confirmPassword: z.string().describe('Confirm password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
      })
    }
  })

export const ZodSuperRefine: StoryObj<typeof useForm> = {
  render() {
    const form = useForm({
      schema: signupSchema,
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      onSubmit,
    })
    return (
      <form.Form>
        <FormLayout>
          <form.Field name="email" label="Email" />
          <form.Field name="password" label="Password" type="password" />
          <form.Field
            name="confirmPassword"
            type="password"
            label="Confirm password"
          />
          <SubmitButton>Sign up</SubmitButton>
        </FormLayout>
      </form.Form>
    )
  },
}

export const ZodFormConditional = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    schema: z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      description: z.string().min(1, { message: 'Description is required' }),
    }),
    onSubmit,
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field type="text" name="name" label="Name" />

        <form.DisplayIf name="name" condition={(value) => !!value}>
          <form.Field type="text" name="description" label="Description" />
        </form.DisplayIf>

        <SubmitButton />
      </FormLayout>
    </form.Form>
  )
}

export const FieldOnChange = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      slug: '',
    },
    schema: z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      slug: z.string().min(1, { message: 'Slug is required' }),
    }),
    onSubmit,
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field
          type="text"
          name="name"
          label="Name"
          onChange={(e) => {
            // this will override the field.onChange handler, so need to set 'name' as well.
            form.setValue('name', e.target.value)
            form.setValue(
              'slug',
              e.target.value.toLowerCase().replace(/ /g, '-'),
            )
          }}
        />

        <form.Field type="text" name="slug" label="Slug" />

        <SubmitButton />
      </FormLayout>
    </form.Form>
  )
}
