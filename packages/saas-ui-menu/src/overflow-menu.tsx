import * as React from 'react'
import {
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  MenuListProps,
  IconButton,
  ThemeTypings,
  SystemProps,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'
import { MoreIcon } from './icons'

export interface OverflowMenuProps extends MenuProps {
  /**
   * The button (aria) label.
   */
  label?: string
  /**
   * The MenuButton variant.
   */
  variant?: 'Button' extends keyof ThemeTypings['components']
    ? ThemeTypings['components']['Button']['variants']
    : string
  /**
   * The MenuButton size
   */
  size?: 'Button' extends keyof ThemeTypings['components']
    ? ThemeTypings['components']['Button']['sizes']
    : SystemProps['boxSize']
  /**
   * Props passed to the MenuList.
   */
  menuListProps?: MenuListProps
  /**
   * Render a custom icon.
   */
  icon?: React.ReactNode
}

export const OverflowMenu: React.FC<OverflowMenuProps> = (props) => {
  const {
    variant = 'ghost',
    size,
    label = 'More',
    icon = <MoreIcon />,
    menuListProps,
    children,
    ...rest
  } = props
  return (
    <Menu {...rest}>
      <MenuButton
        as={IconButton}
        icon={icon}
        aria-label={label}
        variant={variant}
        size={size}
      ></MenuButton>
      <MenuList {...menuListProps}>{children}</MenuList>
    </Menu>
  )
}

if (__DEV__) {
  OverflowMenu.displayName = 'OverflowMenu'
}
