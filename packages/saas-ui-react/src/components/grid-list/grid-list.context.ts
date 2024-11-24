import { createSlotRecipeContext } from '@chakra-ui/react'

export const {
  withProvider,
  withContext,
  useStyles: useGridListStyles,
} = createSlotRecipeContext({
  key: 'suiGridList',
})
