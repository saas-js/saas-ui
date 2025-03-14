import { createSlotRecipeContext } from '@chakra-ui/react'

export const {
  useStyles: useLoadingOverlayStyles,
  withContext,
  withProvider,
} = createSlotRecipeContext({
  key: 'suiLoadingOverlay',
})
