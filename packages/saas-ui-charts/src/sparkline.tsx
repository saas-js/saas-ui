import { forwardRef, useId } from 'react'

import { Box, BoxProps, useToken } from '@chakra-ui/react'
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts'
import type { CurveProps } from 'recharts'

import { createCategoryColors } from './utils'

export interface SparklineProps extends Omit<BoxProps, 'animationDuration'> {
  /**
   * The chart data.
   */
  data: Array<Record<string, string | number>>
  /**
   * The categories to display, values map to keys in data.
   * @default ['value']
   */
  categories?: string[]
  /**
   * Colors to use for each category.
   * @default ['primary', 'gray']
   */
  colors?: string[]
  /**
   * The curve type of the area.
   */
  curveType?: CurveProps['type']
  /**
   * The width of the line.
   */
  strokeWidth?: number
  /**
   * The sparkline variant.
   * @default gradient
   */
  variant?: 'line' | 'solid' | 'gradient'
  /**
   * Whether to show animation.
   * @default false
   */
  showAnimation?: boolean
  /**
   * The animation duration.
   * @default 500
   */
  animationDuration?: number
  /**
   * Whether to connect null values.
   * @default true
   */
  connectNulls?: boolean
  /**
   * Whether to stack the categories.
   * @default false
   */
  stack?: boolean
}

/**
 * Sparkline
 * @see Docs https://saas-ui.dev/docs/components/visualization/sparkline
 */
export const Sparkline = forwardRef<HTMLDivElement, SparklineProps>(
  (props, ref) => {
    const {
      data = [],
      categories = ['value'],
      curveType,
      colors = ['accent', 'gray'],
      strokeWidth = 1,
      variant = 'gradient',
      showAnimation = false,
      animationDuration = 500,
      connectNulls = true,
      stack = false,
      ...rest
    } = props

    const id = useId()

    const colorTokens = useToken(
      'colors',
      colors.map((c) => (c.includes('.') ? c : `${c}.solid`)),
    )

    const categoryColors = createCategoryColors(categories, colorTokens)

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
        ref={ref}
        {...rest}
        css={[
          {
            '--sparkline-fill-opacity': '0.2',
            '--sparkline-gradient-start-opacity': '0.8',
            '--sparkline-gradient-end-opacity': '0',
          },
          rest.css,
        ]}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth="0">
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
  },
)
