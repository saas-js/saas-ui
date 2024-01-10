import { Box, BoxProps, useId, useTheme } from '@chakra-ui/react'

import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'
import type { CurveProps } from 'recharts'
import { createCategoryColors } from './utils'

export interface SparklineProps extends BoxProps {
  data: Array<Record<string, string | number>>
  categories?: string[]
  colors?: string[]
  curveType?: CurveProps['type']
  limit?: number
  color?: string
  strokeWidth?: number
  variant?: 'line' | 'solid' | 'gradient'
  showAnimation?: boolean
  animationDuration?: number
  connectNulls?: boolean
  stack?: boolean
}

export const Sparkline = (props: SparklineProps) => {
  const {
    data = [],
    categories = ['value'],
    curveType,
    colors = ['primary', 'gray'],
    strokeWidth = 1,
    variant = 'gradient',
    showAnimation = false,
    animationDuration = 500,
    connectNulls = false,
    stack = false,
    ...rest
  } = props
  const theme = useTheme()

  const id = useId()

  const categoryColors = createCategoryColors(categories, colors, theme)
  const getColor = (category: string) => {
    return categoryColors[category]
  }

  const getGradientId = (category: string) => {
    return `${id}-${category}-gradient`
  }

  const getFill = (category: string) => {
    switch (variant) {
      case 'solid':
        return getColor(category)
      case 'gradient':
        return `url(#${getGradientId(category)})`
      default:
        return 'transparent'
    }
  }

  return (
    <Box
      {...rest}
      sx={{
        '--sparkline-fill-opacity': '0.2',
        '--sparkline-gradient-start-opacity': '0.8',
        '--sparkline-gradient-end-opacity': '0',
        ...rest.sx,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            {categories.map((category) => (
              <linearGradient
                key={category}
                id={getGradientId(category)}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={getColor(category)}
                  stopOpacity="var(--sparkline-gradient-start-opacity))"
                />
                <stop
                  offset="95%"
                  stopColor={getColor(category)}
                  stopOpacity="var(--sparkline-gradient-end-opacity)"
                />
              </linearGradient>
            ))}
          </defs>

          <YAxis
            tick={false}
            axisLine={false}
            width={0}
            domain={['dataMin', 'dataMax']}
          />

          {categories.map((category) => (
            <Area
              key={category}
              dataKey={category}
              stroke={getColor(category)}
              strokeWidth={strokeWidth}
              fill={getFill(category)}
              fillOpacity="var(--sparkline-fill-opacity)"
              type={curveType}
              isAnimationActive={showAnimation}
              animationDuration={animationDuration}
              connectNulls={connectNulls}
              stackId={stack ? 'a' : undefined}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

/**
 * @deprecated Use `Sparkline` instead.
 */
export const Sparklines = Sparkline
