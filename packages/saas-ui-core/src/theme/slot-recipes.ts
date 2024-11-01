import { appShellSlotRecipe } from '../app-shell/app-shell.recipe'
import { gridListSlotRecipe } from '../grid-list/grid-list.recipe'
import { loadingOverlaySlotRecipe } from '../loading-overlay/loading-overlay.recipe'
import { navbarSlotRecipe } from '../navbar/navbar.recipe'
import { personaSlotRecipe } from '../persona/persona.recipe'
import { sidebarNavItemSlotRecipe } from '../sidebar/sidebar-item.recipe'
import { sidebarSlotRecipe } from '../sidebar/sidebar.recipe'
import { accordionSlotRecipe } from './recipes/chakra/accordion'
import { actionBarSlotRecipe } from './recipes/chakra/action-bar'
import { alertSlotRecipe } from './recipes/chakra/alert'
import { avatarSlotRecipe } from './recipes/chakra/avatar'
import { blockquoteSlotRecipe } from './recipes/chakra/blockquote'
import { breadcrumbSlotRecipe } from './recipes/chakra/breadcrumb'
import { cardSlotRecipe } from './recipes/chakra/card'
import { checkboxSlotRecipe } from './recipes/chakra/checkbox'
import { checkboxCardSlotRecipe } from './recipes/chakra/checkbox-card'
import { collapsibleSlotRecipe } from './recipes/chakra/collapsible'
import { dataListSlotRecipe } from './recipes/chakra/data-list'
import { dialogSlotRecipe } from './recipes/chakra/dialog'
import { drawerSlotRecipe } from './recipes/chakra/drawer'
import { editableSlotRecipe } from './recipes/chakra/editable'
import { emptyStateSlotRecipe } from './recipes/chakra/empty-state'
import { fieldSlotRecipe } from './recipes/chakra/field'
import { fileUploadSlotRecipe } from './recipes/chakra/file-upload'
import { hoverCardSlotRecipe } from './recipes/chakra/hover-card'
import { listSlotRecipe } from './recipes/chakra/list'
import { menuSlotRecipe } from './recipes/chakra/menu'
import { nativeSelectSlotRecipe } from './recipes/chakra/native-select'
import { numberInputSlotRecipe } from './recipes/chakra/number-input'
import { pinInputSlotRecipe } from './recipes/chakra/pin-input'
import { popoverSlotRecipe } from './recipes/chakra/popover'
import { progressSlotRecipe } from './recipes/chakra/progress'
import { progressCircleSlotRecipe } from './recipes/chakra/progress-circle'
import { radioCardSlotRecipe } from './recipes/chakra/radio-card'
import { radioGroupSlotRecipe } from './recipes/chakra/radio-group'
import { ratingGroupSlotRecipe } from './recipes/chakra/rating-group'
import { segmentGroupSlotRecipe } from './recipes/chakra/segment-group'
import { selectSlotRecipe } from './recipes/chakra/select'
import { sliderSlotRecipe } from './recipes/chakra/slider'
import { statSlotRecipe } from './recipes/chakra/stat'
import { statusSlotRecipe } from './recipes/chakra/status'
import { stepsSlotRecipe } from './recipes/chakra/steps'
import { switchSlotRecipe } from './recipes/chakra/switch'
import { tableSlotRecipe } from './recipes/chakra/table'
import { tabsSlotRecipe } from './recipes/chakra/tabs'
import { tagSlotRecipe } from './recipes/chakra/tag'
import { timelineSlotRecipe } from './recipes/chakra/timeline'
import { toastSlotRecipe } from './recipes/chakra/toast'
import { tooltipSlotRecipe } from './recipes/chakra/tooltip'

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
  appShell: appShellSlotRecipe,
  loadingOverlay: loadingOverlaySlotRecipe,
  persona: personaSlotRecipe,
  gridList: gridListSlotRecipe,
  navbar: navbarSlotRecipe,
  sidebar: sidebarSlotRecipe,
  sidebarNavItem: sidebarNavItemSlotRecipe,
}
