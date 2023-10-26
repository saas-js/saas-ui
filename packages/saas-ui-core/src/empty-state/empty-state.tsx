import * as React from 'react'
import {
  forwardRef,
  Icon,
  chakra,
  As,
  ThemingProps,
  omitThemingProps,
  useMultiStyleConfig,
  ButtonGroup,
  IconProps,
  SystemProps,
  SystemStyleObject,
  HTMLChakraProps,
  TextProps,
  ButtonGroupProps,
  createStylesContext,
} from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'

const [StylesProvider, useStyles] = createStylesContext('SuiEmptyState')

export const useEmptyStateStyles = useStyles

export interface EmptyStateProps
  extends Omit<EmptyStateContainerProps, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: As
  actions?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  spacing?: SystemProps['margin']
}
/**
 * Display actionable feedback when no data is available.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/empty-state
 */
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

EmptyState.displayName = 'EmptyState'

export interface EmptyStateContainerProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'SuiEmptyState'> {
  children?: React.ReactNode
  spacing?: SystemProps['margin']
}

export const EmptyStateContainer: React.FC<EmptyStateContainerProps> = (
  props
) => {
  const { children, spacing, ...rest } = props
  const styles = useMultiStyleConfig('SuiEmptyState', props)

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
        className={cx('sui-empty-state', props.className)}
      >
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

EmptyStateContainer.displayName = 'EmptyStateContainer'

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
        className={cx('sui-empty-state__icon', props.className)}
      />
    )
  }
)

EmptyStateIcon.displayName = 'EmptyStateIcon'

export interface EmptyStateTitleProps extends HTMLChakraProps<'h3'> {}

export const EmptyStateTitle: React.FC<EmptyStateTitleProps> = (props) => {
  const styles = useStyles()

  const titleStyles = {
    mb: 1,
    ...styles.title,
  }

  return (
    <chakra.h3
      __css={titleStyles}
      {...props}
      className={cx('sui-empty-state__title', props.className)}
    />
  )
}

EmptyStateTitle.displayName = 'EmptyStateTitle'

export const EmptyStateDescription: React.FC<TextProps> = (props) => {
  const styles = useStyles()

  const descriptionStyles: SystemStyleObject = {
    color: 'muted',
    fontSize: 'md',
    ...styles.description,
  }

  return (
    <chakra.p
      __css={descriptionStyles}
      {...props}
      className={cx('sui-empty-state__description', props.className)}
    />
  )
}

EmptyStateDescription.displayName = 'EmptyStateDescription'

export interface EmptyStateBodyProps extends HTMLChakraProps<'div'> {
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
      className={cx('sui-empty-state__body', props.className)}
    />
  )
}

EmptyStateBody.displayName = 'EmptyStateBody'

export const EmptyStateActions: React.FC<ButtonGroupProps> = (props) => {
  const styles = useStyles()
  return (
    <ButtonGroup
      sx={styles.actions}
      {...props}
      className={cx('sui-empty-state__actions', props.className)}
    />
  )
}

EmptyStateActions.displayName = 'EmptyStateActions'

export const EmptyStateFooter: React.FC<HTMLChakraProps<'footer'>> = (
  props
) => {
  const styles = useStyles()
  return (
    <chakra.footer
      __css={styles.footer}
      {...props}
      className={cx('sui-empty-state__footer', props.className)}
    />
  )
}

EmptyStateFooter.displayName = 'EmptyStateFooter'
