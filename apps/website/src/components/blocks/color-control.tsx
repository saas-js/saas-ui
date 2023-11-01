import { useState } from 'react'
import { FiPenTool, FiCheck } from 'react-icons/fi'
import {
  Box,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useTheme,
} from '@chakra-ui/react'

interface ColorControlProps {
  onChange(color: string): void
  value: string
}

export function ColorControl({ onChange, value }: ColorControlProps) {
  const [opened, setOpened] = useState(false)
  const theme = useTheme()
  const colors = Object.keys(theme.colors).map((color) => ({
    swatch: theme.colors[color][6],
    color,
  }))

  const swatches = colors.map(({ color, swatch }) => (
    <Box
      as="button"
      type="button"
      onClick={() => onChange(color)}
      key={color}
      color={swatch}
      style={{ color: theme.white, cursor: 'pointer' }}
    >
      {value === color && <FiCheck size={10} />}
    </Box>
  ))

  return (
    <Popover
      isOpen={opened}
      onClose={() => setOpened(false)}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Box
          as="button"
          type="button"
          color={theme.colors[value][6]}
          onClick={() => setOpened((o) => !o)}
          style={{ display: 'block', cursor: 'pointer' }}
        >
          <FiPenTool style={{ width: 14, height: 14 }} color="#fff" />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <Stack gap="xs">{swatches}</Stack>
      </PopoverContent>
    </Popover>
  )
}
