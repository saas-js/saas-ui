import * as React from 'react'
import { __DEV__ } from '@chakra-ui/utils'

import { Form } from './form'
import { FormLayout } from './layout'
import { Field, FieldProps } from './field'

import { ArrayField } from './array-field'
import { ObjectField } from './object-field'
import { FieldResolver } from './field-resolver'
import { useFormContext } from 'react-hook-form'

export interface FieldsProps {
  schema: any
  fieldResolver?: FieldResolver
  focusFirstField?: boolean
}

const mapNestedFields = (resolver: FieldResolver, name: string) => {
  return resolver
    .getNestedFields(name)
    ?.map(
      ({ name, type, ...nestedFieldProps }: FieldProps, i): React.ReactNode => (
        <Field key={name || i} name={name} type={type} {...nestedFieldProps} />
      )
    )
}

export const Fields: React.FC<FieldsProps> = ({
  schema,
  fieldResolver,
  focusFirstField,
  ...props
}) => {
  const resolver = React.useMemo(
    () => fieldResolver || Form.getFieldResolver(schema),
    [schema, fieldResolver]
  )

  const fields = React.useMemo(() => resolver.getFields(), [resolver])

  const form = useFormContext()

  React.useEffect(() => {
    if (focusFirstField && fields[0]?.name) {
      form.setFocus(fields[0].name)
    }
  }, [schema, fieldResolver, focusFirstField])

  return (
    <FormLayout {...props}>
      {fields.map(
        ({
          name,
          type,
          defaultValue,
          ...fieldProps
        }: FieldProps): React.ReactNode => {
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

          return <Field key={name} name={name} type={type} {...fieldProps} />
        }
      )}
    </FormLayout>
  )
}

if (__DEV__) {
  Fields.displayName = 'Fields'
}
