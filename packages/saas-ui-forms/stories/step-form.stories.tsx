import {
  Container,
  Text,
  Spacer,
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react'
import * as React from 'react'

import * as Yup from 'yup'

import { FormLayout, Field, FormValue } from '../src'

import {
  StepForm,
  FormStepper,
  FormStep,
  PrevButton,
  NextButton,
} from '../src/step-form'

import { ButtonGroup } from '@saas-ui/button'

import { PropertyList, Property } from '@saas-ui/property'

import { onSubmit } from './helpers'
import { StepperCompleted } from '@saas-ui/stepper'

export default {
  title: 'Components/Forms/StepForm',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const schemas = {
  profile: Yup.object().shape({
    name: Yup.string().min(2, 'Too short').max(25, 'Too long').required(),
    email: Yup.string().required().email(),
  }),

  password: Yup.object().shape({
    password: Yup.string().min(5, 'Too short').required(),
  }),
}

export const Basic = () => (
  <>
    <StepForm
      defaultValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <FormStep name="profile">
          <FormLayout>
            <Field name="name" label="Name" rules={{ required: true }} />
            <Field name="email" label="Email" rules={{ required: true }} />
            <NextButton />
          </FormLayout>
        </FormStep>
        <FormStep name="password">
          <FormLayout>
            <Field
              name="password"
              label="Password"
              rules={{ required: true, minLength: 4 }}
            />
            <NextButton />
          </FormLayout>
        </FormStep>
      </FormLayout>
    </StepForm>
  </>
)

export const WithSchema = () => (
  <>
    <StepForm
      defaultValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      {({ isCompleted }) => (
        <FormLayout>
          <FormStep name="profile" schema={schemas.profile}>
            <FormLayout>
              <Field name="name" label="Name" />
              <Field name="email" label="Email" />
            </FormLayout>
          </FormStep>
          <FormStep name="password" schema={schemas.password}>
            <FormLayout>
              <Field name="password" label="Password" />
            </FormLayout>
          </FormStep>
          {isCompleted ? (
            <Text>Completed</Text>
          ) : (
            <ButtonGroup>
              <PrevButton />
              <NextButton />
            </ButtonGroup>
          )}
        </FormLayout>
      )}
    </StepForm>
  </>
)

const StepperNav = () => (
  <ButtonGroup w="full">
    <PrevButton variant="ghost" />
    <Spacer />
    <NextButton submitLabel="Confirm" />
  </ButtonGroup>
)

export const WithStepper = () => {
  return (
    <>
      <StepForm
        defaultValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <FormStepper>
            <FormStep name="profile" title="Profile">
              <FormLayout>
                <Field name="name" label="Name" />
                <Field name="email" label="Email" autoComplete="off" />
                <StepperNav />
              </FormLayout>
            </FormStep>

            <FormStep name="password" title="Password">
              <FormLayout>
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  autoFocus
                  autoComplete="off"
                />
              </FormLayout>
              <StepperNav />
            </FormStep>

            <FormStep name="confirmation" title="Confirmation">
              <FormLayout>
                <Text>Please confirm that your information is correct.</Text>
                <PropertyList>
                  <Property label="Name" value={<FormValue name="name" />} />
                  <Property label="Email" value={<FormValue name="email" />} />
                </PropertyList>
                <StepperNav />
              </FormLayout>
            </FormStep>

            <StepperCompleted>
              <Alert status="success">
                <AlertIcon />
                <Box>
                  <AlertTitle>Thanks for signing up</AlertTitle>
                  <AlertDescription width="full">
                    Check your inbox to confirm your email address.
                  </AlertDescription>
                </Box>
              </Alert>
            </StepperCompleted>
          </FormStepper>
        </FormLayout>
      </StepForm>
    </>
  )
}
