'use client'

import * as React from 'react'

import { NativeSelect as Select } from '@chakra-ui/react/native-select'

import { ChevronDownIcon } from '../icons'

export interface NativeSelectProps extends Select.RootProps {
  icon?: React.ReactNode
  placeholder?: string
}

export const NativeSelect = React.forwardRef<HTMLDivElement, NativeSelectProps>(
  function NativeSelect(props, ref) {
    const { icon = <ChevronDownIcon />, placeholder, children, ...rest } = props
    return (
      <Select.Root ref={ref} {...rest}>
        <Select.Field placeholder={placeholder}>
          {children}
          <Select.Indicator>{icon}</Select.Indicator>
        </Select.Field>
      </Select.Root>
    )
  },
)
