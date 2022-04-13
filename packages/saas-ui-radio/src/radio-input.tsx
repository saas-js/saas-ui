import * as React from 'react'

import {
  forwardRef,
  Stack,
  RadioGroup,
  RadioGroupProps,
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
  SystemProps,
  StackDirection,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

interface Option extends ChakraRadioProps {
  value: string
  label: string
}

interface RadioInputOptions {
  options: Option[]
  spacing?: SystemProps['margin']
  direction?: StackDirection
}

export interface RadioProps extends RadioGroupProps, RadioInputOptions {}

export const RadioInput = forwardRef<RadioProps, 'div'>(
  ({ options, spacing, direction, ...props }, ref) => {
    const { onBlur, onChange, ...groupProps } = props

    return (
      <RadioGroup onChange={onChange} {...groupProps}>
        <Stack spacing={spacing} direction={direction}>
          {options.map(({ value, label, ...radioProps }, i) => {
            return (
              <ChakraRadio
                key={i}
                onBlur={onBlur}
                value={value}
                ref={ref}
                {...radioProps}
              >
                {label || value}
              </ChakraRadio>
            )
          })}
        </Stack>
      </RadioGroup>
    )
  }
)

if (__DEV__) {
  RadioInput.displayName = 'RadioInput'
}
