'use client'

import { createSlotRecipeContext } from '@chakra-ui/react'
import {
  type SidebarVariantProps,
  sidebarSlotRecipe,
} from '@saas-ui/chakra-preset/slot-recipes/sidebar'
import {
  type SidebarNavItemVariantProps,
  sidebarNavItemSlotRecipe,
} from '@saas-ui/chakra-preset/slot-recipes/sidebar-nav-item'
import {
  type SidebarMode,
  type SidebarOptions,
  useSidebar,
} from '@saas-ui/react/sidebar'

export type { SidebarMode, SidebarOptions, SidebarVariantProps }
export type { SidebarNavItemVariantProps }

export { useSidebar }

export const {
  withContext,
  useRecipeResult,
  StylesProvider,
  ClassNamesProvider,
  useStyles: useSidebarStyles,
} = createSlotRecipeContext({
  recipe: sidebarSlotRecipe,
})

export const {
  withProvider: withItemProvider,
  withContext: withItemContext,
  useStyles: useSidebarItemStyles,
} = createSlotRecipeContext({
  recipe: sidebarNavItemSlotRecipe,
})
