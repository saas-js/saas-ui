import { SystemStyleObject } from '@chakra-ui/react'
import { TooltipProps } from 'recharts'

export type { CurveType } from 'recharts/types/shape/Curve'

export interface BaseChartProps {
  /**
   * The data to be displayed in the chart.
   */
  data: Record<string, string | number>[]
  /**
   * The data keys to be displayed in the chart.
   */
  categories?: string[]
  /**
   * The colors to use for each category.
   */
  colors?: string[]
  /**
   * The y-axis data key to use.
   * @default 'date'
   */
  index?: string
  /**
   * If set 0, all the ticks will be shown. If set preserveStart", "preserveEnd" or "preserveStartEnd", the ticks which is to be shown or hidden will be calculated automatically.
   */
  intervalType?:
    | 'preserveStartEnd'
    | 'equidistantPreserveStart'
    | 'preserveStart'
    | 'preserveEnd'
    | number
  /**
   * The height of the chart.
   */
  height: SystemStyleObject['height']
  /**
   * Format the value of the x-axis.
   * @param value
   */
  valueFormatter?(value: number): string
  /**
   * Show decimals on the y-axis.
   */
  allowDecimals?: boolean
  /**
   * Wether to show the animation or not.
   */
  showAnimation?: boolean
  /**
   * Wether to show the grid or not.
   */
  showGrid?: boolean
  /**
   * Wether to show the legend or not.
   */
  showLegend?: boolean
  /**
   * Wether to show the tooltip or not.
   */
  showTooltip?: boolean
  /**
   * Wether to show the x-axis or not.
   */
  showXAxis?: boolean
  /**
   * Wether to show the y-axis or not.
   */
  showYAxis?: boolean
  /**
   * Animation duration in milliseconds.
   */
  animationDuration?: number
  /**
   * Only show the start and end ticks on the x-axis.
   */
  startEndOnly?: boolean
  /**
   * Render custom tooltip content.
   */
  tooltipContent?(props: TooltipProps<any, any>): React.ReactNode
  /**
   * Width of the y-axis labels.
   */
  yAxisWidth?: number
  /**
   * Height of the legend.
   */
  legendHeight?: number
  /**
   * Children to render.
   */
  children?: React.ReactNode
}
