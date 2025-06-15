import * as React from 'react'

import { ArrayField } from './array-field'
import { Field } from './field'
import type { FieldResolver } from './field-resolver'
import { useFormContext } from './form-context'
import { FormLayout } from './form-layout'
import { ObjectField } from './object-field'
import { BaseFieldProps } from './types'

export interface FieldsProps<TSchema = any> {
  schema?: TSchema
  fieldResolver?: FieldResolver
  focusFirstField?: boolean
}

const mapNestedFields = (resolver: FieldResolver, name: string) => {
  return resolver
    .getNestedFields(name)
    ?.map(
      (
        { name, type, ...nestedFieldProps }: BaseFieldProps,
        i,
      ): React.ReactNode => (
        <Field
          key={name || i}
          name={name}
          type={type as any}
          {...nestedFieldProps}
        />
      ),
    )
}

export const AutoFields: React.FC<FieldsProps> = ({
  schema: schemaProp,
  fieldResolver: fieldResolverProp,
  focusFirstField,
  ...props
}) => {
  const context = useFormContext()
  const schema = schemaProp || context.schema
  const fieldResolver = fieldResolverProp || context.fieldResolver
  const resolver = React.useMemo(() => fieldResolver, [schema, fieldResolver])

  const fields = React.useMemo(() => resolver?.getFields(), [resolver])

  const form = useFormContext()

  React.useEffect(() => {
    if (focusFirstField && fields?.[0]?.name) {
      form.setFocus(fields[0].name)
    }
  }, [schema, fieldResolver, focusFirstField])

  if (!resolver) {
    return null
  }

  return (
    <FormLayout {...props}>
      {fields?.map(
        ({ name, type, ...fieldProps }: BaseFieldProps): React.ReactNode => {
          if (type === 'array') {
            return (
              <ArrayField key={name} name={name} {...fieldProps}>
                {mapNestedFields(resolver, name)}
              </ArrayField>
            )
          } else if (type === 'object') {
            return (
              <ObjectField key={name} name={name} {...fieldProps}>
                {mapNestedFields(resolver, name)}
              </ObjectField>
            )
          }

          return (
            <Field
              key={name}
              name={name}
              type={type as any}
              // defaultValue={defaultValue}
              {...fieldProps}
            />
          )
        },
      )}
    </FormLayout>
  )
}

AutoFields.displayName = 'Fields'
