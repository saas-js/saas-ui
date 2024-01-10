import * as React from 'react'

import {
  Box,
  SystemProps,
  useColorModeValue,
  useId,
  useTheme,
} from '@chakra-ui/react'
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Legend,
} from 'recharts'

import { ChartLegend } from './legend'
import { ChartTooltip } from './tooltip'
import { createCategoryColors } from './utils'

export interface BarChartProps {
  allowDecimals?: boolean
  animationDuration?: number
  barGap?: string | number
  barCategoryGap?: string | number
  data: Record<string, string | number>[]
  categories?: string[]
  colors?: string[]
  index?: string
  intervalType?: 'preserveStartEnd' | 'equidistantPreserveStart'
  height: SystemProps['height']
  name?: string
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
  variant?: 'solid' | 'gradient'
  yAxisWidth?: number
  legendHeight?: number
  radius?: number
  children?: React.ReactNode
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (props, ref) => {
    const {
      data = [],
      categories = [],
      colors = ['primary', 'cyan'],
      height,
      index = 'date',
      barGap = '2',
      barCategoryGap = '10%',
      startEndOnly = false,
      intervalType = 'equidistantPreserveStart',
      allowDecimals = true,
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
      radius = 2,
      children,
    } = props

    const theme = useTheme()
    const id = useId()

    const categoryColors = createCategoryColors(categories, colors, theme)
    const getColor = (category: string) => {
      return categoryColors[category]
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
      <Box
        ref={ref}
        height={height}
        fontSize="sm"
        sx={{
          '--chart-cursor-bg': 'var(--chakra-colors-blackAlpha-100)',
          '--chart-gradient-start-opacity': '0.8',
          '--chart-gradient-end-opacity': '80',
          _dark: {
            '--chart-cursor-bg': 'var(--chakra-colors-whiteAlpha-100)',
            '--chart-gradient-start-opacity': '80',
            '--chart-gradient-end-opacity': '0.8',
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart
            data={data}
            barCategoryGap={barCategoryGap}
            barGap={barGap}
          >
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
                cursor={{ fill: 'var(--chart-cursor-bg)' }}
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
              <Bar
                key={category}
                dataKey={category}
                fill={getFill(category)}
                color={getColor(category)}
                name={name}
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                stackId={stack ? 'a' : undefined}
                radius={radius}
              />
            ))}
          </ReBarChart>
        </ResponsiveContainer>
      </Box>
    )
  }
)
