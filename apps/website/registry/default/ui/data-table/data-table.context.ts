'use client'

import * as React from 'react'

import { createSlotRecipeContext } from '@chakra-ui/react'
import {
  type AppReactTable,
  type RowData,
  type TableState,
  createTableHookContexts,
} from '@tanstack/react-table'

import type { DataTableFeatures } from './data-table.features.ts'
import {
  type DataTableVariantProps,
  dataTableSlotRecipe,
} from './data-table.recipe.ts'
import type { DataTableSize } from './data-table.utils.ts'

export const {
  withProvider,
  withContext,
  useStyles: useDataTableStyles,
} = createSlotRecipeContext({
  recipe: dataTableSlotRecipe,
})

/**
 * Scoped TanStack contexts shared between the parts in this directory and the
 * `createTableHook` wiring in `data-table.ts`. Creating them here (instead of
 * relying on the module-scoped default) breaks the import cycle between the
 * part components and the hook result, and isolates nested tables.
 */
export const {
  tableContext: dataTableTableContext,
  cellContext: dataTableCellContext,
  headerContext: dataTableHeaderContext,
  useTableContext,
  useCellContext,
  useHeaderContext,
} = createTableHookContexts<DataTableFeatures>()

/**
 * Internal accessor for the bound table instance. The context hooks above are
 * typed with the features only; the provider always receives the extended
 * instance created by `useDataTable`, so the `App*` wrapper components are
 * available at runtime.
 */
export function useTableInstance<TData extends RowData = RowData>() {
  return useTableContext<TData>() as unknown as AppReactTable<
    DataTableFeatures,
    TData,
    TableState<DataTableFeatures>,
    Record<never, never>,
    Record<never, never>,
    Record<never, never>
  >
}

export type DataTableLayout = 'grow' | 'fixed'

export interface DataTableUIContextValue extends DataTableVariantProps {
  layout: DataTableLayout
  scrollRef: React.RefObject<HTMLDivElement | null>
  size: DataTableSize
  stickyHeader: boolean
}

const DataTableUIContext = React.createContext<DataTableUIContextValue | null>(
  null,
)

export function DataTableUIProvider(props: {
  children: React.ReactNode
  value: DataTableUIContextValue
}) {
  return React.createElement(
    DataTableUIContext.Provider,
    { value: props.value },
    props.children,
  )
}

export function useDataTableUI() {
  const context = React.useContext(DataTableUIContext)

  if (!context) {
    throw new Error('useDataTableUI must be used within <DataTable.Root>')
  }

  return context
}
