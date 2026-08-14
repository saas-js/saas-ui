import type { ComponentProps, RefObject } from 'react'

import { Content } from './popover.tsx'

const portalRef = null as unknown as RefObject<HTMLDivElement | null>

const nestedPopover = {
  portalled: false,
  portalRef,
} satisfies ComponentProps<typeof Content>

void nestedPopover
