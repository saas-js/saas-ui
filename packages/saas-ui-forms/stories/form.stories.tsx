import { StoryObj } from '@storybook/react'
import {
  Container,
  Stack,
  Button,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Tooltip,
  forwardRef,
  Box,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import * as React from 'react'

import * as yup from 'yup'
import { z } from 'zod'

import { LuInfo } from 'react-icons/lu'
import { splitProps } from '@saas-ui/core/utils'

import { createYupForm } from '../yup/src'
import { createZodForm, zodMeta } from '../zod/src'
import { JTDDataType, createAjvForm } from '../ajv/src'

import {
  Form,
  FormLayout,
  Field,
  DisplayIf,
  SubmitButton,
  createForm,
  UseFormReturn,
  createField,
  useBaseField,
} from '../src'

import { onSubmit } from './helpers'

import { GetBaseField } from '../src/types'

export default {
  title: 'Components/Forms/Form',
  component: Form,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

type Story = StoryObj<typeof Form>

const loginSchema = z.object({
  email: z.string().email().describe('Email address'),
  password: z.string().describe(
    zodMeta({
      label: 'Password',
      type: 'password',
    })
  ),
})

const signupSchema = z
  .object({
    email: z.string().email().describe('Email address'),
    password: z.string().describe('Password').min(8),
    confirmPassword: z.string().describe('Confirm password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
      })
    }
  })

export const Basic: Story = {
  render() {
    return (
      <Form
        defaultValues={{
          title: 'Form',
          description: 'A basic layout',
        }}
        onSubmit={onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="title" label="Title" />
            <Field
              type="text"
              name="description"
              label="Description"
              onChange={(e) => console.log(e)}
            />

            <SubmitButton />
          </FormLayout>
        )}
      </Form>
    )
  },
}

export const WithValidationRules: Story = {
  render() {
    return (
      <Form
        defaultValues={{
          title: '',
          description: '',
        }}
        onSubmit={onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field
              name="title"
              label="Title"
              rules={{ required: 'Title is required' }}
            />
            <Field
              name="description"
              label="Description"
              rules={{ required: 'Description is required' }}
            />

            <SubmitButton />
          </FormLayout>
        )}
      </Form>
    )
  },
}

const CustomField = createField<{ customFieldProp?: string }>(
  forwardRef((props, ref) => <div ref={ref}>{props.customFieldProp}</div>)
)

const getBaseField: GetBaseField<{ infoLabel?: string }> = () => {
  return {
    extraProps: ['infoLabel'],
    BaseField: (props) => {
      const [{ children, infoLabel }, fieldProps] = splitProps(props, [
        'children',
        'infoLabel',
      ])

      const { controlProps, label, help, hideLabel, error } =
        useBaseField(fieldProps)

      return (
        <FormControl {...controlProps} isInvalid={!!error}>
          {!hideLabel ? (
            <HStack alignItems="center" mb="2" spacing="0">
              <FormLabel mb="0">{label}</FormLabel>
              {infoLabel ? (
                <Tooltip label={infoLabel}>
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
              <FormHelperText>{help}</FormHelperText>
            ) : null}
            {error?.message && (
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            )}
          </Box>
        </FormControl>
      )
    },
  }
}

const TypedForm = createForm({
  fields: { custom: CustomField },
  getBaseField,
})

export const BasicTyped: Story = {
  render() {
    return (
      <TypedForm
        defaultValues={{
          title: 'Form',
          description: 'A basic layout',
        }}
        onSubmit={onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="title" label="Title" type="text" />
            <Field name="description" label="Description" type="textarea" />

            <SubmitButton />
          </FormLayout>
        )}
      </TypedForm>
    )
  },
}

export const CustomBaseField: Story = {
  render() {
    return (
      <TypedForm
        defaultValues={{
          title: 'Form',
          description: 'A basic layout',
          custom: '',
        }}
        onSubmit={onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="title" label="Title" type="text" />
            <Field name="description" label="Description" type="textarea" />
            <Field
              name="custom"
              type="custom"
              label="Custom"
              customFieldProp="custom"
              infoLabel="Hello there"
            />
            <SubmitButton />
          </FormLayout>
        )}
      </TypedForm>
    )
  },
}

const ZodForm = createZodForm({
  fields: { custom: CustomField },
  getBaseField,
})

const zodSchema = z.object({
  firstName: z.string().min(2),
  age: z.number(),
  custom: z.string().optional(),
})

export const WithZodSchema: StoryObj<typeof ZodForm> = {
  render(props) {
    return (
      <ZodForm
        schema={zodSchema}
        defaultValues={{
          firstName: '',
        }}
        onSubmit={props?.onSubmit || onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="firstName" label="Name" />
            <Field name="age" label="Age" type="number" />
            <Field
              name="custom"
              type="custom"
              label="Custom"
              customFieldProp="custom"
              infoLabel="Hello there"
            />
            <SubmitButton />
          </FormLayout>
        )}
      </ZodForm>
    )
  },
}

export const ZodSuperRefine: StoryObj<typeof ZodForm> = {
  render(props) {
    return (
      <ZodForm
        schema={signupSchema}
        defaultValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={props?.onSubmit || onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="email" label="Email" />
            <Field name="password" label="Password" type="password" />
            <Field
              name="confirmPassword"
              type="password"
              label="Confirm password"
            />
            <SubmitButton>Sign up</SubmitButton>
          </FormLayout>
        )}
      </ZodForm>
    )
  },
}

const YupForm = createYupForm({
  fields: { custom: CustomField },
  getBaseField,
})

const yupSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Title'),
  description: yup
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Description'),
  custom: yup.string(),
})

export const WithYupSchema: StoryObj<typeof YupForm> = {
  render(props) {
    return (
      <YupForm
        schema={yupSchema}
        defaultValues={{
          name: '',
          description: '',
        }}
        onSubmit={props.onSubmit || onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="name" label="Title" />
            <Field name="description" label="Description" />
            <Field
              name="custom"
              type="custom"
              label="Custom"
              customFieldProp="custom"
              infoLabel="Hello there"
            />
            <SubmitButton />
          </FormLayout>
        )}
      </YupForm>
    )
  },
}

const AjvForm = createAjvForm()

type JSONData = {
  firstName: string
  age: number
}

const ajvSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    age: {
      type: 'integer',
    },
  },
  required: ['firstName', 'age'],
  additionalProperties: false,
} as const

type DataSchema = JTDDataType<typeof ajvSchema>

export const WithAjvForm = () => (
  <AjvForm
    schema={ajvSchema}
    defaultValues={{
      firstName: '',
    }}
    onSubmit={onSubmit}
  >
    {({ Field }) => (
      <FormLayout>
        <Field name="firstName" label="Name" />
        <Field name="age" label="Age" />
      </FormLayout>
    )}
  </AjvForm>
)

export const FormState = () => {
  const ref = React.useRef<UseFormReturn | null>(null)

  React.useEffect(() => {
    // Access the form state
    console.log(ref.current?.formState)

    // Watch
    const sub = ref.current?.watch((value, { name, type }) => {
      console.log(value, name, type)
    })

    // Submit the form
    // ref.current?.handleSubmit(onSubmit)()

    return () => {
      sub?.unsubscribe()
    }
  }, [ref.current])

  return (
    <Stack>
      <Form
        defaultValues={{
          title: 'Form',
          description: 'A basic layout',
        }}
        onSubmit={onSubmit}
        formRef={ref}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="title" label="Title" />
            <Field name="description" label="Description" />

            <SubmitButton />
          </FormLayout>
        )}
      </Form>
    </Stack>
  )
}

type PostInputs = {
  firstName: string
  lastName: string
}

export const WithTypescript = () => {
  return (
    <Stack>
      <Form
        defaultValues={{
          firstName: 'Eelco',
          lastName: 'Wiersma',
        }}
        onSubmit={onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="firstName" label="First name" />
            <Field name="lastName" label="Last name" />
          </FormLayout>
        )}
      </Form>
    </Stack>
  )
}

type FormInputs = {
  firstName: string
  lastName: string
}

export const TypescriptWithRef = () => {
  const ref = React.useRef<UseFormReturn<FormInputs, object>>(null)

  return (
    <Form
      formRef={ref}
      defaultValues={{
        firstName: '',
        lastName: '',
      }}
      onSubmit={() => Promise.resolve()}
    >
      {({ Field }) => (
        <FormLayout>
          <Field
            name="firstName"
            label="First name"
            rules={{ required: 'Please enter your first name' }}
          />
          <Field name="lastName" label="Last name" />
          <DisplayIf name="firstName" condition={(value) => !!value}>
            <Button onClick={() => ref.current?.reset()}>Reset</Button>
          </DisplayIf>

          <SubmitButton disableIfUntouched disableIfInvalid>
            Save
          </SubmitButton>
        </FormLayout>
      )}
    </Form>
  )
}

export const WithOnChange = () => {
  return (
    <Stack>
      <Form<PostInputs>
        defaultValues={{
          firstName: 'Eelco',
          lastName: 'Wiersma',
        }}
        onSubmit={onSubmit}
        onChange={(e) => console.log('change', e)}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="firstName" label="First name" />
            <Field name="lastName" label="Last name" />
          </FormLayout>
        )}
      </Form>
    </Stack>
  )
}

export const WithRegister = () => {
  return (
    <Stack>
      <Form<PostInputs>
        defaultValues={{
          firstName: 'Eelco',
          lastName: 'Wiersma',
        }}
        onSubmit={onSubmit}
        onChange={(e) => console.log('change', e)}
      >
        {({ Field, register }) => {
          return (
            <FormLayout>
              <Field name="firstName" label="First name" />
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input {...register('lastName')} />
              </FormControl>
            </FormLayout>
          )
        }}
      </Form>
    </Stack>
  )
}

export const WithCustomSubmit = () => (
  <>
    <Form
      defaultValues={{
        title: 'Form',
        description: 'A basic layout',
      }}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field name="title" label="Title" />
        <Field name="description" label="Description" />

        <SubmitButton variant="solid" colorScheme="cyan" />
      </FormLayout>
    </Form>
  </>
)

const discriminateUnionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('a'),
    a: z.string(),
  }),
  z.object({
    type: z.literal('b'),
    b: z.string(),
  }),
])

export const DiscriminateUnion = () => {
  return (
    <Form
      schema={discriminateUnionSchema}
      defaultValues={{ type: 'b', b: 'Hello' }}
      onSubmit={onSubmit}
    >
      {({ Field }) => (
        <FormLayout>
          <Field name="type" label="Type" />
          {/* @ts-expect-error */}
          <Field name="a" label="A" />
          <Field name="b" label="B" />
        </FormLayout>
      )}
    </Form>
  )
}
