import * as React from 'react'

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
} from 'recharts'

import { ClassNames } from '@emotion/react'
import { ChartData } from './types'

export interface AreaChartProps {
  data: ChartData[]
  height: SystemProps['height']
  showGrid?: boolean
  color?: string
  strokeWidth?: string
  name?: string
  gradientOpacity?: number
  tickFormatter?(value: number): string
  variant?: 'line' | 'solid' | 'gradient'
  tooltipContent?(props: TooltipProps<any, any>): React.ReactNode
  tooltipFormatter?(value: string, name: string, props: any): string
  children?: React.ReactNode
}

export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (props, ref) => {
    const {
      data = [],
      categories = [],
      colors = ['primary'],
      height,
      showGrid = true,
      color = 'primary',
      connectNulls = false,
      curveType = 'linear',
      index = 'date',
      startEndOnly = false,
      intervalType = 'equidistantPreserveStart',
      allowDecimals = true,
      strokeWidth = 2,
      stack = false,
      yAxisWidth = 30,
      animationDuration = 500,
      name,
      tickFormatter,
      variant = 'gradient',
      gradientOpacity = 0.8,
      tooltipContent,
      tooltipFormatter = (value: string, name: string, props: any) => {
        return props.payload.yv
      },
      children,
    } = props

    const theme = useTheme()
    const id = useId()
    const styles = useStyleConfig('Tooltip')

    const categoryColors = Object.fromEntries(
      categories.map((category, index) => [category, colors[index] || 'gray'])
    )

    const getColor = (category: string) => {
      return theme.colors[categoryColors[category]]?.[500]
    }

    const getFill = (category: strong) => {
      switch (variant) {
        case 'solid':
          return getColor(category)
        case 'gradient':
          return `url(#${categoryColors[category]}-gradient)`
        default:
          return 'transparent'
      }
    }

    const tooltipStyles = css(styles)(theme)

    return (
      <ClassNames>
        {({ css }) => {
          return (
            <Box ref={ref} height={height} fontSize="sm">
              <ResponsiveContainer width="100%" height="100%">
                <ReAreaChart data={data}>
                  <defs>
                    {categories.map((category, index) => (
                      <linearGradient
                        id={`${categoryColors[category]}-gradient`}
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
                  {showGrid && (
                    <CartesianGrid
                      strokeDasharray=" 1 1 1"
                      vertical={false}
                      strokeOpacity={useColorModeValue(0.8, 0.3)}
                    />
                  )}
                  <XAxis
                    dataKey={index}
                    ticks={
                      startEndOnly
                        ? [data[0][index], data[data.length - 1][index]]
                        : undefined
                    }
                    interval={startEndOnly ? 'preserveStartEnd' : intervalType}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={5}
                  />

                  <YAxis
                    width={yAxisWidth}
                    axisLine={false}
                    tickLine={false}
                    tick={{ transform: 'translate(-3, 0)' }}
                    type="number"
                    tickFormatter={tickFormatter}
                    allowDecimals={allowDecimals}
                  />

                  <Tooltip
                    formatter={tooltipFormatter}
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
                      //     isAnimationActive={showAnimation}
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
