import React from 'react'

import * as z from 'zod'
import { Container } from '@chakra-ui/react'

import { FormLayout } from '../src'
import { NextButton, PrevButton } from '../src/step-form'
import { useStepForm } from '../src/use-step-form'
import { onSubmit } from './helpers'

export default {
  title: 'Forms/useStepForm',
  decorators: [
    (Story: any) => (
      <Container mt="40px" maxW="lg">
        <Story />
      </Container>
    ),
  ],
}

const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Minimal 2 characters' })
    .max(25, 'Maximum 25 characters'),
  email: z.string().email({ message: 'Invalid email address' }),
})

const companySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Minimal 2 characters' })
    .max(25, 'Maximum 25 characters'),
  email: z.string().email({ message: 'Invalid email address' }),
})

export const Basic = {
  render(args) {
    const form = useStepForm({
      steps: [
        {
          id: 'user',
          schema: userSchema,
          onSubmit: async (data) => {
            console.log(data)
          },
        },
        {
          id: 'company',
          schema: companySchema,
          onSubmit: async (data) => {
            console.log(data)
          },
        },
      ],
      defaultValues: {
        user: {
          name: '',
          email: '',
        },
        company: {
          name: '',
          vatNumber: '',
        },
      },
      onSubmit,
      onStepChange: (details) => {
        console.log('onStepChange', details)
      },
    })

    return (
      <form.Form>
        <FormLayout>
          <form.Step id="user">
            <FormLayout>
              <form.Field name="user.name" label="Name" />
              <form.Field name="user.email" label="Email" />
              <NextButton />
            </FormLayout>
          </form.Step>
          {/* <form.Step id="company">
            <FormLayout>
              <form.Field name="company.name" label="Name" />
              <form.Field name="company.vatNumber" label="VAT Number" />
              <NextButton />
            </FormLayout>
          </form.Step> */}
        </FormLayout>
      </form.Form>
    )
  },
}
