import { Container, Heading } from '@chakra-ui/react'
import * as React from 'react'

import { Form, FormLayout, Field, SubmitButton, DisplayIf } from '../src'

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

export const Basic = () => (
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

export const TwoColumns = () => (
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

export const Responsive = () => (
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

export const CustomSpacing = () => (
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

export const Compact = () => (
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

export const GroupedFields = () => {
  return (
    <Form onSubmit={() => Promise.resolve()}>
      <FormLayout>
        <Heading size="md">Personal information</Heading>
        <FormLayout columns={2}>
          <Field
            name="firstname"
            label="Name"
            rules={{ required: 'Please enter your first name' }}
          />
          <Field
            name="lastname"
            label="Last name"
            rules={{ required: 'Please enter your last name' }}
          />
        </FormLayout>

        <Field
          name="email"
          label="Email address"
          type="email"
          rules={{ required: '' }}
        />

        <Field
          name="business"
          type="checkbox"
          label="I'm ordering on behalf of a business"
        />

        <DisplayIf name="business" condition={(value) => !!value}>
          <FormLayout>
            <Heading size="md" mt="4">
              Business information
            </Heading>
            <Field
              name="businessName"
              label="Business name"
              rules={{ required: true }}
            />
            <Field name="vat" label="VAT number (optional)" />
          </FormLayout>
        </DisplayIf>

        <Heading size="md" mt="4">
          Address
        </Heading>

        <FormLayout>
          <Field name="address" label="Address" rules={{ required: true }} />
          <FormLayout columns={2}>
            <Field name="zipcode" label="Zipcode" rules={{ required: true }} />
            <Field name="city" label="City" rules={{ required: true }} />
          </FormLayout>
        </FormLayout>

        <Heading size="md" mt="4">
          Billing information
        </Heading>

        <FormLayout columns={2}>
          <Field
            name="card"
            label="Card number"
            rules={{ required: true }}
            placeholder="4242 4242 4242 4242"
          />
          <FormLayout columns={2}>
            <Field
              name="exp"
              label="Exp. date"
              placeholder="MM/YY"
              rules={{ required: true }}
            />
            <Field
              name="cvc"
              label="CVC"
              rules={{ required: true }}
              placeholder="123"
            />
          </FormLayout>
        </FormLayout>

        <SubmitButton mt="4">Complete order</SubmitButton>
      </FormLayout>
    </Form>
  )
}
