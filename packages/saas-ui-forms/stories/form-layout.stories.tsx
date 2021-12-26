import { Container } from '@chakra-ui/layout'
import * as React from 'react'

import { Form, FormLayout, Field, SubmitButton } from '../src'

export default {
  title: 'Components/Forms/FormLayout',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const basic = () => (
  <>
    <Form
      defaultValues={{
        title: 'Form layout',
        description: 'A basic form layout',
      }}
      onSubmit={() => Promise.resolve()}
    >
      <FormLayout>
        <Field name="title" label="Title" />
        <Field name="description" label="Description" />
      </FormLayout>
    </Form>
  </>
)

export const twoColumns = () => (
  <>
    <Form
      defaultValues={{
        firstName: null,
        lastName: null,
      }}
      onSubmit={() => Promise.resolve()}
    >
      <FormLayout columns={2}>
        <Field name="firstName" label="First name" />
        <Field name="lastName" label="Last name" />
      </FormLayout>
    </Form>
  </>
)

export const responsive = () => (
  <>
    <Form
      defaultValues={{
        firstName: null,
        lastName: null,
      }}
      onSubmit={() => Promise.resolve()}
    >
      <FormLayout>
        <FormLayout columns={[1, null, 2]}>
          <Field name="firstName" label="First name" />
          <Field name="lastName" label="Last name" />
        </FormLayout>

        <Field name="email" label="Email" />

        <SubmitButton>Save</SubmitButton>
      </FormLayout>
    </Form>
  </>
)

export const customSpacing = () => (
  <>
    <Form
      defaultValues={{
        firstName: null,
        lastName: null,
      }}
      onSubmit={() => Promise.resolve()}
    >
      <FormLayout spacing={10}>
        <FormLayout columns={[1, null, 2]}>
          <Field name="firstName" label="First name" />
          <Field name="lastName" label="Last name" />
        </FormLayout>

        <Field name="email" label="Email" />

        <SubmitButton>Save</SubmitButton>
      </FormLayout>
    </Form>
  </>
)

const genderOptions = [
  {
    value: 'm',
    label: 'Male',
  },
  {
    value: 'f',
    label: 'Female',
  },
  {
    value: 'o',
    label: 'Other',
  },
]

export const condensed = () => (
  <>
    <Form
      defaultValues={{
        prefix: null,
        initials: null,
        lastName: null,
        gender: null,
      }}
      onSubmit={() => Promise.resolve()}
    >
      <FormLayout>
        <FormLayout columns={[2, null, 4]}>
          <Field name="prefix" label="Prefix" />
          <Field name="initials" label="Initials" />
          <Field name="lastName" label="Last name" />
          <Field
            name="gender"
            label="Gender"
            type="select"
            options={genderOptions}
          />
        </FormLayout>

        <SubmitButton>Save</SubmitButton>
      </FormLayout>
    </Form>
  </>
)
