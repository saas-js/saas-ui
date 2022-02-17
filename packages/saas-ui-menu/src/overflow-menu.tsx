import * as React from 'react'
import {
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  IconButton,
  ThemeTypings,
  SystemProps,
} from '@chakra-ui/react'

import { MoreIcon } from './icons'

export interface OverflowMenuProps extends MenuProps {
  /**
   * The button (aria) label
   */
  label?: string
  /**
   * The MenuButton variant
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
}

export const OverflowMenu: React.FC<OverflowMenuProps> = (props) => {
  const { variant = 'ghost', size, label = 'More', children, ...rest } = props
  return (
    <Menu {...rest}>
      <MenuButton
        as={IconButton}
        icon={<MoreIcon />}
        label={label}
        variant={variant}
        size={size}
      ></MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  )
}
