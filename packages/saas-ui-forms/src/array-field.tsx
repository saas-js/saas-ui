import * as React from 'react'

import {
  chakra,
  ResponsiveValue,
  forwardRef,
  Button,
  ButtonProps,
} from '@chakra-ui/react'
import { PlusIcon, MinusIcon } from '@saas-ui/core/icons'

import { FormLayout, FormLayoutProps } from './layout'
import { BaseField } from './base-field'
import { BaseFieldProps } from './types'

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
import { FieldPath, FieldValues } from 'react-hook-form'
import { isFunction } from '@chakra-ui/utils'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { useFieldProps } from './form-context'

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
  ...rest
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
      <chakra.div {...rest} __css={styles}>
        {children}
      </chakra.div>
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
      {props.children || <PlusIcon />}
    </Button>
  )
}

ArrayFieldAddButton.displayName = 'ArrayFieldAddButton'

export interface ArrayFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ArrayFieldOptions<TFieldValues, TName>,
    Omit<
      BaseFieldProps<TFieldValues, TName>,
      'name' | 'defaultValue' | 'children'
    > {
  children: MaybeRenderProp<ArrayField[]>
}

/**
 * The wrapper component that composes the default ArrayField functionality.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/array-field
 */
export const ArrayField = forwardRef(
  (props: ArrayFieldProps, ref: React.ForwardedRef<UseArrayFieldReturn>) => {
    const { children, ...containerProps } = props

    const rowFn = isFunction(children)
      ? children
      : (fields: ArrayField[]) => (
          <>
            {fields.map(({ id }, index: number) => (
              <ArrayFieldRow key={id} index={index}>
                {children}
              </ArrayFieldRow>
            )) || null}
          </>
        )

    return (
      <ArrayFieldContainer ref={ref} {...containerProps}>
        <ArrayFieldRows>{rowFn as any}</ArrayFieldRows>
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

export interface ArrayFieldContainerProps
  extends Omit<ArrayFieldProps, 'children'> {
  children: React.ReactNode
}

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
    }: ArrayFieldContainerProps,
    ref: React.ForwardedRef<UseArrayFieldReturn>
  ) => {
    const overrides = useFieldProps(name)

    const context = useArrayField({
      name,
      defaultValue,
      keyName,
      min: min || (overrides as any)?.min,
      max: max || (overrides as any)?.max,
    })

    // This exposes the useArrayField api through the forwarded ref
    React.useImperativeHandle(ref, () => context, [ref, context])

    return (
      <ArrayFieldProvider value={context}>
        <BaseField name={name} {...fieldProps} {...overrides}>
          {children}
        </BaseField>
      </ArrayFieldProvider>
    )
  }
)

ArrayFieldContainer.displayName = 'ArrayFieldContainer'
