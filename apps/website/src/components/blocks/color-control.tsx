import React, { useState } from 'react'
import { FiPenTool, FiCheck } from 'react-icons/fi'
import {
  Box,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useTheme,
  IconButton,
  Badge,
} from '@chakra-ui/react'
import { LuCheck, LuPenTool } from 'react-icons/lu'

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
  const theme = useTheme()

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

  const colors = Object.keys(theme.colors)
    .filter((color) => !color.match('Alpha') && !ignore.includes(color))
    .map((color) => ({
      swatch: theme.colors[color][500],
      color,
    }))

  const swatches = colors.map(({ color, swatch }) => (
    <IconButton
      aria-label={color}
      onClick={() => onChange(color)}
      isRound
      size="xs"
      key={color}
      bg={swatch}
      style={{ color: theme.white, cursor: 'pointer' }}
    >
      {value === color && <LuCheck size="1.2em" />}
    </IconButton>
  ))

  return (
    <Popover
      isOpen={opened}
      onClose={() => setOpened(false)}
      placement="bottom-end"
      isLazy
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Change primary color"
          icon={
            <Badge rounded="full" boxSize="3" bg={theme.colors[value][500]} />
          }
          variant="tertiary"
          onClick={() => setOpened((o) => !o)}
        />
      </PopoverTrigger>
      <PopoverContent>
        <Stack gap="2" flexDirection="row" flexWrap="wrap" p="2">
          {swatches}
        </Stack>
      </PopoverContent>
    </Popover>
  )
}
