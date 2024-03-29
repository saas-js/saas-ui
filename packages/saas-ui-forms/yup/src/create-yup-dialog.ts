import {
  BaseModalProps,
  FormDialogFieldOverrides,
  createFormDialog,
} from '@saas-ui/modals'
import { YupFormType } from './create-yup-form'

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
