import { createSlotRecipeContext } from '@chakra-ui/react'

export const {
  withProvider,
  withContext,
  useStyles: useNavbarStyles,
} = createSlotRecipeContext({
  key: 'suiNavbar',
})
