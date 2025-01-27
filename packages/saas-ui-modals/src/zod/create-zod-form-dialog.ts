import type { ZodFormType } from '@saas-ui/forms/zod'
import { createFormDialog, FormDialogFieldOverrides } from '../form'
import type { BaseModalProps } from '../modal'

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
