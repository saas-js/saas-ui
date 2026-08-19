'use client'

import type { HTMLChakraProps } from '@chakra-ui/react'

import { withContext, withProvider } from './data-table.context'
import type { DataTableVariantProps } from './data-table.recipe'

/**
 * Unstyled-by-recipe slot primitives. Each renders a semantic element with the
 * matching recipe slot class. Compose these directly when building a fully
 * custom table part; the styled parts in `data-table.tsx` are built on top of
 * the same primitives.
 */

export interface DataTableRootSlotProps
  extends HTMLChakraProps<'div'>, DataTableVariantProps {}

export const DataTableRootSlot = withProvider<
  HTMLDivElement,
  DataTableRootSlotProps
>('div', 'root')

export interface DataTableScrollAreaSlotProps extends HTMLChakraProps<'div'> {}

export const DataTableScrollAreaSlot = withContext<
  HTMLDivElement,
  DataTableScrollAreaSlotProps
>('div', 'scrollArea')

export interface TableSlotProps extends HTMLChakraProps<'table'> {}

export const TableSlot = withContext<HTMLTableElement, TableSlotProps>(
  'table',
  'table',
)

export interface TableHeaderSlotProps extends HTMLChakraProps<'thead'> {}

export const TableHeaderSlot = withContext<
  HTMLTableSectionElement,
  TableHeaderSlotProps
>('thead', 'header')

export interface TableBodySlotProps extends HTMLChakraProps<'tbody'> {}

export const TableBodySlot = withContext<
  HTMLTableSectionElement,
  TableBodySlotProps
>('tbody', 'body')

export interface TableFooterSlotProps extends HTMLChakraProps<'tfoot'> {}

export const TableFooterSlot = withContext<
  HTMLTableSectionElement,
  TableFooterSlotProps
>('tfoot', 'footer')

export interface TableRowSlotProps extends HTMLChakraProps<'tr'> {}

export const TableRowSlot = withContext<HTMLTableRowElement, TableRowSlotProps>(
  'tr',
  'row',
)

export interface TableColumnHeaderSlotProps extends HTMLChakraProps<'th'> {}

export const TableColumnHeaderSlot = withContext<
  HTMLTableCellElement,
  TableColumnHeaderSlotProps
>('th', 'columnHeader')

export interface TableColumnTitleSlotProps extends HTMLChakraProps<'button'> {}

export const TableColumnTitleSlot = withContext<
  HTMLButtonElement,
  TableColumnTitleSlotProps
>('button', 'columnTitle')

export interface TableCellSlotProps extends HTMLChakraProps<'td'> {}

export const TableCellSlot = withContext<
  HTMLTableCellElement,
  TableCellSlotProps
>('td', 'cell')

export interface TableResizerSlotProps extends HTMLChakraProps<'div'> {}

export const TableResizerSlot = withContext<
  HTMLDivElement,
  TableResizerSlotProps
>('div', 'resizer')

export interface TableEmptySlotProps extends HTMLChakraProps<'div'> {}

export const TableEmptySlot = withContext<HTMLDivElement, TableEmptySlotProps>(
  'div',
  'empty',
)

export interface DataTablePaginationSlotProps extends HTMLChakraProps<'div'> {}

export const DataTablePaginationSlot = withContext<
  HTMLDivElement,
  DataTablePaginationSlotProps
>('div', 'pagination')
