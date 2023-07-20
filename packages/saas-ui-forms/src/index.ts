export * from './display-field'
export * from './field'
export * from './fields'
export * from './fields-context'
export * from './layout'
export * from './submit-button'
export * from './array-field'
export * from './use-array-field'
export * from './object-field'
export * from './display-if'
export * from './step-form'
export * from './use-step-form'
export * from './field-resolver'
export * from './watch-field'
export * from './input-right-button'
export * from './select'
export * from './password-input'
export * from './radio'

export * from './base-field'

export {
  CheckboxField,
  InputField,
  NativeSelectField,
  NumberInputField,
  PasswordInputField,
  PinField,
  RadioField,
  SelectField,
  SwitchField,
  TextareaField,
  defaultFieldTypes,
  type DefaultFields,
  type InputFieldProps,
  type NumberInputFieldProps,
  type PinFieldProps,
} from './default-fields'

export type {
  FieldProps,
  WithFields,
  BaseFieldProps,
  FieldOptions,
  DefaultFieldOverrides,
  WithStepFields,
} from './types'

export { createForm, type CreateFormProps, type FormType } from './create-form'
export { createField, type CreateFieldOptions } from './create-field'

export { Form as BaseForm } from './form'
export type { FormProps, FormRenderContext, FormComponent } from './form'

export { FormProvider, useFormContext } from './form-context'

import { createForm } from './create-form'
import { createStepForm } from './create-step-form'

/**
 * Form component.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/form
 */
export const Form = createForm()

export { createStepForm, type CreateStepFormProps } from './create-step-form'

/**
 * Multi-step form component.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/step-form
 */
export const StepForm = createStepForm()

export type {
  BatchFieldArrayUpdate,
  ChangeHandler,
  Control,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  CriteriaMode,
  CustomElement,
  DeepMap,
  DeepPartial,
  DeepPartialSkipArrayKey,
  DefaultValues,
  DelayCallback,
  EmptyObject,
  ErrorOption,
  EventType,
  Field as FieldDef,
  FieldArray,
  FieldArrayMethodProps,
  FieldArrayWithId,
  FieldElement,
  FieldError,
  FieldErrors,
  FieldName,
  FieldNamesMarkedBoolean,
  FieldRefs,
  FieldValue,
  FieldValues,
  FormProviderProps,
  FormState,
  FormStateProxy,
  FormStateSubjectRef,
  GetIsDirty,
  InternalFieldErrors,
  InternalFieldName,
  InternalNameSet,
  IsAny,
  IsFlatObject,
  KeepStateOptions,
  LiteralUnion,
  Message,
  Mode,
  MultipleFieldErrors,
  Names,
  NativeFieldValue,
  NestedValue,
  NonUndefined,
  Noop,
  Primitive,
  ReadFormState,
  Ref,
  RefCallBack,
  RegisterOptions,
  Resolver,
  ResolverError,
  ResolverOptions,
  ResolverResult,
  ResolverSuccess,
  SetFieldValue,
  SetValueConfig,
  Subjects,
  SubmitErrorHandler,
  SubmitHandler,
  TriggerConfig,
  UnpackNestedValue,
  UseControllerProps,
  UseControllerReturn,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormReset,
  UseFormResetField,
  UseFormReturn,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormStateProps,
  UseFormStateReturn,
  UseFormTrigger,
  UseFormUnregister,
  UseFormWatch,
  UseWatchProps,
  Validate,
  ValidateResult,
  ValidationMode,
  ValidationRule,
  ValidationValue,
  ValidationValueMessage,
  WatchInternal,
  WatchObserver,
} from 'react-hook-form'

export {
  appendErrors,
  useController,
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
  Controller,
} from 'react-hook-form'
