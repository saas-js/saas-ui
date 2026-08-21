export const escapeId = (id: string) => id.replaceAll(/[\s.#[\]]/g, '-')

export const dataAttr = (condition: boolean | undefined) =>
  condition ? '' : undefined

/**
 * Default row heights per size variant. Used as the row virtualizer's
 * `estimateSize` before rows are measured, so keep these in sync with the
 * cell paddings in the slot recipe.
 */
export const sizeToRowHeight = {
  sm: 36,
  md: 44,
  lg: 52,
} as const

export type DataTableSize = keyof typeof sizeToRowHeight

export function estimateDataTableRowHeight(size: DataTableSize = 'md') {
  return sizeToRowHeight[size] ?? sizeToRowHeight.md
}
