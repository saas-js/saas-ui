import * as React from 'react'

import {
  forwardRef,
  Stack,
  RadioGroup,
  RadioGroupProps,
  Radio,
  RadioProps,
  SystemProps,
  StackDirection,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

interface Option extends RadioProps {
  value: string
  label: string
}

interface RadioInputOptions {
  options: Option[]
  spacing?: SystemProps['margin']
  direction?: StackDirection
}

export interface RadioInputProps extends RadioGroupProps, RadioInputOptions {}

export const RadioInput = forwardRef<RadioInputProps, 'div'>(
  ({ options, spacing, direction, ...props }, ref) => {
    const { onBlur, onChange, ...groupProps } = props

    return (
      <RadioGroup onChange={onChange} {...groupProps}>
        <Stack spacing={spacing} direction={direction}>
          {options.map(({ value, label, ...radioProps }, i) => {
            return (
              <Radio
                key={i}
                onBlur={onBlur}
                value={value}
                ref={ref}
                {...radioProps}
              >
                {label || value}
              </Radio>
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
