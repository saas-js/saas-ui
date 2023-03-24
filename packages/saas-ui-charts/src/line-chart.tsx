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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'

import { ClassNames } from '@emotion/react'

export interface ChartData {
  x: number
  xv: string
  y: number
  yv: string
}

export interface LineChartProps {
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

export const LineChart = (props: LineChartProps) => {
  const {
    data,
    height,
    showGrid = true,
    color = 'primary',
    strokeWidth,
    name,
    tickFormatter,
    variant,
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

  const strokeColor = theme.colors[color]?.[500]

  const fill = (() => {
    switch (variant) {
      case 'solid':
        return strokeColor
      case 'gradient':
        return `url(#${id}-gradient)`
      default:
        return 'transparent'
    }
  })()

  const tooltipStyles = css(styles)(theme)

  return (
    <ClassNames>
      {({ css }) => {
        return (
          <Box height={height}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id={`${id}-gradient`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={strokeColor}
                      stopOpacity={gradientOpacity}
                    />
                    <stop
                      offset="95%"
                      stopColor={strokeColor}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                {showGrid && (
                  <CartesianGrid
                    strokeDasharray=" 1 1 1"
                    vertical={false}
                    strokeOpacity={useColorModeValue(0.8, 0.3)}
                  />
                )}
                <XAxis dataKey="xv" />
                <YAxis dataKey="y" tickFormatter={tickFormatter} />

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

                <Area
                  type="monotone"
                  dataKey="y"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  fill={fill}
                  name={name}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        )
      }}
    </ClassNames>
  )
}
