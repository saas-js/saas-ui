import { ComponentProps } from 'react'

import { ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda-preset/jsx'
import { spinner } from '@saas-ui/panda-preset/recipes'

export interface SpinnerProps extends ComponentProps<typeof Spinner> {}

export const Spinner = styled(ark.span, spinner)
