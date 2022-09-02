import * as React from 'react'

import {
  chakra,
  StackProps,
  Collapse,
  omitThemingProps,
  HTMLChakraProps,
  ChakraProps,
  ThemingProps,
  SystemProps,
  useMultiStyleConfig,
  useBreakpointValue,
  SystemStyleObject,
  IconButton,
  IconButtonProps,
  createStylesContext,
  useDisclosure,
  Portal,
} from '@chakra-ui/react'

import { cx, __DEV__, runIfFn, dataAttr } from '@chakra-ui/utils'

import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion'

import {
  CollapseProvider,
  useCollapseContext,
  useCollapse,
  Divider,
} from '@saas-ui/react'

export {
  MenuGroup as SidebarMenuGroup,
  MenuDivider as SidebarMenuDivider,
} from '@chakra-ui/react'

import { SidebarProvider, useSidebarContext } from './use-sidebar'

import { MaybeRenderProp } from '@chakra-ui/react-utils'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from '@chakra-ui/icons'

const [StylesProvider, useStyles] = createStylesContext('Sidebar')

export interface SidebarProps
  extends Omit<HTMLMotionProps<'div'>, 'color' | 'transition'>,
    Omit<ChakraProps, 'css'>,
    ThemingProps<'Sidebar'> {
  /**
   * Spacing between child elements.
   */
  spacing?: SystemProps['margin']
  /**
   * Define breakpoints for the mobile nav.
   *
   * @default object { sm: true, lg: false }
   */
  breakpoints?: Record<string, boolean>

  isOpen?: boolean

  onOpen?: () => void

  onClose?: () => void
}

const MotionBox = chakra(motion.div)

export const Sidebar: React.FC<SidebarProps> = (props) => {
  return <SidebarContainer {...props} />
}

if (__DEV__) {
  Sidebar.displayName = 'Sidebar'
}

export const SidebarContainer: React.FC<SidebarProps> = (props) => {
  const styles = useMultiStyleConfig('Sidebar', props) as Record<
    string,
    SystemStyleObject
  >

  const { variant, size } = props

  const isCondensed = variant === 'condensed'

  const {
    spacing = 4,
    children,
    breakpoints = { base: true, lg: false },
    className,
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    ...containerProps
  } = omitThemingProps(props)

  const isMobile = useBreakpointValue(breakpoints, {
    fallback: undefined,
  })

  const isInitial = typeof isMobile === 'undefined'
  const isCollapsible = isMobile && !isCondensed

  const disclosure = useDisclosure({
    defaultIsOpen: !isCollapsible,
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  })

  const { isOpen, onClose, onOpen } = disclosure

  React.useEffect(() => {
    if (isInitial || isCondensed) {
      // make sure we do not show an initial animation or when this is a condensed sidebar
      return
    }
    isMobile ? onClose() : onOpen()
  }, [isInitial, isCondensed, isMobile])

  const containerStyles: SystemStyleObject = {
    ...(isCollapsible
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

  const innerStyles: SystemStyleObject = {
    '& > *:not(style) ~ *:not(style)': {
      marginTop: spacing,
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }

  const context = {
    ...disclosure,
    isMobile,
    variant,
    size,
  }

  return (
    <SidebarProvider value={context}>
      <StylesProvider value={styles}>
        <MotionBox
          initial={false}
          animate={!isInitial && (!isCollapsible || isOpen ? 'enter' : 'exit')}
          variants={{
            enter: {
              left: 0,
              transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
            },
            exit: {
              left: '-100%',
            },
          }}
          __css={{
            ...containerStyles,
            ...styles.container,
          }}
          {...containerProps}
          id={disclosure.getDisclosureProps().id}
          className={cx(
            'saas-sidebar',
            isCondensed && 'saas-sidebar__condensed',
            className
          )}
        >
          <chakra.div __css={innerStyles}>{children}</chakra.div>
        </MotionBox>
      </StylesProvider>
    </SidebarProvider>
  )
}

if (__DEV__) {
  SidebarContainer.displayName = 'SidebarContainer'
}

export interface SidebarToggleButtonProps
  extends Omit<IconButtonProps, 'aria-label'> {}

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = (
  props
) => {
  const sidebar = useSidebarContext()

  const styles = useStyles()

  const buttonStyles = {
    position: 'fixed',
    top: 3,
    left: 4,
    ...styles.toggle,
  }

  return sidebar.isMobile ? (
    <chakra.div height="8">
      <IconButton
        variant="ghost"
        icon={<HamburgerIcon />}
        {...sidebar.getButtonProps(props)}
        {...props}
        aria-label="Toggle sidebar"
        sx={buttonStyles}
      />
    </chakra.div>
  ) : null
}

export interface SidebarOverlayProps extends ChakraProps {}

export const SidebarOverlay: React.FC<SidebarOverlayProps> = (props) => {
  const { onClose, isOpen, isMobile } = useSidebarContext()

  const styles = useStyles()

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

if (__DEV__) {
  SidebarToggleButton.displayName = 'SidebarToggleButton'
}

export const SidebarDivider = Divider

export const SidebarOverflow: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()
  const overflowStyles = {
    overflow: 'auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    ...styles.overflow,
  }
  return <chakra.div __css={overflowStyles} {...props} />
}

if (__DEV__) {
  SidebarOverflow.displayName = 'SidebarOverflow'
}

export const SidebarNav: React.FC<StackProps> = (props) => {
  const styles = useStyles()

  const { children, spacing, direction, ...rest } = props

  return (
    <chakra.nav
      __css={styles.nav}
      flexDirection={direction}
      {...rest}
      role="navigation"
    >
      {children}
    </chakra.nav>
  )
}

SidebarNav.defaultProps = {
  spacing: 2,
  direction: 'column',
}

if (__DEV__) {
  SidebarNav.displayName = 'SidebarNav'
}

export interface SidebarNavGroupTitleProps extends HTMLChakraProps<'div'> {
  leftIcon?: React.ReactElement
  collapseIcon?: MaybeRenderProp<{ isOpen: boolean }>
  isCollapsible?: boolean
}

export const SidebarNavGroupTitle: React.FC<SidebarNavGroupTitleProps> = (
  props
) => {
  const {
    leftIcon,
    collapseIcon = ({ isOpen }) =>
      isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />,
    children,
    ...rest
  } = props
  const styles = useStyles()

  const { getToggleProps, isOpen, isCollapsible } = useCollapseContext()

  const iconStyles = { display: 'inline-flex', marginEnd: 2 }

  return (
    <chakra.div {...getToggleProps(rest)} __css={styles.groupTitle}>
      {leftIcon && (
        <chakra.span __css={{ ...iconStyles, ...styles.groupIcon }}>
          {leftIcon}
        </chakra.span>
      )}
      <chakra.span flex="1">{runIfFn(children, { isOpen })}</chakra.span>
      {isCollapsible && runIfFn(collapseIcon, { isOpen })}
    </chakra.div>
  )
}

if (__DEV__) {
  SidebarNavGroupTitle.displayName = 'SidebarNavGroupTitle'
}

export interface SidebarNavGroupProps
  extends Omit<HTMLChakraProps<'div'>, 'title'> {
  title?: React.ReactNode
  isCollapsible?: boolean
  defaultIsOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  icon?: React.ReactElement
}

export const SidebarNavGroup: React.FC<SidebarNavGroupProps> = (props) => {
  const {
    title,
    icon,
    isCollapsible,
    defaultIsOpen,
    onOpen,
    onClose,
    children,
    ...rest
  } = props
  const styles = useStyles()

  const collapse = useCollapse(props)

  const { getCollapseProps } = collapse

  const header = title && (
    <SidebarNavGroupTitle leftIcon={icon}>{title}</SidebarNavGroupTitle>
  )

  let content = <chakra.div>{children}</chakra.div>

  if (isCollapsible) {
    content = <Collapse {...(getCollapseProps() as any)}>{content}</Collapse>
  }

  return (
    <CollapseProvider value={collapse}>
      <chakra.div
        __css={{
          userSelect: 'none',
          ...styles.group,
        }}
        {...rest}
        role="group"
      >
        {header}
        {content}
      </chakra.div>
    </CollapseProvider>
  )
}

if (__DEV__) {
  SidebarNavGroup.displayName = 'SidebarNavGroup'
}

SidebarNavGroup.defaultProps = {
  defaultIsOpen: true,
  isCollapsible: false,
}
