export { installRegistryItems } from '#utils/add-components'
export { resolveConfigPaths } from '#utils/get-config'
export { hashContent } from '#utils/registry-content-hash'
export { createRegistryClient, isRegistryUrl } from '#utils/registry/client'
export { resolveRegistryGraph } from '#utils/registry/graph'
export { isRegistryItemTypeInstallable } from '#utils/registry/schema'
export type { RegistryClient } from '#utils/registry/client'
export type { RegistryIndexItem, RegistryItem } from '#utils/registry/schema'
export type {
  DependencyInstallRequest,
  DependencyInstaller,
} from '#utils/updaters/update-dependencies'
