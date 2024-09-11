import * as React from 'react'

import { Box, useColorModeValue, useTheme } from '@chakra-ui/react'
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { CurveType } from 'recharts/types/shape/Curve'

import { ChartLegend } from './legend'
import { createCategoryColors } from './utils'
import { ChartTooltip } from './tooltip'
import { BaseChartProps } from './types'
import { AxisDomain } from 'recharts/types/util/types'

export interface LineChartProps extends BaseChartProps {
  /**
   * Whether to connect null values.
   */
  connectNulls?: boolean

  /**
   * The curve type of the line.
   */
  curveType?: CurveType

  /**
   * The width of the line.
   */
  strokeWidth?: string | number

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
 * LineChart
 * @see Docs https://saas-ui.dev/docs/components/visualization/line-chart
 */
export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (props, ref) => {
    const {
      data = [],
      categories = [],
      colors = ['primary'],
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
      yAxisWidth = 40,
      legendHeight = 32,
      animationDuration = 500,
      minValue = 0,
      maxValue = 'auto',
      valueFormatter,
      tooltipContent,
      children,
    } = props

    const theme = useTheme()

    const categoryColors = createCategoryColors(categories, colors, theme)
    const getColor = (category: string) => {
      return categoryColors[category]
    }

    const yAxisDomain: AxisDomain = [minValue, maxValue]

    return (
      <Box ref={ref} height={height} fontSize="sm">
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart data={data}>
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
              domain={yAxisDomain}
              tick={{ transform: 'translate(-3, 0)' }}
              // 5 is the default, but 6 typically gives better results
              tickCount={6}
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

            {children}

            {categories.map((category) => (
              <Line
                key={category}
                type={curveType}
                dataKey={category}
                dot={false}
                stroke={getColor(category)}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                connectNulls={connectNulls}
              />
            ))}
          </ReLineChart>
        </ResponsiveContainer>
      </Box>
    )
  }
)
