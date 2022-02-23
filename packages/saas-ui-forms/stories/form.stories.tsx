import { Container, Stack, HStack, Text } from '@chakra-ui/layout'
import * as React from 'react'

import * as Yup from 'yup'

import { UseFormReturn } from 'react-hook-form'

import {
  Form,
  AutoForm,
  FormLayout,
  Field,
  DisplayIf,
  SubmitButton,
} from '../src'

import { Button } from '@saas-ui/button'

import { onSubmit } from './helpers'

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

export const Basic = () => (
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
      </FormLayout>
    </Form>
  </>
)

export const Auto_Form = () => (
  <>
    <AutoForm
      defaultValues={{
        firstName: '',
        lastName: '',
      }}
      schema={schema}
      onSubmit={onSubmit}
    />
  </>
)

export const SubmitLabel = () => (
  <>
    <AutoForm
      defaultValues={{
        email: '',
        password: '',
      }}
      schema={loginSchema}
      submitLabel={'Log in'}
      onSubmit={onSubmit}
    />
  </>
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
      sub.unsubscribe()
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
        ref={ref}
      >
        <FormLayout>
          <Field name="title" label="Title" />
          <Field name="description" label="Description" />
        </FormLayout>
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
      <Form<PostInputs>
        defaultValues={{
          firstName: 'Eelco',
          lastName: 'Wiersma',
        }}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <Field<PostInputs> name="firstName" label="First name" />
          <Field<PostInputs> name="lastName" label="Last name" />
        </FormLayout>
      </Form>
    </Stack>
  )
}

type FormInputs = {
  firstName: string
  lastName: string
}

export const TypescriptWithRef = () => {
  const ref = React.useRef<UseFormReturn<FormInputs>>(null)

  return (
    <Form<FormInputs>
      ref={ref}
      defaultValues={{
        firstName: '',
        lastName: '',
      }}
      onSubmit={() => Promise.resolve()}
    >
      <FormLayout>
        <Field<FormInputs>
          name="firstName"
          label="First name"
          rules={{ required: 'Please enter your first name' }}
        />
        <Field<FormInputs> name="lastName" label="Last name" />
        <DisplayIf name="firstName" condition={(value) => !!value}>
          <Button onClick={() => ref.current?.reset()}>Reset</Button>
        </DisplayIf>

        <SubmitButton disableIfUntouched disableIfInvalid>
          Save
        </SubmitButton>
      </FormLayout>
    </Form>
  )
}
