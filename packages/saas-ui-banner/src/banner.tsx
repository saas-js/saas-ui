import * as React from 'react'
import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
  As,
} from '@chakra-ui/system'
import { callAllHandlers, cx, __DEV__ } from '@chakra-ui/utils'
import { useId } from '@chakra-ui/hooks'
import { createContext } from '@chakra-ui/react-utils'

import { CloseButton, CloseButtonProps } from '@chakra-ui/close-button'
import { Icon, InfoIcon, WarningIcon, CheckIcon } from '@chakra-ui/icons'

import { ButtonGroup, ButtonGroupProps } from '@saas-ui/button'

import { AnimatePresence } from 'framer-motion'

import {
  BannerTransition,
  BannerTransitionProps,
  BannerMotion,
} from './banner-transition'

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
   * Customize the close animation
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
    ThemingProps<'Banner'> {}

/**
 * Banner is used to communicate the state or status of a
 * page, feature or action
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

  const styles = useMultiStyleConfig('Banner', { ...props, colorScheme })

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

  const animate = isOpen ? 'enter' : 'exit'

  return (
    <BannerProvider value={context}>
      <StylesProvider value={styles}>
        <AnimatePresence>
          {isOpen && (
            <BannerTransition
              role="status"
              ref={ref}
              motionPreset={motionPreset}
              animate={animate}
              {...rest}
              className={cx('saas-banner', props.className)}
              __css={containerStyles}
            />
          )}
        </AnimatePresence>
      </StylesProvider>
    </BannerProvider>
  )
})

if (__DEV__) {
  Banner.displayName = 'Banner'
}

export interface BannerContentProps extends HTMLChakraProps<'div'> {}

export const BannerContent = forwardRef<BannerContentProps, 'div'>(
  (props, ref) => {
    const styles = useStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx('saas-banner__content', props.className)}
        __css={styles.content}
      />
    )
  }
)

if (__DEV__) {
  BannerContent.displayName = 'BannerContent'
}

export interface BannerDescriptionProps extends HTMLChakraProps<'div'> {}

export interface BannerTitleProps extends HTMLChakraProps<'div'> {}

export const BannerTitle = forwardRef<BannerTitleProps, 'div'>((props, ref) => {
  const styles = useStyles()

  return (
    <chakra.div
      ref={ref}
      {...props}
      className={cx('saas-banner__title', props.className)}
      __css={styles.title}
    />
  )
})

if (__DEV__) {
  BannerTitle.displayName = 'BannerTitle'
}

export interface BannerDescriptionProps extends HTMLChakraProps<'div'> {}

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
        className={cx('saas-banner__desc', props.className)}
        __css={descriptionStyles}
      />
    )
  }
)

if (__DEV__) {
  BannerDescription.displayName = 'BannerDescription'
}

export interface BannerActionsProps
  extends HTMLChakraProps<'div'>,
    ButtonGroupProps {}

export const BannerActions = forwardRef<BannerActionsProps, 'div'>(
  (props, ref) => {
    const { children, variant } = props
    const styles = useStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx('saas-banner__actions', props.className)}
        __css={styles.actions}
      >
        <ButtonGroup variant={variant}>{children}</ButtonGroup>
      </chakra.div>
    )
  }
)

if (__DEV__) {
  BannerActions.displayName = 'BannerActions'
}

export interface BannerIconProps extends HTMLChakraProps<'span'> {
  icon?: As<any>
}

export const BannerIcon: React.FC<BannerIconProps> = (props) => {
  const { status } = useBannerContext()
  const { icon, ...rest } = props
  const { icon: statusIcon } = STATUSES[status]
  const styles = useStyles()

  return (
    <chakra.span
      display="inherit"
      {...rest}
      className={cx('saas-banner__icon', props.className)}
      __css={styles.icon}
    >
      <Icon as={icon || statusIcon} w="100%" h="100%" />
    </chakra.span>
  )
}

if (__DEV__) {
  BannerIcon.displayName = 'BannerIcon'
}

export const BannerCloseButton = forwardRef<CloseButtonProps, 'button'>(
  (props, ref) => {
    const { onClick, className, ...rest } = props
    const { onClose, isOpen, id } = useBannerContext()

    const _className = cx('saas-banner__close-btn', className)

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

if (__DEV__) {
  BannerCloseButton.displayName = 'BannerCloseButton'
}
