import * as React from 'react'

import { Badge, type BadgeProps } from '@chakra-ui/react/badge'
import { FormatNumber } from '@chakra-ui/react/format'
import { Stat as ChakraStat } from '@chakra-ui/react/stat'

interface StatValueTextProps extends ChakraStat.ValueTextProps {
  value?: number
  formatOptions?: Intl.NumberFormatOptions
}

const StatValueText = React.forwardRef<HTMLDivElement, StatValueTextProps>(
  function StatValueText(props, ref) {
    const { value, formatOptions, children, ...rest } = props
    return (
      <ChakraStat.ValueText {...rest} ref={ref}>
        {children ||
          (value != null && <FormatNumber value={value} {...formatOptions} />)}
      </ChakraStat.ValueText>
    )
  },
)

const StatUpTrend = React.forwardRef<HTMLDivElement, BadgeProps>(
  function StatUpTrend(props, ref) {
    return (
      <Badge colorPalette="green" gap="0" {...props} ref={ref}>
        <ChakraStat.UpIndicator />
        {props.children}
      </Badge>
    )
  },
)

const StatDownTrend = React.forwardRef<HTMLDivElement, BadgeProps>(
  function StatDownTrend(props, ref) {
    return (
      <Badge colorPalette="red" gap="0" {...props} ref={ref}>
        <ChakraStat.DownIndicator />
        {props.children}
      </Badge>
    )
  },
)

export const Root = ChakraStat.Root
export const Label = ChakraStat.Label
export const HelpText = ChakraStat.HelpText
export const ValueUnit = ChakraStat.ValueUnit

export type RootProps = ChakraStat.RootProps
export type ValueTextProps = StatValueTextProps

export {
  StatValueText as ValueText,
  StatUpTrend as UpTrend,
  StatDownTrend as DownTrend,
}
