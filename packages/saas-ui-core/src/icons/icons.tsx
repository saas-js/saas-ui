import * as React from 'react'
import { createIcon } from './create-icon'

export const ChevronUpIcon = createIcon({
  displayName: 'ChevronUpIcon',
  path: <polyline points="18 15 12 9 6 15"></polyline>,
})

export const ChevronDownIcon = createIcon({
  displayName: 'ChevronDownIcon',
  path: <polyline points="6 9 12 15 18 9"></polyline>,
})

export const ChevronLeftIcon = createIcon({
  displayName: 'ChevronLeftIcon',
  path: <polyline points="15 18 9 12 15 6"></polyline>,
})

export const ChevronRightIcon = createIcon({
  displayName: 'ChevronRightIcon',
  path: <polyline points="9 18 15 12 9 6"></polyline>,
})

export const HamburgerIcon = createIcon({
  displayName: 'ChevronDownIcon',
  path: (
    <g fill="none">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </g>
  ),
})

export const XIcon = createIcon({
  displayName: 'XIcon',
  path: (
    <g>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </g>
  ),
})

export const FilterIcon = createIcon({
  displayName: 'FilterIcon',
  path: (
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  ),
})
