import * as React from 'react'

import {
  chakra,
  Collapse,
  HTMLChakraProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { runIfFn, cx } from '@chakra-ui/utils'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'

import {
  CollapseProvider,
  useCollapseContext,
  useCollapse,
} from '@saas-ui/collapse'

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

  const _className = cx('saas-nav-group__icon', className)

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

export interface NavGroupProps extends Omit<HTMLChakraProps<'div'>, 'title'> {
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
      className={cx('saas-nav-group__content', props.className)}
    />
  )
}

export const NavGroup: React.FC<NavGroupProps> = (props) => {
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
  const styles = useMultiStyleConfig('NavGroup', props)

  const collapse = useCollapse(props)
  const { getCollapseProps } = collapse

  const header = title && <NavGroupTitle leftIcon={icon}>{title}</NavGroupTitle>

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
          className={cx('saas-nav-group', props.className)}
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

NavGroup.defaultProps = {
  defaultIsOpen: true,
  isCollapsible: false,
}
