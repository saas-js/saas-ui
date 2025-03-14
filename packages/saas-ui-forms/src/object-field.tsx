import * as React from 'react'

import { Field as FieldPrimivite } from '@chakra-ui/react'
import { dataAttr } from '@saas-ui/core/utils'
import { FieldPath, FieldValues } from 'react-hook-form'

import { useFieldProps } from './form-context'
import { FormLayout, type FormLayoutOptions } from './form-layout'
import { BaseFieldProps } from './types'
import { mapNestedFields } from './utils'

export interface ObjectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<BaseFieldProps, keyof FormLayoutOptions>,
    FormLayoutOptions {
  name: TName
  children: React.ReactNode
}

export const FormLegend = (props: FieldPrimivite.LabelProps) => {
  return <FieldPrimivite.Label as="legend" {...props} />
}

/**
 * The object field component.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/object-field
 */
export const ObjectField: React.FC<ObjectFieldProps> = (props) => {
  const {
    name,
    label,
    hideLabel: hideLabelProp,
    children,
    columns: columnsProp,
    gap: gapProp,
    ...fieldProps
  } = props

  const { hideLabel, columns, gap, ...overrides } = useFieldProps(name) as Omit<
    ObjectFieldProps,
    'name'
  >

  const hidden = hideLabelProp || hideLabel

  return (
    <FieldPrimivite.Root as="fieldset" {...fieldProps} {...overrides}>
      <FormLegend data-hidden={dataAttr(hidden)}>{label}</FormLegend>
      <FormLayout columns={columnsProp || columns} gridGap={gapProp || gap}>
        {mapNestedFields(name, children)}
      </FormLayout>
    </FieldPrimivite.Root>
  )
}

ObjectField.displayName = 'ObjectField'
