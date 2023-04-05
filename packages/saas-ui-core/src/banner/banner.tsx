import * as React from 'react'
import {
  CloseButton,
  CloseButtonProps,
  chakra,
  forwardRef,
  omitThemingProps,
  ButtonGroup,
  ButtonGroupProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
  As,
  createStylesContext,
  useId,
  ComponentWithAs,
  Icon,
} from '@chakra-ui/react'
import { callAllHandlers, cx } from '@chakra-ui/utils'

import { createContext } from '@chakra-ui/react-utils'

import { InfoIcon, WarningIcon, CheckIcon } from './icons'

import { AnimatePresence } from 'framer-motion'

import {
  BannerTransition,
  BannerTransitionProps,
  BannerMotion,
} from './banner-transition'

const [StylesProvider, useStyles] = createStylesContext('SuiBanner')

const STATUSES = {
  info: { icon: InfoIcon, colorScheme: 'blue' },
  warning: { icon: WarningIcon, colorScheme: 'orange' },
  success: { icon: CheckIcon, colorScheme: 'green' },
  error: { icon: WarningIcon, colorScheme: 'red' },
}

export type BannerStatus = keyof typeof STATUSES

interface BannerOptions {
  /**
   * The status of the banner.
   */
  status?: BannerStatus
  /**
   * Show or hide the banner.
   */
  isOpen?: boolean
  /**
   * Callback fired when the close button is clicked.
   */
  onClose?: () => void
  /**
   * Customize the close animation.
   * @default 'slideOutTop'
   * @type 'slideOutTop', 'slideOutBottom', 'fade', 'scale', 'none'
   */
  motionPreset?: BannerMotion
}

interface BannerContext extends BannerOptions {
  id: string
  status: BannerStatus
}

const [BannerProvider, useBannerContext] = createContext<BannerContext>({
  name: 'BannerContext',
  errorMessage:
    'useBannerContext: `context` is undefined. Seems you forgot to wrap banner components in `<Banner />`',
})

export interface BannerProps
  extends Omit<BannerTransitionProps, 'motionPreset'>,
    BannerOptions,
    ThemingProps<'SuiBanner'> {}

/**
 * Banner is used to communicate the state or status of a
 * page, feature or action
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/banner
 */
export const Banner = forwardRef<BannerProps, 'div'>((props, ref) => {
  const {
    id,
    status = 'info',
    isOpen = true,
    onClose,
    motionPreset = 'slideOutTop',
    ...rest
  } = omitThemingProps(props)
  const colorScheme = props.colorScheme ?? STATUSES[status].colorScheme

  const styles = useMultiStyleConfig('SuiBanner', {
    ...props,
    colorScheme,
  })

  const containerStyles: SystemStyleObject = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...styles.container,
  }

  const context = {
    id: id || `banner-${useId()}`,
    status,
    onClose,
    isOpen,
  }

  const role = ['warning', 'error'].includes(status) ? 'alert' : 'status'

  const animate = isOpen ? 'enter' : 'exit'

  return (
    <BannerProvider value={context}>
      <StylesProvider value={styles}>
        <AnimatePresence>
          {isOpen && (
            <BannerTransition
              id={context.id}
              role={role}
              ref={ref}
              motionPreset={motionPreset}
              animate={animate}
              {...rest}
              className={cx('sui-banner', props.className)}
              __css={containerStyles}
            />
          )}
        </AnimatePresence>
      </StylesProvider>
    </BannerProvider>
  )
})

Banner.displayName = 'Banner'

export interface BannerContentProps extends HTMLChakraProps<'div'> {}

/**
 * The wrapper for the banner title and description.
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/banner
 */
export const BannerContent = forwardRef<BannerContentProps, 'div'>(
  (props, ref) => {
    const styles = useStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx('sui-banner__content', props.className)}
        __css={styles.content}
      />
    )
  }
)

BannerContent.displayName = 'BannerContent'

export interface BannerDescriptionProps extends HTMLChakraProps<'div'> {}

export interface BannerTitleProps extends HTMLChakraProps<'div'> {}

/**
 * The title of the banner to be announced by screen readers.
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/banner
 */
export const BannerTitle = forwardRef<BannerTitleProps, 'div'>((props, ref) => {
  const styles = useStyles()

  return (
    <chakra.div
      ref={ref}
      {...props}
      className={cx('sui-banner__title', props.className)}
      __css={styles.title}
    />
  )
})

BannerTitle.displayName = 'BannerTitle'

export interface BannerDescriptionProps extends HTMLChakraProps<'div'> {}

/**
 * The description of the banner to be announced by screen readers.
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/banner
 */
export const BannerDescription = forwardRef<BannerDescriptionProps, 'div'>(
  (props, ref) => {
    const styles = useStyles()
    const descriptionStyles: SystemStyleObject = {
      display: 'inline',
      ...styles.description,
    }

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx('sui-banner__desc', props.className)}
        __css={descriptionStyles}
      />
    )
  }
)

BannerDescription.displayName = 'BannerDescription'

export interface BannerActionsProps
  extends HTMLChakraProps<'div'>,
    ButtonGroupProps {}

/**
 * The banner actions, renders a ButtonGroup.
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/banner
 */
export const BannerActions = forwardRef<BannerActionsProps, 'div'>(
  (props, ref) => {
    const { children, variant } = props
    const styles = useStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx('sui-banner__actions', props.className)}
        __css={styles.actions}
      >
        <ButtonGroup variant={variant}>{children}</ButtonGroup>
      </chakra.div>
    )
  }
)

BannerActions.displayName = 'BannerActions'

export interface BannerIconProps extends HTMLChakraProps<'span'> {
  icon?: As
}

/**
 * The visual icon for the banner.
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/banner
 */
export const BannerIcon: React.FC<BannerIconProps> = (props) => {
  const { status } = useBannerContext()
  const { icon, ...rest } = props
  const { icon: statusIcon } = STATUSES[status]
  const styles = useStyles()

  return (
    <chakra.span
      display="inherit"
      {...rest}
      className={cx('sui-banner__icon', props.className)}
      __css={styles.icon}
    >
      <Icon as={icon || statusIcon} w="100%" h="100%" />
    </chakra.span>
  )
}

BannerIcon.displayName = 'BannerIcon'

/**
 * The close button.
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/banner
 */
export const BannerCloseButton = forwardRef<CloseButtonProps, 'button'>(
  (props, ref) => {
    const { onClick, className, ...rest } = props
    const { onClose, isOpen, id } = useBannerContext()

    const _className = cx('sui-banner__close-btn', className)

    const styles = useStyles()

    return (
      <CloseButton
        ref={ref}
        __css={styles.closeButton}
        className={_className}
        onClick={callAllHandlers(onClick, (event) => {
          event.stopPropagation()
          onClose?.()
        })}
        aria-controls={id}
        aria-expanded={isOpen?.toString() ? 'true' : 'false'}
        {...rest}
      />
    )
  }
)

BannerCloseButton.displayName = 'BannerCloseButton'
