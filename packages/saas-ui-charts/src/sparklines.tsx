import * as React from 'react'

import { Box, BoxProps, useId, useTheme } from '@chakra-ui/react'

import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import type { CurveProps } from 'recharts'

export interface SparklineProps extends BoxProps, Pick<CurveProps, 'type'> {
  data: Array<number>
  limit?: number
  color?: string
  fillColor?: string
  strokeWidth?: number
  gradientOpacity?: number
  variant?: 'line' | 'solid' | 'gradient'
}

export const Sparklines = (props: SparklineProps) => {
  const {
    data = [],
    type = 'monotone',
    color = 'blue',
    fillColor,
    strokeWidth,
    gradientOpacity = 0.8,
    variant,
    ...rest
  } = props
  const theme = useTheme()

  const strokeColor = theme.colors[color]?.[500]

  const id = useId()

  const fill = (() => {
    switch (variant) {
      case 'solid':
        return fillColor || strokeColor
      case 'gradient':
        return `url(#${id}-gradient)`
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
          <defs>
            <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={strokeColor}
                stopOpacity={gradientOpacity}
              />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
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
