import * as React from 'react'

import {
  chakra,
  omitThemingProps,
  useMultiStyleConfig,
  useBreakpointValue,
  SystemStyleObject,
  IconButton,
  useDisclosure,
  Portal,
  forwardRef,
  useTheme,
  useStyleConfig,
} from '@chakra-ui/react'
import { cx, dataAttr, runIfFn } from '@chakra-ui/utils'
import { HamburgerIcon } from '../icons'
import { motion, AnimatePresence } from 'framer-motion'

import { useResponsiveValue } from '@saas-ui/react-utils'

import {
  SidebarProvider,
  useSidebarContext,
  useSidebarToggleButton,
} from './use-sidebar'
import { SidebarStylesProvider, useSidebarStyles } from './sidebar-context'
import {
  SidebarOverlayProps,
  SidebarProps,
  SidebarSectionProps,
  SidebarToggleButtonProps,
} from './sidebar-types'
import { getBreakpoints } from './sidebar-utils'
import { useAppShellContext } from '../app-shell/app-shell-context'

const MotionBox = chakra(motion.nav)

const motionPresets = {
  slideInOut: {
    enter: {
      left: 0,
      transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
    },
    exit: {
      left: '-100%',
    },
  },
  none: {},
}

/**
 * Side navigation, commonly used as the primary navigation
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const Sidebar = forwardRef<SidebarProps, 'nav'>((props, ref) => {
  const styles = useMultiStyleConfig('SuiSidebar', props)
  const theme = useTheme()
  const defaultProps = theme.components['SuiSidebar']?.defaultProps

  const variant = useResponsiveValue(props.variant ?? defaultProps?.variant, {
    fallback: 'base',
  })
  const size = useResponsiveValue(props.size ?? defaultProps?.size, {
    fallback: 'base',
  })

  const isCondensed = variant === 'compact'

  const {
    spacing = 4,
    children,
    toggleBreakpoint = 'lg',
    className,
    motionPreset = 'slideInOut',
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    ...containerProps
  } = omitThemingProps(props)

  const appShell = useAppShellContext()
  const breakpoints = getBreakpoints(toggleBreakpoint)

  const isMobile = useBreakpointValue(breakpoints, {
    fallback: undefined,
  })
  // we check this twice to avoid SSR issues.
  const isMobileInitial = useBreakpointValue(breakpoints)
  const isInitial = typeof isMobile === 'undefined'
  const isControlled = typeof isOpenProp !== 'undefined'
  const isCollapsible = (isMobile || isControlled) && !isCondensed

  const disclosure = useDisclosure({
    isOpen: isOpenProp || appShell?.isSidebarOpen,
    onOpen: onOpenProp || appShell?.openSidebar,
    onClose: onCloseProp || appShell?.closeSidebar,
  })

  const { isOpen, onClose, onOpen } = disclosure

  React.useEffect(() => {
    if ((isInitial && isMobileInitial) || isCondensed || isControlled) {
      // make sure we do not show an initial animation or when this is a compact sidebar
      return
    }
    isMobileInitial ? onClose() : onOpen()
  }, [isInitial, isCondensed, isMobileInitial])

  const containerStyles: SystemStyleObject = {
    '& > *:not(style) ~ *:not(style, .sui-resize-handle, .sui-sidebar__toggle-button + *)':
      {
        marginTop: spacing,
      },
    display: 'flex',
    flexDirection: 'column',
    ...(isMobile && isCollapsible
      ? {
          position: 'absolute',
          zIndex: 'modal',
          top: 0,
          left: { base: '-100%', lg: '0' },
          bottom: 0,
        }
      : {
          position: 'relative',
        }),
  }

  const context = {
    ...disclosure,
    breakpoints,
    isMobile,
    variant,
    size,
  }

  const variants = motionPresets[isCondensed ? 'none' : motionPreset || 'none']

  return (
    <SidebarProvider value={context}>
      <SidebarStylesProvider value={styles}>
        <MotionBox
          ref={ref}
          initial={false}
          animate={!isInitial && (!isCollapsible || isOpen ? 'enter' : 'exit')}
          variants={variants}
          __css={{
            ...containerStyles,
            ...styles.container,
          }}
          {...containerProps}
          id={disclosure.getDisclosureProps().id}
          className={cx('sui-sidebar', className)}
          data-compact={dataAttr(isCondensed)}
          data-collapsible={dataAttr(isMobile && isCollapsible)}
        >
          {children}
        </MotionBox>
      </SidebarStylesProvider>
    </SidebarProvider>
  )
})

Sidebar.displayName = 'Sidebar'
Sidebar.id = 'Sidebar'

/**
 * Button that toggles the sidebar visibility.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = (
  props
) => {
  const { sx, pos, position, ...rest } = props
  const { isOpen, isMobile, getButtonProps } = useSidebarToggleButton()
  const styles = useStyleConfig('SuiSidebarToggleButton', props)

  const p = pos ?? position ?? sx?.pos ?? sx?.position

  const buttonStyles: SystemStyleObject = {
    ...(isMobile
      ? !p
        ? { position: 'fixed', top: 3, left: 4, zIndex: 'modal' }
        : {}
      : { display: 'none' }),
    ...styles,
    ...sx,
  }

  const icon = props.icon ? (
    runIfFn(props.icon, {
      isOpen,
    })
  ) : (
    <HamburgerIcon />
  )

  return (
    <IconButton
      variant="ghost"
      sx={buttonStyles}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      {...rest}
      {...getButtonProps(props)}
      icon={icon as any}
      className={cx('sui-sidebar__toggle-button', props.className)}
    />
  )
}

/**
 * Overlay shown when sidebar is open on mobile.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarOverlay: React.FC<SidebarOverlayProps> = (props) => {
  const { onClose, isOpen, isMobile } = useSidebarContext()

  const styles = useSidebarStyles()

  return (
    <Portal>
      <AnimatePresence>
        {isMobile && isOpen && (
          <MotionBox
            animate={isOpen ? 'enter' : 'exit'}
            initial="exit"
            variants={{
              enter: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            position="fixed"
            top="0"
            right="0"
            bottom="0"
            left="0"
            zIndex="overlay"
            {...props}
            onClick={onClose}
            __css={styles.overlay}
          />
        )}
      </AnimatePresence>
    </Portal>
  )
}

SidebarToggleButton.displayName = 'SidebarToggleButton'

/**
 * Sidebar section that can contain sidebar items.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarSection: React.FC<SidebarSectionProps> = (props) => {
  const { direction = 'column', ...rest } = props
  const styles = useSidebarStyles()
  const sectionStyles = {
    display: 'flex',
    flexDirection: direction,
    ...styles.section,
  }

  return (
    <chakra.div
      __css={sectionStyles}
      {...rest}
      className={cx('sui-sidebar__section', props.className)}
    />
  )
}

SidebarSection.displayName = 'SidebarSection'
