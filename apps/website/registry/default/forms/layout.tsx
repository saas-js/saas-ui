'use client'

import * as React from 'react'

import { Stack, type StackProps } from '@chakra-ui/react'

export interface LayoutProps extends StackProps {
  children: React.ReactNode
  /**
   * The width of the labels for horizontal-orientation form fields.
   * Sets `--field-label-width` CSS variable.
   */
  labelWidth?: string
}
/**
 * Vertical layout for form fields. Carries the `--field-label-width` CSS var
 * when a call-site sets it (used by horizontal-orientation fields). Does not
 * hardcode the var so an ancestor (e.g. `Card.Body`) can provide it instead.
 */
export function Layout(props: LayoutProps) {
  const { children, labelWidth, ...rest } = props
  return (
    <Stack
      gap="4"
      width="full"
      css={{
        '--field-label-width': labelWidth,
        ...rest.css,
      }}
      {...rest}
    >
      {children}
    </Stack>
  )
}
