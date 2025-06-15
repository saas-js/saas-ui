const Web3Address = require('./components/web3-address.json')
const Utils = require('./components/utils.json')
const Toolbar = require('./components/toolbar.json')
const Toggle = require('./components/toggle.json')
const Timeline = require('./components/timeline.json')
const StructuredList = require('./components/structured-list.json')
const Stepper = require('./components/stepper.json')
const Snackbar = require('./components/snackbar.json')
const Sidebar = require('./components/sidebar.json')
const SearchInput = require('./components/search-input.json')
const Resize = require('./components/resize.json')
const RadioCards = require('./components/radio-cards.json')
const Provider = require('./components/provider.json')
const Property = require('./components/property.json')
const Persona = require('./components/persona.json')
const Page = require('./components/page.json')
const Onboarding = require('./components/onboarding.json')
const Nprogress = require('./components/nprogress.json')
const Navbar = require('./components/navbar.json')
const Modals = require('./components/modals.json')
const Menu = require('./components/menu.json')
const LoadingOverlay = require('./components/loading-overlay.json')
const Link = require('./components/link.json')
const Kanban = require('./components/kanban.json')
const IconBadge = require('./components/icon-badge.json')
const Hotkeys = require('./components/hotkeys.json')
const Hooks = require('./components/hooks.json')
const Forms = require('./components/forms.json')
const Filters = require('./components/filters.json')
const FileUpload = require('./components/file-upload.json')
const FeatureFlags = require('./components/feature-flags.json')
const ErrorBoundary = require('./components/error-boundary.json')
const EmptyState = require('./components/empty-state.json')
const DatePicker = require('./components/date-picker.json')
const DataTable = require('./components/data-table.json')
const DataGrid = require('./components/data-grid.json')
const CommandBar = require('./components/command-bar.json')
const Charts = require('./components/charts.json')
const BulkActions = require('./components/bulk-actions.json')
const Banner = require('./components/banner.json')
const Auth = require('./components/auth.json')
const AppShell = require('./components/app-shell.json')

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

const allPropDocs = Object.fromEntries(
  Object.values(json).flatMap((doc) => Object.entries(doc)),
)

const getPropDoc = (name) => allPropDocs[name]

module.exports = {
  allPropDocs,
  getPropDoc,
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