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
import * as z from 'zod'

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
import { yupResolver } from '@hookform/resolvers/yup'
import { zodResolver } from '@hookform/resolvers/zod'

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
    name: Yup.string()
      .min(2, 'Minimal 2 characters')
      .max(25, 'Maximum 25 characters')
      .required(),
    email: Yup.string().required().email(),
  }),
  password: Yup.object().shape({
    password: Yup.string().min(5, 'Minimal 5 characters').required(),
  }),
}

const zodSchemas = {
  project: z.object({
    name: z
      .string()
      .min(2, { message: 'Minimal 2 characters' })
      .max(25, 'Maximum 25 characters'),
    description: z.string(),
  }),
  members: z.object({
    members: z.string(),
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

export const WithYupSchema = () => (
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
          <FormStep name="profile" resolver={yupResolver(schemas.profile)}>
            <FormLayout>
              <Field name="name" label="Name" />
              <Field name="email" label="Email" />
            </FormLayout>
          </FormStep>
          <FormStep name="password" resolver={yupResolver(schemas.password)}>
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

export const WithZodSchema = () => (
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
          <FormStep name="project" resolver={zodResolver(zodSchemas.project)}>
            <FormLayout>
              <Field name="name" label="Name" />
              <Field name="description" label="Description" />
            </FormLayout>
          </FormStep>
          <FormStep name="members" resolver={zodResolver(zodSchemas.members)}>
            <FormLayout>
              <Field name="members" label="Members" type="textarea" />
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
