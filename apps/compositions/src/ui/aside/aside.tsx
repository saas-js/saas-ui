'use client'

import { forwardRef, useState } from 'react'

import {
  type HTMLChakraProps,
  chakra,
  useDisclosure,
} from '@chakra-ui/react'
import type { SlotRecipeProps } from '@saas-ui/chakra-preset'
import type { AsideVariantProps } from '@saas-ui/chakra-preset/slot-recipes/aside'
import { useIsMobile } from '@saas-ui/hooks'

import { withContext, withProvider } from './aside.context'

const AsideHeader = withContext<HTMLDivElement, HTMLChakraProps<'header'>>(
  'header',
  'header',
)

const AsideTitle = withContext<HTMLHeadingElement, HTMLChakraProps<'h3'>>(
  'h3',
  'title',
)

const AsideBody = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'body',
)

interface AsideRootProps
  extends
    HTMLChakraProps<'div'>,
    SlotRecipeProps<'suiAside', AsideVariantProps> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  children?: React.ReactNode
}

const AsideRoot = withProvider<HTMLDivElement, AsideRootProps>(
  forwardRef<HTMLDivElement, AsideRootProps>(function AsideRoot(props, ref) {
    const {
      children,
      defaultOpen,
      open: openProp,
      onOpenChange,
      ...rest
    } = props

    const isMobile = useIsMobile()

    const [openMobile, setOpenMobile] = useState(false)

    const { open } = useDisclosure({
      defaultOpen: isMobile ? openMobile : defaultOpen,
      open: isMobile ? openMobile : openProp,
      onOpen: () => {
        if (isMobile) {
          setOpenMobile(true)
        } else {
          onOpenChange?.({
            open: true,
          })
        }
      },
      onClose: () => {
        if (isMobile) {
          setOpenMobile(false)
        } else {
          onOpenChange?.({
            open: false,
          })
        }
      },
    })

    return (
      <chakra.div ref={ref} data-state={open ? 'open' : 'closed'} {...rest}>
        {children}
      </chakra.div>
    )
  }),
  'root',
)

export {
  AsideBody as Body,
  AsideHeader as Header,
  AsideRoot as Root,
  AsideTitle as Title,
}

export type { AsideRootProps as RootProps }
