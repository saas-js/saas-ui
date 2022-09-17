import * as React from 'react'

import {
  chakra,
  Collapse,
  HTMLChakraProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { runIfFn, cx } from '@chakra-ui/utils'

import {
  CollapseProvider,
  useCollapseContext,
  useCollapse,
} from '@saas-ui/react'

import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { NavGroupStylesProvider, useNavGroupStyles } from './nav-context'

export interface NavGroupTitleProps extends HTMLChakraProps<'div'> {
  leftIcon?: React.ReactElement
  collapseIcon?: MaybeRenderProp<{ isOpen: boolean }>
  isCollapsible?: boolean
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

  const iconStyles = { display: 'inline-flex', marginEnd: 2 }

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
      {leftIcon && (
        <chakra.span __css={{ ...iconStyles, ...styles.icon }}>
          {leftIcon}
        </chakra.span>
      )}
      <chakra.span flex="1">{runIfFn(children, { isOpen })}</chakra.span>
      {isCollapsible && runIfFn(collapseIcon, { isOpen })}
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
