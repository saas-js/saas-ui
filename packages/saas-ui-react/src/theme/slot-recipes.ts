import { accordionSlotRecipe } from '#components/accordion/accordion.recipe.ts'
import { alertSlotRecipe } from '#components/alert/alert.recipe.ts'
import { appShellSlotRecipe } from '#components/app-shell/app-shell.recipe.ts'
import { avatarSlotRecipe } from '#components/avatar/avatar.recipe.ts'
import { breadcrumbSlotRecipe } from '#components/breadcrumb/breadcrumb.recipe.ts'
import { cardSlotRecipe } from '#components/card/card.recipe.ts'
import { checkboxSlotRecipe } from '#components/checkbox/checkbox.recipe.ts'
import { dataListSlotRecipe } from '#components/data-list/data-list.recipe.ts'
import { dialogSlotRecipe } from '#components/dialog/dialog.recipe.ts'
import { drawerSlotRecipe } from '#components/drawer/drawer.recipe.ts'
import { emptyStateSlotRecipe } from '#components/empty-state/empty-state.recipe.ts'
import { fileUploadSlotRecipe } from '#components/file-upload/file-upload.recipe.ts'
import { gridListSlotRecipe } from '#components/grid-list/grid-list.recipe.ts'
import { hoverCardSlotRecipe } from '#components/hover-card/hover-card.recipe.ts'
import { loadingOverlaySlotRecipe } from '#components/loading-overlay/loading-overlay.recipe.ts'
import { menuSlotRecipe } from '#components/menu/menu.recipe.ts'
import { navbarSlotRecipe } from '#components/navbar/navbar.recipe.ts'
import { numberInputSlotRecipe } from '#components/number-input/number-input.recipe.ts'
import { personaSlotRecipe } from '#components/persona/persona.recipe.ts'
import { pinInputSlotRecipe } from '#components/pin-input/pin-input.recipe.ts'
import { popoverSlotRecipe } from '#components/popover/popover.recipe.ts'
import { progressCircleSlotRecipe } from '#components/progress-circle/progress-circle.recipe.ts'
import { progressSlotRecipe } from '#components/progress/progress.recipe.ts'
import { segmentGroupSlotRecipe } from '#components/segmented-control/segment-group.recipe.ts'
import { selectSlotRecipe } from '#components/select/select.recipe.ts'
import { sidebarNavItemSlotRecipe } from '#components/sidebar/sidebar-nav-item.recipe.ts'
import { sidebarSlotRecipe } from '#components/sidebar/sidebar.recipe.ts'
import { statusSlotRecipe } from '#components/status/status.recipe.ts'
import { tabsSlotRecipe } from '#components/tabs/tabs.recipe.ts'
import { tagSlotRecipe } from '#components/tag/tag.recipe.ts'
import { toastSlotRecipe } from '#components/toaster/toast.recipe.ts'
import { tooltipSlotRecipe } from '#components/tooltip/tooltip.recipe.ts'

import { actionBarSlotRecipe } from './recipes/chakra/action-bar'
import { blockquoteSlotRecipe } from './recipes/chakra/blockquote'
import { checkboxCardSlotRecipe } from './recipes/chakra/checkbox-card'
import { collapsibleSlotRecipe } from './recipes/chakra/collapsible'
import { editableSlotRecipe } from './recipes/chakra/editable'
import { fieldSlotRecipe } from './recipes/chakra/field'
import { listSlotRecipe } from './recipes/chakra/list'
import { nativeSelectSlotRecipe } from './recipes/chakra/native-select'
import { radioCardSlotRecipe } from './recipes/chakra/radio-card'
import { radioGroupSlotRecipe } from './recipes/chakra/radio-group'
import { ratingGroupSlotRecipe } from './recipes/chakra/rating-group'
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
  swittch: switchSlotRecipe,
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
