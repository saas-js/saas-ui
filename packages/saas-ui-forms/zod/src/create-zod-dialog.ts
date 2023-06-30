import {
  createFormDialog,
  BaseModalProps,
  FormDialogFieldOverrides,
} from '@saas-ui/modals'
import { ZodFormType } from './create-zod-form'

export function createZodFormDialog<
  FieldDefs = any,
  ExtraProps = object,
  ExtraOverrides = object
>(Form: ZodFormType<FieldDefs, ExtraProps, ExtraOverrides>) {
  return createFormDialog(Form) as unknown as ZodFormType<
    FieldDefs,
    ExtraProps & Omit<BaseModalProps, 'children'>,
    ExtraOverrides & FormDialogFieldOverrides
  >
}
