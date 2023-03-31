import React from 'react'
import { FieldsProvider } from './fields-context'
import { Form, FieldValues, FormProps, GetResolver } from './form'
import { WithFields } from './types'

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
