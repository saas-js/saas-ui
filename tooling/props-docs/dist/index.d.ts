export interface Prop {
  type: string
  defaultValue?: string | null
  required: boolean
  description?: string
}

export interface PropDoc {
  [componentOrHook: string]: Prop
}

export declare const Web3Address: PropDoc
export declare const Utils: PropDoc
export declare const Toolbar: PropDoc
export declare const Toggle: PropDoc
export declare const Timeline: PropDoc
export declare const StructuredList: PropDoc
export declare const Stepper: PropDoc
export declare const Snackbar: PropDoc
export declare const Sidebar: PropDoc
export declare const SearchInput: PropDoc
export declare const Resize: PropDoc
export declare const RadioCards: PropDoc
export declare const Provider: PropDoc
export declare const Property: PropDoc
export declare const Persona: PropDoc
export declare const Page: PropDoc
export declare const Onboarding: PropDoc
export declare const Nprogress: PropDoc
export declare const Navbar: PropDoc
export declare const Modals: PropDoc
export declare const Menu: PropDoc
export declare const LoadingOverlay: PropDoc
export declare const Link: PropDoc
export declare const Kanban: PropDoc
export declare const IconBadge: PropDoc
export declare const Hotkeys: PropDoc
export declare const Hooks: PropDoc
export declare const Forms: PropDoc
export declare const Filters: PropDoc
export declare const FileUpload: PropDoc
export declare const FeatureFlags: PropDoc
export declare const ErrorBoundary: PropDoc
export declare const EmptyState: PropDoc
export declare const DatePicker: PropDoc
export declare const DataTable: PropDoc
export declare const DataGrid: PropDoc
export declare const CommandBar: PropDoc
export declare const Charts: PropDoc
export declare const BulkActions: PropDoc
export declare const Banner: PropDoc
export declare const Auth: PropDoc
export declare const AppShell: PropDoc

export declare const allPropDocs: Record<string, Prop>

export declare function getPropDoc(name: string): PropDoc | undefined
