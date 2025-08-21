import { createSlotRecipeContext } from '@chakra-ui/react'

export const {
  useStyles: usePersonaStyles,
  useRecipeResult,
  usePropsContext,
  withProvider,
  withContext,
  ClassNamesProvider,
  PropsProvider,
  StylesProvider,
} = createSlotRecipeContext({
  key: 'suiPersona',
})
