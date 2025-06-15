import { createSlotRecipeContext } from '@chakra-ui/react'

export const {
  withProvider,
  withContext,
  useStyles: useSectionStyles,
  useClassNames,
} = createSlotRecipeContext({
  key: 'suiSection',
})
