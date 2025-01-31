import { useToken } from '@chakra-ui/react'
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  Tooltip,
  type TooltipProps,
} from 'recharts'

import { ChartTooltip } from './tooltip.tsx'

export interface PieChartProps {
  category: string
  categoryColors: string[]
  data: Array<Record<string, any>>
  width?: number
  height?: number
  valueFormatter?: (value: number) => string
  showTooltip?: boolean
  /**
   * Render custom tooltip content.
   */
  tooltipContent?(props: TooltipProps<any, any>): React.ReactNode
}

export function PieChart(props: PieChartProps) {
  const {
    width = 200,
    height = 200,
    category,
    categoryColors = [],
    data,
    valueFormatter,
    showTooltip,
    tooltipContent,
  } = props

  const innerRadius = (width / 2) * 0.7
  const outerRadius = (width / 2) * 0.98

  const colorTokens = useToken(
    'colors',
    categoryColors.map((c) => (c.includes('.') ? c : `${c}.solid`)),
  )

  const chartData = data.map((entry, index) => ({
    [category]: entry[category],
    label: entry.label ?? entry[category],
    value: entry.value,
    color: colorTokens[index],
  }))

  const colors = chartData.reduce(
    (acc, entry) => {
      acc[entry[category]] = entry.color
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <RechartsPieChart width={width} height={height}>
      <Pie
        dataKey="value"
        data={chartData}
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        stroke="none"
        paddingAngle={2}
        isAnimationActive={false}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} name={entry.label} fill={entry.color} />
        ))}
      </Pie>

      {showTooltip && (
        <Tooltip
          formatter={valueFormatter}
          cursor={{ fill: 'var(--chart-cursor-bg)' }}
          content={
            tooltipContent
              ? tooltipContent
              : (props) => {
                  const { content, ...rest } = props
                  return <ChartTooltip {...rest} categoryColors={colors} />
                }
          }
        />
      )}
    </RechartsPieChart>
  )
}
