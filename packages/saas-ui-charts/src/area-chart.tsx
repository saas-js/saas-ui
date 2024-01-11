import * as React from 'react'

import { Box, useColorModeValue, useId, useTheme } from '@chakra-ui/react'
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { ChartLegend } from './legend'
import { createCategoryColors } from './utils'
import { ChartTooltip } from './tooltip'
import { BaseChartProps, CurveType } from './types'

export interface AreaChartProps extends BaseChartProps {
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
   * The area chart variant.
   * @default gradient
   */
  variant?: 'solid' | 'gradient' | 'line'
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
      colors = ['primary', 'cyan'],
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
      yAxisWidth = 40,
      legendHeight = 32,
      animationDuration = 500,
      name,
      valueFormatter,
      variant = 'gradient',
      tooltipContent,
      children,
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
        ref={ref}
        height={height}
        fontSize="sm"
        sx={{
          '--chart-gradient-start-opacity': '0.8',
          '--chart-gradient-end-opacity': '0',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ReAreaChart data={data}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray=" 1 1 1"
                vertical={false}
                strokeOpacity={useColorModeValue(0.8, 0.3)}
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
                color: 'var(--chakra-colors-muted)',
              }}
            />

            <YAxis
              width={yAxisWidth}
              hide={!showYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ transform: 'translate(-3, 0)' }}
              type="number"
              tickFormatter={valueFormatter}
              allowDecimals={allowDecimals}
              style={{
                color: 'var(--chakra-colors-muted)',
              }}
            />

            {showTooltip && (
              <Tooltip
                formatter={valueFormatter}
                content={
                  tooltipContent
                    ? tooltipContent
                    : (props) => (
                        <ChartTooltip
                          {...props}
                          categoryColors={categoryColors}
                        />
                      )
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
  }
)
