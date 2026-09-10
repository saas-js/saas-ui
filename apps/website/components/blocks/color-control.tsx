import React, { useState } from 'react'

import {
  Badge,
  IconButton,
  Popover,
  Stack,
  useChakraContext,
} from '@chakra-ui/react'
import { LuCheck } from 'react-icons/lu'

interface ColorControlProps {
  onChange(color: string): void
  value: string
}

const ignore = [
  'black',
  'white',
  'gray',
  'transparent',
  'current',
  'code',
  'linkedin',
  'facebook',
  'messenger',
  'whatsapp',
  'twitter',
  'telegram',
]

export function ColorControl({ onChange, value }: ColorControlProps) {
  const [opened, setOpened] = useState(false)
  const system = useChakraContext()

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

  const colors = Array.from(system.tokens.colorPaletteMap.keys()).filter(
    (color) => !color.match('Alpha') && !ignore.includes(color),
  )

  const swatches = colors.map((color) => (
    <IconButton
      aria-label={color}
      onClick={() => onChange(color)}
      rounded="full"
      size="xs"
      key={color}
      bg={`${color}.500`}
      color="white"
      _selected={{
        outline: '2px solid',
        outlineOffset: '1px',
        outlineColor: `${color}.500`,
        _hover: {
          bg: `${color}.500`,
        },
      }}
      _hover={{
        bg: `${color}.400`,
      }}
      data-selected={value === color ? '' : undefined}
    >
      {value === color && <LuCheck size="1.2em" />}
    </IconButton>
  ))

  return (
    <Popover.Root
      open={opened}
      onOpenChange={(details) => setOpened(details.open)}
      positioning={{ placement: 'bottom-end' }}
      lazyMount
    >
      <Popover.Trigger asChild>
        <IconButton aria-label="Change primary color" variant="ghost">
          <Badge rounded="full" boxSize="3" bg={`${value}.500`} />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Stack gap="2" flexDirection="row" flexWrap="wrap" p="2">
            {swatches}
          </Stack>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
