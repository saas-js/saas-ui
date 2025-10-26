import type { Config } from '#utils/get-config'
import type { Transformer } from '#utils/transformers'

export const transformImport: Transformer = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = updateImportAliases(
      importDeclaration.getModuleSpecifierValue(),
      config,
    )

    importDeclaration.setModuleSpecifier(moduleSpecifier)
  }

  return sourceFile
}

function updateImportAliases(moduleSpecifier: string, config: Config) {
  // Not a local import.
  if (!moduleSpecifier.startsWith('@/') && !moduleSpecifier.startsWith('#')) {
    return moduleSpecifier
  }

  // Not a registry import.
  if (
    !moduleSpecifier.startsWith('@/registry/') &&
    !moduleSpecifier.startsWith('#registry/')
  ) {
    const isMonorepoConfig = /^@[^/]+\/[^/]+/.test(config.aliases.components)
    if (isMonorepoConfig) {
      return moduleSpecifier
    }

    const alias = config.aliases.components.charAt(0)
    return moduleSpecifier.replace(/^@\//, `${alias}/`)
  }

  if (moduleSpecifier.match(/^(@\/|#)registry\/(.+)\/ui/)) {
    return moduleSpecifier.replace(
      /^(@\/|#)registry\/(.+)\/ui/,
      config.aliases.ui ?? `${config.aliases.components}/ui`,
    )
  }

  if (
    config.aliases.components &&
    moduleSpecifier.match(/^(@\/|#)registry\/(.+)\/components/)
  ) {
    return moduleSpecifier.replace(
      /^(@\/|#)registry\/(.+)\/components/,
      config.aliases.components,
    )
  }

  if (config.aliases.lib && moduleSpecifier.match(/^@\/registry\/(.+)\/lib/)) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/lib/,
      config.aliases.lib,
    )
  }

  if (
    config.aliases.hooks &&
    moduleSpecifier.match(/^(@\/|#)registry\/(.+)\/hooks/)
  ) {
    return moduleSpecifier.replace(
      /^(@\/|#)registry\/(.+)\/hooks/,
      config.aliases.hooks,
    )
  }

  if (
    config.aliases.icons &&
    moduleSpecifier.match(/^(@\/|#)registry\/(.+)\/icons/)
  ) {
    return moduleSpecifier.replace(
      /^(@\/|#)registry\/(.+)\/icons/,
      config.aliases.icons,
    )
  }

  return moduleSpecifier.replace(
    /^@\/registry\/[^/]+/,
    config.aliases.components,
  )
}
