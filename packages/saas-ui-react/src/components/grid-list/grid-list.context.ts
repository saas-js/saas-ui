import { createSlotRecipeContext } from '@chakra-ui/react/styled-system'

export const {
  withProvider,
  withContext,
  useStyles: useGridListStyles,
} = createSlotRecipeContext({
  key: 'suiGridList',
})
