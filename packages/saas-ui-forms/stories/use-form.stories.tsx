import React from 'react'

import { z } from 'zod'

import { FormLayout } from '../src/form-layout'
import { SubmitButton } from '../src/submit-button'
import { useForm, useZodForm } from '../src/use-form'

export default {
  title: 'Forms/useForm',
}

const onSubmit = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

export const Basic = () => {
  const form = useForm({
    defaultValues: {
      name: '',
    },
  })

  return (
    <form.Form onSubmit={onSubmit}>
      <FormLayout>
        <form.Field type="text" name="name" label="Name" />

        <SubmitButton />
      </FormLayout>
    </form.Form>
  )
}

export const ConditionalFields = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  })

  return (
    <form.Form onSubmit={onSubmit}>
      <FormLayout>
        <form.Field type="text" name="name" label="Name" />

        <form.DisplayIf name="name" condition={(value) => !!value}>
          <form.Field type="text" name="description" label="Description" />
        </form.DisplayIf>

        <SubmitButton />
      </FormLayout>
    </form.Form>
  )
}

export const ZodForm = () => {
  const form = useZodForm({
    defaultValues: {
      name: '',
    },
    schema: z.object({
      name: z.string().min(1, { message: 'Name is required' }),
    }),
  })

  return (
    <form.Form onSubmit={onSubmit}>
      <FormLayout>
        <form.Field type="text" name="name" label="Name" />

        <SubmitButton />
      </FormLayout>
    </form.Form>
  )
}

export const ZodFormConditional = () => {
  const form = useZodForm({
    defaultValues: {
      name: '',
      description: '',
    },
    schema: z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      description: z.string().min(1, { message: 'Description is required' }),
    }),
  })

  return (
    <form.Form onSubmit={onSubmit}>
      <FormLayout>
        <form.Field type="text" name="name" label="Name" />

        <form.DisplayIf name="name" condition={(value) => !!value}>
          <form.Field type="text" name="description" label="Description" />
        </form.DisplayIf>

        <SubmitButton />
      </FormLayout>
    </form.Form>
  )
}
