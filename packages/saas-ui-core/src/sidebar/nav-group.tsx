import * as React from 'react'

import {
  chakra,
  Collapse,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { runIfFn, cx } from '@chakra-ui/utils'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { ChevronDownIcon, ChevronRightIcon } from '../icons'

import { CollapseProvider, useCollapseContext, useCollapse } from '../collapse'

import { NavGroupStylesProvider, useNavGroupStyles } from './nav-context'

export interface NavGroupTitleProps extends HTMLChakraProps<'div'> {
  leftIcon?: React.ReactElement
  collapseIcon?: MaybeRenderProp<{ isOpen: boolean }>
  isCollapsible?: boolean
}

const NavGroupIcon: React.FC<HTMLChakraProps<'span'>> = (props) => {
  const { children, className, ...rest } = props

  const _children = React.isValidElement<any>(children)
    ? React.cloneElement(children, {
        'aria-hidden': true,
        focusable: false,
      })
    : children

  const _className = cx('sui-nav-group__icon', className)

  return (
    <chakra.span
      display="inline-flex"
      alignSelf="center"
      flexShrink={0}
      {...rest}
      className={_className}
    >
      {_children}
    </chakra.span>
  )
}

export const NavGroupTitle: React.FC<NavGroupTitleProps> = (props) => {
  const {
    leftIcon,
    collapseIcon = ({ isOpen }) =>
      isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />,
    children,
    ...rest
  } = props
  const styles = useNavGroupStyles()

  const { getToggleProps, isOpen, isCollapsible } = useCollapseContext()

  const iconStyles = { marginEnd: 2, ...styles.icon }

  const toggleProps = getToggleProps(rest)

  return (
    <chakra.div
      {...toggleProps}
      __css={styles.title}
      className={cx(
        'saas-nav-group__title',
        props.className,
        toggleProps.className
      )}
    >
      {leftIcon && <NavGroupIcon __css={iconStyles}>{leftIcon}</NavGroupIcon>}
      <chakra.span flex="1">{runIfFn(children, { isOpen })}</chakra.span>
      {isCollapsible && (
        <NavGroupIcon>{runIfFn(collapseIcon, { isOpen })}</NavGroupIcon>
      )}
    </chakra.div>
  )
}

NavGroupTitle.displayName = 'NavGroupTitle'

export interface NavGroupProps
  extends Omit<HTMLChakraProps<'div'>, 'title'>,
    ThemingProps<'SuiNavGroup'> {
  title?: React.ReactNode
  isCollapsible?: boolean
  defaultIsOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  icon?: React.ReactElement
}

export const NavGroupContent: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useNavGroupStyles()
  return (
    <chakra.div
      {...props}
      __css={styles.content}
      className={cx('sui-nav-group__content', props.className)}
    />
  )
}

/**
 * Navigation group containing nav items, used in Sidebar.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const NavGroup: React.FC<NavGroupProps> = (props) => {
  const {
    title,
    icon,
    isCollapsible = true,
    defaultIsOpen = true,
    onOpen,
    onClose,
    children,
    ...rest
  } = props
  const styles = useMultiStyleConfig('SuiNavGroup', props)

  const collapse = useCollapse(props)
  const { getCollapseProps } = collapse

  let header = title
  if (typeof title === 'string') {
    header = <NavGroupTitle leftIcon={icon}>{title}</NavGroupTitle>
  }

  let content = <NavGroupContent>{children}</NavGroupContent>

  if (isCollapsible) {
    content = <Collapse {...(getCollapseProps() as any)}>{content}</Collapse>
  }

  return (
    <NavGroupStylesProvider value={styles}>
      <CollapseProvider value={collapse}>
        <chakra.div
          __css={{
            userSelect: 'none',
            ...styles.container,
          }}
          {...rest}
          className={cx('sui-nav-group', props.className)}
          role="group"
        >
          {header}
          {content}
        </chakra.div>
      </CollapseProvider>
    </NavGroupStylesProvider>
  )
}

NavGroup.displayName = 'NavGroup'
