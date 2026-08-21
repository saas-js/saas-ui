'use client'

import { Box, defineStyle, type BoxProps } from '@chakra-ui/react'
import type { ChartDefinition, ChartPoint, ChartValue } from '@tanstack/charts'
import {
  Chart as TanStackChart,
  type ChartProps as TanStackChartProps,
} from '@tanstack/charts/react/tooltip'

import { ChartProvider } from '../chart-context.tsx'
import type { UseChartReturn } from '../use-chart.ts'
import { ChartTooltip } from './chart-tooltip.tsx'

const baseCss = defineStyle({
  width: '100%',
  position: 'relative',
  textStyle: 'xs',
  '& *': {
    outline: 'none',
  },
  '& svg': {
    overflow: 'visible',
  },
  '& .ts-chart': {
    width: '100%',
    height: '100%',
    fontFamily: 'inherit',
  },
  '& .ts-chart__axes text': {
    fill: 'fg.muted',
  },
  '& .ts-chart-tooltip': {
    zIndex: 'tooltip',
    maxWidth: 'min(16rem, 80%)',
  },
})

export interface ChartRootProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> extends Omit<BoxProps, 'height' | 'width' | 'onSelect'> {
  chart: UseChartReturn<TDatum>
  definition: ChartDefinition
  ariaLabel: string
  ariaDescription?: string
  height?: number
  width?: number
  aspectRatio?: number
  initialWidth?: number
  tabIndex?: number
  idPrefix?: string
  renderTooltipBody?: TanStackChartProps<
    TDatum,
    TXValue,
    TYValue
  >['renderTooltipBody']
  onFocusChange?: (
    point: ChartPoint<TDatum, TXValue, TYValue> | null,
  ) => void
  onFocusGroupChange?: (
    points: readonly ChartPoint<TDatum, TXValue, TYValue>[],
  ) => void
  onSelect?: (point: ChartPoint<TDatum, TXValue, TYValue> | null) => void
  onRender?: TanStackChartProps<TDatum, TXValue, TYValue>['onRender']
}

export function ChartRoot<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(props: ChartRootProps<TDatum, TXValue, TYValue>) {
  const {
    chart,
    css,
    children,
    definition,
    ariaLabel,
    ariaDescription,
    height,
    width,
    aspectRatio,
    initialWidth,
    tabIndex,
    idPrefix,
    onFocusChange,
    onFocusGroupChange,
    onSelect,
    onRender,
    renderTooltipBody,
    style,
    ...rest
  } = props

  return (
    <ChartProvider value={chart}>
      <Box
        aspectRatio={
          aspectRatio ?? (width != null && height != null ? undefined : 'landscape')
        }
        textStyle="xs"
        color="fg.muted"
        height={height}
        width={width}
        css={[baseCss, css]}
        style={{ ...chart.cssVars, ...style }}
        {...rest}
      >
        <TanStackChart
          definition={
            definition as TanStackChartProps<TDatum, TXValue, TYValue>['definition']
          }
          ariaLabel={ariaLabel}
          ariaDescription={ariaDescription}
          height={height}
          width={width}
          aspectRatio={aspectRatio}
          initialWidth={initialWidth}
          tabIndex={tabIndex}
          idPrefix={idPrefix}
          onFocusChange={onFocusChange}
          onFocusGroupChange={onFocusGroupChange}
          onSelect={onSelect}
          onRender={onRender}
          renderTooltipBody={
            renderTooltipBody ??
            ((context) => <ChartTooltip points={context.points} />)
          }
        />
        {children}
      </Box>
    </ChartProvider>
  )
}

export function ChartCenter(props: BoxProps) {
  return (
    <Box
      position="absolute"
      inset="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pointerEvents="none"
      {...props}
    />
  )
}
