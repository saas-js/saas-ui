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
import { FieldOptions, FieldOption } from '../types'
import { mapOptions } from '../utils'

export interface RadioOption
  extends Omit<RadioProps, 'value' | 'label'>,
    FieldOption {}

export type RadioOptions = FieldOptions<RadioOption>

interface RadioInputOptions {
  options: RadioOptions
  spacing?: SystemProps['margin']
  direction?: StackDirection
}

export interface RadioInputProps
  extends Omit<RadioGroupProps, 'children'>,
    RadioInputOptions {}

export const RadioInput = forwardRef<RadioInputProps, 'div'>(
  ({ options: optionsProp, spacing, direction, ...props }, ref) => {
    const { onBlur, onChange, ...groupProps } = props

    const options = mapOptions(optionsProp)

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

RadioInput.displayName = 'RadioInput'
