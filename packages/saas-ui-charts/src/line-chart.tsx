import * as React from 'react'

import { Box, type BoxProps, useToken } from '@chakra-ui/react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { LineDot } from 'recharts/types/cartesian/Line'
import type { CurveType } from 'recharts/types/shape/Curve'
import { AxisDomain } from 'recharts/types/util/types'

import { ChartLegend } from './legend'
import { ChartTooltip } from './tooltip'
import { BaseChartProps } from './types'
import { createCategoryColors } from './utils'

export interface LineChartProps
  extends Omit<BoxProps, 'animationDuration' | 'height'>,
    BaseChartProps {
  /**
   * Whether to connect null values.
   */
  connectNulls?: boolean

  /**
   * The curve type of the line.
   */
  curveType?: CurveType

  /**
   * Whether to show line dots.
   * @default false
   */
  dot?: LineDot

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
      colors = ['accent'],
      height,
      connectNulls = false,
      curveType = 'linear',
      dot = false,
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
      ...rest
    } = props

    const colorTokens = useToken(
      'colors',
      colors.map((c) => (c.includes('.') ? c : `${c}.solid`)),
    )

    const categoryColors = createCategoryColors(categories, colorTokens)

    const getColor = (category: string) => {
      return categoryColors[category]
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
          <ReLineChart data={data}>
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
              domain={yAxisDomain}
              tick={{ transform: 'translate(-3, 0)' }}
              // 5 is the default, but 6 typically gives better results
              tickCount={6}
              type="number"
              tickFormatter={valueFormatter}
              allowDecimals={allowDecimals}
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

            {children}

            {categories.map((category) => (
              <Line
                key={category}
                type={curveType}
                dataKey={category}
                dot={dot}
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
  },
)
