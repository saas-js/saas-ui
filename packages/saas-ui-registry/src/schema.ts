import { z } from 'zod'

/**
 * Increment this only when a registry payload is no longer compatible with an
 * older CLI. Missing versions are treated as the legacy v1 wire format.
 */
export const REGISTRY_SCHEMA_VERSION = 1 as const

export const registrySchemaVersionSchema = z
  .literal(REGISTRY_SCHEMA_VERSION)
  .default(REGISTRY_SCHEMA_VERSION)

/** The item types used by the template-first registry. */
export const REGISTRY_ITEM_TYPES = [
  'registry:setup',
  'registry:ui',
  'registry:component',
  'registry:lib',
  'registry:hook',
  'registry:icon',
  'registry:block',
  'registry:example',
] as const

/**
 * Item types from the pre-template registry. They remain readable while the
 * catalog is migrated, but new registry entries should use REGISTRY_ITEM_TYPES.
 */
export const REGISTRY_LEGACY_ITEM_TYPES = [
  'registry:style',
  'registry:theme',
  'registry:page',
  'registry:story',
] as const

export const REGISTRY_SUPPORTED_ITEM_TYPES = [
  ...REGISTRY_ITEM_TYPES,
  ...REGISTRY_LEGACY_ITEM_TYPES,
] as const

/** Documentation examples are intentionally excluded from install payloads. */
export const REGISTRY_INSTALLABLE_ITEM_TYPES = [
  'registry:setup',
  'registry:ui',
  'registry:component',
  'registry:lib',
  'registry:hook',
  'registry:icon',
  'registry:block',
] as const

/** Legacy component/page files are readable until their templates are moved. */
export const REGISTRY_INSTALLABLE_FILE_TYPES = [
  ...REGISTRY_INSTALLABLE_ITEM_TYPES,
  'registry:page',
] as const

export const registryCanonicalItemTypeSchema = z.enum(REGISTRY_ITEM_TYPES)
export const registryItemTypeSchema = z.enum(REGISTRY_SUPPORTED_ITEM_TYPES)
export const registryInstallableItemTypeSchema = z.enum(
  REGISTRY_INSTALLABLE_ITEM_TYPES,
)
export const registryInstallableFileTypeSchema = z.enum(
  REGISTRY_INSTALLABLE_FILE_TYPES,
)

const installableItemTypes = new Set<string>(REGISTRY_INSTALLABLE_ITEM_TYPES)
const installableFileTypes = new Set<string>(REGISTRY_INSTALLABLE_FILE_TYPES)

export function isRegistryItemTypeInstallable(
  type: z.infer<typeof registryItemTypeSchema>,
): type is z.infer<typeof registryInstallableItemTypeSchema> {
  return installableItemTypes.has(type)
}

export function isRegistryFileTypeInstallable(
  type: z.infer<typeof registryItemTypeSchema>,
): type is z.infer<typeof registryInstallableFileTypeSchema> {
  return installableFileTypes.has(type)
}

const registryItemNamePattern = /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/
const registryItemVersionPattern =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/
const npmPackageSegmentSource = '[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?'
const npmPackageNameSource = `(?:@${npmPackageSegmentSource}\/${npmPackageSegmentSource}|${npmPackageSegmentSource})`
const semverNumberSource = '(?:0|[1-9]\\d*)'
const semverPartialSource = `${semverNumberSource}(?:\\.${semverNumberSource}(?:\\.${semverNumberSource})?)?`
const semverPrereleaseIdentifierSource =
  '(?:0|[1-9]\\d*|\\d*[A-Za-z-][0-9A-Za-z-]*)'
const semverBuildIdentifierSource = '[0-9A-Za-z-]+'
const semverFullSource =
  `${semverNumberSource}\\.${semverNumberSource}\\.${semverNumberSource}` +
  `(?:-${semverPrereleaseIdentifierSource}(?:\\.${semverPrereleaseIdentifierSource})*)?` +
  `(?:\\+${semverBuildIdentifierSource}(?:\\.${semverBuildIdentifierSource})*)?`
const npmPackageSelectorSource = `(?:\\^|~)?(?:${semverPartialSource}|${semverFullSource})`
const npmPackageNamePattern = new RegExp(`^${npmPackageNameSource}$`)
const npmPackageSelectorPattern = new RegExp(`^${npmPackageSelectorSource}$`)
const packageDependencyPattern = new RegExp(
  `^(${npmPackageNameSource})(?:@(${npmPackageSelectorSource}))?$`,
)

const registryNamespacePattern = /^@[a-z0-9][a-z0-9_-]*$/
const registryUrlTemplateSchema = z
  .string()
  .min(1)
  .regex(/\{name\}/, 'Registry URL templates must include {name}.')

export const componentsRegistryConfigSchema = z.union([
  registryUrlTemplateSchema,
  z
    .object({
      url: registryUrlTemplateSchema,
      headers: z.record(z.string(), z.string()).optional(),
      params: z.record(z.string(), z.string()).optional(),
    })
    .strict(),
])

/** Saas UI's shadcn-compatible project configuration. */
export const componentsConfigSchema = z
  .object({
    $schema: z.string().optional(),
    system: z.enum(['chakra', 'panda']).optional().default('chakra'),
    style: z.string().optional().default('default'),
    rsc: z.coerce.boolean().default(false),
    tsx: z.coerce.boolean().default(true),
    installed: z.array(z.string()).default([]),
    registries: z
      .record(
        z.string().regex(registryNamespacePattern, {
          message:
            'Invalid registry namespace. Namespaces must start with @ and contain only lowercase letters, numbers, hyphens, and underscores.',
        }),
        componentsRegistryConfigSchema,
      )
      .optional(),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      ui: z.string().optional(),
      lib: z.string().optional(),
      hooks: z.string().optional(),
      icons: z.string().optional(),
    }),
    icons: z
      .object({
        outputDir: z.string().optional(),
        defaultIconSet: z.string().optional(),
        iconSize: z.string().optional(),
        aliases: z.record(z.string(), z.string()).optional(),
      })
      .optional(),
  })
  .strict()

export type ComponentsConfig = z.infer<typeof componentsConfigSchema>
export type ComponentsRegistryConfig = z.infer<
  typeof componentsRegistryConfigSchema
>

/** Stable, URL-safe item identifier used by local registry dependencies. */
export const registryItemNameSchema = z
  .string()
  .trim()
  .min(1)
  .regex(registryItemNamePattern)

export const registryItemVersionSchema = z
  .string()
  .regex(registryItemVersionPattern, 'Registry item versions must use SemVer')

/** A shadcn-compatible @namespace/item registry reference. */
export const registryNamespacedReferenceSchema = z
  .string()
  .regex(
    /^@[a-z0-9][a-z0-9_-]*\/[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/i,
    'Invalid namespaced registry reference',
  )

/** Absolute HTTP(S) references are supported for unconfigured registries. */
export const registryUrlSchema = z
  .string()
  .url()
  .refine(
    (value) => {
      if (!URL.canParse(value)) {
        return false
      }
      const protocol = new URL(value).protocol
      return protocol === 'http:' || protocol === 'https:'
    },
    { message: 'Registry URLs must use HTTP or HTTPS' },
  )

export const registryDependencyReferenceSchema = z.union([
  registryItemNameSchema,
  registryNamespacedReferenceSchema,
  registryUrlSchema,
])

/** A lowercase npm package name, either unscoped or `@scope/name`. */
export const npmPackageNameSchema = z
  .string()
  .regex(npmPackageNamePattern, 'Invalid npm package name')

/**
 * Stable registry package selector grammar: SemVer or partial SemVer, with an
 * optional `^` or `~` prefix. Tags, protocols, aliases, Git references,
 * comparators, wildcards and composite ranges are intentionally unsupported.
 */
export const npmPackageSelectorSchema = z
  .string()
  .regex(npmPackageSelectorPattern, 'Invalid npm package selector')

export interface ParsedPackageDependency {
  name: string
  selector?: string
}

/** Parse a package dependency after validating the complete stable grammar. */
export function parsePackageDependencyReference(
  value: string,
): ParsedPackageDependency | null {
  const match = packageDependencyPattern.exec(value.trim())
  if (!match?.[1]) {
    return null
  }
  return {
    name: match[1],
    ...(match[2] ? { selector: match[2] } : {}),
  }
}

/**
 * Package dependencies use a package name and optional stable selector.
 * Registry URLs belong in registryDependencies instead.
 */
export const packageDependencySchema = z
  .string()
  .trim()
  .min(1)
  .regex(packageDependencyPattern, 'Invalid npm package dependency')

export const blockChunkSchema = z.object({
  name: z.string(),
  description: z.string(),
  component: z.unknown(),
  file: z.string(),
  code: z.string().optional(),
  container: z
    .object({
      className: z.string().nullish(),
    })
    .optional(),
})

export const registryEntryFileSchema = z.union([
  z.string(),
  z.object({
    path: z.string(),
    content: z.string().optional(),
    type: registryItemTypeSchema,
    target: z.string().optional(),
  }),
])

export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema,
  target: z.string().optional(),
})

export const registryInstallableItemFileSchema = registryItemFileSchema.extend({
  // Install payloads must never create an empty placeholder file. Deliberately
  // whitespace-only files remain valid because content is byte-significant.
  content: z.string().min(1, 'Installable registry files must include content'),
  type: registryInstallableFileTypeSchema,
})

export const registryItemTailwindSchema = z.object({
  config: z
    .object({
      content: z.array(z.string()).optional(),
      theme: z.record(z.string(), z.unknown()).optional(),
      plugins: z.array(z.string()).optional(),
    })
    .optional(),
})

export const registryItemCssVarsSchema = z.object({
  light: z.record(z.string(), z.string()).optional(),
  dark: z.record(z.string(), z.string()).optional(),
})

const registryItemFields = {
  schemaVersion: registrySchemaVersionSchema,
  $schema: z.string().optional(),
  name: registryItemNameSchema,
  type: registryItemTypeSchema,
  version: registryItemVersionSchema.optional(),
  private: z.boolean().optional(),
  description: z.string().optional(),
  dependencies: z.array(packageDependencySchema).optional(),
  devDependencies: z.array(packageDependencySchema).optional(),
  registryDependencies: z.array(registryDependencyReferenceSchema).optional(),
  tailwind: registryItemTailwindSchema.optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  source: z.string().optional(),
  preview: z.string().optional(),
  primaryFile: z.string().optional(),
  order: z.number().optional(),
  categories: z.array(z.string()).optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  chunks: z.array(blockChunkSchema).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  canvas: z
    .object({
      center: z.boolean().optional(),
      maxWidth: z.string().optional(),
      className: z.string().optional(),
    })
    .passthrough()
    .optional(),
  docs: z.string().optional(),
}

/** Authored/compiler input. Files may be shorthand paths or preview files. */
export const registryEntrySchema = z.object({
  ...registryItemFields,
  files: z.array(registryEntryFileSchema).optional(),
})

/** Normalized registry payload. Every file has an explicit type and path. */
export const registryItemSchema = z.object({
  ...registryItemFields,
  files: z.array(registryItemFileSchema).optional(),
})

export const registryInstallableItemSchema = registryItemSchema.extend({
  type: registryInstallableItemTypeSchema,
  files: z.array(registryInstallableItemFileSchema).optional(),
})

export function isRegistryItemInstallable(
  item: z.input<typeof registryItemSchema>,
): item is z.input<typeof registryInstallableItemSchema> {
  return registryInstallableItemSchema.safeParse(item).success
}

export const registryIndexItemSchema = registryItemSchema.extend({
  files: z.array(z.union([z.string(), registryItemFileSchema])).optional(),
})

export const registryIndexSchema = z.array(registryIndexItemSchema)
const registryEntriesBaseSchema = z.array(registryEntrySchema)

export interface RegistryVisibilityIssue {
  dependency: string
  item: string
  message: string
}

type VisibilityEntry = Pick<
  z.input<typeof registryEntrySchema>,
  'name' | 'private' | 'registryDependencies'
>

/**
 * Private entries may consume public or private entries. A public entry may
 * never consume a known private entry. Remote URLs are validated by their own
 * registry because their visibility is not knowable locally.
 */
export function getRegistryVisibilityIssues(
  entries: readonly VisibilityEntry[],
): RegistryVisibilityIssue[] {
  const entriesByName = new Map(entries.map((entry) => [entry.name, entry]))
  const issues: RegistryVisibilityIssue[] = []

  for (const entry of entries) {
    if (entry.private) {
      continue
    }

    for (const dependency of entry.registryDependencies ?? []) {
      const target = entriesByName.get(dependency)
      if (!target?.private) {
        continue
      }

      issues.push({
        item: entry.name,
        dependency,
        message: `Public registry item "${entry.name}" cannot depend on private item "${dependency}"`,
      })
    }
  }

  return issues
}

function addVisibilityIssues(
  entries: readonly VisibilityEntry[],
  context: z.RefinementCtx,
  pathPrefix: PropertyKey[] = [],
) {
  for (const issue of getRegistryVisibilityIssues(entries)) {
    const index = entries.findIndex((entry) => entry.name === issue.item)
    context.addIssue({
      code: 'custom',
      message: issue.message,
      path: [...pathPrefix, index, 'registryDependencies'],
    })
  }
}

export const registryEntriesSchema = registryEntriesBaseSchema.superRefine(
  (entries, context) => {
    addVisibilityIssues(entries, context)
  },
)

export const registrySchema = z
  .object({
    schemaVersion: registrySchemaVersionSchema,
    name: z.string(),
    homepage: registryUrlSchema,
    items: z.array(registryEntrySchema),
  })
  .superRefine((registry, context) => {
    addVisibilityIssues(registry.items, context, ['items'])
  })

export type RegistryEntry = z.input<typeof registryEntrySchema>
export type RegistryItem = z.output<typeof registryItemSchema>
export type RegistryInstallableItem = z.output<
  typeof registryInstallableItemSchema
>
export type RegistryIndexItem = z.output<typeof registryIndexItemSchema>
/** A validated catalog index published by a registry. */
export type RegistryIndex = RegistryIndexItem[]
export type RegistryEntries = z.output<typeof registryEntriesSchema>
export type Registry = z.output<typeof registrySchema>

export class RegistrySchemaVersionError extends Error {
  readonly expectedVersion = REGISTRY_SCHEMA_VERSION
  readonly receivedVersion: unknown
  readonly resource: string

  constructor(receivedVersion: unknown, resource = 'registry payload') {
    const received =
      receivedVersion === undefined ? 'missing' : String(receivedVersion)
    super(
      `Incompatible ${resource} schema version ${received}; this CLI supports version ${REGISTRY_SCHEMA_VERSION}. Please update the CLI or use a compatible registry.`,
    )
    this.name = 'RegistrySchemaVersionError'
    this.receivedVersion = receivedVersion
    this.resource = resource
  }
}

function readSchemaVersion(value: unknown): unknown {
  if (!value || typeof value !== 'object') {
    return undefined
  }
  return Reflect.get(value, 'schemaVersion')
}

export function assertRegistrySchemaVersion(
  value: unknown,
  resource = 'registry payload',
) {
  const values = Array.isArray(value) ? value : [value]

  for (const item of values) {
    const version = readSchemaVersion(item)
    // Unversioned payloads are the legacy representation of protocol v1.
    if (version !== undefined && version !== REGISTRY_SCHEMA_VERSION) {
      throw new RegistrySchemaVersionError(version, resource)
    }
  }
}

export function parseRegistryItem(
  value: unknown,
  resource = 'registry item',
): RegistryItem {
  assertRegistrySchemaVersion(value, resource)
  return registryItemSchema.parse(value)
}

export function parseRegistryItems(
  value: unknown,
  resource = 'registry items',
): RegistryItem[] {
  assertRegistrySchemaVersion(value, resource)
  return z.array(registryItemSchema).parse(value)
}

export function parseRegistryIndex(
  value: unknown,
  resource = 'registry index',
): RegistryIndexItem[] {
  assertRegistrySchemaVersion(value, resource)
  return registryIndexSchema.parse(value)
}

export const blockSchema = registryItemSchema.extend({
  type: z.literal('registry:block'),
  component: z.unknown(),
  code: z.string(),
  highlightedCode: z.string(),
})

export type Block = z.infer<typeof blockSchema>
export type BlockChunk = z.infer<typeof blockChunkSchema>
