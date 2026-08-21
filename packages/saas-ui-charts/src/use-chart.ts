'use client'

import type { Tokens } from '@chakra-ui/react'
import { useChakraContext, useLocaleContext } from '@chakra-ui/react'
import {
  defineChart,
  type ChartDefinition,
  type ChartTheme,
} from '@tanstack/charts'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal as tooltipPortal } from '@tanstack/charts/tooltip/portal'
import * as React from 'react'

export type ChartColor = Tokens['colors'] | React.CSSProperties['color']
export type ChartSize = Tokens['sizes'] | (string & {})
export type ChartSpacing = Tokens['spacing'] | (string & {})

type ItemDataKey<T> = keyof T

export interface SeriesItem<T> {
  name?: ItemDataKey<T> | string
  color?: ChartColor
  icon?: React.ReactNode
  label?: React.ReactNode
}

export interface UseChartProps<T> {
  data: T[]
  series?: SeriesItem<T>[]
  sort?: {
    by: ItemDataKey<T>
    direction: 'asc' | 'desc'
  }
}

type ValueDomain =
  | [number, number]
  | ((props: { min: number; max: number }) => [number, number])

export interface ChartGradientStop {
  color: ChartColor
  offset: number
  opacity?: number
}

const DEFAULT_PALETTE = [
  'indigo.solid',
  'pink.solid',
  'teal.solid',
  'orange.solid',
  'purple.solid',
  'fg',
] as const

export function useChart<T = any>(props: UseChartProps<T>) {
  const { data, series = [], sort } = props
  const id = React.useId()
  const [highlightedSeries, setHighlightedSeries] = React.useState<
    string | null
  >(null)
  const isHighlightedSeries = (name: string | undefined) =>
    highlightedSeries === name

  const env = useLocaleContext()
  const sys = useChakraContext()

  const color = React.useCallback(
    (key: ChartColor | undefined) =>
      key ? sys.token(`colors.${key}`, key) : undefined,
    [sys],
  )
  const size = React.useCallback(
    (key: ChartSize | undefined) =>
      key ? sys.token(`sizes.${key}`, key) : undefined,
    [sys],
  )
  const spacing = React.useCallback(
    (key: ChartSpacing | undefined) =>
      key ? sys.token(`spacing.${key}`, key) : undefined,
    [sys],
  )

  const key = <K extends ItemDataKey<T>>(prop: K | undefined) =>
    (prop ?? 'value') as K

  const formatNumber = React.useCallback(
    (options?: Intl.NumberFormatOptions) => {
      const formatter = new Intl.NumberFormat(env.locale, options)
      return (value: number) => formatter.format(value)
    },
    [env.locale],
  )

  const formatDate = React.useCallback(
    (options?: Intl.DateTimeFormatOptions) => {
      return (value: string) =>
        new Date(value).toLocaleDateString(env.locale, options)
    },
    [env.locale],
  )

  const getSeries = (item: unknown): SeriesItem<T> | undefined => {
    if (!isObject(item)) return
    const payload = isObject(item.payload)
      ? item.payload
      : isObject(item.datum)
        ? item.datum
        : undefined
    const candidates = [
      getProp(item, 'name'),
      getProp(item, 'dataKey'),
      getProp(item, 'xValue'),
      getProp(payload, 'name'),
      getProp(payload, 'dataKey'),
    ]
    const groupLabel = getProp<string>(item, 'groupLabel')
    if (groupLabel && !isGeneratedMarkId(groupLabel)) {
      candidates.push(groupLabel)
    }

    let match = series.find((entry) =>
      candidates.some((candidate) => candidate != null && entry.name === candidate),
    )

    if (!match && payload) {
      const yValue = getProp(item, 'yValue')
      match = series.find(
        (entry) =>
          typeof entry.name === 'string' &&
          entry.name in payload &&
          (yValue == null || payload[entry.name] === yValue),
      )
      match ||= series.find(
        (entry) => typeof entry.name === 'string' && entry.name in payload,
      )
    }

    if (!match && series.length === 1) match = series[0]

    const result: SeriesItem<T> = { ...match }
    result.color ||=
      getProp<ChartColor>(item, 'color') ??
      getProp<ChartColor>(payload, 'color')
    const fallbackName =
      getProp<string>(item, 'name') ?? getProp<string>(payload, 'name')
    result.label ||=
      (typeof result.name === 'string' ? result.name : undefined) || fallbackName
    return result
  }

  const getTotal = (dataKey: keyof T) => {
    return data.reduce((acc, d) => acc + Number(d[dataKey]), 0)
  }

  function getPayloadTotal<TItem extends { value?: string | number }>(
    payload: Array<TItem> | undefined,
  ) {
    return payload?.reduce((acc, item) => {
      if (item.value == null) return acc
      const num = Number(item.value)
      return acc + (Number.isNaN(num) ? 0 : num)
    }, 0)
  }

  function getMin(dataKey: keyof T) {
    return Math.min(...data.map((d) => Number(d[dataKey])))
  }

  function getMax(dataKey: keyof T) {
    return Math.max(...data.map((d) => Number(d[dataKey])))
  }

  function getValuePercent(
    dataKey: keyof T,
    value: number,
    domain?: ValueDomain,
  ) {
    const min = getMin(dataKey)
    const max = getMax(dataKey)
    if (domain) {
      const d = typeof domain === 'function' ? domain({ min, max }) : domain
      return ((value - d[0]) / (d[1] - d[0])) * 100
    }
    return (value / getTotal(dataKey)) * 100
  }

  const sortedData = React.useMemo(() => {
    if (!sort) return data
    return [...data].sort((a, b) => {
      const aValue = Number(a[sort.by])
      const bValue = Number(b[sort.by])
      return sort.direction === 'desc' ? bValue - aValue : aValue - bValue
    })
  }, [data, sort])

  const getSeriesOpacity = (name: string | undefined, fallback = 0.2) => {
    if (name && highlightedSeries)
      return isHighlightedSeries(name) ? 1 : fallback
  }

  const palette = React.useMemo(() => {
    const fromSeries = series
      .map((item) => color(item.color))
      .filter((value): value is string => Boolean(value))
    if (fromSeries.length) return fromSeries
    return DEFAULT_PALETTE.map((token) => color(token)).filter(
      (value): value is string => Boolean(value),
    )
  }, [color, series])

  const theme = React.useMemo<ChartTheme>(
    () => ({
      foreground: color('fg.muted') ?? 'currentColor',
      muted: color('fg.muted') ?? 'currentColor',
      grid: color('border.subtle') ?? 'currentColor',
      background: 'transparent',
      palette,
    }),
    [color, palette],
  )

  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {
      color: theme.foreground,
      '--ts-chart-tooltip-background': color('bg.panel') ?? '',
      '--ts-chart-tooltip-color': color('fg') ?? '',
      '--ts-chart-tooltip-border': `1px solid ${color('border') ?? 'transparent'}`,
      '--ts-chart-tooltip-border-radius':
        sys.token('radii.l2', '0.375rem') ?? '0.375rem',
      '--ts-chart-tooltip-shadow': sys.token('shadows.md', 'none') ?? 'none',
      '--ts-chart-tooltip-padding': `${sys.token('spacing.1', '0.25rem')} ${sys.token('spacing.2.5', '0.625rem')}`,
      '--ts-chart-tooltip-font': 'inherit',
    }
    palette.forEach((value, index) => {
      vars[`--ts-chart-${index + 1}`] = value
    })
    return vars
  }, [color, palette, sys, theme.foreground])

  const gradient = React.useCallback(
    (options: {
      id: string
      x1?: number
      y1?: number
      x2?: number
      y2?: number
      stops: ChartGradientStop[]
    }): {
      id: string
      x1?: number
      y1?: number
      x2?: number
      y2?: number
      stops: { offset: number; color: string; opacity?: number }[]
    } => ({
      id: options.id,
      x1: options.x1 ?? 0,
      y1: options.y1 ?? 1,
      x2: options.x2 ?? 0,
      y2: options.y2 ?? 0,
      stops: options.stops.map((stop) => ({
        offset: stop.offset,
        color: color(stop.color) ?? String(stop.color),
        opacity: stop.opacity,
      })),
    }),
    [color],
  )

  const define = React.useCallback(
    (spec: {
      marks: readonly unknown[]
      theme?: Partial<ChartTheme>
      [key: string]: unknown
    }): ChartDefinition => {
      const { tooltip: tooltipSpec, theme: specTheme, ...rest } = spec
      return defineChart({
        svgAnimation: false,
        ...rest,
        tooltip: resolveTooltipInput(tooltipSpec),
        theme: { ...theme, ...specTheme },
      } as never) as unknown as ChartDefinition
    },
    [theme],
  )

  return React.useMemo(
    () => ({
      id,
      key,
      data: sortedData,
      groupBy: (dataKey: ItemDataKey<T>) => groupBy(sortedData, dataKey),
      series,
      getSeries,
      color,
      size,
      spacing,
      formatNumber,
      formatDate,
      highlightedSeries,
      setHighlightedSeries,
      isHighlightedSeries,
      getSeriesOpacity,
      getTotal,
      getMin,
      getMax,
      getPayloadTotal,
      getValuePercent,
      theme,
      palette,
      cssVars,
      gradient,
      define,
    }),
    [
      id,
      sortedData,
      series,
      color,
      size,
      spacing,
      formatNumber,
      formatDate,
      highlightedSeries,
      theme,
      palette,
      cssVars,
      gradient,
      define,
    ],
  )
}

export type UseChartReturn<T> = ReturnType<typeof useChart<T>>

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export function getProp<T = unknown>(
  item: unknown,
  key: string | undefined,
): T | undefined {
  if (!key || !isObject(item)) return
  return Reflect.get(item, key) as T | undefined
}

export function isGeneratedMarkId(value: unknown): boolean {
  if (typeof value !== 'string') return false
  return /^(bar|line|area|dot|rule|polar|arc|pie|text|mark)[-:]/i.test(value)
}

function resolveTooltipInput(tooltipSpec: unknown) {
  if (tooltipSpec === false) return false
  if (isObject(tooltipSpec) && '__chartExtensionType' in tooltipSpec) {
    return tooltipSpec
  }
  return {
    use: tooltip,
    portal: tooltipPortal,
    ...(isObject(tooltipSpec) ? tooltipSpec : {}),
  }
}

function groupBy<T>(data: T[], dataKey: keyof T) {
  const groups = new Map<unknown, T[]>()
  for (const item of data) {
    const value = item[dataKey]
    const group = groups.get(value) || []
    group.push(item)
    groups.set(value, group)
  }
  return Array.from(groups.values())
}
