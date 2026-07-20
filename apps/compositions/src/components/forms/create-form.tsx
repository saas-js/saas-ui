'use client'

import { createFormHook } from '@tanstack/react-form'

import { SelectField } from './fields/select-field'
import { SwitchField } from './fields/switch-field'
import { TextField } from './fields/text-field'
import { TextareaField } from './fields/textarea-field'
import { Footer } from './footer'
import { fieldContext, formContext } from './form-context'
import { Layout } from './layout'
import { SubmitButton } from './submit-button'

/**
 * App-wide TanStack Form hook. Registers our Chakra/Saas UI field and form
 * components so they're available as `field.*` inside `<form.AppField>` and
 * `form.*` inside `<form.AppForm>`.
 *
 * Usage (the standalone `<Form form={form}>` provides context + renders the
 * `<form>` element, so no separate `<form.AppForm>` wrapper is needed):
 *
 *   const form = useAppForm({ defaultValues, validators, onSubmit })
 *   <Form form={form}>
 *     <form.Layout>
 *       <form.AppField name="email">
 *         {(field) => <field.TextField label="Email" type="email" />}
 *       </form.AppField>
 *       <form.SubmitButton>Save</form.SubmitButton>
 *     </form.Layout>
 *   </Form>
 */
export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
    SwitchField,
  },
  formComponents: {
    Layout,
    Footer,
    SubmitButton,
  },
})
