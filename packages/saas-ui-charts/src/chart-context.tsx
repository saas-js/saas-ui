'use client'

import { createContext, useContext, type ReactNode } from 'react'

import type { UseChartReturn } from './use-chart.ts'

const ChartContext = createContext<UseChartReturn<any> | null>(null)

export function ChartProvider<T>({
  value,
  children,
}: {
  value: UseChartReturn<T>
  children: ReactNode
}) {
  return (
    <ChartContext.Provider value={value as UseChartReturn<any>}>
      {children}
    </ChartContext.Provider>
  )
}

export function useChartContext<T = any>() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error(
      'useChartContext returned `undefined`. Wrap the tree in Chart.Root, BarList.Root, or BarSegment.Root.',
    )
  }
  return context as UseChartReturn<T>
}
