import { HTMLSuiProps } from '../types'

export type SidebarMode = 'flyout' | 'collapsible' | 'compact'

export interface SidebarOptions {
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
  onOpenChange?: (details: { open: boolean; mode: SidebarMode }) => void
  /**
   * The mode of the sidebar.
   * @default 'collapsible'
   */
  mode?: SidebarMode
  /**
   * Callback invoked when the mode of the sidebar is changed.
   */
  onModeChange?: (details: { mode: SidebarMode }) => void
}

export interface SidebarProps extends SidebarOptions, HTMLSuiProps<'div'> {}
