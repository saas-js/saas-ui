import React from 'react'
import {
  defaultFieldTypes,
  FieldProps as DefaultFieldProps,
  FieldsProvider,
} from './field'
import {
  Form,
  FieldValues,
  FormProps,
  GetResolver,
  FormRenderContext,
} from './form'

import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { ShallowMerge, ValueOf } from './types'

type DefaultFields = {
  [K in keyof typeof defaultFieldTypes]: typeof defaultFieldTypes[K]
}

export type FieldProps<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues
> = ValueOf<{
  [K in keyof FieldDefs]: FieldDefs[K] extends React.FC<infer Props>
    ? { type?: K } & ShallowMerge<Props, DefaultFieldProps<TFieldValues>>
    : never
}>

export type FormChildren<
  FieldDefs,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> = MaybeRenderProp<
  FormRenderContext<
    TFieldValues,
    TContext,
    FieldProps<
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

export interface CreateFormProps<FieldDefs> {
  resolver?: GetResolver
  fields?: FieldDefs extends Record<string, React.FC<any>> ? FieldDefs : never
}

export function createForm<FieldDefs, Schema = any>({
  resolver,
  fields,
}: CreateFormProps<FieldDefs> = {}) {
  const CreateForm = <
    TFieldValues extends FieldValues,
    TContext extends object = object,
    TSchema extends Schema = Schema
  >(
    props: WithFields<FormProps<TFieldValues, TContext, TSchema>, FieldDefs>
  ) => {
    const { schema, ...rest } = props
    return (
      <FieldsProvider value={fields || {}}>
        <Form resolver={resolver?.(props.schema)} {...rest} />
      </FieldsProvider>
    )
  }

  return CreateForm
}
