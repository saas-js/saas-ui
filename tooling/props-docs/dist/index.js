const Web3Address = require('./components/Web3Address.json')
const Utils = require('./components/Utils.json')
const Toolbar = require('./components/Toolbar.json')
const Toggle = require('./components/Toggle.json')
const Timeline = require('./components/Timeline.json')
const StructuredList = require('./components/StructuredList.json')
const Stepper = require('./components/Stepper.json')
const Src = require('./components/Src.json')
const Snackbar = require('./components/Snackbar.json')
const Sidebar = require('./components/Sidebar.json')
const SearchInput = require('./components/SearchInput.json')
const Resize = require('./components/Resize.json')
const Provider = require('./components/Provider.json')
const Property = require('./components/Property.json')
const Persona = require('./components/Persona.json')
const Page = require('./components/Page.json')
const Onboarding = require('./components/Onboarding.json')
const Nprogress = require('./components/Nprogress.json')
const Navbar = require('./components/Navbar.json')
const Modals = require('./components/Modals.json')
const Menu = require('./components/Menu.json')
const LoadingOverlay = require('./components/LoadingOverlay.json')
const Link = require('./components/Link.json')
const Kanban = require('./components/Kanban.json')
const IconBadge = require('./components/IconBadge.json')
const Hotkeys = require('./components/Hotkeys.json')
const Hooks = require('./components/Hooks.json')
const Forms = require('./components/Forms.json')
const Filters = require('./components/Filters.json')
const FileUpload = require('./components/FileUpload.json')
const FeatureFlags = require('./components/FeatureFlags.json')
const ErrorBoundary = require('./components/ErrorBoundary.json')
const EmptyState = require('./components/EmptyState.json')
const DatePicker = require('./components/DatePicker.json')
const DataTable = require('./components/DataTable.json')
const DataGrid = require('./components/DataGrid.json')
const CommandBar = require('./components/CommandBar.json')
const Charts = require('./components/Charts.json')
const BulkActions = require('./components/BulkActions.json')
const Banner = require('./components/Banner.json')
const Auth = require('./components/Auth.json')
const AppShell = require('./components/AppShell.json')

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
  AppShell,
}

const allPropDocs = Object.fromEntries(
  Object.values(json).flatMap((doc) => Object.entries(doc))
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
  AppShell,
}
