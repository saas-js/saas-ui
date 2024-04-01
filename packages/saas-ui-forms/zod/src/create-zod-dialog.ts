import {
  createFormDialog,
  BaseModalProps,
  FormDialogFieldOverrides,
} from '@saas-ui/modals'
import { ZodFormType } from './create-zod-form'

export function createZodFormDialog<
  FieldDefs = any,
  ExtraProps = object,
  ExtraFieldProps extends object = object,
  ExtraOverrides = object,
>(Form: ZodFormType<FieldDefs, ExtraProps, ExtraFieldProps, ExtraOverrides>) {
  return createFormDialog(Form) as unknown as ZodFormType<
    FieldDefs,
    ExtraProps & Omit<BaseModalProps, 'children'>,
    ExtraFieldProps,
    ExtraOverrides & FormDialogFieldOverrides
  >
}
