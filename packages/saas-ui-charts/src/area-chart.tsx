import * as React from 'react'

import { Box, type BoxProps, useToken } from '@chakra-ui/react'
import {
  Area,
  CartesianGrid,
  Legend,
  AreaChart as ReAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { AxisDomain } from 'recharts/types/util/types'

import { ChartLegend } from './legend'
import { ChartTooltip } from './tooltip'
import { BaseChartProps, CurveType } from './types'
import { createCategoryColors } from './utils'

export interface AreaChartProps
  extends Omit<BoxProps, 'animationDuration' | 'height'>,
    BaseChartProps {
  /**
   * Whether to connect null values.
   */
  connectNulls?: boolean
  /**
   * The curve type of the area.
   */
  curveType?: CurveType
  /**
   * The width of the line.
   */
  strokeWidth?: string | number
  /**
   * Whether to stack the areas.
   */
  stack?: boolean
  /**
   * The type of offset function used to generate the lower and upper values in the series array. The four types are built-in offsets in d3-shape.
   */
  stackOffset?: 'expand' | 'none' | 'wiggle' | 'silhouette'
  /**
   * The area chart variant.
   * @default gradient
   */
  variant?: 'solid' | 'gradient' | 'line'
  /**
   * The lower bound of the y-axis.
   * @default 0
   */
  minValue?: number | 'auto'

  /**
   * The upper bound of the y-axis.
   * @default 'auto'
   */
  maxValue?: number | 'auto'
}

/**
 * AreaChart
 * @see Docs https://saas-ui.dev/docs/components/visualization/area-chart
 */
export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (props, ref) => {
    const {
      data = [],
      categories = [],
      colors = ['accent', 'cyan'],
      height,
      connectNulls = false,
      curveType = 'linear',
      index = 'date',
      startEndOnly = false,
      intervalType = 'equidistantPreserveStart',
      allowDecimals = true,
      strokeWidth = 2,
      showAnimation = true,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      showXAxis = true,
      showYAxis = true,
      stack = false,
      stackOffset,
      yAxisWidth = 40,
      legendHeight = 32,
      animationDuration = 500,
      valueFormatter,
      variant = 'gradient',
      tooltipContent,
      children,
      minValue = 0,
      maxValue = 'auto',
      ...rest
    } = props

    const id = React.useId()

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

    const yAxisDomain: AxisDomain = [minValue, maxValue]

    return (
      <Box
        ref={ref}
        height={height}
        fontSize="sm"
        {...rest}
        css={[
          {
            '--chart-gradient-start-opacity': '0.8',
            '--chart-gradient-end-opacity': '0',
            '--chart-grid-stroke-opacity': '0.8',
            '--chart-axis-color': 'var(--chakra-colors-fg-muted)',
            _dark: {
              '--chart-grid-stroke-opacity': '0.3',
            },
          },
          props.css,
        ]}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth="0">
          <ReAreaChart data={data} stackOffset={stackOffset}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray=" 1 1 1"
                vertical={false}
                strokeOpacity="var(--chart-grid-stroke-opacity)"
              />
            )}

            <XAxis
              padding={{ left: 20, right: 20 }}
              dataKey={index}
              hide={!showXAxis}
              tick={{ transform: 'translate(0, 6)' }}
              ticks={
                startEndOnly
                  ? [data[0][index], data[data.length - 1][index]]
                  : undefined
              }
              interval={startEndOnly ? 'preserveStartEnd' : intervalType}
              tickLine={false}
              axisLine={false}
              minTickGap={5}
              style={{
                color: 'var(--chart-axis-color)',
              }}
            />

            <YAxis
              width={yAxisWidth}
              hide={!showYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ transform: 'translate(-3, 0)' }}
              // 5 is the default, but 6 typically gives better results
              tickCount={6}
              type="number"
              tickFormatter={valueFormatter}
              allowDecimals={allowDecimals}
              domain={yAxisDomain}
              style={{
                color: 'var(--chart-axis-color)',
              }}
            />

            {showTooltip && (
              <Tooltip
                formatter={valueFormatter}
                content={
                  tooltipContent
                    ? tooltipContent
                    : (props) => {
                        const { content, ...rest } = props
                        return (
                          <ChartTooltip
                            {...rest}
                            categoryColors={categoryColors}
                          />
                        )
                      }
                }
              />
            )}

            {showLegend && (
              <Legend
                verticalAlign="top"
                align="right"
                height={legendHeight}
                content={({ payload }) => {
                  return (
                    <ChartLegend
                      payload={payload}
                      categoryColors={categoryColors}
                    />
                  )
                }}
              />
            )}

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
                    stopOpacity="var(--chart-gradient-start-opacity)"
                  />
                  <stop
                    offset="95%"
                    stopColor={getColor(category)}
                    stopOpacity="var(--chart-gradient-end-opacity)"
                  />
                </linearGradient>
              ))}
            </defs>

            {children}

            {categories.map((category) => (
              <Area
                key={category}
                type={curveType}
                dataKey={category}
                stroke={getColor(category)}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                fill={getFill(category)}
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                stackId={stack ? 'a' : undefined}
                connectNulls={connectNulls}
              />
            ))}
          </ReAreaChart>
        </ResponsiveContainer>
      </Box>
    )
  },
)
