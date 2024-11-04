import { Form } from '@saas-ui/forms/yup'
import { createYupFormDialog } from './create-yup-form-dialog'

export { createYupFormDialog }

export const FormDialog = createYupFormDialog(Form)
