'use client'

import { Group, type GroupProps } from '@chakra-ui/react'

/**
 * Footer row for form actions (e.g. the submit button). Indents by the
 * `--field-label-width` so the actions line up under the field column in
 * horizontal-orientation forms; falls back to no indent when the var is unset.
 */
export function Footer(props: GroupProps) {
  return (
    <Group
      ps="calc(var(--field-label-width, 0px) + var(--chakra-spacing-2))"
      {...props}
    />
  )
}
