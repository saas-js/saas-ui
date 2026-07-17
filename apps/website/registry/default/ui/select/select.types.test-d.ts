import type { RefObject } from 'react'

import type { SelectContentProps } from './select.tsx'

const portalRef = null as unknown as RefObject<HTMLDivElement | null>

const dialogSelect = {
  portalRef,
} satisfies SelectContentProps

void dialogSelect
