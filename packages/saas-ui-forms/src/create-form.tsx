import React from 'react'
import { FieldsProvider } from './fields-context'
import { Form, FieldValues, FormProps, GetResolver } from './form'
import { WithFields } from './types'
import { objectFieldResolver } from './field-resolver'
import { GetFieldResolver } from './field-resolver'

export interface CreateFormProps<FieldDefs> {
  resolver?: GetResolver
  fieldResolver?: GetFieldResolver
  fields?: FieldDefs extends Record<string, React.FC<any>> ? FieldDefs : never
}

export function createForm<FieldDefs, Schema = any>({
  resolver,
  fieldResolver = objectFieldResolver,
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
        <Form
          resolver={resolver?.(props.schema)}
          fieldResolver={fieldResolver?.(schema)}
          {...rest}
        />
      </FieldsProvider>
    )
  }

  return CreateForm
}
