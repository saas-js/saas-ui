import { Form } from '@saas-ui/forms/zod'
import { createZodFormDialog } from './create-zod-form-dialog'

export { createZodFormDialog }

export const FormDialog = createZodFormDialog(Form)
