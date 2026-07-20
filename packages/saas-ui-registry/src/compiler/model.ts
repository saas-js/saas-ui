import type { RegistryEntry, RegistryIndex, RegistryItem } from '../schema.js'

export interface ExternalRegistryCatalog {
  /** Module prefix used by source imports, for example `#registry/default`. */
  alias: string
  /** HTTP(S) base URL of the external registry, normally ending in `/r`. */
  baseUrl: string
  /** Parsed and validated external registry index. */
  index: RegistryIndex
}

export type CompilerRegistryItemType = Extract<
  RegistryEntry['type'],
  | 'registry:setup'
  | 'registry:ui'
  | 'registry:component'
  | 'registry:lib'
  | 'registry:hook'
  | 'registry:icon'
  | 'registry:block'
  | 'registry:example'
>

export type RegistryCompilerStage =
  | 'discovery'
  | 'analysis'
  | 'graph'
  | 'validation'

export type RegistryCompilerDiagnosticSeverity = 'error' | 'warning' | 'info'

export interface RegistryCompilerDiagnostic {
  code: string
  message: string
  severity: RegistryCompilerDiagnosticSeverity
  stage: RegistryCompilerStage
  itemName?: string
  filePath?: string
  moduleSpecifier?: string
  dependency?: string
}

/**
 * The common diagnostic shape accepted by fail-closed compiler boundaries.
 * Emitter diagnostics use `item`/`file`, while pipeline diagnostics use
 * `itemName`/`filePath`, so both locations are represented here.
 */
export interface RegistryValidationDiagnostic {
  code: string
  message: string
  severity: RegistryCompilerDiagnosticSeverity
  item?: string
  itemName?: string
  file?: string
  filePath?: string
}

/** A minimal validation result shared by pipeline and artifact reports. */
export interface RegistryValidationResult<
  TDiagnostic extends RegistryValidationDiagnostic =
    RegistryValidationDiagnostic,
> {
  valid: boolean
  diagnostics: readonly TDiagnostic[]
}

/**
 * Metadata that makes mutually exclusive templates deterministic for CLI
 * install-all and switching operations.
 *
 * Conflict declarations are authored symmetrically: when one item names a
 * conflict, the target item must name it back. The compiler validates this
 * invariant rather than silently changing authored metadata.
 */
export interface RegistryExclusiveAlternativeMetadata {
  /** Normalized URL-safe identifier shared by mutually exclusive items. */
  exclusiveGroup?: string
  /** The sole public installable alternative selected by CLI install-all. */
  exclusiveDefault?: boolean
  /** Unique same-style item names, declared reciprocally by both items. */
  conflicts?: string[]
}

/**
 * Authored metadata remains untrusted until compiler validation.
 */
export type RegistryItemMeta = Record<string, unknown>

/**
 * Statically readable component.config.ts fields.
 *
 * Config files are data, not executable modules. Values must be literals,
 * arrays, or object literals. A default export may optionally be wrapped in
 * `defineRegistryItem(...)`, `satisfies`, `as const`, or parentheses.
 */
export interface RegistryItemConfig {
  version?: string
  description?: string
  private?: boolean
  category?: string
  subcategory?: string
  categories?: string[]
  docs?: string
  source?: string
  order?: number
  preview?: string
  primaryFile?: string
  include?: string[]
  exclude?: string[]
  targets?: Record<string, string>
  /** Selector overrides for external packages actually emitted by this item. */
  dependencyVersions?: Record<string, string>
  chunks?: RegistryEntry['chunks']
  canvas?: Record<string, unknown>
  meta?: RegistryExclusiveAlternativeMetadata
}

export interface RegistryItemMetadata {
  version?: string
  description?: string
  private?: boolean
  category?: string
  subcategory?: string
  categories?: string[]
  docs?: string
  source?: string
  order?: number
  preview?: string
  primaryFile?: string
  chunks?: RegistryEntry['chunks']
  canvas?: Record<string, unknown>
  meta?: RegistryItemMeta
}

export interface RegistrySourceRoot {
  /** A style root (for example registry/default) or a convention directory. */
  path: string
  /** Registry style. Defaults to the style root directory name. */
  style?: string
  /** Default item version for this owning source; authored config wins. */
  version?: string
  /** Treat this path as a specific item-type root instead of inferring it. */
  type?: CompilerRegistryItemType
  /** Base used for emitted file paths. Inferred for conventional roots. */
  basePath?: string
}

export interface RegistryConvention {
  directory: string
  type: CompilerRegistryItemType
}

export interface DiscoverRegistryItemsOptions {
  sourceRoots: Array<string | RegistrySourceRoot>
  conventions?: readonly RegistryConvention[]
  configFileNames?: readonly string[]
}

export interface DiscoveredRegistryItem {
  id: string
  name: string
  type: CompilerRegistryItemType
  style: string
  sourceRoot: string
  sourceBasePath: string
  sourceDirectory: string
  relativeDirectory: string
  filePaths: string[]
  configPath?: string
  previewPath?: string
  primaryFilePath?: string
  config: RegistryItemConfig
  metadata: RegistryItemMetadata
}

export interface RegistryDiscoveryResult {
  items: DiscoveredRegistryItem[]
  diagnostics: RegistryCompilerDiagnostic[]
}

export type AnalyzedImportKind = 'relative' | 'alias' | 'external' | 'builtin'

export interface AnalyzedImport {
  specifier: string
  kind: AnalyzedImportKind
  importedNames: string[]
  packageName?: string
  resolvedPath?: string
  iconNames: string[]
  externalRegistry?: {
    alias: string
    baseUrl: string
    item: string
    private: boolean
  }
}

export interface AnalyzedRegistryFile {
  path: string
  sourcePath: string
  itemRelativePath: string
  content: string
  hash: string
  type?: RegistryItem['type']
  target?: string
  client: boolean
  hasRenderableDefaultExport: boolean
  moduleSpecifiers: string[]
  imports: AnalyzedImport[]
  iconDependencies: string[]
  presetImports: string[]
  recipeReferences: string[]
  presetRecipeBindings: string[]
}

export interface AnalyzedRegistryPreview {
  path: string
  sourcePath: string
  hasRenderableDefaultExport: boolean
}

export interface AnalyzedRegistryItem extends Omit<
  DiscoveredRegistryItem,
  'filePaths'
> {
  files: AnalyzedRegistryFile[]
  previewAnalysis?: AnalyzedRegistryPreview
  client: boolean
  externalPackages: string[]
  iconDependencies: string[]
  presetImports: string[]
  recipeReferences: string[]
  presetRecipeBindings: string[]
}

export interface AnalyzeItemFilesOptions {
  /** Module prefix to absolute source directory mappings. */
  aliases?: Readonly<Record<string, string>>
  /** Published catalogs used to resolve source imports without local files. */
  externalRegistries?: readonly ExternalRegistryCatalog[]
}

export interface RegistryAnalysisResult {
  items: AnalyzedRegistryItem[]
  diagnostics: RegistryCompilerDiagnostic[]
}

export interface RegistryDependencyEdge {
  from: string
  to: string
  kind: 'import' | 'icon'
  filePath?: string
  moduleSpecifier?: string
}

export interface ResolvedRegistryItem extends AnalyzedRegistryItem {
  dependencies: string[]
  devDependencies: string[]
  registryDependencies: string[]
}

export interface ResolveDependencyGraphOptions {
  /** Package roots provided by the consumer runtime and omitted from payloads. */
  externalPackages?: readonly string[]
}

export interface RegistryDependencyGraph {
  items: ResolvedRegistryItem[]
  edges: RegistryDependencyEdge[]
  diagnostics: RegistryCompilerDiagnostic[]
  providedPackages: string[]
}

export interface ValidateRegistryOptions {
  forbiddenPackages?: readonly string[]
  providedPackages?: readonly string[]
  /** Known preset recipe keys, used to validate literal keys and direct imports. */
  presetRecipeKeys?: readonly string[]
}

interface RegistryValidationReportBase extends RegistryValidationResult<RegistryCompilerDiagnostic> {
  diagnostics: RegistryCompilerDiagnostic[]
  errorCount: number
  warningCount: number
}

export interface ValidRegistryValidationReport extends RegistryValidationReportBase {
  valid: true
  errorCount: 0
}

export interface InvalidRegistryValidationReport extends RegistryValidationReportBase {
  valid: false
}

export type RegistryValidationReport =
  | ValidRegistryValidationReport
  | InvalidRegistryValidationReport
