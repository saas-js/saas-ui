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
  AreaChart as ReAreaChart,
  Area,
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

export interface AreaChartProps {
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
  gradientOpacity?: number
  valueFormatter?(value: number): string
  showAnimation?: boolean
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  stack?: boolean
  startEndOnly?: boolean
  tooltipContent?(props: TooltipProps<any, any>): React.ReactNode
  variant?: 'line' | 'solid' | 'gradient'
  yAxisWidth?: number
  legendHeight?: number
  children?: React.ReactNode
}

export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
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
      stack = false,
      yAxisWidth = 40,
      legendHeight = 32,
      animationDuration = 500,
      name,
      valueFormatter,
      variant = 'gradient',
      gradientOpacity = 0.8,
      tooltipContent,
      children,
    } = props

    const theme = useTheme()
    const id = useId()

    const tooltipTheme = useStyleConfig('Tooltip')
    const tooltipStyles = css(tooltipTheme)(theme)

    const categoryColors = Object.fromEntries(
      categories.map((category, index) => [category, colors[index] || 'gray'])
    )

    const getColor = (category: string) => {
      return theme.colors[categoryColors[category]]?.[500]
    }

    const getGradientId = (category: string) => {
      return `${id}-${categoryColors[category]}-gradient`
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
      <ClassNames>
        {({ css }) => {
          return (
            <Box ref={ref} height={height} fontSize="sm">
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
                          stopOpacity={gradientOpacity}
                        />
                        <stop
                          offset="95%"
                          stopColor={getColor(category)}
                          stopOpacity={0}
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
                      name={name}
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
        }}
      </ClassNames>
    )
  }
)
