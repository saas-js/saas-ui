import * as React from 'react'

import { chakra, ResponsiveValue } from '@chakra-ui/system'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { IconButton, ButtonProps } from '@saas-ui/button'

import { FormLayout } from './layout'
import { BaseField, FieldProps } from './field'

import { mapNestedFields } from './utils'

import {
  useArrayField,
  useArrayFieldRow,
  useArrayFieldContext,
  ArrayFieldProvider,
  ArrayFieldOptions,
  ArrayFieldRowProvider,
  useArrayFieldRowContext,
  useArrayFieldRemoveButton,
  useArrayFieldAddButton,
  UseArrayFieldReturn,
} from './use-array-field'

interface ArrayField {
  id: string
  [key: string]: unknown
}

interface ArrayFieldRowProps {
  /**
   * Amount of field columns
   */
  columns?: ResponsiveValue<number>
  /**
   * Spacing between fields
   */
  spacing?: ResponsiveValue<string | number>
  /**
   * The array index
   */
  index: number
}

export const ArrayFieldRow: React.FC<ArrayFieldRowProps> = ({
  children,
  columns,
  spacing,
  index,
}) => {
  return (
    <ArrayFieldRowContainer index={index}>
      <ArrayFieldRowFields columns={columns} spacing={spacing}>
        {children}
      </ArrayFieldRowFields>
      <ArrayFieldRemoveButton />
    </ArrayFieldRowContainer>
  )
}

export interface ArrayFieldRowFieldsProps {
  /**
   * Amount of field columns
   */
  columns?: ResponsiveValue<number>
  /**
   * Spacing between fields
   */
  spacing?: ResponsiveValue<string | number>
}

export const ArrayFieldRowFields: React.FC<ArrayFieldRowFieldsProps> = ({
  children,
  columns,
  spacing,
  ...layoutProps
}) => {
  const { name } = useArrayFieldRowContext()
  return (
    <FormLayout
      flex="1"
      columns={columns}
      gridGap={spacing}
      mr="2"
      {...layoutProps}
    >
      {mapNestedFields(name, children)}
    </FormLayout>
  )
}

export const ArrayFieldRowContainer: React.FC<ArrayFieldRowProps> = ({
  children,
  index,
}) => {
  const context = useArrayFieldRow({ index })

  const styles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    mb: 4,
  }

  return (
    <ArrayFieldRowProvider value={context}>
      <chakra.div __css={styles}>{children}</chakra.div>
    </ArrayFieldRowProvider>
  )
}

export const ArrayFieldRemoveButton: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      icon={<MinusIcon />}
      aria-label="Remove row"
      {...useArrayFieldRemoveButton()}
      {...props}
    />
  )
}

export const ArrayFieldAddButton: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      icon={<AddIcon />}
      aria-label="Add row"
      float="right"
      {...useArrayFieldAddButton()}
      {...props}
    />
  )
}

export interface ArrayFieldProps
  extends ArrayFieldOptions,
    Omit<FieldProps, 'defaultValue'> {}

export const ArrayField = React.forwardRef(
  (props: ArrayFieldProps, ref: React.ForwardedRef<UseArrayFieldReturn>) => {
    const { children, ...containerProps } = props

    return (
      <ArrayFieldContainer ref={ref} {...containerProps}>
        <ArrayFieldRows>
          {(fields: ArrayField[]) => (
            <>
              {fields.map(({ id }, index: number) => (
                <ArrayFieldRow key={id} index={index}>
                  {children}
                </ArrayFieldRow>
              ))}
            </>
          )}
        </ArrayFieldRows>
        <ArrayFieldAddButton />
      </ArrayFieldContainer>
    )
  }
)

export interface ArrayFieldRowsProps {
  children: (fields: ArrayField[]) => React.ReactElement | null
}

export const ArrayFieldRows = ({
  children,
}: ArrayFieldRowsProps): React.ReactElement | null => {
  const { fields } = useArrayFieldContext()
  return children(fields)
}

export const ArrayFieldContainer = React.forwardRef(
  (
    {
      name,
      defaultValue,
      keyName,
      min,
      max,
      children,
      ...fieldProps
    }: ArrayFieldProps,
    ref: React.ForwardedRef<UseArrayFieldReturn>
  ) => {
    const context = useArrayField({
      name,
      defaultValue,
      keyName,
      min,
      max,
    })

    // This exposes the useArrayField api through the forwarded ref
    React.useImperativeHandle(ref, () => context, [ref, context])

    return (
      <ArrayFieldProvider value={context}>
        <BaseField name={name} {...fieldProps}>
          {children}
        </BaseField>
      </ArrayFieldProvider>
    )
  }
)
