import {
  BaseModalProps,
  FormDialogFieldOverrides,
  createFormDialog,
} from '@saas-ui/modals'
import { YupFormType } from './create-yup-form'

export function createYupFormDialog<
  FieldDefs = any,
  ExtraProps = object,
  ExtraOverrides = object
>(Form: YupFormType<FieldDefs, ExtraProps, ExtraOverrides>) {
  return createFormDialog(Form) as unknown as YupFormType<
    FieldDefs,
    ExtraProps & Omit<BaseModalProps, 'children'>,
    ExtraOverrides & FormDialogFieldOverrides
  >
}
