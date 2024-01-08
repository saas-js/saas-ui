import * as React from 'react'

import { ClassNames } from '@emotion/react'
import {
  Box,
  SystemProps,
  useColorModeValue,
  useId,
  useStyleConfig,
  useTheme,
} from '@chakra-ui/react'
import { css } from '@chakra-ui/styled-system'
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Legend,
} from 'recharts'
import type { CurveType } from 'recharts/types/shape/Curve'

import { ChartLegend } from './legend'

export interface LineChartProps {
  allowDecimals?: boolean
  animationDuration?: number
  data: Record<string, string | number>[]
  categories?: string[]
  colors?: string[]
  index?: string
  intervalType?: 'preserveStartEnd' | 'equidistantPreserveStart'
  height: SystemProps['height']
  connectNulls?: boolean
  curveType?: CurveType
  strokeWidth?: string
  name?: string
  valueFormatter?(value: number): string
  showAnimation?: boolean
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  startEndOnly?: boolean
  tooltipContent?(props: TooltipProps<any, any>): React.ReactNode
  variant?: 'line' | 'solid' | 'gradient'
  yAxisWidth?: number
  legendHeight?: number
  children?: React.ReactNode
}

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
      name,
      valueFormatter,
      variant,
      tooltipContent,
      children,
    } = props

    const theme = useTheme()

    const tooltipTheme = useStyleConfig('Tooltip')
    const tooltipStyles = css(tooltipTheme)(theme)

    const categoryColors = Object.fromEntries(
      categories.map((category, index) => [category, colors[index] || 'gray'])
    )

    const getColor = (category: string) => {
      return theme.colors[categoryColors[category]]?.[500]
    }

    return (
      <ClassNames>
        {({ css }) => {
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
                      wrapperStyle={{ outline: 'none' }}
                      contentStyle={{
                        background: 'var(--tooltip-bg)',
                        border:
                          '1px solid var(--chakra-colors-default-border-color)',
                        outline: 'none',
                        display: 'block',
                        padding: '4px 8px',
                      }}
                      wrapperClassName={css(tooltipStyles)}
                      content={tooltipContent}
                    />
                  )}

                  {showLegend && (
                    <Legend
                      verticalAlign="top"
                      align="right"
                      height={legendHeight}
                      content={({ payload }) => {
                        return <ChartLegend payload={payload} />
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
                      name={name}
                      isAnimationActive={showAnimation}
                      animationDuration={animationDuration}
                      connectNulls={connectNulls}
                    />
                  ))}
                </ReLineChart>
              </ResponsiveContainer>
            </Box>
          )
        }}
      </ClassNames>
    )
  }
)
