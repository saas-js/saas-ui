import { ComponentProps } from 'react'

import { ark } from '@ark-ui/react'
import { styled } from '@saas-ui/react-panda/styled-system/jsx'
import { spinner } from '@saas-ui/react-panda/styled-system/recipes'

export interface SpinnerProps extends ComponentProps<typeof Spinner> {}

export const Spinner = styled(ark.span, spinner)
