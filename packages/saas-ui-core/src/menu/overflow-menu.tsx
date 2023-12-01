import * as React from 'react'
import {
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  MenuListProps,
  IconButton,
  ThemeTypings,
} from '@chakra-ui/react'
import { MoreIcon } from './icons'

export interface OverflowMenuProps extends Omit<MenuProps, 'size'> {
  /**
   * The button (aria) label.
   */
  label?: string
  /**
   * The MenuButton variant.
   */
  variant?: 'Button' extends keyof ThemeTypings['components']
    ? /* @ts-ignore */
      ThemeTypings['components']['Button']['variants']
    : string
  /**
   * The MenuButton size
   */
  size?: 'IconButton' extends keyof ThemeTypings['components']
    ? /* @ts-ignore */
      ThemeTypings['components']['IconButton']['sizes']
    : string
  /**
   * Props passed to the MenuList.
   */
  menuListProps?: MenuListProps
  /**
   * Render a custom icon.
   */
  icon?: React.ReactElement

  children: React.ReactNode
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
      />
      <MenuList {...menuListProps}>{children}</MenuList>
    </Menu>
  )
}

OverflowMenu.displayName = 'OverflowMenu'
