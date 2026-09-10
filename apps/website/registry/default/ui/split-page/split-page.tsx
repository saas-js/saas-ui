'use client'

import * as React from 'react'

import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
  useDisclosure,
} from '@chakra-ui/react'
import type { SlotRecipeProps } from '@saas-ui/chakra-preset'
import type { SplitPageVariantProps } from '@saas-ui/chakra-preset/slot-recipes/split-page'
import { useIsMobile } from '@saas-ui/hooks'

import {
  SplitPageProvider,
  useClassNames,
  useSplitPageStyles,
  withProvider,
} from './split-page.context.ts'

export interface SplitPageProps
  extends
    Omit<HTMLChakraProps<'div'>, 'children'>,
    SlotRecipeProps<'suiSplitPage', SplitPageVariantProps> {
  defaultOpen?: boolean
  open?: boolean
  onClose?(): void
  onOpen?(): void
  children: [React.ReactElement, React.ReactElement]
  breakpoints?: Record<string, string | boolean> | (string | boolean)[]
  breakpoint?: string
}

export const SplitPage = withProvider<HTMLDivElement, SplitPageProps>(
  function SplitPage(props) {
    const {
      children,
      defaultOpen,
      onClose,
      onOpen,
      open,
      breakpoint = 'lg',
      ...rest
    } = props

    const styles = useSplitPageStyles()
    const classNames = useClassNames()

    const isMobile = useIsMobile()

    const context = useDisclosure({
      defaultOpen: defaultOpen || !isMobile,
      onClose,
      onOpen,
      open,
    })

    const contentStyles: SystemStyleObject = {
      [breakpoint]: {},
      ...styles.content,
    }

    const [startPage, endPage] = children

    return (
      <SplitPageProvider value={context}>
        <chakra.main {...rest}>
          {startPage}
          <chakra.div
            data-open={context.open ? '' : undefined}
            data-closed={context.open ? undefined : ''}
            css={contentStyles}
            className={classNames.content}
          >
            {endPage}
          </chakra.div>
        </chakra.main>
      </SplitPageProvider>
    )
  },
  'root',
  {
    defaultProps: {
      colorPalette: 'gray',
    },
  },
)
