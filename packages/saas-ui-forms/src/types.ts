import { FormControlProps } from '@chakra-ui/react'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { DefaultFields } from './default-fields'
import { FormProps, FormRenderContext } from './form'
import { SubmitButtonProps } from './submit-button'
import { ObjectFieldProps } from './object-field'
import { ArrayFieldProps } from './array-field'

export type FieldOption = { label?: string; value: string }
export type FieldOptions<TOption extends FieldOption = FieldOption> =
  | Array<string>
  | Array<TOption>

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
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormControlProps, 'label' | 'type'> {
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
}

type FieldPathWithArray<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = TName | ArrayFieldPath<TName>

type MergeFieldProps<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ValueOf<{
  [K in keyof FieldDefs]: FieldDefs[K] extends React.FC<infer Props>
    ? { type?: K } & ShallowMerge<Props, BaseFieldProps<TFieldValues, TName>>
    : never
}>

export type FieldProps<TFieldValues extends FieldValues = FieldValues> =
  MergeFieldProps<DefaultFields, TFieldValues>

export type FormChildren<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> = MaybeRenderProp<
  FormRenderContext<
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

export type DefaultFieldOverrides = {
  submit?: SubmitButtonProps
  [key: string]: any
}

type MergeOverrideFieldProps<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
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
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
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
  TFormProps extends FormProps<any, any, any, any>,
  FieldDefs,
  ExtraOverrides = object
> = TFormProps extends FormProps<
  infer TSchema,
  infer TFieldValues,
  infer TContext
>
  ? Omit<TFormProps, 'children' | 'fields'> & {
      children?: FormChildren<FieldDefs, TFieldValues, TContext>
      fields?: FieldOverrides<FieldDefs, TFieldValues> & {
        submit?: SubmitButtonProps
      } & ExtraOverrides
    }
  : never
