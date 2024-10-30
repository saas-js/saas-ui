import React from 'react'

import {
  Presence,
  type PresenceBaseProps,
  splitPresenceProps,
} from '@ark-ui/react/presence'
import { Spinner } from '@chakra-ui/react'

import {
  HTMLSystemProps,
  SlotRecipeProps,
  createSlotRecipeContext,
  sui,
} from '#system'

const { useStyles, withContext, withProvider } = createSlotRecipeContext({
  key: 'loadingOverlay',
})

export const useLoadingOverlayStyles = useStyles

export interface LoadingOverlayProps
  extends HTMLSystemProps<'div'>,
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
      <sui.div {...rootProps}>{children}</sui.div>
    </Presence>
  )
}

export const LoadingOverlayRoot = withProvider(LoadingOverlay, 'root')

LoadingOverlayRoot.displayName = 'LoadingOverlay'

export const LoadingOverlaySpinner = Spinner

export interface LoadingTextProps extends HTMLSystemProps<'p'> {}

export const LoadingOverlayText = withContext('p', 'text')
