'use client'

import {
  Box,
  ColorSwatch,
  Flex,
  HStack,
  Separator,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { ChartPoint, ChartValue } from '@tanstack/charts'
import * as React from 'react'

import { useChartContext } from '../chart-context.tsx'
import { getProp, isGeneratedMarkId } from '../use-chart.ts'

export interface ChartTooltipProps<TDatum = unknown> {
  points?: readonly ChartPoint<TDatum>[]
  title?: React.ReactNode
  hideLabel?: boolean
  hideIndicator?: boolean
  hideSeriesLabel?: boolean
  showTotal?: boolean
  fitContent?: boolean
  nameKey?: string
  formatter?: (
    value: ChartValue,
    name: React.ReactNode,
  ) => React.ReactNode | [React.ReactNode, React.ReactNode]
  render?: (point: ChartPoint<TDatum>) => React.ReactNode
}

export function ChartTooltip<TDatum = unknown>(props: ChartTooltipProps<TDatum>) {
  const {
    points = [],
    title,
    hideLabel,
    hideIndicator,
    hideSeriesLabel,
    showTotal,
    fitContent,
    nameKey,
    formatter,
    render,
  } = props
  const chart = useChartContext<TDatum>()

  if (!points.length) return null

  const first = points[0]
  const tooltipLabel =
    title ??
    getProp(first.datum, nameKey) ??
    readablePointLabel(first) ??
    'value'

  const total = points.reduce((acc, point) => {
    const value = Number(tooltipValue(point))
    return acc + (Number.isNaN(value) ? 0 : value)
  }, 0)

  return (
    <Stack minW={fitContent ? undefined : '8rem'} gap="1" textStyle="xs">
      {!hideLabel && (
        <Text fontWeight="medium">{String(tooltipLabel)}</Text>
      )}
      <Box>
        {points.map((point) => {
          if (render) return render(point)
          const config = chart.getSeries(point)
          const seriesName =
            (typeof config?.label === 'string' ? config.label : undefined) ||
            (typeof config?.name === 'string' ? config.name : undefined) ||
            getProp<string>(point.datum, 'name')
          const seriesColor =
            (config?.color ? chart.color(config.color) : undefined) ||
            point.color
          const value = tooltipValue(point)
          const formatted = formatter
            ? formatter(value, seriesName)
            : value?.toLocaleString()
          const [formattedValue, formattedName] = Array.isArray(formatted)
            ? formatted
            : [formatted, seriesName]

          return (
            <Flex
              key={point.key}
              gap="1.5"
              wrap="wrap"
              align="center"
              _icon={{ boxSize: '2.5' }}
            >
              {config?.icon}
              {seriesColor && !config?.icon && !hideIndicator && (
                <ColorSwatch
                  rounded="full"
                  boxSize="2"
                  value={seriesColor}
                />
              )}
              <HStack justify="space-between" flex="1">
                {!hideSeriesLabel &&
                  formattedName != null &&
                  String(formattedName) !== String(tooltipLabel) && (
                  <Span color="fg.muted">{formattedName}</Span>
                )}
                {value != null && (
                  <Text
                    fontFamily="mono"
                    fontWeight="medium"
                    fontVariantNumeric="tabular-nums"
                  >
                    {formattedValue}
                  </Text>
                )}
              </HStack>
            </Flex>
          )
        })}
      </Box>
      {showTotal && (
        <>
          <Separator mt="1" />
          <HStack gap="1" justify="space-between" pb="1">
            <Span color="fg.muted">Total</Span>
            <Text
              fontFamily="mono"
              fontWeight="medium"
              fontVariantNumeric="tabular-nums"
            >
              {(() => {
                if (!formatter) return total.toLocaleString()
                const formatted = formatter(total, '')
                return Array.isArray(formatted) ? formatted[0] : formatted
              })()}
            </Text>
          </HStack>
        </>
      )}
    </Stack>
  )
}

function tooltipValue<TDatum>(point: ChartPoint<TDatum>): ChartValue {
  const pieValue = getProp<number>(point.datum, 'value')
  if (
    typeof pieValue === 'number' &&
    getProp(point.datum, 'fraction') != null &&
    pieValue !== point.yValue
  ) {
    return pieValue
  }
  return point.yValue
}

function readablePointLabel<TDatum>(point: ChartPoint<TDatum>) {
  const named = [
    getProp(point.datum, 'name'),
    getProp(point.datum, 'date'),
    getProp(point.datum, 'label'),
    typeof point.xValue === 'string' ? point.xValue : undefined,
    point.groupLabel !== point.markId ? point.groupLabel : undefined,
    point.xValue,
  ]
  return named.find((value) => value != null && !isGeneratedMarkId(value))
}
