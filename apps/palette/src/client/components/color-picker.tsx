import { useEffect, useId, useState } from 'react'

import {
  Box,
  Flex,
  Input,
  type InputProps,
  VisuallyHidden,
} from '@saas-ui/react'

interface ColorPickerProps extends Omit<InputProps, 'onChange'> {
  onChange: (value: string) => void
}

export default function ColorPicker({ onChange, ...props }: ColorPickerProps) {
  const id = useId()

  const [inputValue, setInputValue] = useState<string>(props.value as string)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(inputValue)
    }, 150)
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  return (
    <Flex boxSize={8}>
      <Box
        asChild
        position="relative"
        boxSize={8}
        bg={props.value}
        rounded={'l2'}
        border={'1px solid'}
        borderColor={'border'}
      >
        {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
        <label htmlFor={id} />
      </Box>
      <VisuallyHidden>
        <Input
          id={id}
          type="color"
          w="10"
          p="0"
          boxShadow={'md'}
          onChange={(e) => setInputValue(e.target.value)}
          {...props}
        />
      </VisuallyHidden>
    </Flex>
  )
}

// <ColorPicker.Root>
// 			<ColorPicker.HiddenInput />
// 			<ColorPicker.Label />
// 			<ColorPicker.Control>
// 				<ColorPicker.Input />
// 				<ColorPicker.Trigger />
// 			</ColorPicker.Control>
// 			<ColorPicker.Positioner>
// 				<ColorPicker.Content>
// 					<ColorPicker.Area />
// 					<ColorPicker.EyeDropper />
// 					<ColorPicker.Sliders />
// 					<ColorPicker.SwatchGroup>

// 					</ColorPicker.SwatchGroup>
// 				</ColorPicker.Content>
// 			</ColorPicker.Positioner>
// 		</ColorPicker.Root>
