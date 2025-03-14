import { createSlotRecipeContext } from '@chakra-ui/react'

export const {
  withContext,
  useRecipeResult,
  StylesProvider,
  ClassNamesProvider,
  useStyles: useSidebarStyles,
} = createSlotRecipeContext({
  key: 'suiSidebar',
})

export const {
  withProvider: withItemProvider,
  withContext: withItemContext,
  useStyles: useSidebarItemStyles,
} = createSlotRecipeContext({
  key: 'suiSidebarNavItem',
})
