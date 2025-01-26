import { ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda/jsx'
import { spinner } from '@saas-ui/panda/recipes'
import { ComponentProps } from 'react'

export interface SpinnerProps extends ComponentProps<typeof Spinner> {}

export const Spinner = styled(ark.span, spinner)
