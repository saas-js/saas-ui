import { FormControlProps } from '@chakra-ui/react'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { DefaultFields } from './default-fields'
import { FormProps, FormRenderContext } from './form'

export type FieldOption = { label?: string; value: string }
export type FieldOptions<TOption extends FieldOption = FieldOption> =
  | Array<string>
  | Array<TOption>

export type ValueOf<T> = T[keyof T]
export type ShallowMerge<A, B> = Omit<A, keyof B> & B

export interface BaseFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormControlProps, 'label' | 'type'> {
  /**
   * The field name
   */
  name: TName
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

type MergeFieldProps<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues
> = ValueOf<{
  [K in keyof FieldDefs]: FieldDefs[K] extends React.FC<infer Props>
    ? { type?: K } & ShallowMerge<Props, BaseFieldProps<TFieldValues>>
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

export type WithFields<
  TFormProps extends FormProps<any, any, any, any>,
  FieldDefs
> = TFormProps extends FormProps<infer TFieldValues, infer TContext>
  ? Omit<TFormProps, 'children'> & {
      children: FormChildren<FieldDefs, TFieldValues, TContext>
    }
  : never
