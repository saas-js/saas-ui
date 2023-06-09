import {
  Container,
  Stack,
  Button,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/react'
import * as React from 'react'

import * as yup from 'yup'
import { z } from 'zod'

import { createYupForm } from '../yup/src'
import { createZodForm } from '../zod/src'
import { JTDDataType, createAjvForm } from '../ajv/src'

import {
  Form,
  FormLayout,
  Field,
  DisplayIf,
  SubmitButton,
  FormProps,
  createForm,
  UseFormReturn,
  createField,
} from '../src'

import { onSubmit } from './helpers'
import { JSONSchemaType } from 'ajv'

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

const loginSchema = yup.object({
  email: yup.string().email().required().label('Email address'),
  password: yup
    .string()
    .required()
    .label('Password')
    .meta({ type: 'password' }),
})

export const Basic = {
  render(args: FormProps) {
    return (
      <Form
        defaultValues={{
          title: 'Form',
          description: 'A basic layout',
        }}
        {...args}
        onSubmit={args?.onSubmit || onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="title" label="Title" />
            <Field name="description" label="Description" />

            <SubmitButton />
          </FormLayout>
        )}
      </Form>
    )
  },
}

export const WithValidationRules = {
  render(props: FormProps) {
    return (
      <Form
        defaultValues={{
          title: '',
          description: '',
        }}
        {...props}
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

const CustomField = createField((props: { customFieldProps: string }) => (
  <div>custom</div>
))

const TypedForm = createForm({
  fields: { custom: CustomField },
})

export const BasicTyped = () => (
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

const ZodForm = createZodForm({
  fields: { custom: CustomField },
})

const zodSchema = z.object({
  firstName: z.string(),
  age: z.number(),
})

export const WithZodSchema = {
  render(props: React.ComponentProps<typeof ZodForm>) {
    return (
      <ZodForm
        schema={zodSchema}
        defaultValues={{
          firstName: '',
        }}
        {...props}
        onSubmit={props?.onSubmit || onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="firstName" label="Name" />
            <Field name="age" label="Age" type="number" />
            <SubmitButton />
          </FormLayout>
        )}
      </ZodForm>
    )
  },
}

const YupForm = createYupForm()

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
})

export const WithYupSchema = {
  render(props: React.ComponentProps<typeof YupForm>) {
    return (
      <YupForm
        schema={yupSchema}
        defaultValues={{
          name: '',
          description: '',
        }}
        {...props}
        onSubmit={props?.onSubmit || onSubmit}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="name" label="Title" />
            <Field name="description" label="Description" />

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
  const ref = React.useRef<UseFormReturn>(null)

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
