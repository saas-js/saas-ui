export type SidebarMode = 'flyout' | 'collapsible' | 'compact'

export interface SidebarOptions {
  /**
   * The mode of the sidebar. Flyout mode is only available on desktop.
   * @default 'collapsible'
   */
  mode?: SidebarMode
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
   * Callback invoked when the mode of the sidebar is changed.
   */
  onModeChange?: (details: { mode: SidebarMode }) => void
}
