import * as React from 'react'
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  StylesProvider,
  useStyles,
  omitThemingProps,
  SystemProps,
  ThemeTypings,
  useMultiStyleConfig,
} from '@chakra-ui/system'

import { ButtonGroup, ButtonGroupProps } from '@saas-ui/button'

type Variants = 'plain' | 'outline' | 'solid'

interface CardOptions {
  /**
   * This will render the `CardHeader` with the title.
   * @type React.ReactNode
   */
  title?: React.ReactNode
  /**
   * This will render the `CardHeader` with the sub title.
   * @type React.ReactNode
   */
  subtitle?: React.ReactNode
  /**
   * The header action
   * @type React.ReactNode
   */
  action?: React.ReactNode
  /**
   * The card avatar
   * @type React.ReactNode
   */
  avatar?: React.ReactNode
  /**
   * The card footer actions, will be wrapped in a `ButtonGroup`
   * @type React.ReactNode
   */
  actions?: React.ReactNode
  /**
   * @type "plain" | "outline" | "solid"
   * @default "plain"
   */
  variant?: 'Card' extends keyof ThemeTypings['components'] /* @ts-ignore */
    ? ThemeTypings['components']['Card']['variants']
    : Variants
}

export interface CardProps
  extends CardOptions,
    Omit<HTMLChakraProps<'div'>, 'title'>,
    Omit<ThemingProps<'Card'>, 'variant'> {}

export const Card = forwardRef<CardProps, 'div'>((props, ref) => {
  const { title, subtitle, action, avatar, actions, children, ...rest } = props

  const showHeader = title || subtitle || action || avatar

  return (
    <CardContainer ref={ref} {...rest}>
      {showHeader && (
        <CardHeader
          title={title}
          subtitle={subtitle}
          action={action}
          avatar={avatar}
        />
      )}
      {children}
      {actions && <CardFooter>{actions}</CardFooter>}
    </CardContainer>
  )
})

export interface CardContainerProps
  extends HTMLChakraProps<'div'>,
    Omit<ThemingProps<'Card'>, 'variant'> {}

export const CardContainer = forwardRef<CardContainerProps, 'div'>(
  (props, ref) => {
    const styles = useMultiStyleConfig('Card', props)

    const { children, ...rest } = omitThemingProps(props)

    return (
      <StylesProvider value={styles}>
        <chakra.div __css={styles.container} ref={ref} {...rest}>
          {children}
        </chakra.div>
      </StylesProvider>
    )
  }
)

export interface CardHeaderProps extends Omit<HTMLChakraProps<'div'>, 'title'> {
  /**
   * The title
   * @type React.ReactNode
   */
  title?: React.ReactNode
  /**
   * The sub title
   * @type React.ReactNode
   */
  subtitle?: React.ReactNode
  /**
   * The header action
   * @type React.ReactNode
   */
  action?: React.ReactNode
  /**
   * The card avatar
   * @type React.ReactNode
   */
  avatar?: React.ReactNode
  /**
   * The spacing between the avatar and title
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps['margin']
}

export const CardHeader = forwardRef<CardHeaderProps, 'div'>(
  (
    { title, subtitle, action, avatar, spacing = 4, children, ...props },
    ref
  ) => {
    const styles = useStyles()

    const innerStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }

    let wrappedAvatar
    if (avatar) {
      wrappedAvatar = (
        <chakra.div
          display="flex"
          flexShrink="0"
          justifyContent="stretch"
          marginEnd={spacing}
        >
          {avatar}
        </chakra.div>
      )
    }

    let wrappedTitle
    if (title || subtitle) {
      wrappedTitle = (
        <chakra.div display="flex" flexDirection="column" flex="1">
          {typeof title === 'string' ? <CardTitle>{title}</CardTitle> : title}
          {typeof subtitle === 'string' ? (
            <CardSubtitle>{subtitle}</CardSubtitle>
          ) : (
            subtitle
          )}
        </chakra.div>
      )
    }

    let wrappedAction
    if (action) {
      wrappedAction = (
        <ButtonGroup variant="ghost" marginStart={spacing} alignSelf="start">
          {action}
        </ButtonGroup>
      )
    }

    return (
      <chakra.div __css={styles.header} ref={ref} {...props}>
        <chakra.div __css={innerStyle}>
          {wrappedAvatar} {wrappedTitle} {children} {wrappedAction}
        </chakra.div>
      </chakra.div>
    )
  }
)

export interface CardHeaderActionProps extends HTMLChakraProps<'div'> {}

export const CardHeaderAction = forwardRef<CardHeaderActionProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()
    return (
      <chakra.div __css={styles.headerAction} ref={ref} {...props}>
        {children}
      </chakra.div>
    )
  }
)

export interface CardTitleProps extends HTMLChakraProps<'h2'> {}

export const CardTitle = forwardRef<CardTitleProps, 'h2'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()
    return (
      <chakra.h2 __css={styles.title} ref={ref} {...props}>
        {children}
      </chakra.h2>
    )
  }
)

export interface CardSubtitleProps extends HTMLChakraProps<'p'> {}

export const CardSubtitle = forwardRef<CardSubtitleProps, 'p'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()
    return (
      <chakra.p __css={styles.subtitle} ref={ref} {...props}>
        {children}
      </chakra.p>
    )
  }
)

export interface CardActionProps extends HTMLChakraProps<'div'> {}

export const CardAction = forwardRef<CardTitleProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()
    return (
      <chakra.div __css={styles.title} ref={ref} {...props}>
        {children}
      </chakra.div>
    )
  }
)

export interface CardMediaProps extends HTMLChakraProps<'div'> {}

export const CardMedia = forwardRef<CardMediaProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()

    const mediaStyles = {
      bgSize: 'cover',
      ...styles.media,
    }

    return (
      <chakra.div __css={mediaStyles} ref={ref} {...props}>
        {children}
      </chakra.div>
    )
  }
)

export interface CardBodyProps extends HTMLChakraProps<'div'> {}

export const CardBody = forwardRef<CardBodyProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()
    return (
      <chakra.div __css={styles.body} ref={ref} {...props}>
        {children}
      </chakra.div>
    )
  }
)

export interface CardFooterProps
  extends HTMLChakraProps<'div'>,
    Pick<ButtonGroupProps, 'variant' | 'spacing'> {
  /**
   * The default button variant
   * @default "ghost"
   */
  variant?: 'Button' extends keyof ThemeTypings['components'] /* @ts-ignore */
    ? ThemeTypings['components']['Button']['variants']
    : Variants

  /**
   * The spacing between buttons
   * @type SystemProps['margin']
   * @default 2
   */
  spacing?: SystemProps['margin']
}

export const CardFooter = forwardRef<CardFooterProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()

    const { variant = 'ghost', spacing = 2, ...rest } = props

    const footerStyles = {
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        flex: 1,
      },
      ...styles.footer,
    }

    return (
      <chakra.div __css={footerStyles} ref={ref} {...rest}>
        <ButtonGroup variant={variant} spacing={spacing}>
          {children}
        </ButtonGroup>
      </chakra.div>
    )
  }
)
