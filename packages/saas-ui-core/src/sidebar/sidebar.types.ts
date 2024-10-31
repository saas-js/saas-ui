import {
  HTMLChakraProps,
  IconButtonProps,
  type SlotRecipeProps,
} from '@chakra-ui/react'
import { MaybeRenderProp } from '@chakra-ui/react-utils'

import type { HTMLSystemProps } from '#system'

export interface SidebarOptions {
  /**
   * Define the for the mobile nav. Use `false` to disable the mobile nav.
   *
   * @default "lg"
   */
  toggleBreakpoint?: false | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /**
   * Control the default visibility of the sidebar.
   */
  defaultOpen?: boolean
  /**
   * Control the visibility of the sidebar.
   */
  open?: boolean
  /**
   * Callback invoked when the sidebar is opened.
   */
  onOpenChange?: (open: boolean) => void
}

export interface SidebarProps
  extends SidebarOptions,
    HTMLChakraProps<'div'>,
    SlotRecipeProps<'sidebar'> {}

export interface SidebarSectionProps extends HTMLChakraProps<'div'> {}
