import { HTMLSuiProps } from '../types'
import type { SidebarOptions } from './sidebar.options'

export type { SidebarMode, SidebarOptions } from './sidebar.options'

export interface SidebarProps extends SidebarOptions, HTMLSuiProps<'div'> {}
