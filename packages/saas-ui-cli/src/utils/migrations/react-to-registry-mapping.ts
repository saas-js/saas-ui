import type { Config } from '#utils/get-config'

export type RegistryImportRoot = 'components' | 'hooks' | 'icons' | 'lib' | 'ui'

export interface RegistryExportTarget {
  /** Registry item requested before the migrated source is used. */
  item: string
  /** Export exposed by the installed template. Defaults to the legacy name. */
  exportName?: string
  /** Exact module specifier. Takes precedence over root/subpath. */
  module?: string
  /** Configured alias used to construct the module specifier. */
  root?: RegistryImportRoot
  /** Path below the configured alias. Defaults to the item name. */
  subpath?: string
  /** Extra transitive items that should be made explicit in the report. */
  additionalItems?: readonly string[]
}

export type RegistryExportMap = Readonly<Record<string, RegistryExportTarget>>

/**
 * Exports whose legacy barrel provenance is @chakra-ui/react or one of its
 * component subpaths. The migration deliberately normalizes component
 * subpaths to the public Chakra root.
 */
export const chakraReactExports = new Set([
  'AbsoluteCenter',
  'AbsoluteCenterProps',
  'AlertRootProps',
  'AspectRatio',
  'AspectRatioProps',
  'Badge',
  'BadgeProps',
  'BadgePropsProvider',
  'Bleed',
  'BleedProps',
  'Box',
  'BoxProps',
  'Button',
  'ButtonGroup',
  'ButtonGroupProps',
  'ButtonProps',
  'Card',
  'Center',
  'CenterProps',
  'CheckboxGroup',
  'CheckboxGroupProps',
  'Checkmark',
  'CheckmarkProps',
  'Circle',
  'ClientOnly',
  'Code',
  'CodeBlock',
  'CodeProps',
  'Collapsible',
  'ColorPicker',
  'ColorSwatch',
  'Combobox',
  'Container',
  'ContainerProps',
  'DataList',
  'DownloadTrigger',
  'DownloadTriggerProps',
  'Editable',
  'Em',
  'EmProps',
  'EnvironmentContext',
  'EnvironmentProvider',
  'EnvironmentProviderProps',
  'Field',
  'Fieldset',
  'Flex',
  'FlexProps',
  'Float',
  'FocusTrap',
  'For',
  'FormatByte',
  'FormatByteProps',
  'FormatNumber',
  'FormatNumberProps',
  'Grid',
  'GridItem',
  'GridItemProps',
  'GridProps',
  'Group',
  'GroupProps',
  'HStack',
  'Heading',
  'HeadingProps',
  'Highlight',
  'HighlightProps',
  'Icon',
  'IconProps',
  'Image',
  'ImageProps',
  'Input',
  'InputAddon',
  'InputAddonProps',
  'InputElement',
  'InputElementProps',
  'InputGroup',
  'InputGroupProps',
  'InputProps',
  'InputPropsProvider',
  'Kbd',
  'KbdProps',
  'LinkBox',
  'LinkBoxProps',
  'LinkProps',
  'LinkOverlay',
  'LinkOverlayProps',
  'List',
  'Loader',
  'LocaleProvider',
  'Mark',
  'NativeSelectRoot',
  'Portal',
  'PortalProps',
  'Presence',
  'PresenceProps',
  'Progress',
  'ProgressRootProps',
  'ProgressCircle',
  'QrCode',
  'Quote',
  'QuoteProps',
  'RadioCardRoot',
  'RadioGroup',
  'RatingGroup',
  'RootNode',
  'ScrollArea',
  'Separator',
  'SeparatorProps',
  'Show',
  'ShowProps',
  'SimpleGrid',
  'SimpleGridProps',
  'SkipNavContent',
  'SkipNavContentProps',
  'SkipNavLink',
  'SkipNavLinkProps',
  'Spacer',
  'SpacerProps',
  'Span',
  'SpanProps',
  'Square',
  'SquareProps',
  'Stack',
  'StackProps',
  'StackSeparator',
  'StackSeparatorProps',
  'StepsRootProps',
  'Sticky',
  'StickyProps',
  'Strong',
  'StrongProps',
  'Table',
  'TableRootProps',
  'Tabs',
  'Text',
  'TextProps',
  'Textarea',
  'TextareaProps',
  'Timeline',
  'Toggle',
  'TreeView',
  'UseBreakpointOptions',
  'UseBreakpointValueOptions',
  'UseClipboardReturn',
  'UseControllableStateProps',
  'UseDisclosureProps',
  'UseDisclosureReturn',
  'UseQrCodeProps',
  'UseQrCodeReturn',
  'VStack',
  'VisuallyHidden',
  'Wrap',
  'WrapProps',
  'createContext',
  'createListCollection',
  'mergeRefs',
  'useBreakpoint',
  'useBreakpointValue',
  'useClipboard',
  'useCombobox',
  'useComboboxContext',
  'useComboboxItemContext',
  'useComboboxStyles',
  'useControllableState',
  'useDataListStyles',
  'useDisclosure',
  'useEditable',
  'useEditableContext',
  'useEnvironmentContext',
  'useFieldContext',
  'useFieldStyles',
  'useFieldsetContext',
  'useFileUploadContext',
  'useFilter',
  'useLocaleContext',
  'useMediaQuery',
  'useQrCode',
  'useTabsContext',
  'useTabsStyles',
])

/** Exports kept on Chakra's styled-system entrypoint by provenance. */
export const chakraStyledSystemExports = new Set([
  'ConditionalValue',
  'HTMLChakraProps',
  'RecipeDefinition',
  'RecipeProps',
  'SlotRecipeDefinition',
  'SlotRecipeProps',
  'SystemConfig',
  'SystemStyleObject',
  'chakra',
  'createRecipeContext',
  'createSlotRecipeContext',
  'createSystem',
  'defineAnimationStyles',
  'defineConditions',
  'defineConfig',
  'defineGlobalStyles',
  'defineKeyframes',
  'defineLayerStyles',
  'defineRecipe',
  'defineSemanticTokens',
  'defineSlotRecipe',
  'defineStyle',
  'defineTextStyles',
  'defineTokens',
  'useChakraContext',
  'useRecipe',
  'useSlotRecipe',
  'useToken',
])

/**
 * Canonical exports made available by each installable public registry item.
 * `defaultRegistryExportMap` is generated from this catalog so the runtime
 * mapping cannot drift independently from the provenance verifier. The
 * migration acceptance test verifies these names against compiler output.
 */
export const canonicalRegistryItemExports = {
  accordion: ['Accordion'],
  'action-bar': ['ActionBar'],
  alert: ['Alert', 'AlertProps'],
  'app-shell': ['AppShell', 'AppShellProps'],
  avatar: ['Avatar', 'AvatarGroup', 'AvatarProps'],
  'back-button': ['BackButton', 'BackButtonProps'],
  blockquote: ['Blockquote', 'BlockquoteIcon', 'BlockquoteProps'],
  breadcrumb: ['Breadcrumb'],
  checkbox: ['Checkbox', 'CheckboxProps'],
  'checkbox-card': ['CheckboxCard', 'CheckboxCardProps'],
  clipboard: ['Clipboard'],
  'close-button': ['CloseButton', 'CloseButtonProps'],
  command: ['Command'],
  dialog: ['Dialog'],
  drawer: ['Drawer'],
  'empty-state': ['EmptyState', 'EmptyStateProps'],
  'file-upload': ['FileUpload'],
  'grid-list': ['GridList'],
  'hover-card': ['HoverCard'],
  'icon-badge': ['IconBadge'],
  'icon-button': ['IconButton', 'IconButtonProps'],
  'info-tip': ['InfoTip', 'InfoTipProps'],
  icons: ['createIcon'],
  'loading-overlay': ['LoadingOverlay'],
  link: ['Link'],
  menu: ['Menu'],
  'native-select': ['NativeSelect', 'NativeSelectProps'],
  navbar: ['Navbar'],
  'number-input': ['NumberInput', 'NumberInputProps'],
  page: ['Page', 'usePageStyles'],
  pagination: ['Pagination'],
  'password-input': ['PasswordInput', 'PasswordInputProps'],
  persona: [
    'Persona',
    'PersonaProps',
    'PersonaPresence',
    'PersonaPresenceConfig',
    'defaultPersonaPresenceOptions',
  ],
  'pin-input': ['PinInput', 'PinInputProps'],
  popover: ['Popover'],
  radio: ['Radio', 'RadioProps'],
  'radio-card': ['RadioCard'],
  'search-input': ['SearchInput', 'SearchInputProps'],
  section: ['Section', 'useSectionStyles'],
  'segmented-control': ['SegmentedControl', 'SegmentedControlProps'],
  select: ['Select'],
  sidebar: [
    'Sidebar',
    'useSidebar',
    'useSidebarItemStyles',
    'useSidebarStyles',
  ],
  skeleton: [
    'Skeleton',
    'SkeletonCircle',
    'SkeletonCircleProps',
    'SkeletonProps',
    'SkeletonText',
    'SkeletonTextProps',
  ],
  slider: ['Slider', 'SliderProps'],
  spinner: ['Spinner', 'SpinnerProps'],
  stat: ['Stat'],
  status: ['Status', 'StatusProps'],
  steps: ['Steps'],
  switch: ['Switch', 'SwitchProps'],
  tag: ['Tag', 'TagProps'],
  theme: ['Theme', 'ThemeProps'],
  toaster: ['Toaster', 'ToasterProps', 'toast'],
  'toggle-tip': ['ToggleTip', 'ToggleTipProps'],
  tooltip: ['Tooltip', 'TooltipProps'],
} as const satisfies Record<string, readonly string[]>

function generatedRegistryEntries(): Array<[string, RegistryExportTarget]> {
  return Object.entries(canonicalRegistryItemExports).flatMap(([item, names]) =>
    names.map((name): [string, RegistryExportTarget] => [
      name,
      { item, root: 'ui' },
    ]),
  )
}

/**
 * Only exports implemented by Saas UI source files and backed by an
 * installable registry item belong here. Direct Chakra re-exports are listed
 * separately above, even when a same-named registry utility exists for use by
 * other templates. Keeping this table injectable lets a registry release add
 * or rename exports without coupling the AST migration engine to a network
 * request.
 */
export const defaultRegistryExportMap: RegistryExportMap = Object.fromEntries([
  ...generatedRegistryEntries(),
  ...['Persona', 'PersonaProps'].map((name): [string, RegistryExportTarget] => [
    name,
    {
      item: 'persona',
      root: 'ui',
      subpath: 'persona/persona-composed',
    },
  ]),
  [
    'SuiProvider',
    {
      item: 'provider',
      exportName: 'Provider',
      root: 'components',
      subpath: 'setup/provider/provider',
      additionalItems: ['color-mode'],
    },
  ],
  [
    'SaasProvider',
    {
      item: 'provider',
      exportName: 'Provider',
      root: 'components',
      subpath: 'setup/provider/provider',
      additionalItems: ['color-mode'],
    },
  ],
  [
    'SuiProviderProps',
    {
      item: 'provider',
      exportName: 'ProviderProps',
      root: 'components',
      subpath: 'setup/provider/provider',
      additionalItems: ['color-mode'],
    },
  ],
  ...[
    'ColorMode',
    'ColorModeProvider',
    'ColorModeTrigger',
    'DarkMode',
    'LightMode',
    'UseColorModeReturn',
    'useColorMode',
    'useColorModeValue',
  ].map((name): [string, RegistryExportTarget] => [
    name,
    {
      item: 'color-mode',
      root: 'components',
      subpath: 'setup/color-mode/color-mode',
    },
  ]),
])

/**
 * Exports supported by earlier v3 builds but no longer present in the current
 * root barrel. They remain migratable so projects do not have to manually
 * rewrite a valid historical import before running the codemod.
 */
const historicalLegacyExports = new Set([
  'AlertRootProps',
  'NativeSelectRoot',
  'PersonaProps',
  'ProgressRootProps',
  'RadioCardRoot',
  'SaasProvider',
  'StepsRootProps',
  'TableRootProps',
])

/** Legacy exports without a semantics-preserving automatic replacement. */
export const unsupportedLegacyExports = new Set([
  'SuiContext',
  'SuiContextValue',
  'useLink',
  'useSui',
])

export const presetLegacyExports = new Set([
  'ColorPalette',
  'defaultConfig',
  'defaultSystem',
])

export const canonicalSetupItemExports = {
  'color-mode': [
    'ColorMode',
    'ColorModeProvider',
    'ColorModeTrigger',
    'DarkMode',
    'LightMode',
    'UseColorModeReturn',
    'useColorMode',
    'useColorModeValue',
  ],
  provider: ['Provider', 'ProviderProps'],
} as const satisfies Record<string, readonly string[]>

export interface LegacyExportProvenanceIssue {
  kind:
    | 'overlapping-classification'
    | 'stale-classification'
    | 'unknown-export'
    | 'unknown-registry-item'
    | 'stale-registry-export'
  exportName: string
  classifications?: string[]
  item?: string
}

/**
 * Verifies that the legacy public barrel is a disjoint, exhaustive partition.
 * Acceptance tests pass an AST enumeration of saas-ui-react/src/index.ts;
 * runtime callers still get overlap and registry-catalog assertions without
 * needing monorepo source files in the published CLI.
 */
export function verifyLegacyExportProvenance(
  actualExports?: Iterable<string>,
  registryExports: RegistryExportMap = defaultRegistryExportMap,
): LegacyExportProvenanceIssue[] {
  const categories = new Map<string, Set<string>>([
    ['chakra-root', chakraReactExports],
    ['chakra-styled-system', chakraStyledSystemExports],
    ['preset', presetLegacyExports],
    ['registry', new Set(Object.keys(registryExports))],
    ['unsupported/manual', unsupportedLegacyExports],
  ])
  const classified = new Map<string, string[]>()
  for (const [category, names] of categories) {
    for (const name of names) {
      const values = classified.get(name) ?? []
      values.push(category)
      classified.set(name, values)
    }
  }

  const issues: LegacyExportProvenanceIssue[] = []
  for (const [exportName, classifications] of classified) {
    if (classifications.length > 1) {
      issues.push({
        kind: 'overlapping-classification',
        exportName,
        classifications,
      })
    }
  }

  if (actualExports) {
    const actual = new Set(actualExports)
    for (const exportName of actual) {
      if (!classified.has(exportName)) {
        issues.push({ kind: 'unknown-export', exportName })
      }
    }
    for (const exportName of classified.keys()) {
      if (!actual.has(exportName) && !historicalLegacyExports.has(exportName)) {
        issues.push({ kind: 'stale-classification', exportName })
      }
    }
  }

  const catalog: Record<string, readonly string[]> = {
    ...canonicalRegistryItemExports,
    ...canonicalSetupItemExports,
  }
  for (const [legacyExport, target] of Object.entries(registryExports)) {
    const exports = catalog[target.item]
    if (!exports) {
      issues.push({
        kind: 'unknown-registry-item',
        exportName: legacyExport,
        item: target.item,
      })
    } else if (!exports.includes(target.exportName ?? legacyExport)) {
      issues.push({
        kind: 'stale-registry-export',
        exportName: legacyExport,
        item: target.item,
      })
    }
  }

  return issues.sort((left, right) =>
    `${left.kind}:${left.exportName}`.localeCompare(
      `${right.kind}:${right.exportName}`,
    ),
  )
}

export function assertLegacyExportProvenance() {
  const issues = verifyLegacyExportProvenance()
  if (issues.length) {
    throw new Error(
      `Invalid @saas-ui/react migration provenance: ${issues
        .map((issue) => `${issue.kind}:${issue.exportName}`)
        .join(', ')}`,
    )
  }
}

export function resolveRegistryImport(
  target: RegistryExportTarget,
  config: Pick<Config, 'aliases'>,
) {
  if (target.module) return target.module

  const root = target.root ?? 'ui'
  let alias = config.aliases[root]
  if (!alias && root === 'ui') {
    alias = `${config.aliases.components}/ui`
  }
  if (!alias) {
    throw new Error(`Missing configured ${root} alias for ${target.item}.`)
  }
  return `${alias.replace(/\/$/, '')}/${target.subpath ?? target.item}`
}
