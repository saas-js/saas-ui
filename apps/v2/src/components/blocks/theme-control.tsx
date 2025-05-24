import React, { useState } from 'react'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react'

import { LuPaintbrush } from 'react-icons/lu'

interface ColorControlProps {
  onChange(color: string): void
  value: string
}

const themes: Record<string, string> = {
  'saas-ui': 'Saas UI',
  glass: 'Glass',
}

export function ThemeControl({ onChange, value }: ColorControlProps) {
  // @todo remove this hack to prevent hydration errors
  const initializedRef = React.useRef(false)
  React.useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
    }
  }, [])

  if (!initializedRef.current) {
    return null
  }

  return (
    <Menu>
      <MenuButton as={Button} leftIcon={<LuPaintbrush />} variant="tertiary">
        {themes[value]}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup value={value} onChange={onChange} type="radio">
          <MenuItemOption value="saas-ui">Saas UI (default)</MenuItemOption>
          <MenuItemOption value="glass">Glass</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
