import * as React from 'react'

import { Box, BoxProps, useTheme, SystemProps } from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'

import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import type { CurveProps } from 'recharts'

export interface SparklineProps extends BoxProps, Pick<CurveProps, 'type'> {
  data: Array<number>
  limit?: number
  color?: string
  fillColor?: string
  strokeWidth?: number
  variant?: 'line' | 'solid' | 'gradient'
}

export const Sparklines = (props: SparklineProps) => {
  const {
    data = [],
    type = 'monotone',
    color = 'blue',
    fillColor,
    strokeWidth,
    variant,
    ...rest
  } = props
  const theme = useTheme()

  const strokeColor = theme.colors[color]?.[500]

  const fill = (() => {
    switch (variant) {
      case 'solid':
        return fillColor || strokeColor
      case 'gradient':
        return 'url(#chart-gradient)'
      default:
        return 'transparent'
    }
  })()

  const mappedData = data?.map((datum, i) => {
    return {
      v: datum,
    }
  })

  return (
    <Box {...rest}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={300}
          height={100}
          data={mappedData}
          margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
        >
          <Area
            dataKey="v"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill={fill}
            type={type}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
