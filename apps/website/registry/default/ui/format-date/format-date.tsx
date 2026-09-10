'use client'

import * as React from 'react'

import { useLocaleContext } from '@chakra-ui/react'

/**
 * Formats a date for display, following the same conventions as Ark UI's
 * Format components (`FormatNumber`, `FormatByte`): the locale comes from
 * `LocaleProvider`, the props are the `Intl.DateTimeFormat` options, and the
 * output renders as plain text.
 *
 *   <FormatDate value={new Date()} day="numeric" month="short" year="numeric" />
 */

// Intl formatters are expensive to construct; cache them per locale/options
// combination like @zag-js/i18n-utils does for numbers.
const formatterCache = new Map<string, Intl.DateTimeFormat>()

function getFormatter(locale: string, options: Intl.DateTimeFormatOptions) {
  const key = `${locale}|${JSON.stringify(options)}`
  let formatter = formatterCache.get(key)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, options)
    formatterCache.set(key, formatter)
  }
  return formatter
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/

function parseDate(value: Date | string | number): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  // Parse date-only strings to local midnight so the displayed calendar date
  // never shifts with the viewer's timezone. `new Date('2026-03-18')` would
  // parse as UTC midnight and render as March 17 west of Greenwich.
  if (typeof value === 'string' && DATE_ONLY.test(value)) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year!, month! - 1, day!)
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export interface FormatDateProps extends Intl.DateTimeFormatOptions {
  /**
   * The date to format. Date-only strings (`2026-03-18`) are interpreted as
   * local calendar dates.
   */
  value: Date | string | number
}

export const FormatDate = (props: FormatDateProps) => {
  const { locale } = useLocaleContext()
  const text = React.useMemo(() => {
    const { value, ...intlOptions } = props
    const date = parseDate(value)
    return date ? getFormatter(locale, intlOptions).format(date) : null
  }, [props, locale])

  return <>{text}</>
}

FormatDate.displayName = 'FormatDate'
