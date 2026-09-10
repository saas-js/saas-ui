import { SyntaxKind } from 'ts-morph'

import type { Config } from '#utils/get-config'
import type { Transformer } from '#utils/transformers'

export const transformImport: Transformer = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = transformModuleSpecifier(
      importDeclaration.getModuleSpecifierValue(),
      config,
    )

    importDeclaration.setModuleSpecifier(moduleSpecifier)
  }

  for (const exportDeclaration of sourceFile.getExportDeclarations()) {
    const current = exportDeclaration.getModuleSpecifierValue()
    if (current) {
      exportDeclaration.setModuleSpecifier(
        transformModuleSpecifier(current, config),
      )
    }
  }

  for (const expression of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  )) {
    if (expression.getExpression().getKind() !== SyntaxKind.ImportKeyword) {
      continue
    }
    const [argument] = expression.getArguments()
    if (!argument || argument.getKind() !== SyntaxKind.StringLiteral) continue
    const literal = argument.asKindOrThrow(SyntaxKind.StringLiteral)
    literal.setLiteralValue(
      transformModuleSpecifier(literal.getLiteralValue(), config),
    )
  }

  return sourceFile
}

export function stripTypeScriptExtension(moduleSpecifier: string) {
  return moduleSpecifier.replace(/(?:\.d)?\.(?:ts|tsx|mts|cts)$/, '')
}

export function transformModuleSpecifier(
  moduleSpecifier: string,
  config: Config,
) {
  const updated = updateImportAliases(moduleSpecifier, config)
  const localAliases = [
    config.aliases.components,
    config.aliases.ui,
    config.aliases.lib,
    config.aliases.hooks,
    config.aliases.icons,
  ].filter((value): value is string => Boolean(value))
  const isLocal =
    moduleSpecifier.startsWith('.') ||
    moduleSpecifier.startsWith('@/') ||
    moduleSpecifier.startsWith('#') ||
    localAliases.some(
      (alias) => updated === alias || updated.startsWith(`${alias}/`),
    )
  return isLocal ? stripTypeScriptExtension(updated) : updated
}

export function updateImportAliases(moduleSpecifier: string, config: Config) {
  // Not a local import.
  if (!moduleSpecifier.startsWith('@/') && !moduleSpecifier.startsWith('#')) {
    return moduleSpecifier
  }

  // Not a registry import.
  if (
    !moduleSpecifier.startsWith('@/registry/') &&
    !moduleSpecifier.startsWith('#registry/')
  ) {
    if (moduleSpecifier === '#hooks' || moduleSpecifier.startsWith('#hooks/')) {
      const hooks =
        config.aliases.hooks ??
        `${config.aliases.components.replace(/\/[^/]+$/, '')}/hooks`
      return moduleSpecifier.replace(/^#hooks/, hooks)
    }

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

  if (moduleSpecifier.match(/^(@\/|#)registry\/(.+)\/lib/)) {
    return moduleSpecifier.replace(
      /^(@\/|#)registry\/(.+)\/lib/,
      config.aliases.lib ?? config.aliases.utils.replace(/\/[^/]+$/, ''),
    )
  }

  if (moduleSpecifier.match(/^(@\/|#)registry\/(.+)\/hooks/)) {
    return moduleSpecifier.replace(
      /^(@\/|#)registry\/(.+)\/hooks/,
      config.aliases.hooks ??
        `${config.aliases.components.replace(/\/[^/]+$/, '')}/hooks`,
    )
  }

  if (moduleSpecifier.match(/^(@\/|#)registry\/(.+)\/icons/)) {
    return moduleSpecifier.replace(
      /^(@\/|#)registry\/(.+)\/icons/,
      config.aliases.icons ?? `${config.aliases.components}/icons`,
    )
  }

  return moduleSpecifier.replace(
    /^(@\/|#)registry\/[^/]+/,
    config.aliases.components,
  )
}
