import { Container } from '@chakra-ui/react'
import * as React from 'react'
import * as Yup from 'yup'

import { Form, FormLayout, Field, SubmitButton } from '../src'

export default {
  title: 'Components/Forms/Field',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const helpSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
})

import { handleSubmit } from './helpers'

export const basic = () => (
  <Form
    defaultValues={{
      text: 'Text field',
      number: 10,
      textarea: 'Lorem ipsum',
      switch: true,
      select: 'Select 2',
      nativeselect: 'Select 1',
      password: 'Password123',
      checkbox: true,
      radio: 'Radio 1',
      pin: '',
    }}
    onSubmit={(values) => {
      console.log(values)
    }}
  >
    <FormLayout>
      <Field name="text" label="Text" />
      <Field name="number" label="Number" type="number" />
      <Field name="textarea" label="Textarea" type="textarea" />
      <Field name="switch" label="Switch" type="switch" />
      <Field
        name="select"
        label="Select"
        type="select"
        options={[{ value: 'Select 1' }, { value: 'Select 2' }]}
      />
      <Field
        name="native-select"
        label="Native Select"
        type="nativeselect"
        options={[{ value: 'Select 1' }, { value: 'Select 2' }]}
      />
      <Field name="password" label="Password" type="password" />
      <Field name="checkbox" label="Checkbox" type="checkbox" />
      <Field
        name="radio"
        label="Radio"
        type="radio"
        options={[{ value: 'Radio 1' }, { value: 'Radio 2' }]}
      />
      <Field name="pin" label="Pin" type="pin" />

      <SubmitButton>Submit</SubmitButton>
    </FormLayout>
  </Form>
)

export const noLabel = () => {
  return (
    <Form
      defaultValues={{
        text: '',
      }}
      onSubmit={handleSubmit}
    >
      <FormLayout>
        <Field name="text" placeholder="Placeholder" />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const helpText = () => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      schema={helpSchema}
      onSubmit={handleSubmit}
    >
      <FormLayout>
        <Field
          name="email"
          label="Email"
          help="We'll never share your email."
        />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}
