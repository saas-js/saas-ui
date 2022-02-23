import * as React from 'react'

import {
  chakra,
  forwardRef,
  useMultiStyleConfig,
  useStyles,
  useColorModeValue,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
  SystemProps,
  omitThemingProps,
} from '@chakra-ui/system'

import { List, ListProps } from '@saas-ui/list'

interface PropertyOptions {
  label?: React.ReactNode
  value?: React.ReactNode
  labelWidth?: SystemProps['width']
  spacing?: SystemProps['margin']
}

export interface PropertyProps
  extends PropertyOptions,
    HTMLChakraProps<'dl'>,
    ThemingProps<'Property'> {}

export const Property = forwardRef<PropertyProps, 'dl'>((props, ref) => {
  const styles = useMultiStyleConfig('Property', props)

  const { children, label, value, labelWidth, spacing, ...rest } =
    omitThemingProps(props)

  const propertyStyles = {
    minW: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...styles.property,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.dl ref={ref} __css={propertyStyles} {...rest}>
        {label && (
          <PropertyLabel
            width={labelWidth}
            minWidth={labelWidth}
            marginEnd={spacing}
          >
            {label}
          </PropertyLabel>
        )}
        {value && <PropertyValue>{value}</PropertyValue>}
        {children}
      </chakra.dl>
    </StylesProvider>
  )
})

export interface PropertyLabelProps extends HTMLChakraProps<'dt'> {}

export const PropertyLabel = forwardRef<PropertyProps, 'dt'>((props, ref) => {
  const styles = useStyles()
  const { children, ...rest } = props

  const labelStyles = {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100px',
    width: '30%',
    marginEnd: 2,
    py: 2,
    color: useColorModeValue('gray.500', 'gray.400'),
    ...styles.label,
  }

  return (
    <chakra.dt ref={ref} __css={labelStyles} {...rest}>
      <chakra.span flex="1" isTruncated>
        {children}
      </chakra.span>
    </chakra.dt>
  )
})

export interface PropertyValueProps extends HTMLChakraProps<'dd'> {}

export const PropertyValue = forwardRef<PropertyValueProps, 'dd'>(
  (props, ref) => {
    const styles = useStyles()

    const { children, ...rest } = props

    const valueStyles = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      ...styles.value,
    }

    return (
      <chakra.dd ref={ref} __css={valueStyles} {...rest}>
        {children}
      </chakra.dd>
    )
  }
)

export interface PropertyListProps extends Omit<ListProps, 'items'> {}

/**
 * Render a list of properties.
 * Will set the `as` prop of it's children to `div`,
 * in order to render a semantically correct `dl` list.
 */
export const PropertyList: React.FC<PropertyListProps> = (props) => {
  const { children, ...rest } = props
  return (
    <List as="dl" {...rest}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              as: 'div',
            })
          : child
      )}
    </List>
  )
}
