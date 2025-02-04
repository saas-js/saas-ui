import { ComponentProps } from 'react'

import { ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda-preset/jsx'

export interface ImageProps extends ComponentProps<typeof ark.img> {}

export const Image = styled(ark.img)
