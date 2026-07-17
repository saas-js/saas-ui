import type * as React from 'react'

import type { Field } from '@chakra-ui/react'

/**
 * Props shared by every field component. Each field reads its bound state from
 * `useFieldContext` and renders a Chakra `Field.Root` with label/help/error.
 */
export interface BaseFieldProps {
  /** Field label rendered above (or beside, when horizontal) the control. */
  label?: React.ReactNode
  /** Helper text shown below the control when the field is valid. */
  help?: React.ReactNode
  /** Label placement. `horizontal` uses the `--field-label-width` CSS var. */
  orientation?: 'horizontal' | 'vertical'
  /** Marks the field required (renders the required indicator). */
  required?: boolean
  /** Passthrough props for the wrapping `Field.Root` (e.g. `ps`, `width`). */
  rootProps?: React.ComponentProps<typeof Field.Root>
}
