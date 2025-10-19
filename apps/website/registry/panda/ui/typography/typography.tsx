import { ComponentProps } from 'react'

import { ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda-preset/jsx'

export interface TextProps extends ComponentProps<typeof ark.p> {}
export interface HeadingProps extends ComponentProps<typeof ark.h2> {}

export const Text = styled(ark.p)
export const Heading = styled(ark.h2)
