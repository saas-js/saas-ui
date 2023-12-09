import {
  Container,
  Text,
  Spacer,
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  forwardRef,
  Checkbox,
} from '@chakra-ui/react'
import * as React from 'react'

import * as Yup from 'yup'
import * as z from 'zod'

import {
  Field,
  FormLayout,
  FormValue,
  useStepFormContext,
  FormStepSubmitHandler,
  FormStepProps,
  FormState,
  useFormContext,
  UseFormReturn,
  useWatch,
  createField,
} from '../src'

import { FormStepper, FormStep, PrevButton, NextButton } from '../src/step-form'

import { StepForm, createStepForm } from '../src'

import { ButtonGroup } from '@chakra-ui/react'

import { PropertyList, Property } from '@saas-ui/core'

import { onSubmit } from './helpers'
import { StepsCompleted } from '@saas-ui/core'
import { StepForm as YupStepForm } from '../yup/src'
import { StepForm as ZodStepForm, createZodStepForm } from '../zod/src'

export default {
  title: 'Components/Forms/StepForm',
  component: StepForm,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const CustomField = createField(
  forwardRef((props: { customFieldProps: string }, ref) => (
    <div ref={ref}>custom</div>
  ))
)

const CustomStepForm = createStepForm({
  fields: {
    custom: CustomField,
  },
})

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

export const Basic = {
  render(args) {
    return (
      <StepForm
        defaultValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={args.onSubmit || onSubmit}
      >
        {({ Field, FormStep }) => (
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
                  type="password"
                  rules={{ required: true, minLength: 4 }}
                />
                <NextButton />
              </FormLayout>
            </FormStep>
          </FormLayout>
        )}
      </StepForm>
    )
  },
}

export const Vertical = () => (
  <>
    <StepForm
      defaultValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      {({ Field, FormStep }) => (
        <FormStepper orientation="vertical">
          <FormStep name="profile" title="Profile">
            <FormLayout>
              <Field name="name" label="Name" rules={{ required: true }} />
              <Field name="email" label="Email" rules={{ required: true }} />
              <NextButton />
            </FormLayout>
          </FormStep>
          <FormStep name="password" title="Password">
            <FormLayout>
              <Field
                name="password"
                label="Password"
                type="password"
                rules={{ required: true, minLength: 4 }}
              />
              <NextButton />
            </FormLayout>
          </FormStep>
        </FormStepper>
      )}
    </StepForm>
  </>
)

export const CustomFields = () => (
  <>
    <CustomStepForm
      defaultValues={{
        name: '',
        email: '',
        custom: '',
      }}
      onSubmit={onSubmit}
    >
      {({ Field, FormStep }) => (
        <FormStepper orientation="vertical">
          <FormStep name="profile" title="Profile">
            <FormLayout>
              <Field name="name" label="Name" rules={{ required: true }} />
              <Field name="email" label="Email" rules={{ required: true }} />
              <NextButton />
            </FormLayout>
          </FormStep>
          <FormStep name="password" title="Password">
            <FormLayout>
              <Field
                name="custom"
                label="Password"
                type="custom"
                customFieldProps="test"
              />
              <NextButton />
            </FormLayout>
          </FormStep>
        </FormStepper>
      )}
    </CustomStepForm>
  </>
)

export const WithYupSchema = () => (
  <>
    <YupStepForm
      steps={[
        {
          name: 'profile',
          schema: schemas.profile,
        } as const,
        {
          name: 'password',
          schema: schemas.password,
        } as const,
      ]}
      defaultValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      {({ Field, FormStep, isCompleted }) => (
        <FormLayout>
          <FormStepper orientation="vertical">
            <FormStep name="profile" title="Profile">
              <FormLayout>
                <Field name="name" label="Name" />
                <Field name="email" label="Email" />
              </FormLayout>
            </FormStep>
            <FormStep name="password" title="Password">
              <FormLayout>
                <Field name="password" label="Password" isRequired />
              </FormLayout>
            </FormStep>
          </FormStepper>
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
    </YupStepForm>
  </>
)

export const WithZodSchema = () => (
  <>
    <ZodStepForm
      steps={[
        {
          name: 'project',
          schema: zodSchemas.project,
        } as const,
        {
          name: 'members',
          schema: zodSchemas.members,
        } as const,
      ]}
      defaultValues={{
        name: '',
        description: '',
        members: '',
      }}
      onSubmit={onSubmit}
    >
      {({ Field, FormStep, isCompleted }) => (
        <FormLayout>
          <FormStep name="project">
            <FormLayout>
              <Field name="name" label="Name" />
              <Field name="description" label="Description" />
            </FormLayout>
          </FormStep>
          <FormStep name="members">
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
    </ZodStepForm>
  </>
)

const StepperNav = () => {
  const { isFirstStep } = useStepFormContext()

  return (
    <ButtonGroup w="full">
      {!isFirstStep && <PrevButton variant="ghost" />}
      <Spacer />
      <NextButton submitLabel="Confirm" />
    </ButtonGroup>
  )
}

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
        {({ Field }) => (
          <FormLayout>
            <FormStepper>
              <FormStep name="profile" title="Profile">
                <FormLayout>
                  <Field name="name" label="Name" rules={{ required: true }} />
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
                  <StepperNav />
                </FormLayout>
              </FormStep>

              <FormStep name="confirmation" title="Confirmation">
                <FormLayout>
                  <Text>Please confirm that your information is correct.</Text>
                  <PropertyList>
                    <Property label="Name" value={<FormValue name="name" />} />
                    <Property
                      label="Email"
                      value={<FormValue name="email" />}
                    />
                  </PropertyList>
                  <StepperNav />
                </FormLayout>
              </FormStep>

              <StepsCompleted>
                <Alert status="success">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Thanks for signing up</AlertTitle>
                    <AlertDescription width="full">
                      Check your inbox to confirm your email address.
                    </AlertDescription>
                  </Box>
                </Alert>
              </StepsCompleted>
            </FormStepper>
          </FormLayout>
        )}
      </StepForm>
    </>
  )
}

export const WithStepperVariant = () => {
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
        {({ Field }) => (
          <FormLayout>
            <FormStepper variant="solid" colorScheme="cyan">
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
                  <StepperNav />
                </FormLayout>
              </FormStep>

              <FormStep name="confirmation" title="Confirmation">
                <FormLayout>
                  <Text>Please confirm that your information is correct.</Text>
                  <PropertyList>
                    <Property label="Name" value={<FormValue name="name" />} />
                    <Property
                      label="Email"
                      value={<FormValue name="email" />}
                    />
                  </PropertyList>
                  <StepperNav />
                </FormLayout>
              </FormStep>

              <StepsCompleted>
                <Alert status="success">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Thanks for signing up</AlertTitle>
                    <AlertDescription width="full">
                      Check your inbox to confirm your email address.
                    </AlertDescription>
                  </Box>
                </Alert>
              </StepsCompleted>
            </FormStepper>
          </FormLayout>
        )}
      </StepForm>
    </>
  )
}

export const WithState = () => {
  const formRef = React.useRef<UseFormReturn>(null)

  const steps = React.useMemo<(FormStepProps & { step: () => JSX.Element })[]>(
    () => [
      {
        name: 'profile',
        title: 'Profile',
        onSubmit: async (data, stepper) => {
          // check email validity
          console.log(data, stepper)

          if (data.email === 'exists@saas-ui.dev') {
            formRef.current?.setError('email', {
              message: 'This email address is already registered.',
            })

            throw new Error('Email exists already')
          }
        },
        step: () => {
          const watch = useWatch()

          console.log(watch)
          return (
            <FormLayout>
              <Field name="name" label="Name" />
              <Field name="email" label="Email" autoComplete="off" />
              <StepperNav />
            </FormLayout>
          )
        },
      },
      {
        name: 'password',
        title: 'Password',
        step: () => {
          const form = useFormContext()

          console.log(form.getValues('email'))

          return (
            <FormLayout>
              <Field
                name="password"
                label="Password"
                type="password"
                autoFocus
                autoComplete="off"
              />
              <StepperNav />
            </FormLayout>
          )
        },
      },

      {
        name: 'confirmation',
        title: 'Confirmation',
        step: () => {
          return (
            <FormLayout>
              <Text>Please confirm that your information is correct.</Text>
              <PropertyList>
                <Property label="Name" value={<FormValue name="name" />} />
                <Property label="Email" value={<FormValue name="email" />} />
              </PropertyList>
              <StepperNav />
            </FormLayout>
          )
        },
      },
    ],
    []
  )

  return (
    <>
      <StepForm
        formRef={formRef}
        defaultValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <FormStepper>
            {steps.map(({ step: Step, name, ...rest }) => (
              <FormStep key={name} name={name} {...rest}>
                <Step />
              </FormStep>
            ))}

            <StepsCompleted>
              <Alert status="success">
                <AlertIcon />
                <Box>
                  <AlertTitle>Thanks for signing up</AlertTitle>
                  <AlertDescription width="full">
                    Check your inbox to confirm your email address.
                  </AlertDescription>
                </Box>
              </Alert>
            </StepsCompleted>
          </FormStepper>
        </FormLayout>
      </StepForm>
    </>
  )
}

const steps = [
  {
    name: 'name',
    schema: z.object({
      name: z
        .string()
        .nonempty('Name is required ')
        .min(2, 'Name is too short'),
    }),
  },
  {
    name: 'Login details',
    schema: z.object({
      email: z.string().nonempty('Email is required ').email(),
      password: z
        .string()
        .nonempty('Password is required ')
        .superRefine((password, ctx) => {
          let fullMsg = 'Password must contain at least'

          // loop through requirements & append error message to fullMsg message if not met
          ;[
            { regex: /^.{8,}$/, msg: '8 characters' },
            // { regex: /[@$!%*?&]{1,}/, msg: 'one symbol' },
            { regex: /[a-z]{1,}/, msg: 'one lowercase letterpas' },
            { regex: /[A-Z]{1,}/, msg: 'one uppercase letter' },
            { regex: /[0-9]{1,}/, msg: 'one number' },
          ].forEach(({ regex, msg }) => {
            const result = z.string().regex(regex).safeParse(password)
            if (!result.success) {
              fullMsg += ` ${msg},`
            }
          })

          // if any requirements are not met, set error
          if (fullMsg !== 'Password must contain at least') {
            ctx.addIssue({
              code: 'custom',
              message: fullMsg.replace(/,(?=[^,]*$)/, '.'),
            })
          }
        }),
    }),
  },
  {
    name: 'Privacy',
    schema: z.object({
      privacy: z.boolean().refine((val) => val === true, {
        message: 'You must agree to the terms and conditions',
        path: ['privacy'],
      }),
    }),
  },
]

const TermsCard = createField(
  forwardRef((props, ref) => {
    return (
      <Box ref={ref}>
        <Checkbox {...props} /> I agree to the terms
      </Box>
    )
  }),
  {
    isControlled: true,
  }
)

const CustomZodStepForm = createZodStepForm({
  fields: {
    terms: TermsCard,
  },
})

export function SignupPage() {
  return (
    <>
      <CustomZodStepForm
        // ref={formRef}
        steps={steps}
        mode="onSubmit"
        h="100%"
        defaultValues={{
          name: '',
          email: '',
          password: '',
          privacy: false,
        }}
        onChange={(data) => {
          console.log('change: ', data)
        }}
        onSubmit={(params) => {
          console.log('submit: ', params)
        }}
      >
        {({ Field, FormStep, isCompleted }) => (
          <FormLayout>
            <FormStep name="name">
              <FormLayout>
                <Field name="name" label="What should we call you?" />
              </FormLayout>
            </FormStep>
            <FormStep name="details">
              <FormLayout>
                <Field name="email" label="Email" />
                <Field name="password" type="password" label="password" />
              </FormLayout>
            </FormStep>
            <FormStep name="privacy">
              <FormLayout>
                <Field
                  name="privacy"
                  label="Do you agree to these Terms & Conditions?"
                  type="terms" // custom field not working
                />
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
      </CustomZodStepForm>
    </>
  )
}
