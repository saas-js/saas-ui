import { Row } from '@tanstack/react-table'

declare module '@tanstack/table-core' {
  interface ColumnMeta {
    isNumeric?: boolean
    href?: (row: Row) => string
  }
}
