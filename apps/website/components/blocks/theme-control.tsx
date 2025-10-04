import React, { useState } from 'react'

import { Button, Menu } from '@saas-ui/react'
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
    <Menu.Root>
      <Menu.Button as={Button} leftIcon={<LuPaintbrush />} variant="tertiary">
        {themes[value]}
      </Menu.Button>
      <Menu.Content>
        <Menu.RadioItemGroup
          value={value}
          onValueChange={({ value }) => onChange(value)}
        >
          <Menu.RadioItem value="saas-ui">Saas UI (default)</Menu.RadioItem>
          <Menu.RadioItem value="glass">Glass</Menu.RadioItem>
        </Menu.RadioItemGroup>
      </Menu.Content>
    </Menu.Root>
  )
}
