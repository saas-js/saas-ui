export * from './yup-resolver'
export { createYupForm, type YupFormType } from './create-yup-form'
export { createYupStepForm } from './create-yup-step-form'
export { createYupFormDialog } from './create-yup-dialog'
export type { AnyObjectSchema } from './types'

import { createYupForm } from './create-yup-form'
import { createYupStepForm } from './create-yup-step-form'
import { createYupFormDialog } from './create-yup-dialog'

export const Form = createYupForm()

export const StepForm = createYupStepForm()

export const FormDialog = createYupFormDialog(Form)
