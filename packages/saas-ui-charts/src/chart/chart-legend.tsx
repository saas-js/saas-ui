'use client'

import { ColorSwatch, Flex, HStack, Span, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'

import { useChartContext } from '../chart-context.tsx'

const hAlignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const

export interface ChartLegendProps {
  title?: React.ReactNode
  align?: 'left' | 'center' | 'right'
  orientation?: 'horizontal' | 'vertical'
  spacing?: string | number
  interaction?: 'hover' | 'click'
}

export function ChartLegend(props: ChartLegendProps) {
  const {
    title,
    align = 'center',
    orientation,
    spacing = '3',
    interaction = 'hover',
  } = props
  const chart = useChartContext()
  const items = chart.series.filter((item) => item.name)
  if (!items.length) return null

  const spacingValue =
    typeof spacing === 'number' ? `${spacing}px` : chart.spacing(spacing)

  return (
    <Stack gap="1.5" align={hAlignMap[align]} pt="3">
      {title && <Text fontWeight="medium">{title}</Text>}
      <Flex
        data-orientation={orientation}
        gap={spacingValue}
        direction={{ _horizontal: 'row', _vertical: 'column' }}
        align={{ _horizontal: 'center', _vertical: 'flex-start' }}
        flexWrap="wrap"
      >
        {items.map((item) => {
          const seriesName = item.name?.toString()
          return (
            <HStack
              key={seriesName}
              gap="1.5"
              _icon={{ boxSize: '3' }}
              style={{
                opacity: chart.getSeriesOpacity(seriesName, 0.6),
              }}
              onClick={() => {
                if (interaction === 'click' && seriesName) {
                  chart.setHighlightedSeries((prev) =>
                    prev === seriesName ? null : seriesName,
                  )
                }
              }}
              onMouseEnter={() => {
                if (interaction === 'hover' && seriesName) {
                  chart.setHighlightedSeries(seriesName)
                }
              }}
              onMouseLeave={() => {
                if (interaction === 'hover') {
                  chart.setHighlightedSeries(null)
                }
              }}
            >
              {item.icon || (
                <ColorSwatch boxSize="2" value={chart.color(item.color)} />
              )}
              <Span color="fg.muted">{item.label || seriesName}</Span>
            </HStack>
          )
        })}
      </Flex>
    </Stack>
  )
}
