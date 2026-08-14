'use client'

import * as React from 'react'

import { chakra } from '@chakra-ui/react'

/** Minimal structural shape of the app form used by `Form`. */
export interface FormLike {
  AppForm: React.ComponentType<React.PropsWithChildren<{}>>
  handleSubmit: () => unknown
}

export type FormProps<TForm extends FormLike> = {
  form: TForm
  children: React.ReactNode
} & Omit<React.ComponentProps<typeof chakra.form>, 'onSubmit'>

/**
 * Renders the `<form>` element and provides the app-form context in a single
 * wrapper, so registered form components (`form.SubmitButton`) work without a
 * separate `<form.AppForm>` and without threading the form through props.
 *
 * Generic over the form type so the concrete `useAppForm` generics are
 * forwarded (not widened to `any`).
 *
 *   <Form form={form}>
 *     <form.Layout>
 *       <form.AppField name="email">{(field) => <field.TextField />}</form.AppField>
 *       <form.SubmitButton>Save</form.SubmitButton>
 *     </form.Layout>
 *   </Form>
 */
export function Form<TForm extends FormLike>(props: FormProps<TForm>) {
  const { form, children, ...rest } = props

  return (
    <form.AppForm>
      <chakra.form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
        {...rest}
      >
        {children}
      </chakra.form>
    </form.AppForm>
  )
}
