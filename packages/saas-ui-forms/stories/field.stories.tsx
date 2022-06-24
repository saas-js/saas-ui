import {
  Container,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from '@chakra-ui/react'
import * as React from 'react'
import * as Yup from 'yup'

import {
  Form,
  FormLayout,
  Field,
  SubmitButton,
  InputField,
  RadioField,
} from '../src'

import { yupResolver } from '@hookform/resolvers/yup'

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

import { onSubmit } from './helpers'
import { CheckIcon, PhoneIcon } from '@chakra-ui/icons'

export const Basic = () => (
  <Form
    defaultValues={{
      text: 'Text field',
      number: 10,
      textarea: 'Lorem ipsum',
      switch: true,
      select: 'Select 2',
      multipleselect: ['Select 1', 'Select 2'],
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
        name="multipleselect"
        label="Multiple Select"
        type="select"
        options={[{ value: 'Select 1' }, { value: 'Select 2' }]}
        multiple={true}
      />
      <Field
        name="native-select"
        label="Native Select"
        type="native-select"
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

type FormInputs = {
  text: string
  pattern: string
}

export const Rules = () => {
  return (
    <Form<FormInputs>
      defaultValues={{
        text: '',
        pattern: '',
      }}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field
          name="text"
          label="Text"
          rules={{ required: 'Text is required' }}
        />
        <Field
          name="pattern"
          label="Pattern"
          rules={{
            pattern: {
              value: /@/,
              message: 'Should include a @',
            },
          }}
        />
        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const NoLabel = () => {
  return (
    <Form
      defaultValues={{
        text: '',
      }}
      onSubmit={onSubmit}
      onError={(err) => console.error(err)}
    >
      <FormLayout>
        <Field name="text" placeholder="Placeholder" />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const HelpText = () => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      resolver={yupResolver(helpSchema)}
      onSubmit={onSubmit}
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

export const WithId = () => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      resolver={yupResolver(helpSchema)}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field id="email" name="email" label="Email" />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const WithAddons = () => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      resolver={yupResolver(helpSchema)}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field
          name="url"
          label="Url"
          leftAddon={<InputLeftAddon>https://</InputLeftAddon>}
        />

        <Field
          name="email"
          label="Email"
          rightAddon={<InputRightAddon>@saas-ui.dev</InputRightAddon>}
        />

        <Field
          name="phone"
          leftAddon={
            <InputLeftElement>
              <PhoneIcon />
            </InputLeftElement>
          }
          rightAddon={
            <InputRightElement>
              <CheckIcon />
            </InputRightElement>
          }
        />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}
