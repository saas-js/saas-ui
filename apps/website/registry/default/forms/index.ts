// Factory hook + composition helpers
export { useAppForm, withForm, withFieldGroup } from './create-form'
export type { AnyAppForm } from './app-form'

// Contexts / hooks for building custom field & form components
export {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
} from './form-context'

// Field components
export { TextField, type TextFieldProps } from './fields/text-field'
export { TextareaField, type TextareaFieldProps } from './fields/textarea-field'
export {
  SelectField,
  type SelectFieldProps,
  type SelectFieldOption,
  type FieldOptions,
} from './fields/select-field'
export { SwitchField, type SwitchFieldProps } from './fields/switch-field'
export type { BaseFieldProps } from './fields/types'

// Form-level components
export { Form, type FormProps, type FormLike } from './form'
export { Layout, type LayoutProps } from './layout'
export { Footer } from './footer'
export { SubmitButton, type SubmitButtonProps } from './submit-button'

// Utilities
export { getErrorText } from './utils'
