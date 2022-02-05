import * as React from 'react'
import {
  forwardRef,
  Heading,
  Text,
  Icon,
  chakra,
  As,
  ThemingProps,
  StylesProvider,
  omitThemingProps,
  useMultiStyleConfig,
  useStyles,
  ButtonGroup,
  IconProps,
  SystemProps,
  SystemStyleObject,
  HTMLChakraProps,
  HeadingProps,
  TextProps,
  ButtonGroupProps,
} from '@chakra-ui/react'

export interface EmptyStateProps extends EmptyStateContainerProps {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: As<any>
  actions?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  spacing?: SystemProps['margin']
}

export const EmptyState: React.FC<EmptyStateProps> = (props) => {
  const {
    children,
    spacing,
    icon,
    title,
    description,
    actions,
    footer,
    ...rest
  } = props

  return (
    <EmptyStateContainer {...rest}>
      <EmptyStateBody spacing={spacing}>
        {icon && <EmptyStateIcon as={icon} />}
        <chakra.div>
          <EmptyStateTitle>{title}</EmptyStateTitle>
          {description && (
            <EmptyStateDescription>{description}</EmptyStateDescription>
          )}
        </chakra.div>
        {children}

        {actions && <EmptyStateActions>{actions}</EmptyStateActions>}
        {footer && <EmptyStateFooter>{footer}</EmptyStateFooter>}
      </EmptyStateBody>
    </EmptyStateContainer>
  )
}

export interface EmptyStateContainerProps extends ThemingProps<'EmptyState'> {
  children?: React.ReactNode
  spacing?: SystemProps['margin']
}

export const EmptyStateContainer: React.FC<EmptyStateContainerProps> = (
  props
) => {
  const { children, spacing, ...rest } = props
  const styles = useMultiStyleConfig('EmptyState', props)

  const containerProps = omitThemingProps(rest)

  const containerStyles: SystemStyleObject = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div {...containerProps} __css={containerStyles}>
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

export const EmptyStateIcon = forwardRef<IconProps, typeof Icon>(
  (props, ref) => {
    const styles = useStyles()

    const iconStyles: SystemStyleObject = {
      boxSize: 10,
      ...styles.icon,
    }

    return <Icon ref={ref} role="presentation" sx={iconStyles} {...props} />
  }
)

export const EmptyStateTitle: React.FC<HeadingProps> = (props) => {
  const styles = useStyles()

  const titleStyles = {
    mb: 1,
    ...styles.title,
  }

  return <Heading sx={titleStyles} size="md" {...props} />
}

export const EmptyStateDescription: React.FC<TextProps> = (props) => {
  const styles = useStyles()

  const descriptionStyles: SystemStyleObject = {
    color: 'muted',
    fontSize: 'mb',
    ...styles.description,
  }

  return <Text sx={descriptionStyles} {...props} />
}

interface EmptyStateBodyProps extends HTMLChakraProps<'div'> {
  spacing?: SystemProps['margin']
}

export const EmptyStateBody: React.FC<EmptyStateBodyProps> = (props) => {
  const { spacing = 8, ...rest } = props
  const styles = useStyles()

  const bodyStyles: SystemStyleObject = {
    ...styles.body,
  }

  return <chakra.div __css={bodyStyles} {...rest} />
}

export const EmptyStateActions: React.FC<ButtonGroupProps> = (props) => {
  const styles = useStyles()
  return <ButtonGroup sx={styles.actions} {...props} />
}

export const EmptyStateFooter: React.FC<HTMLChakraProps<'footer'>> = (
  props
) => {
  const styles = useStyles()
  return <chakra.footer __css={styles.footer} {...props} />
}
