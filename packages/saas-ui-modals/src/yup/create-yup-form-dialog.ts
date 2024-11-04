import type { YupFormType } from '@saas-ui/forms/yup'
import { FormDialogFieldOverrides, createFormDialog } from '../form'

import type { BaseModalProps } from '../modal'

export function createYupFormDialog<
  FieldDefs = any,
  ExtraProps = object,
  ExtraFieldProps extends object = object,
  ExtraOverrides = object,
>(Form: YupFormType<FieldDefs, ExtraProps, ExtraFieldProps, ExtraOverrides>) {
  return createFormDialog(Form) as unknown as YupFormType<
    FieldDefs,
    ExtraProps & Omit<BaseModalProps, 'children'>,
    ExtraFieldProps,
    ExtraOverrides & FormDialogFieldOverrides
  >
}
