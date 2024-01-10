import { SystemProps } from '@chakra-ui/styled-system'
import { TooltipProps } from 'recharts'

export type { CurveType } from 'recharts/types/shape/Curve'

export interface BaseChartProps {
  allowDecimals?: boolean
  animationDuration?: number
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
  startEndOnly?: boolean
  tooltipContent?(props: TooltipProps<any, any>): React.ReactNode
  yAxisWidth?: number
  legendHeight?: number
  children?: React.ReactNode
}
