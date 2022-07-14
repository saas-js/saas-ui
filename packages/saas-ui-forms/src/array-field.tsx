import * as React from 'react'

import { chakra, ResponsiveValue, forwardRef } from '@chakra-ui/system'
import { __DEV__ } from '@chakra-ui/utils'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { IconButton, ButtonProps } from '@saas-ui/button'

import { FormLayout, FormLayoutProps } from './layout'
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

interface ArrayFieldRowProps extends FormLayoutProps {
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
  /**
   * The fields
   */
  children: React.ReactNode
}

export const ArrayFieldRow: React.FC<ArrayFieldRowProps> = ({
  children,
  index,
  ...rowFieldsProps
}) => {
  return (
    <ArrayFieldRowContainer index={index}>
      <ArrayFieldRowFields {...rowFieldsProps}>{children}</ArrayFieldRowFields>
      <ArrayFieldRemoveButton />
    </ArrayFieldRowContainer>
  )
}

if (__DEV__) {
  ArrayFieldRow.displayName = 'ArrayFieldRow'
}

export interface ArrayFieldRowFieldsProps extends FormLayoutProps {
  /**
   * Amount of field columns
   */
  columns?: ResponsiveValue<number>
  /**
   * Spacing between fields
   */
  spacing?: ResponsiveValue<string | number>
  /**
   * The fields
   */
  children: React.ReactNode
}

export const ArrayFieldRowFields: React.FC<ArrayFieldRowFieldsProps> = ({
  children,
  ...layoutProps
}) => {
  const { name } = useArrayFieldRowContext()
  return (
    <FormLayout flex="1" mr="2" {...layoutProps}>
      {mapNestedFields(name, children)}
    </FormLayout>
  )
}

if (__DEV__) {
  ArrayFieldRowFields.displayName = 'ArrayFieldRowFields'
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

if (__DEV__) {
  ArrayFieldRowContainer.displayName = 'ArrayFieldRowContainer'
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

if (__DEV__) {
  ArrayFieldRemoveButton.displayName = 'ArrayFieldRemoveButton'
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

if (__DEV__) {
  ArrayFieldAddButton.displayName = 'ArrayFieldAddButton'
}

export interface ArrayFieldProps
  extends ArrayFieldOptions,
    Omit<FieldProps, 'defaultValue'> {}

export const ArrayField = forwardRef(
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
) as ((
  props: ArrayFieldProps & {
    ref?: React.ForwardedRef<UseArrayFieldReturn>
  }
) => React.ReactElement) & {
  displayName: string
}

if (__DEV__) {
  ArrayField.displayName = 'ArrayField'
}

export interface ArrayFieldRowsProps {
  children: (fields: ArrayField[]) => React.ReactElement | null
}

export const ArrayFieldRows = ({
  children,
}: ArrayFieldRowsProps): React.ReactElement | null => {
  const { fields } = useArrayFieldContext()
  return children(fields)
}

if (__DEV__) {
  ArrayFieldRows.displayName = 'ArrayFieldRows'
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

if (__DEV__) {
  ArrayFieldContainer.displayName = 'ArrayFieldContainer'
}
