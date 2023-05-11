export * from './yup-resolver'
export { createYupForm, type YupFormType } from './create-yup-form'
export type { AnyObjectSchema } from './types'
import { createYupForm } from '@saas-ui/forms/yup'

export const Form = createYupForm()
