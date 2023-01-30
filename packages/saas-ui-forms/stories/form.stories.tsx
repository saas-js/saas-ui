import { Container, Stack, HStack, Text } from '@chakra-ui/layout'
import * as React from 'react'

import * as Yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormReturn } from 'react-hook-form'

import {
  Form,
  FormLayout,
  Field,
  DisplayIf,
  SubmitButton,
  FormProps,
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
  title: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Title'),
  description: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Description'),
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

        <SubmitButton />
      </FormLayout>
    </Form>
  </>
)

export const WithValidationRules = (props: FormProps) => (
  <>
    <Form
      defaultValues={{
        title: '',
        description: '',
      }}
      {...props}
      onSubmit={onSubmit}
    >
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
    </Form>
  </>
)

export const WithYupSchema = () => (
  <>
    <Form
      defaultValues={{
        title: '',
        description: '',
      }}
      onSubmit={onSubmit}
      resolver={yupResolver(schema)}
    >
      <FormLayout>
        <Field name="title" label="Title" />
        <Field name="description" label="Description" />

        <SubmitButton />
      </FormLayout>
    </Form>
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
        <FormLayout>
          <Field<PostInputs> name="firstName" label="First name" />
          <Field<PostInputs> name="lastName" label="Last name" />
        </FormLayout>
      </Form>
    </Stack>
  )
}

export const WithRenderProp = () => {
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
        {(form) => {
          console.log(form)
          return (
            <FormLayout>
              <Field<PostInputs> name="firstName" label="First name" />
              <Field<PostInputs> name="lastName" label="Last name" />
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
