import * as React from 'react'

import {
  chakra,
  ResponsiveValue,
  forwardRef,
  Button,
  ButtonProps,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

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

export interface ArrayFieldButtonProps extends ButtonProps {}

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
/**
 * Render prop component, to get access to the internal fields state. Must be a child of ArrayFieldContainer.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/array-field
 */
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

ArrayFieldRow.displayName = 'ArrayFieldRow'

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
/**
 * Add the name prefix to the fields and acts as a horizontal form layout by default.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/array-field
 */
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

ArrayFieldRowFields.displayName = 'ArrayFieldRowFields'

/**
 * The row container component providers row context.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/array-field
 */
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

ArrayFieldRowContainer.displayName = 'ArrayFieldRowContainer'

/**
 * The default remove button.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/array-field
 */
export const ArrayFieldRemoveButton: React.FC<ArrayFieldButtonProps> = (
  props
) => {
  return (
    <Button aria-label="Remove row" {...useArrayFieldRemoveButton()} {...props}>
      {props.children || <MinusIcon />}
    </Button>
  )
}

ArrayFieldRemoveButton.displayName = 'ArrayFieldRemoveButton'

/**
 * The default add button.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/array-field
 */
export const ArrayFieldAddButton: React.FC<ArrayFieldButtonProps> = (props) => {
  return (
    <Button
      aria-label="Add row"
      float="right"
      {...useArrayFieldAddButton()}
      {...props}
    >
      {props.children || <AddIcon />}
    </Button>
  )
}

ArrayFieldAddButton.displayName = 'ArrayFieldAddButton'

export interface ArrayFieldProps
  extends ArrayFieldOptions,
    Omit<FieldProps, 'defaultValue'> {}
/**
 * The wrapper component that composes the default ArrayField functionality.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/array-field
 */
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

ArrayField.displayName = 'ArrayField'

export interface ArrayFieldRowsProps {
  children: (fields: ArrayField[]) => React.ReactElement | null
}

export const ArrayFieldRows = ({
  children,
}: ArrayFieldRowsProps): React.ReactElement | null => {
  const { fields } = useArrayFieldContext()
  return children(fields)
}

ArrayFieldRows.displayName = 'ArrayFieldRows'

/**
 * The container component provides context and state management.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/array-field
 */
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

ArrayFieldContainer.displayName = 'ArrayFieldContainer'
