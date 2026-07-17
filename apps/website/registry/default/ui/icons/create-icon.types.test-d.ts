import type { ComponentType } from 'react'

import { type CreateIconOptions, createIcon } from './index.ts'

const options = {
  displayName: 'TestIcon',
  d: 'M4 12l5 5L20 6',
  defaultProps: { strokeWidth: '2' },
} satisfies CreateIconOptions

const TestIcon: ComponentType = createIcon(options)

// @ts-expect-error viewBox must be an SVG view-box string.
const invalidOptions: CreateIconOptions = { viewBox: 24 }

void TestIcon
void invalidOptions
