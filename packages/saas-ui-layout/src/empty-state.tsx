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

import { cx, __DEV__ } from '@chakra-ui/utils'

export interface EmptyStateProps
  extends Omit<EmptyStateContainerProps, 'title'> {
  title?: React.ReactNode
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
          {title && <EmptyStateTitle>{title}</EmptyStateTitle>}
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

if (__DEV__) {
  EmptyState.displayName = 'EmptyState'
}

export interface EmptyStateContainerProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'EmptyState'> {
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
      <chakra.div
        {...containerProps}
        __css={containerStyles}
        className={cx('saas-empty-state', props.className)}
      >
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

if (__DEV__) {
  EmptyStateContainer.displayName = 'EmptyStateContainer'
}

export const EmptyStateIcon = forwardRef<IconProps, typeof Icon>(
  (props, ref) => {
    const styles = useStyles()

    const iconStyles: SystemStyleObject = {
      boxSize: 10,
      ...styles.icon,
    }

    return (
      <Icon
        ref={ref}
        role="presentation"
        sx={iconStyles}
        {...props}
        className={cx('saas-empty-state__icon', props.className)}
      />
    )
  }
)

if (__DEV__) {
  EmptyStateIcon.displayName = 'EmptyStateIcon'
}

export const EmptyStateTitle: React.FC<HeadingProps> = (props) => {
  const styles = useStyles()

  const titleStyles = {
    mb: 1,
    ...styles.title,
  }

  return (
    <Heading
      sx={titleStyles}
      size="md"
      {...props}
      className={cx('saas-empty-state__title', props.className)}
    />
  )
}

if (__DEV__) {
  EmptyStateTitle.displayName = 'EmptyStateTitle'
}

export const EmptyStateDescription: React.FC<TextProps> = (props) => {
  const styles = useStyles()

  const descriptionStyles: SystemStyleObject = {
    color: 'muted',
    fontSize: 'md',
    ...styles.description,
  }

  return (
    <Text
      sx={descriptionStyles}
      {...props}
      className={cx('saas-empty-state__description', props.className)}
    />
  )
}

if (__DEV__) {
  EmptyStateDescription.displayName = 'EmptyStateDescription'
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

  return (
    <chakra.div
      __css={bodyStyles}
      {...rest}
      className={cx('saas-empty-state__body', props.className)}
    />
  )
}

if (__DEV__) {
  EmptyStateBody.displayName = 'EmptyStateBody'
}

export const EmptyStateActions: React.FC<ButtonGroupProps> = (props) => {
  const styles = useStyles()
  return (
    <ButtonGroup
      sx={styles.actions}
      {...props}
      className={cx('saas-empty-state__actions', props.className)}
    />
  )
}

if (__DEV__) {
  EmptyStateActions.displayName = 'EmptyStateActions'
}

export const EmptyStateFooter: React.FC<HTMLChakraProps<'footer'>> = (
  props
) => {
  const styles = useStyles()
  return (
    <chakra.footer
      __css={styles.footer}
      {...props}
      className={cx('saas-empty-state__footer', props.className)}
    />
  )
}

if (__DEV__) {
  EmptyStateFooter.displayName = 'EmptyStateFooter'
}
