'use client'

import * as React from 'react'

import { Badge, FormatNumber, IconButton, Text, chakra } from '@chakra-ui/react'

import { ChevronDownIcon } from '../../icons/chevron-down-icon'
import { ChevronRightIcon } from '../../icons/chevron-right-icon'
import { ChevronUpIcon } from '../../icons/chevron-up-icon'
import { Checkbox } from '../checkbox/index'
import { FormatDate } from '../format-date/index'
import {
  useCellContext,
  useHeaderContext,
  useTableInstance,
} from './data-table.context'
import { TableResizerSlot } from './data-table.primitives'
import { dataAttr } from './data-table.utils'

/**
 * Cell components. These read the current cell through context, so they can
 * be used directly in column defs without prop drilling:
 *
 *   columnHelper.accessor('name', {
 *     cell: ({ cell }) => <cell.TextCell />,
 *   })
 *
 * Formatting cells use the locale from Chakra's `LocaleProvider`.
 */

export function TextCell() {
  const cell = useCellContext()
  const value = cell.renderValue()

  return (
    <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
      {value == null || value === '' ? '—' : String(value)}
    </Text>
  )
}

export interface NumberCellProps extends Intl.NumberFormatOptions {}

export function NumberCell(props: NumberCellProps) {
  const cell = useCellContext<number | null | undefined>()
  const value = cell.getValue()

  if (value == null) {
    return <Text color="fg.muted">—</Text>
  }

  return (
    <Text whiteSpace="nowrap">
      <FormatNumber value={value} {...props} />
    </Text>
  )
}

export interface DateCellProps extends Intl.DateTimeFormatOptions {}

export function DateCell(props: DateCellProps) {
  const cell = useCellContext<Date | string | number | null | undefined>()
  const value = cell.getValue()

  if (value == null || value === '') {
    return <Text color="fg.muted">—</Text>
  }

  return (
    <Text whiteSpace="nowrap">
      <FormatDate
        day="numeric"
        month="short"
        year="numeric"
        value={value}
        {...props}
      />
    </Text>
  )
}

export interface BadgeCellProps {
  colorPalette?: string | ((value: string) => string | undefined)
  labels?: Record<string, React.ReactNode>
}

export function BadgeCell(props: BadgeCellProps) {
  const { colorPalette = 'gray', labels } = props
  const cell = useCellContext<string | null | undefined>()
  const value = cell.getValue()

  if (value == null || value === '') {
    return <Text color="fg.muted">—</Text>
  }

  return (
    <Badge
      colorPalette={
        typeof colorPalette === 'function'
          ? (colorPalette(value) ?? 'gray')
          : colorPalette
      }
      size="sm"
      variant="surface"
    >
      {labels?.[value] ?? value}
    </Badge>
  )
}

interface SelectionCheckboxProps {
  checked: boolean | 'indeterminate'
  disabled?: boolean
  label: string
  onCheckedChange: (checked: boolean) => void
}

function SelectionCheckbox(props: SelectionCheckboxProps) {
  return (
    <Checkbox
      aria-label={props.label}
      checked={props.checked}
      disabled={props.disabled}
      size="sm"
      onClick={(event) => event.stopPropagation()}
      onCheckedChange={({ checked }) => props.onCheckedChange(checked === true)}
    />
  )
}

export function SelectionCell() {
  const cell = useCellContext()
  const row = cell.row
  const checked = row.getIsSomeSelected()
    ? 'indeterminate'
    : row.getIsSelected()

  return (
    <SelectionCheckbox
      checked={checked}
      disabled={!row.getCanSelect()}
      label={checked === true ? 'Deselect row' : 'Select row'}
      onCheckedChange={(nextChecked) => row.toggleSelected(nextChecked)}
    />
  )
}

export function SelectionHeader() {
  const table = useTableInstance()
  const checked = table.getIsSomeRowsSelected()
    ? 'indeterminate'
    : table.getIsAllRowsSelected()

  return (
    <SelectionCheckbox
      checked={checked}
      label={checked === true ? 'Deselect all rows' : 'Select all rows'}
      onCheckedChange={(nextChecked) =>
        table.toggleAllRowsSelected(nextChecked)
      }
    />
  )
}

export interface ExpanderCellProps {
  expandLabel?: string
  collapseLabel?: string
}

export function ExpanderCell(props: ExpanderCellProps) {
  const { expandLabel = 'Expand row', collapseLabel = 'Collapse row' } = props
  const cell = useCellContext()
  const row = cell.row

  if (!row.getCanExpand()) {
    return null
  }

  const expanded = row.getIsExpanded()

  return (
    <IconButton
      aria-expanded={expanded}
      aria-label={expanded ? collapseLabel : expandLabel}
      size="2xs"
      variant="ghost"
      onClick={(event) => {
        event.stopPropagation()
        row.toggleExpanded()
      }}
    >
      <chakra.span
        display="inline-flex"
        transform={expanded ? 'rotate(90deg)' : undefined}
        transition="transform 0.15s"
      >
        <ChevronRightIcon />
      </chakra.span>
    </IconButton>
  )
}

export function SortIndicator() {
  const header = useHeaderContext()
  const column = header.column

  if (!column.getCanSort()) {
    return null
  }

  const sorted = column.getIsSorted()

  return (
    <chakra.span aria-hidden="true" display="inline-flex" flexShrink={0}>
      {sorted === 'asc' ? (
        <ChevronUpIcon />
      ) : sorted === 'desc' ? (
        <ChevronDownIcon />
      ) : (
        <chakra.span data-sort-hint display="inline-flex">
          <ChevronDownIcon />
        </chakra.span>
      )}
    </chakra.span>
  )
}

export function ResizeHandle() {
  const header = useHeaderContext()
  const column = header.column

  if (!column.getCanResize()) {
    return null
  }

  const handler = header.getResizeHandler()

  return (
    <TableResizerSlot
      aria-label={`Resize ${column.id} column`}
      data-resizing={dataAttr(column.getIsResizing())}
      role="separator"
      onDoubleClick={() => column.resetSize()}
      onMouseDown={handler}
      onTouchStart={handler}
    />
  )
}
