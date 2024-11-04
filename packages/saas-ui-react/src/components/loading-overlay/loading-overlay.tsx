import React from 'react'

import {
  Presence,
  type PresenceBaseProps,
  splitPresenceProps,
} from '@ark-ui/react/presence'
import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  createSlotRecipeContext,
} from '@chakra-ui/react'

import { Spinner } from '#components/spinner'

const { useStyles, withContext, withProvider } = createSlotRecipeContext({
  key: 'loadingOverlay',
})

export const useLoadingOverlayStyles = useStyles

export interface LoadingOverlayProps
  extends HTMLChakraProps<'div'>,
    SlotRecipeProps<'loadingOverlay'>,
    PresenceBaseProps {
  /**
   * Show or hide the LoadingOverlay.
   * @default true
   */
  loading?: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = (props) => {
  const { children, loading = true, ...rest } = props

  const [presenceProps, rootProps] = splitPresenceProps(rest)

  return (
    <Presence present={loading} {...presenceProps} asChild>
      <chakra.div {...rootProps}>{children}</chakra.div>
    </Presence>
  )
}

export const LoadingOverlayRoot = withProvider(LoadingOverlay, 'root')

LoadingOverlayRoot.displayName = 'LoadingOverlay'

export const LoadingOverlaySpinner = Spinner

export interface LoadingTextProps extends HTMLChakraProps<'p'> {}

export const LoadingOverlayText = withContext('p', 'text')
