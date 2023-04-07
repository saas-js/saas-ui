import React, { ForwardedRef } from 'react'
import { FieldsProvider } from './fields-context'
import { Form, FieldValues, FormProps, GetResolver } from './form'
import { WithFields } from './types'
import { objectFieldResolver } from './field-resolver'
import { GetFieldResolver } from './field-resolver'
import { forwardRef } from '@chakra-ui/react'

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
  const CreateForm = forwardRef(
    <
      TFieldValues extends FieldValues,
      TContext extends object = object,
      TSchema extends Schema = Schema
    >(
      props: WithFields<FormProps<TFieldValues, TContext, TSchema>, FieldDefs>,
      ref: ForwardedRef<HTMLFormElement>
    ) => {
      const { schema, ...rest } = props
      return (
        <FieldsProvider value={fields || {}}>
          <Form
            ref={ref}
            resolver={resolver?.(props.schema)}
            fieldResolver={fieldResolver?.(schema)}
            {...rest}
          />
        </FieldsProvider>
      )
    }
  ) as (<
    TFieldValues extends FieldValues,
    TContext extends object = object,
    TSchema extends Schema = Schema
  >(
    props: WithFields<FormProps<TFieldValues, TContext, TSchema>, FieldDefs> & {
      ref?: React.ForwardedRef<HTMLFormElement>
    }
  ) => React.ReactElement) & {
    displayName?: string
  }

  return CreateForm
}
