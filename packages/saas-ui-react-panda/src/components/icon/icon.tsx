import { ComponentProps } from 'react'

import { ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda/jsx'

export interface IconProps extends ComponentProps<typeof Icon> {}

export const Icon = styled(
  ark.svg,
  {},
  {
    defaultProps: {
      asChild: true,
    },
  },
)
