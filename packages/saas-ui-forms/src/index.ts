// Import and export Form and StepForm
import { createForm } from './create-form'

export { useForm, useZodForm } from './use-form'
export type {
  UseZodFormProps,
  UseFormReturn,
  UseFormProps,
  StandardSchemaV1,
} from './use-form'

// import { createStepForm } from './create-step-form'

// Exporting from './display-field'
export { DisplayField } from './display-field'
export type { DisplayFieldProps } from './display-field'
export { FormValue } from './display-field'

// Exporting from './field'
export { Field } from './field'
export type { FieldRules } from './field'

// Exporting from './fields'
export { AutoFields } from './fields'
export type { FieldsProps } from './fields'

// Exporting from './fields-context'
export { FieldsProvider, useField } from './fields-context'

// Exporting from './layout'
export { FormLayout } from './form-layout'
export type { FormLayoutProps } from './form-layout'

// Exporting from './submit-button'
export { SubmitButton } from './submit-button'
export type { SubmitButtonProps } from './submit-button'

// Exporting from './array-field'
export {
  ArrayField,
  ArrayFieldAddButton,
  ArrayFieldContainer,
  ArrayFieldRemoveButton,
  ArrayFieldRow,
  ArrayFieldRowContainer,
  ArrayFieldRowFields,
  ArrayFieldRows,
} from './array-field'

export type {
  ArrayFieldButtonProps,
  ArrayFieldContainerProps,
  ArrayFieldProps,
  ArrayFieldRowFieldsProps,
  ArrayFieldRowsProps,
} from './array-field'

// Exporting from './use-array-field'
export {
  ArrayFieldProvider,
  ArrayFieldRowProvider,
  useArrayField,
  useArrayFieldAddButton,
  useArrayFieldContext,
  useArrayFieldRemoveButton,
  useArrayFieldRow,
  useArrayFieldRowContext,
} from './use-array-field'

export type {
  ArrayFieldOptions,
  UseArrayFieldReturn,
  UseArrayFieldRowProps,
  UseArrayFieldRowReturn,
} from './use-array-field'

// Exporting from './object-field'
export { FormLegend, ObjectField } from './object-field'
export type { ObjectFieldProps } from './object-field'

// Exporting from './display-if'
export { DisplayIf } from './display-if'
export type { DisplayIfProps } from './display-if'

// Exporting from './step-form'
// export { FormStep, FormStepper, NextButton, PrevButton } from './step-form'

// export type {
//   FormStepOptions,
//   FormStepProps,
//   FormStepperProps,
//   NextButtonProps,
//   StepFormProps,
//   StepsOptions,
// } from './step-form'

// Exporting from './use-step-form'
// export {
//   StepFormProvider,
//   useFormStep,
//   useStepForm,
//   useStepFormContext,
// } from './use-step-form'

// export type {
//   FormStepSubmitHandler,
//   StepFormContext,
//   StepFormRenderContext,
//   StepState,
//   UseFormStepProps,
//   UseStepFormProps,
//   UseStepFormReturn,
// } from './use-step-form'

// Exporting from './field-resolver'
export { objectFieldResolver } from './field-resolver'
export type {
  FieldResolver,
  GetFieldResolver,
  ObjectSchema,
} from './field-resolver'

// Exporting from './watch-field'
export { WatchField } from './watch-field'
export type { WatchFieldProps } from './watch-field'

// Exporting BaseField from './base-field'
export { BaseField, useBaseField } from './base-field'

// Exporting from './default-fields'
export {
  // CheckboxField,
  InputField,
  // NativeSelectField,
  // NumberInputField,
  // PasswordInputField,
  // PinField,
  // RadioField,
  // SelectField,
  // SwitchField,
  TextareaField,
  defaultFieldTypes,
} from './default-fields'

export type {
  DefaultFields,
  InputFieldProps,
  // NumberInputFieldProps,
  // PinFieldProps,
  // SelectFieldProps,
  // SwitchFieldProps,
  TextareaFieldProps,
  // CheckboxFieldProps,
  // NativeSelectFieldProps,
  // RadioFieldProps,
} from './default-fields'

// Exporting types from './types'
export type {
  FieldProps,
  WithFields,
  BaseFieldProps,
  FieldOptions,
  DefaultFieldOverrides,
  // WithStepFields,
  GetBaseField,
  ArrayFieldPath,
  MergeFieldProps,
  FieldOption,
  FieldOverrides,
  FormChildren,
  ShallowMerge,
  ValueOf,
} from './types'

// Exporting from './create-form'
export { createForm } from './create-form'
export type { CreateFormProps, FormType } from './create-form'

// Exporting from './create-field'
export { createField } from './create-field'
export type { CreateFieldOptions } from './create-field'

// Exporting from './form'
export { Form as BaseForm } from './form'
export type { FormProps, FormRenderContext, FormComponent } from './form'

// Exporting from './form-context'
export { FormProvider, useFormContext } from './form-context'

// export { createStepForm } from './create-step-form'
// export type { CreateStepFormProps } from './create-step-form'

/**
 * Form component.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/form
 */
export const Form = createForm()

/**
 * Multi-step form component.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/step-form
 */
// export const StepForm = createStepForm()

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
  UseControllerProps,
  UseControllerReturn,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormReset,
  UseFormResetField,
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
  ArrayPath,
  BrowserNativeObject,
  DeepRequired,
  ExtractObjects,
  FieldArrayPath,
  FieldArrayPathValue,
  FieldErrorsImpl,
  FieldPath,
  FieldPathByValue,
  FieldPathValue,
  FieldPathValues,
} from 'react-hook-form'

export {
  appendErrors,
  useController,
  useFieldArray,
  useFormState,
  useWatch,
  Controller,
} from 'react-hook-form'
