import { appShellSlotRecipe } from '#components/app-shell/app-shell.recipe.ts'
import { avatarSlotRecipe } from '#components/avatar/avatar.recipe.ts'
import { dataListSlotRecipe } from '#components/data-list/data-list.recipe.ts'
import { dialogSlotRecipe } from '#components/dialog/dialog.recipe.ts'
import { drawerSlotRecipe } from '#components/drawer/drawer.recipe.ts'
import { emptyStateSlotRecipe } from '#components/empty-state/empty-state.recipe.ts'
import { fileUploadSlotRecipe } from '#components/file-upload/file-upload.recipe.ts'
import { gridListSlotRecipe } from '#components/grid-list/grid-list.recipe.ts'
import { loadingOverlaySlotRecipe } from '#components/loading-overlay/loading-overlay.recipe.ts'
import { menuSlotRecipe } from '#components/menu/menu.recipe.ts'
import { navbarSlotRecipe } from '#components/navbar/navbar.recipe.ts'
import { personaSlotRecipe } from '#components/persona/persona.recipe.ts'
import { popoverSlotRecipe } from '#components/popover/popover.recipe.ts'
import { segmentGroupSlotRecipe } from '#components/segmented-control/segment-group.recipe.ts'
import { sidebarNavItemSlotRecipe } from '#components/sidebar/sidebar-item.recipe.ts'
import { sidebarSlotRecipe } from '#components/sidebar/sidebar.recipe.ts'
import { statusSlotRecipe } from '#components/status/status.recipe.ts'
import { tabsSlotRecipe } from '#components/tabs/tabs.recipe.ts'
import { tagSlotRecipe } from '#components/tag/tag.recipe.ts'
import { toastSlotRecipe } from '#components/toaster/toast.recipe.ts'
import { tooltipSlotRecipe } from '#components/tooltip/tooltip.recipe.ts'

import { accordionSlotRecipe } from './recipes/chakra/accordion'
import { actionBarSlotRecipe } from './recipes/chakra/action-bar'
import { alertSlotRecipe } from './recipes/chakra/alert'
import { blockquoteSlotRecipe } from './recipes/chakra/blockquote'
import { breadcrumbSlotRecipe } from './recipes/chakra/breadcrumb'
import { cardSlotRecipe } from './recipes/chakra/card'
import { checkboxSlotRecipe } from './recipes/chakra/checkbox'
import { checkboxCardSlotRecipe } from './recipes/chakra/checkbox-card'
import { collapsibleSlotRecipe } from './recipes/chakra/collapsible'
import { editableSlotRecipe } from './recipes/chakra/editable'
import { fieldSlotRecipe } from './recipes/chakra/field'
import { hoverCardSlotRecipe } from './recipes/chakra/hover-card'
import { listSlotRecipe } from './recipes/chakra/list'
import { nativeSelectSlotRecipe } from './recipes/chakra/native-select'
import { numberInputSlotRecipe } from './recipes/chakra/number-input'
import { pinInputSlotRecipe } from './recipes/chakra/pin-input'
import { progressSlotRecipe } from './recipes/chakra/progress'
import { progressCircleSlotRecipe } from './recipes/chakra/progress-circle'
import { radioCardSlotRecipe } from './recipes/chakra/radio-card'
import { radioGroupSlotRecipe } from './recipes/chakra/radio-group'
import { ratingGroupSlotRecipe } from './recipes/chakra/rating-group'
import { selectSlotRecipe } from './recipes/chakra/select'
import { sliderSlotRecipe } from './recipes/chakra/slider'
import { statSlotRecipe } from './recipes/chakra/stat'
import { stepsSlotRecipe } from './recipes/chakra/steps'
import { switchSlotRecipe } from './recipes/chakra/switch'
import { tableSlotRecipe } from './recipes/chakra/table'
import { timelineSlotRecipe } from './recipes/chakra/timeline'

export const slotRecipes = {
  // Chakra UI Recipes
  accordion: accordionSlotRecipe,
  actionBar: actionBarSlotRecipe,
  alert: alertSlotRecipe,
  avatar: avatarSlotRecipe,
  blockquote: blockquoteSlotRecipe,
  breadcrumb: breadcrumbSlotRecipe,
  card: cardSlotRecipe,
  checkbox: checkboxSlotRecipe,
  checkboxCard: checkboxCardSlotRecipe,
  collapsible: collapsibleSlotRecipe,
  dataList: dataListSlotRecipe,
  dialog: dialogSlotRecipe,
  drawer: drawerSlotRecipe,
  editable: editableSlotRecipe,
  emptyState: emptyStateSlotRecipe,
  field: fieldSlotRecipe,
  fileUpload: fileUploadSlotRecipe,
  hoverCard: hoverCardSlotRecipe,
  list: listSlotRecipe,
  menu: menuSlotRecipe,
  nativeSelect: nativeSelectSlotRecipe,
  numberInput: numberInputSlotRecipe,
  pinInput: pinInputSlotRecipe,
  popover: popoverSlotRecipe,
  progress: progressSlotRecipe,
  progressCircle: progressCircleSlotRecipe,
  radioCard: radioCardSlotRecipe,
  radioGroup: radioGroupSlotRecipe,
  ratingGroup: ratingGroupSlotRecipe,
  segmentGroup: segmentGroupSlotRecipe,
  select: selectSlotRecipe,
  slider: sliderSlotRecipe,
  stat: statSlotRecipe,
  steps: stepsSlotRecipe,
  switch: switchSlotRecipe,
  table: tableSlotRecipe,
  tabs: tabsSlotRecipe,
  tag: tagSlotRecipe,
  toast: toastSlotRecipe,
  tooltip: tooltipSlotRecipe,
  status: statusSlotRecipe,
  timeline: timelineSlotRecipe,
  // Saas UI Recipes
  suiAppShell: appShellSlotRecipe,
  suiLoadingOverlay: loadingOverlaySlotRecipe,
  suiPersona: personaSlotRecipe,
  suiGridList: gridListSlotRecipe,
  suiNavbar: navbarSlotRecipe,
  suiSidebar: sidebarSlotRecipe,
  suiSidebarNavItem: sidebarNavItemSlotRecipe,
}
