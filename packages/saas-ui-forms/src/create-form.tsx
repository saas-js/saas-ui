import React from 'react'
import { NumberInputField, SelectField } from '@chakra-ui/react'
import {
  CheckboxField,
  FieldProps,
  InputField,
  NativeSelectField,
  PasswordInputField,
  PinField,
  RadioField,
  SwitchField,
  TextareaField,
} from './field'
import { Form, FieldValues, FormProps, GetResolver } from './form'
import { FieldTypeProps } from './types'

const defaultFieldTypes = {
  text: InputField,
  email: InputField,
  url: InputField,
  phone: InputField,
  number: NumberInputField,
  password: PasswordInputField,
  textarea: TextareaField,
  switch: SwitchField,
  checkbox: CheckboxField,
  radio: RadioField,
  pin: PinField,
  select: SelectField,
  'native-select': NativeSelectField,
}

export interface CreateFormProps<TCustomFields> {
  resolver?: GetResolver
  fields?: TCustomFields
}

export function createForm<
  Schema = any,
  TCustomFields extends Record<string, React.FC<FieldProps>> = any
>({ resolver, fields }: CreateFormProps<TCustomFields>) {
  const fieldTypes = { ...defaultFieldTypes, ...fields }

  const CreateForm = <
    TFieldValues extends FieldValues,
    TContext extends object = object,
    TSchema extends Schema = Schema,
    TFieldTypes extends FieldProps<TFieldValues> = FieldTypeProps<
      TFieldValues,
      typeof fieldTypes
    >
  >(
    props: FormProps<TFieldValues, TContext, TSchema, TFieldTypes>
  ) => {
    const { schema, ...rest } = props
    return <Form resolver={resolver?.(props.schema)} {...rest} />
  }

  return CreateForm
}
