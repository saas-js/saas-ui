import Web3AddressJson from './components/web3-address.json'
import UtilsJson from './components/utils.json'
import ToolbarJson from './components/toolbar.json'
import ToggleJson from './components/toggle.json'
import TimelineJson from './components/timeline.json'
import StructuredListJson from './components/structured-list.json'
import StepperJson from './components/stepper.json'
import SnackbarJson from './components/snackbar.json'
import SidebarJson from './components/sidebar.json'
import SearchInputJson from './components/search-input.json'
import ResizeJson from './components/resize.json'
import RadioCardsJson from './components/radio-cards.json'
import ProviderJson from './components/provider.json'
import PropertyJson from './components/property.json'
import PersonaJson from './components/persona.json'
import PageJson from './components/page.json'
import OnboardingJson from './components/onboarding.json'
import NprogressJson from './components/nprogress.json'
import NavbarJson from './components/navbar.json'
import ModalsJson from './components/modals.json'
import MenuJson from './components/menu.json'
import LoadingOverlayJson from './components/loading-overlay.json'
import LinkJson from './components/link.json'
import KanbanJson from './components/kanban.json'
import IconBadgeJson from './components/icon-badge.json'
import HotkeysJson from './components/hotkeys.json'
import HooksJson from './components/hooks.json'
import FormsJson from './components/forms.json'
import FiltersJson from './components/filters.json'
import FileUploadJson from './components/file-upload.json'
import FeatureFlagsJson from './components/feature-flags.json'
import ErrorBoundaryJson from './components/error-boundary.json'
import EmptyStateJson from './components/empty-state.json'
import DatePickerJson from './components/date-picker.json'
import DataTableJson from './components/data-table.json'
import DataGridJson from './components/data-grid.json'
import CommandBarJson from './components/command-bar.json'
import ChartsJson from './components/charts.json'
import BulkActionsJson from './components/bulk-actions.json'
import BannerJson from './components/banner.json'
import AuthJson from './components/auth.json'
import AppShellJson from './components/app-shell.json'

export const Web3Address = Web3AddressJson
export const Utils = UtilsJson
export const Toolbar = ToolbarJson
export const Toggle = ToggleJson
export const Timeline = TimelineJson
export const StructuredList = StructuredListJson
export const Stepper = StepperJson
export const Snackbar = SnackbarJson
export const Sidebar = SidebarJson
export const SearchInput = SearchInputJson
export const Resize = ResizeJson
export const RadioCards = RadioCardsJson
export const Provider = ProviderJson
export const Property = PropertyJson
export const Persona = PersonaJson
export const Page = PageJson
export const Onboarding = OnboardingJson
export const Nprogress = NprogressJson
export const Navbar = NavbarJson
export const Modals = ModalsJson
export const Menu = MenuJson
export const LoadingOverlay = LoadingOverlayJson
export const Link = LinkJson
export const Kanban = KanbanJson
export const IconBadge = IconBadgeJson
export const Hotkeys = HotkeysJson
export const Hooks = HooksJson
export const Forms = FormsJson
export const Filters = FiltersJson
export const FileUpload = FileUploadJson
export const FeatureFlags = FeatureFlagsJson
export const ErrorBoundary = ErrorBoundaryJson
export const EmptyState = EmptyStateJson
export const DatePicker = DatePickerJson
export const DataTable = DataTableJson
export const DataGrid = DataGridJson
export const CommandBar = CommandBarJson
export const Charts = ChartsJson
export const BulkActions = BulkActionsJson
export const Banner = BannerJson
export const Auth = AuthJson
export const AppShell = AppShellJson

const json = {
Web3Address,
Utils,
Toolbar,
Toggle,
Timeline,
StructuredList,
Stepper,
Snackbar,
Sidebar,
SearchInput,
Resize,
RadioCards,
Provider,
Property,
Persona,
Page,
Onboarding,
Nprogress,
Navbar,
Modals,
Menu,
LoadingOverlay,
Link,
Kanban,
IconBadge,
Hotkeys,
Hooks,
Forms,
Filters,
FileUpload,
FeatureFlags,
ErrorBoundary,
EmptyState,
DatePicker,
DataTable,
DataGrid,
CommandBar,
Charts,
BulkActions,
Banner,
Auth,
AppShell
}

export const allPropDocs = Object.fromEntries(
  Object.values(json).flatMap((doc) => Object.entries(doc)),
)

export const getPropDoc = (name) => allPropDocs[name]