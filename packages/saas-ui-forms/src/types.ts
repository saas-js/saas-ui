import type { MaybeRenderProp } from '@saas-ui/core/utils'
import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import type { ArrayFieldProps } from './array-field'
import type { DefaultFields } from './default-fields'
import type { FormProps, FormRenderContext } from './form'
import type { ObjectFieldProps } from './object-field'
import type { StepsOptions } from './step-form'
import type { SubmitButtonProps } from './submit-button'
import type { StepFormRenderContext, UseStepFormProps } from './use-step-form'

export interface FocusableElement {
  focus(options?: FocusOptions): void
}

export type FieldOption = { label?: string; value: string }
export type FieldOptions<TOption extends FieldOption = FieldOption> =
  Array<TOption>

export type ValueOf<T> = T[keyof T]
export type ShallowMerge<A, B> = Omit<A, keyof B> & B

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]

type MapPath<T extends string[]> = T extends [infer U, ...infer R]
  ? U extends string
    ? `${U extends `${number}` ? '$' : U}${R[0] extends string
        ? '.'
        : ''}${R extends string[] ? MapPath<R> : ''}`
    : ''
  : ''

type TransformPath<T extends string> = MapPath<Split<T, '.'>>

export type ArrayFieldPath<Name extends string> = Name extends string
  ? TransformPath<Name>
  : never

export interface BaseFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /**
   * The field name
   */
  name: TName | ArrayFieldPath<TName>
  /**
   * The field label
   */
  label?: string
  /**
   * Hide the field label
   */
  hideLabel?: boolean
  /**
   * Field help text
   */
  help?: string
  /**
   * React hook form rules
   */
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  /**
   * Build-in types:
   * text, number, password, textarea, select, native-select, checkbox, radio, switch, pin
   *
   * Will default to a text field if there is no matching type.
   */
  type?: string
  /**
   * The input placeholder
   */
  placeholder?: string
  /**
   * React children
   */
  children?: React.ReactNode
}

export type GetBaseField<TProps extends object = object> = () => {
  /**
   * Extra props to pass to the component
   */
  props: Array<Extract<keyof TProps, string>>
  /**
   * The component to render
   */
  Component: React.FC<
    Omit<BaseFieldProps, 'name'> & {
      name: string
      children: React.ReactNode
    } & TProps
  >
}

type FieldPathWithArray<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = TName | ArrayFieldPath<TName>

export type MergeFieldProps<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues,
  TExtraFieldProps extends object = object,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ValueOf<{
  [K in keyof FieldDefs]: FieldDefs[K] extends React.FC<infer Props>
    ? { type?: K } & ShallowMerge<
        Props,
        BaseFieldProps<TFieldValues, TName>
      > & { [key in keyof TExtraFieldProps]: TExtraFieldProps[key] }
    : never
}>

export type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TExtraFieldProps extends object = object,
> = MergeFieldProps<DefaultFields, TFieldValues, TExtraFieldProps>

export type FormChildren<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TExtraFieldProps extends object = object,
> = MaybeRenderProp<
  FormRenderContext<
    TFieldValues,
    TContext,
    MergeFieldProps<
      FieldDefs extends never
        ? DefaultFields
        : ShallowMerge<DefaultFields, FieldDefs>,
      TFieldValues,
      TExtraFieldProps
    >
  >
>

export type DefaultFieldOverrides = {
  submit?: SubmitButtonProps
  [key: string]: any
}

type MergeOverrideFieldProps<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ValueOf<{
  [K in keyof FieldDefs]: FieldDefs[K] extends React.FC<infer Props>
    ? { type?: K } & Omit<
        ShallowMerge<Props, BaseFieldProps<TFieldValues, TName>>,
        'name'
      >
    : never
}>

export type FieldOverrides<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  [K in FieldPathWithArray<TFieldValues, TName>]?:
    | MergeOverrideFieldProps<
        FieldDefs extends never
          ? DefaultFields
          : ShallowMerge<DefaultFields, FieldDefs>,
        TFieldValues
      >
    | ({ type?: 'object' } & Omit<
        ObjectFieldProps<TFieldValues>,
        'name' | 'children'
      >)
    | ({ type?: 'array' } & Omit<
        ArrayFieldProps<TFieldValues>,
        'name' | 'children'
      >)
}

export type WithFields<
  TFormProps extends FormProps<any, any, any, any, any>,
  FieldDefs,
  ExtraOverrides = object,
> =
  TFormProps extends FormProps<
    infer _TSchema,
    infer TFieldValues,
    infer TContext,
    infer TExtraFieldProps
  >
    ? Omit<TFormProps, 'children' | 'fields'> & {
        children?: FormChildren<
          FieldDefs,
          TFieldValues,
          TContext,
          TExtraFieldProps
        >
        fields?: FieldOverrides<FieldDefs, TFieldValues> & {
          submit?: SubmitButtonProps
        } & ExtraOverrides
      }
    : never

// StepForm types
export type StepFormChildren<
  FieldDefs,
  TSteps extends StepsOptions<any> = StepsOptions<any>,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
> = MaybeRenderProp<
  StepFormRenderContext<
    TSteps,
    TFieldValues,
    TContext,
    MergeFieldProps<
      FieldDefs extends never
        ? DefaultFields
        : ShallowMerge<DefaultFields, FieldDefs>,
      TFieldValues
    >
  >
>

export type WithStepFields<
  TStepFormProps extends UseStepFormProps<any, any, any>,
  FieldDefs,
  ExtraOverrides = object,
> =
  TStepFormProps extends UseStepFormProps<
    infer TSteps,
    infer TFieldValues,
    infer TContext
  >
    ? Omit<TStepFormProps, 'children' | 'fields'> & {
        children?: StepFormChildren<FieldDefs, TSteps, TFieldValues, TContext>
        fields?: FieldOverrides<FieldDefs, TFieldValues> & {
          submit?: SubmitButtonProps
        } & ExtraOverrides
      }
    : never
