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

export const CloseIcon = createIcon({
  displayName: 'CloseIcon',
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

export const CalendarIcon = createIcon({
  displayName: 'CalendarIcon',
  path: (
    <g>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </g>
  ),
})

export const PlusIcon = createIcon({
  displayName: 'PlusIcon',
  path: (
    <g>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </g>
  ),
})

export const MinusIcon = createIcon({
  displayName: 'MinusIcon',
  path: (
    <g>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </g>
  ),
})

export const ViewOffIcon = createIcon({
  displayName: 'ViewOffIcon',
  path: (
    <g>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </g>
  ),
})

export const ViewIcon = createIcon({
  displayName: 'ViewOffIcon',
  path: (
    <g>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </g>
  ),
})

export const SearchIcon = createIcon({
  displayName: 'SearchIcon',
  path: (
    <g>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </g>
  ),
})

export const CheckIcon = createIcon({
  displayName: 'CheckIcon',
  path: (
    <g>
      <polyline points="20 6 9 17 4 12"></polyline>
    </g>
  ),
})
