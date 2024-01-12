import Web3AddressJson from './components/Web3Address.json'
import UtilsJson from './components/Utils.json'
import ToolbarJson from './components/Toolbar.json'
import ToggleJson from './components/Toggle.json'
import TimelineJson from './components/Timeline.json'
import StructuredListJson from './components/StructuredList.json'
import StepperJson from './components/Stepper.json'
import SrcJson from './components/Src.json'
import SnackbarJson from './components/Snackbar.json'
import SidebarJson from './components/Sidebar.json'
import SearchInputJson from './components/SearchInput.json'
import ResizeJson from './components/Resize.json'
import ProviderJson from './components/Provider.json'
import PropertyJson from './components/Property.json'
import PersonaJson from './components/Persona.json'
import PageJson from './components/Page.json'
import OnboardingJson from './components/Onboarding.json'
import NprogressJson from './components/Nprogress.json'
import NavbarJson from './components/Navbar.json'
import ModalsJson from './components/Modals.json'
import MenuJson from './components/Menu.json'
import LoadingOverlayJson from './components/LoadingOverlay.json'
import LinkJson from './components/Link.json'
import KanbanJson from './components/Kanban.json'
import IconBadgeJson from './components/IconBadge.json'
import HotkeysJson from './components/Hotkeys.json'
import HooksJson from './components/Hooks.json'
import FormsJson from './components/Forms.json'
import FiltersJson from './components/Filters.json'
import FileUploadJson from './components/FileUpload.json'
import FeatureFlagsJson from './components/FeatureFlags.json'
import ErrorBoundaryJson from './components/ErrorBoundary.json'
import EmptyStateJson from './components/EmptyState.json'
import DatePickerJson from './components/DatePicker.json'
import DataTableJson from './components/DataTable.json'
import DataGridJson from './components/DataGrid.json'
import CommandBarJson from './components/CommandBar.json'
import ChartsJson from './components/Charts.json'
import BulkActionsJson from './components/BulkActions.json'
import BannerJson from './components/Banner.json'
import AuthJson from './components/Auth.json'
import AppShellJson from './components/AppShell.json'

export const Web3Address = Web3AddressJson
export const Utils = UtilsJson
export const Toolbar = ToolbarJson
export const Toggle = ToggleJson
export const Timeline = TimelineJson
export const StructuredList = StructuredListJson
export const Stepper = StepperJson
export const Src = SrcJson
export const Snackbar = SnackbarJson
export const Sidebar = SidebarJson
export const SearchInput = SearchInputJson
export const Resize = ResizeJson
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
Src,
Snackbar,
Sidebar,
SearchInput,
Resize,
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