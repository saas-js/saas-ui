'use client'

import { forwardRef } from 'react'

import {
  Presence,
  type PresenceBaseProps,
  splitPresenceProps,
} from '@ark-ui/react/presence'
import { HTMLChakraProps, chakra } from '@chakra-ui/react'
import type { SlotRecipeProps } from '@saas-ui/chakra-preset'
import type { LoadingOverlayVariantProps } from '@saas-ui/chakra-preset/slot-recipes/loading-overlay'

import { Spinner } from '../spinner/index.ts'
import { withContext, withProvider } from './loading-overlay.context.ts'

interface LoadingOverlayProps
  extends
    HTMLChakraProps<'div'>,
    SlotRecipeProps<'suiLoadingOverlay', LoadingOverlayVariantProps>,
    PresenceBaseProps {
  /**
   * Show or hide the LoadingOverlay.
   * @default true
   */
  loading?: boolean
}

const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  (props, ref) => {
    const { children, loading = true, ...rest } = props

    const [presenceProps, rootProps] = splitPresenceProps(rest)

    return (
      <Presence present={loading} {...presenceProps} asChild>
        <chakra.div ref={ref} {...rootProps}>
          {children}
        </chakra.div>
      </Presence>
    )
  },
)

const LoadingOverlayRoot = withProvider<HTMLDivElement, LoadingOverlayProps>(
  LoadingOverlay,
  'root',
)

LoadingOverlayRoot.displayName = 'LoadingOverlay'

const LoadingOverlaySpinner = Spinner

interface LoadingTextProps extends HTMLChakraProps<'p'> {}

const LoadingOverlayText = withContext<HTMLParagraphElement, LoadingTextProps>(
  'p',
  'text',
)

export {
  LoadingOverlayRoot as Root,
  LoadingOverlaySpinner as Spinner,
  LoadingOverlayText as Text,
}
export type { LoadingOverlayProps as RootProps, LoadingTextProps as TextProps }
