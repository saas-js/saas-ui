import { registryItemSchema } from '@saas-ui/registry/schema'
import { z } from 'zod'

export {
  REGISTRY_INSTALLABLE_FILE_TYPES,
  REGISTRY_INSTALLABLE_ITEM_TYPES,
  REGISTRY_ITEM_TYPES,
  REGISTRY_SCHEMA_VERSION,
  RegistrySchemaVersionError,
  assertRegistrySchemaVersion,
  isRegistryFileTypeInstallable,
  isRegistryItemInstallable,
  isRegistryItemTypeInstallable,
  packageDependencySchema,
  parseRegistryIndex,
  parseRegistryItem,
  parseRegistryItems,
  registryDependencyReferenceSchema,
  registryIndexSchema,
  registryInstallableFileTypeSchema,
  registryInstallableItemFileSchema,
  registryInstallableItemSchema,
  registryInstallableItemTypeSchema,
  registryItemFileSchema,
  registryItemNameSchema,
  registryNamespacedReferenceSchema,
  registryItemSchema,
  registryItemTypeSchema,
  registryItemVersionSchema,
  registrySchemaVersionSchema,
  registryUrlSchema,
} from '@saas-ui/registry/schema'
export type {
  RegistryIndexItem,
  RegistryInstallableItem,
  RegistryItem,
} from '@saas-ui/registry/schema'

export const stylesSchema = z.array(
  z.object({
    name: z.string(),
    label: z.string(),
  }),
)

export const registryBaseColorSchema = z.object({
  inlineColors: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  cssVars: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  inlineColorsTemplate: z.string(),
  cssVarsTemplate: z.string(),
})

// This is a CLI aggregation result rather than a registry wire payload.
export const registryResolvedItemsTreeSchema = registryItemSchema.pick({
  dependencies: true,
  devDependencies: true,
  files: true,
  tailwind: true,
  cssVars: true,
  docs: true,
})
