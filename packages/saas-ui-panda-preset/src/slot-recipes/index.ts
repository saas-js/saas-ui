import { appShellSlotRecipe } from './app-shell'
import { avatarSlotRecipe } from './avatar'
import { dataListSlotRecipe } from './data-list'
import { dialogSlotRecipe } from './dialog'
import { drawerSlotRecipe } from './drawer'
import { emptyStateSlotRecipe } from './empty-state'
import { fileUploadSlotRecipe } from './file-upload'
import { gridListSlotRecipe } from './grid-list'
import { loadingOverlaySlotRecipe } from './loading-overlay'
import { menuSlotRecipe } from './menu'
import { navbarSlotRecipe } from './navbar'
import { personaSlotRecipe } from './persona'
import { popoverSlotRecipe } from './popover'
import { segmentGroupSlotRecipe } from './segment-group'
import { sidebarSlotRecipe } from './sidebar'
import { sidebarNavItemSlotRecipe } from './sidebar-item'
import { statusSlotRecipe } from './status'
import { tabsSlotRecipe } from './tabs'
import { tagSlotRecipe } from './tag'
import { toastSlotRecipe } from './toast'
import { tooltipSlotRecipe } from './tooltip'

export const slotRecipes = {
  avatar: avatarSlotRecipe,
  dialog: dialogSlotRecipe,
  dataList: dataListSlotRecipe,
  drawer: drawerSlotRecipe,
  fileUpload: fileUploadSlotRecipe,
  emptyState: emptyStateSlotRecipe,
  popover: popoverSlotRecipe,
  menu: menuSlotRecipe,
  segmentGroup: segmentGroupSlotRecipe,
  status: statusSlotRecipe,
  tag: tagSlotRecipe,
  tabs: tabsSlotRecipe,
  toast: toastSlotRecipe,
  tooltip: tooltipSlotRecipe,
  appShell: appShellSlotRecipe,
  gridList: gridListSlotRecipe,
  loadingOverlay: loadingOverlaySlotRecipe,
  navbar: navbarSlotRecipe,
  persona: personaSlotRecipe,
  sidebarNavItem: sidebarNavItemSlotRecipe,
  sidebar: sidebarSlotRecipe,
}
