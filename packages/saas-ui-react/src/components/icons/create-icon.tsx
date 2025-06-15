'use client'

import type { IconProps } from '@chakra-ui/react/icon'
import { createIcon as _createIcon } from '@chakra-ui/react/icon'

interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string
  /**
   * The `svg` path or group element
   * @type React.ReactElement | React.ReactElement[]
   */
  path?: React.ReactElement | React.ReactElement[]
  /**
   * If the `svg` has a single path, simply copy the path's `d` attribute
   */
  d?: string
  /**
   * The display name useful in the dev tools
   */
  displayName?: string
  /**
   * Default props automatically passed to the component; overwriteable
   */
  defaultProps?: IconProps
}

export const createIcon = (props: CreateIconOptions) => {
  return _createIcon({
    viewBox: '0 0 24 24',
    defaultProps: {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    ...props,
  })
}
