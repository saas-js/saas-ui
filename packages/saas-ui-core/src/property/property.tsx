import * as React from 'react'

import {
  List,
  ListProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
  useColorModeValue,
  HTMLChakraProps,
  ThemingProps,
  SystemProps,
  SystemStyleObject,
  omitThemingProps,
  createStylesContext,
} from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'

const [StylesProvider, useStyles] = createStylesContext('SuiProperty')

interface PropertyOptions {
  label?: React.ReactNode
  value?: React.ReactNode
  labelWidth?: SystemProps['width']
  spacing?: SystemProps['margin']
}

export interface PropertyProps
  extends PropertyOptions,
    HTMLChakraProps<'dl'>,
    ThemingProps<'SuiProperty'> {}
/**
 * The wrapper component that handles default composition.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/property
 */
export const Property = forwardRef<PropertyProps, 'dl'>((props, ref) => {
  const styles = useMultiStyleConfig('SuiProperty', props)

  const { children, label, value, labelWidth, spacing, ...rest } =
    omitThemingProps(props)

  const propertyStyles: SystemStyleObject = {
    minW: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...styles.property,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.dl
        ref={ref}
        __css={propertyStyles}
        {...rest}
        className={cx('sui-property', props.className)}
      >
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

Property.displayName = 'Property'

export interface PropertyLabelProps extends HTMLChakraProps<'dt'> {}
/**
 * The property label.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/property
 */
export const PropertyLabel = forwardRef<PropertyProps, 'dt'>((props, ref) => {
  const styles = useStyles()
  const { children, noOfLines = 1, width, minWidth, ...rest } = props

  const labelStyles = {
    display: 'flex',
    flexDirection: 'row',
    ...styles.label,
  }

  if (width) {
    labelStyles.minWidth = minWidth || 'auto'
    labelStyles.width = width
  }

  return (
    <chakra.dt
      ref={ref}
      __css={labelStyles}
      {...rest}
      className={cx('sui-property__label', props.className)}
    >
      <chakra.span flex="1" noOfLines={noOfLines}>
        {children}
      </chakra.span>
    </chakra.dt>
  )
})

PropertyLabel.displayName = 'PropertyLabel'

export interface PropertyValueProps extends HTMLChakraProps<'dd'> {}
/**
 * The property value.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/property
 */
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
      <chakra.dd
        ref={ref}
        __css={valueStyles}
        {...rest}
        className={cx('sui-property__value', props.className)}
      >
        {children}
      </chakra.dd>
    )
  }
)

PropertyValue.displayName = 'PropertyValue'

export interface PropertyListProps extends Omit<ListProps, 'items'> {}

/**
 * Render a list of properties.
 * Will set the `as` prop of it's children to `div`,
 * in order to render a semantically correct `dl` list.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/property
 */
export const PropertyList: React.FC<PropertyListProps> = (props) => {
  const { children, ...rest } = props
  return (
    <List
      as="dl"
      {...rest}
      className={cx('sui-property-list', props.className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement<PropertyProps>(child)
          ? React.cloneElement(child, {
              as: 'div',
            })
          : child
      )}
    </List>
  )
}

PropertyList.displayName = 'PropertyList'
