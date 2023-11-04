import React, { ForwardedRef } from 'react'
import { FieldsProvider } from './fields-context'
import { Form, FieldValues, FormProps, GetResolver } from './form'
import { DefaultFieldOverrides, WithFields } from './types'
import { objectFieldResolver } from './field-resolver'
import { GetFieldResolver } from './field-resolver'
import { forwardRef } from '@chakra-ui/react'

export interface CreateFormProps<FieldDefs> {
  resolver?: GetResolver
  fieldResolver?: GetFieldResolver
  fields?: FieldDefs extends Record<string, React.FC<any>> ? FieldDefs : never
}

export type FormType<
  FieldDefs,
  ExtraProps = object,
  ExtraOverrides = object
> = (<
  TSchema = unknown,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  props: WithFields<
    FormProps<TSchema, TFieldValues, TContext>,
    FieldDefs,
    ExtraOverrides
  > & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement) & {
  displayName?: string
  id?: string
}

export function createForm<FieldDefs>({
  resolver,
  fieldResolver = objectFieldResolver,
  fields,
}: CreateFormProps<FieldDefs> = {}) {
  const DefaultForm = forwardRef(
    <
      TSchema = any,
      TFieldValues extends FieldValues = FieldValues,
      TContext extends object = object
    >(
      props: WithFields<FormProps<TSchema, TFieldValues, TContext>, FieldDefs>,
      ref: ForwardedRef<HTMLFormElement>
    ) => {
      const {
        schema,
        resolver: resolverProp,
        fieldResolver: fieldResolverProp,
        ...rest
      } = props

      return (
        <FieldsProvider value={fields || {}}>
          <Form
            ref={ref}
            resolver={resolverProp ?? resolver?.(props.schema)}
            fieldResolver={fieldResolverProp ?? fieldResolver?.(schema)}
            {...rest}
          />
        </FieldsProvider>
      )
    }
  ) as FormType<FieldDefs>

  DefaultForm.displayName = 'Form'
  DefaultForm.id = 'Form'

  return DefaultForm
}
