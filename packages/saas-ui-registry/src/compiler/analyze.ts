import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import { builtinModules } from 'node:module'
import path from 'node:path'
import {
  type ImportDeclaration,
  Node,
  Project,
  ScriptKind,
  type SourceFile,
  SyntaxKind,
  ts,
} from 'ts-morph'

import { registryIndexSchema, registryUrlSchema } from '../schema.js'
import type {
  AnalyzeItemFilesOptions,
  AnalyzedImport,
  AnalyzedRegistryFile,
  AnalyzedRegistryItem,
  AnalyzedRegistryPreview,
  DiscoveredRegistryItem,
  RegistryAnalysisResult,
  RegistryCompilerDiagnostic,
  RegistryDiscoveryResult,
} from './model.js'
import type { ExternalRegistryCatalog } from './model.js'
import {
  comparePaths,
  kebabCase,
  packageRootFromSpecifier,
  toPosixPath,
} from './path-utils.js'

const builtinPackageNames = new Set(
  builtinModules.flatMap((name) => [name, `node:${name}`]),
)
const resolvableExtensions = ['.ts', '.tsx', '.mts', '.cts'] as const
const JavaScriptExtensionPattern = /\.(?:js|jsx|mjs|cjs)$/

interface ImportRecord {
  specifier: string
  importedNames: Set<string>
}

function uniqueSorted(values: Iterable<string>) {
  return Array.from(new Set(values)).sort((left, right) =>
    left.localeCompare(right, 'en'),
  )
}

function getImportedNames(declaration: ImportDeclaration) {
  const names = declaration
    .getNamedImports()
    .map((namedImport) => namedImport.getName())
  const defaultImport = declaration.getDefaultImport()
  const namespaceImport = declaration.getNamespaceImport()
  if (defaultImport) {
    names.push(defaultImport.getText())
  }
  if (namespaceImport) {
    names.push('*')
  }
  return names
}

function collectImports(sourceFile: SourceFile) {
  const records = new Map<string, ImportRecord>()
  const add = (specifier: string, importedNames: Iterable<string> = []) => {
    const record = records.get(specifier) ?? {
      specifier,
      importedNames: new Set<string>(),
    }
    for (const name of importedNames) {
      record.importedNames.add(name)
    }
    records.set(specifier, record)
  }

  for (const declaration of sourceFile.getImportDeclarations()) {
    add(declaration.getModuleSpecifierValue(), getImportedNames(declaration))
  }
  for (const declaration of sourceFile.getExportDeclarations()) {
    const specifier = declaration.getModuleSpecifierValue()
    if (!specifier) {
      continue
    }
    add(
      specifier,
      declaration.getNamedExports().map((namedExport) => namedExport.getName()),
    )
  }
  for (const callExpression of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  )) {
    if (callExpression.getExpression().getKind() !== SyntaxKind.ImportKeyword) {
      continue
    }
    const [argument] = callExpression.getArguments()
    if (argument && Node.isStringLiteral(argument)) {
      add(argument.getLiteralValue())
    }
  }

  return Array.from(records.values()).sort((left, right) =>
    left.specifier.localeCompare(right.specifier, 'en'),
  )
}

function hasClientDirective(sourceFile: SourceFile) {
  const [statement] = sourceFile.getStatements()
  if (!statement || !Node.isExpressionStatement(statement)) {
    return false
  }
  const expression = statement.getExpression()
  return (
    Node.isStringLiteral(expression) &&
    expression.getLiteralValue() === 'use client'
  )
}

function collectRecipeReferences(sourceFile: SourceFile) {
  return uniqueSorted(
    sourceFile
      .getDescendantsOfKind(SyntaxKind.StringLiteral)
      .map((literal) => literal.getLiteralValue())
      .filter((value) => /^sui[A-Z0-9]/.test(value)),
  )
}

function presetRecipeBindingsFromImports(imports: readonly AnalyzedImport[]) {
  return uniqueSorted(
    imports.flatMap((entry) => {
      const match = entry.specifier.match(
        /^@saas-ui\/chakra-preset\/(?:slot-)?recipes\/([^/]+)$/,
      )
      if (!match) {
        return []
      }
      const name = match[1].replace(/\.recipe$/, '')
      return [
        name.replace(/-([a-z0-9])/g, (_, character: string) =>
          character.toUpperCase(),
        ),
      ]
    }),
  )
}

function unwrapRenderableExpression(node: Node): Node {
  if (
    Node.isAsExpression(node) ||
    Node.isSatisfiesExpression(node) ||
    Node.isParenthesizedExpression(node)
  ) {
    return unwrapRenderableExpression(node.getExpression())
  }
  return node
}

function hasRenderableDefaultExport(sourceFile: SourceFile) {
  if (
    sourceFile
      .getFunctions()
      .some((declaration) => declaration.isDefaultExport()) ||
    sourceFile.getClasses().some((declaration) => declaration.isDefaultExport())
  ) {
    return true
  }
  const assignment = sourceFile.getExportAssignment(
    (declaration) => !declaration.isExportEquals(),
  )
  if (!assignment) {
    return false
  }
  const expression = unwrapRenderableExpression(assignment.getExpression())
  if (
    Node.isArrowFunction(expression) ||
    Node.isFunctionExpression(expression) ||
    Node.isClassExpression(expression)
  ) {
    return true
  }
  if (!Node.isIdentifier(expression)) {
    return false
  }
  const name = expression.getText()
  if (sourceFile.getFunction(name) || sourceFile.getClass(name)) {
    return true
  }
  const declaration = sourceFile.getVariableDeclaration(name)
  const initializer = declaration?.getInitializer()
  if (!initializer) {
    return false
  }
  const value = unwrapRenderableExpression(initializer)
  return (
    Node.isArrowFunction(value) ||
    Node.isFunctionExpression(value) ||
    Node.isClassExpression(value)
  )
}

function isCheckedIconBarrelSpecifier(specifier: string) {
  if (
    !specifier.startsWith('.') &&
    !specifier.startsWith('#registry/') &&
    !specifier.startsWith('@/registry/')
  ) {
    return false
  }
  const normalized = specifier
    .replaceAll('\\', '/')
    .replace(/\.(?:ts|tsx|js|jsx)$/, '')
  return normalized.endsWith('/icons') || normalized.endsWith('/icons/index')
}

function directIconSpecifier(barrelSpecifier: string, iconName: string) {
  const normalized = barrelSpecifier
    .replaceAll('\\', '/')
    .replace(/\.(?:ts|tsx|js|jsx)$/, '')
    .replace(/\/index$/, '')
  return `${normalized}/${iconName}`
}

function isIconComponentBinding(name: string) {
  return /^[A-Z][A-Za-z0-9]*Icon$/.test(name)
}

function rewriteCheckedIconBarrelImports(args: {
  diagnostics: RegistryCompilerDiagnostic[]
  item: DiscoveredRegistryItem
  sourceFile: SourceFile
  sourcePath: string
}) {
  const { diagnostics, item, sourceFile, sourcePath } = args
  for (const declaration of [...sourceFile.getImportDeclarations()]) {
    const specifier = declaration.getModuleSpecifierValue()
    if (!isCheckedIconBarrelSpecifier(specifier)) {
      continue
    }
    const namedImports = declaration.getNamedImports()
    const unsupported =
      declaration.getDefaultImport() ||
      declaration.getNamespaceImport() ||
      namedImports.length === 0 ||
      namedImports.some(
        (namedImport) => !isIconComponentBinding(namedImport.getName()),
      )
    if (unsupported) {
      diagnostics.push({
        code: 'icon-barrel-import-unsupported',
        message: `Checked icon barrel import "${specifier}" must use named *Icon imports`,
        severity: 'error',
        stage: 'analysis',
        itemName: item.name,
        filePath: sourcePath,
        moduleSpecifier: specifier,
      })
      continue
    }

    const replacements = namedImports.map((namedImport) => {
      const importedName = namedImport.getName()
      const alias = namedImport.getAliasNode()?.getText()
      const binding = alias ? `${importedName} as ${alias}` : importedName
      const typeOnly = declaration.isTypeOnly() || namedImport.isTypeOnly()
      return `import${typeOnly ? ' type' : ''} { ${binding} } from '${directIconSpecifier(specifier, `${kebabCase(importedName.replace(/Icon$/, ''))}-icon`)}'`
    })
    declaration.replaceWithText(replacements.join('\n'))
  }
}

function iconNamesFromImport(specifier: string, importedNames: string[]) {
  const normalized = specifier.replaceAll('\\', '/')
  const fileName = path.posix.basename(normalized).replace(/\.[^.]+$/, '')
  const isIconModule =
    normalized.split('/').includes('icons') ||
    fileName.endsWith('-icon') ||
    fileName === 'icons'
  if (!isIconModule) {
    return []
  }
  if (fileName.endsWith('-icon')) {
    return importedNames.some(isIconComponentBinding) ? [fileName] : []
  }
  return uniqueSorted(
    importedNames
      .filter(isIconComponentBinding)
      .map((name) => `${kebabCase(name.replace(/Icon$/, ''))}-icon`),
  )
}

async function isFile(filePath: string) {
  try {
    return (await fs.stat(filePath)).isFile()
  } catch {
    return false
  }
}

async function resolveSourceModule(basePath: string) {
  const candidates: string[] = []
  const extension = path.extname(basePath)

  if (
    resolvableExtensions.includes(
      extension as (typeof resolvableExtensions)[number],
    )
  ) {
    candidates.push(basePath)
  } else if (JavaScriptExtensionPattern.test(basePath)) {
    const withoutExtension = basePath.slice(0, -extension.length)
    candidates.push(
      ...resolvableExtensions.map(
        (candidateExtension) => `${withoutExtension}${candidateExtension}`,
      ),
    )
  } else {
    candidates.push(
      basePath,
      ...resolvableExtensions.map(
        (candidateExtension) => `${basePath}${candidateExtension}`,
      ),
      ...resolvableExtensions.map((candidateExtension) =>
        path.join(basePath, `index${candidateExtension}`),
      ),
    )
  }

  for (const candidate of candidates) {
    if (await isFile(candidate)) {
      return path.normalize(candidate)
    }
  }
  return undefined
}

function resolveAliasBase(
  specifier: string,
  item: DiscoveredRegistryItem,
  aliases: Readonly<Record<string, string>>,
) {
  const automaticAliases: Array<[string, string]> = [
    [`#registry/${item.style}`, item.sourceBasePath],
    [`@/registry/${item.style}`, item.sourceBasePath],
  ]
  const candidates = [...automaticAliases, ...Object.entries(aliases)].sort(
    (left, right) => right[0].length - left[0].length,
  )

  for (const [prefix, target] of candidates) {
    if (specifier === prefix) {
      return path.resolve(target)
    }
    if (specifier.startsWith(`${prefix}/`)) {
      return path.resolve(target, specifier.slice(prefix.length + 1))
    }
  }
  return undefined
}

interface ExternalRegistryLookup {
  alias: string
  baseUrl: string
  style: string
  owners: Map<string, { name: string; private: boolean }[]>
}

function catalogPath(value: string) {
  const normalized = value
    .replaceAll('\\', '/')
    .replace(/^\.\//, '')
    .replace(/\.(?:ts|tsx|mts|cts|js|jsx)$/, '')
  return normalized.endsWith('/index')
    ? normalized.slice(0, -'/index'.length)
    : normalized
}

function externalRegistryItemUrl(
  lookup: Pick<ExternalRegistryLookup, 'baseUrl' | 'style'>,
  name: string,
) {
  const baseUrl = lookup.baseUrl.endsWith('/')
    ? lookup.baseUrl
    : `${lookup.baseUrl}/`
  return new URL(
    `styles/${encodeURIComponent(lookup.style)}/${encodeURIComponent(name)}.json`,
    baseUrl,
  ).toString()
}

function createExternalRegistryLookups(
  catalogs: readonly ExternalRegistryCatalog[],
  diagnostics: RegistryCompilerDiagnostic[],
) {
  const seenAliases = new Set<string>()
  const lookups: ExternalRegistryLookup[] = []

  for (const catalog of catalogs) {
    if (
      !catalog ||
      typeof catalog.alias !== 'string' ||
      !catalog.alias.trim() ||
      /\s/.test(catalog.alias) ||
      typeof catalog.baseUrl !== 'string' ||
      !registryUrlSchema.safeParse(catalog.baseUrl).success
    ) {
      diagnostics.push({
        code: 'external-registry-invalid-catalog',
        message:
          'External registry catalogs require a non-empty alias and an HTTP(S) baseUrl',
        severity: 'error',
        stage: 'analysis',
      })
      continue
    }

    if (seenAliases.has(catalog.alias)) {
      diagnostics.push({
        code: 'external-registry-duplicate-alias',
        message: `External registry alias "${catalog.alias}" is declared more than once`,
        severity: 'error',
        stage: 'analysis',
      })
      continue
    }
    seenAliases.add(catalog.alias)

    const parsed = registryIndexSchema.safeParse(catalog.index)
    if (!parsed.success) {
      diagnostics.push({
        code: 'external-registry-invalid-catalog',
        message: `External registry "${catalog.alias}" has an invalid index: ${parsed.error.message}`,
        severity: 'error',
        stage: 'analysis',
      })
      continue
    }

    const owners = new Map<string, { name: string; private: boolean }[]>()
    for (const item of parsed.data) {
      for (const file of item.files ?? []) {
        const filePath = typeof file === 'string' ? file : file.path
        const key = catalogPath(filePath)
        if (!key || key.startsWith('../') || key.startsWith('/')) {
          diagnostics.push({
            code: 'external-registry-invalid-catalog',
            message: `External registry "${catalog.alias}" contains an unsafe file path "${filePath}"`,
            severity: 'error',
            stage: 'analysis',
          })
          continue
        }
        const current = owners.get(key) ?? []
        current.push({ name: item.name, private: item.private === true })
        owners.set(key, current)
      }
    }

    const style = catalog.alias.split('/').pop() || 'default'
    lookups.push({
      alias: catalog.alias.replace(/\/$/, ''),
      baseUrl: catalog.baseUrl,
      style,
      owners,
    })
  }

  return lookups.sort((left, right) => right.alias.length - left.alias.length)
}

function resolveExternalRegistryImport(
  specifier: string,
  lookups: readonly ExternalRegistryLookup[],
  diagnostics: RegistryCompilerDiagnostic[],
  item: DiscoveredRegistryItem,
  filePath: string,
) {
  for (const lookup of lookups) {
    if (
      specifier !== lookup.alias &&
      !specifier.startsWith(`${lookup.alias}/`)
    ) {
      continue
    }

    const sourcePath = specifier.slice(lookup.alias.length + 1)
    const owners = lookup.owners.get(catalogPath(sourcePath)) ?? []
    if (owners.length !== 1) {
      diagnostics.push({
        code:
          owners.length > 1
            ? 'external-registry-ambiguous-file'
            : 'external-registry-item-not-found',
        message:
          owners.length > 1
            ? `External registry import "${specifier}" has ambiguous file ownership`
            : `External registry import "${specifier}" does not belong to an indexed item`,
        severity: 'error',
        stage: 'analysis',
        itemName: item.name,
        filePath,
        moduleSpecifier: specifier,
      })
      return { handled: true }
    }

    const owner = owners[0]!
    return {
      handled: true,
      externalRegistry: {
        alias: lookup.alias,
        baseUrl: externalRegistryItemUrl(lookup, owner.name),
        item: owner.name,
        private: owner.private,
      },
    }
  }

  return { handled: false }
}

function matchingTargetPatterns(
  item: DiscoveredRegistryItem,
  filePath: string,
) {
  const sourceRelativePath = toPosixPath(
    path.relative(item.sourceBasePath, filePath),
  )
  const itemRelativePath = toPosixPath(
    path.relative(item.sourceDirectory, filePath),
  )
  return Object.keys(item.config.targets ?? {}).filter(
    (pattern) => pattern === sourceRelativePath || pattern === itemRelativePath,
  )
}

function getTarget(item: DiscoveredRegistryItem, filePath: string) {
  const [pattern] = matchingTargetPatterns(item, filePath)
  return pattern ? item.config.targets?.[pattern] : undefined
}

async function analyzeImport(args: {
  aliases: Readonly<Record<string, string>>
  externalRegistries: readonly ExternalRegistryLookup[]
  diagnostics: RegistryCompilerDiagnostic[]
  filePath: string
  importedNames: string[]
  item: DiscoveredRegistryItem
  specifier: string
}): Promise<AnalyzedImport> {
  const {
    aliases,
    diagnostics,
    externalRegistries,
    filePath,
    importedNames,
    item,
    specifier,
  } = args
  const iconNames = iconNamesFromImport(specifier, importedNames)
  if (specifier.startsWith('.')) {
    return {
      specifier,
      kind: 'relative',
      importedNames,
      resolvedPath: await resolveSourceModule(
        path.resolve(path.dirname(filePath), specifier),
      ),
      iconNames,
    }
  }

  const external = resolveExternalRegistryImport(
    specifier,
    externalRegistries,
    diagnostics,
    item,
    filePath,
  )
  if (external.handled) {
    return {
      specifier,
      kind: 'alias',
      importedNames,
      iconNames,
      ...(external.externalRegistry
        ? { externalRegistry: external.externalRegistry }
        : {}),
    }
  }

  const aliasBase = resolveAliasBase(specifier, item, aliases)
  if (aliasBase || specifier.startsWith('#') || specifier.startsWith('@/')) {
    return {
      specifier,
      kind: 'alias',
      importedNames,
      resolvedPath: aliasBase
        ? await resolveSourceModule(aliasBase)
        : undefined,
      iconNames,
    }
  }

  const packageName = packageRootFromSpecifier(specifier)
  if (
    builtinPackageNames.has(specifier) ||
    builtinPackageNames.has(packageName)
  ) {
    return {
      specifier,
      kind: 'builtin',
      importedNames,
      iconNames,
    }
  }
  return {
    specifier,
    kind: 'external',
    importedNames,
    packageName,
    iconNames,
  }
}

async function analyzeFile(args: {
  aliases: Readonly<Record<string, string>>
  externalRegistries: readonly ExternalRegistryLookup[]
  diagnostics: RegistryCompilerDiagnostic[]
  item: DiscoveredRegistryItem
  project: Project
  sourcePath: string
}): Promise<AnalyzedRegistryFile> {
  const {
    aliases,
    diagnostics,
    externalRegistries,
    item,
    project,
    sourcePath,
  } = args
  const sourceContent = await fs.readFile(sourcePath, 'utf8')
  const sourceFile = project.createSourceFile(sourcePath, sourceContent, {
    overwrite: true,
    scriptKind: sourcePath.endsWith('.tsx') ? ScriptKind.TSX : ScriptKind.TS,
  })
  rewriteCheckedIconBarrelImports({
    diagnostics,
    item,
    sourceFile,
    sourcePath,
  })
  const content = sourceFile.getFullText()

  const parsedSource = ts.createSourceFile(
    sourcePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    sourcePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  ) as ts.SourceFile & { parseDiagnostics?: readonly ts.Diagnostic[] }
  for (const diagnostic of parsedSource.parseDiagnostics ?? []) {
    diagnostics.push({
      code: 'source-syntax-error',
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      severity: 'error',
      stage: 'analysis',
      itemName: item.name,
      filePath: sourcePath,
    })
  }

  const importRecords = collectImports(sourceFile)
  const imports = await Promise.all(
    importRecords.map((record) =>
      analyzeImport({
        aliases,
        diagnostics,
        externalRegistries,
        filePath: sourcePath,
        importedNames: uniqueSorted(record.importedNames),
        item,
        specifier: record.specifier,
      }),
    ),
  )
  const presetImports = uniqueSorted(
    imports
      .map((entry) => entry.specifier)
      .filter(
        (specifier) =>
          specifier === '@saas-ui/chakra-preset' ||
          specifier.startsWith('@saas-ui/chakra-preset/'),
      ),
  )

  return {
    path: toPosixPath(path.relative(item.sourceBasePath, sourcePath)),
    sourcePath,
    itemRelativePath: toPosixPath(
      path.relative(item.sourceDirectory, sourcePath),
    ),
    content,
    hash: createHash('sha256').update(content).digest('hex'),
    target: getTarget(item, sourcePath),
    client: hasClientDirective(sourceFile),
    hasRenderableDefaultExport: hasRenderableDefaultExport(sourceFile),
    moduleSpecifiers: importRecords.map((record) => record.specifier),
    imports,
    iconDependencies: uniqueSorted(
      imports
        .filter((entry) => !entry.externalRegistry)
        .flatMap((entry) => entry.iconNames),
    ),
    presetImports,
    recipeReferences: collectRecipeReferences(sourceFile),
    presetRecipeBindings: presetRecipeBindingsFromImports(imports),
  }
}

async function analyzePreview(args: {
  diagnostics: RegistryCompilerDiagnostic[]
  item: DiscoveredRegistryItem
  project: Project
}): Promise<AnalyzedRegistryPreview | undefined> {
  const { diagnostics, item, project } = args
  if (!item.previewPath) {
    return undefined
  }
  const content = await fs.readFile(item.previewPath, 'utf8')
  const sourceFile = project.createSourceFile(item.previewPath, content, {
    overwrite: true,
    scriptKind: item.previewPath.endsWith('.tsx')
      ? ScriptKind.TSX
      : ScriptKind.TS,
  })
  const parsedSource = ts.createSourceFile(
    item.previewPath,
    content,
    ts.ScriptTarget.Latest,
    true,
    item.previewPath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  ) as ts.SourceFile & { parseDiagnostics?: readonly ts.Diagnostic[] }
  for (const diagnostic of parsedSource.parseDiagnostics ?? []) {
    diagnostics.push({
      code: 'preview-syntax-error',
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      severity: 'error',
      stage: 'analysis',
      itemName: item.name,
      filePath: item.previewPath,
    })
  }
  return {
    path: toPosixPath(path.relative(item.sourceBasePath, item.previewPath)),
    sourcePath: item.previewPath,
    hasRenderableDefaultExport: hasRenderableDefaultExport(sourceFile),
  }
}

async function analyzeItem(args: {
  aliases: Readonly<Record<string, string>>
  externalRegistries: readonly ExternalRegistryLookup[]
  diagnostics: RegistryCompilerDiagnostic[]
  item: DiscoveredRegistryItem
  project: Project
}): Promise<AnalyzedRegistryItem> {
  const { aliases, diagnostics, externalRegistries, item, project } = args
  const files = await Promise.all(
    [...item.filePaths].sort(comparePaths).map((sourcePath) =>
      analyzeFile({
        aliases,
        diagnostics,
        externalRegistries,
        item,
        project,
        sourcePath,
      }),
    ),
  )
  const previewAnalysis = await analyzePreview({ diagnostics, item, project })
  const matchedTargetPatterns = new Set(
    item.filePaths.flatMap((filePath) =>
      matchingTargetPatterns(item, filePath),
    ),
  )
  for (const pattern of Object.keys(item.config.targets ?? {}).sort()) {
    if (!matchedTargetPatterns.has(pattern)) {
      diagnostics.push({
        code: 'configured-target-source-not-found',
        message: `Configured target source "${pattern}" does not match an installable item file`,
        severity: 'error',
        stage: 'analysis',
        itemName: item.name,
        filePath: item.configPath,
      })
    }
  }
  const externalPackages = uniqueSorted(
    files.flatMap((file) =>
      file.imports.flatMap((entry) =>
        entry.kind === 'external' && entry.packageName
          ? [entry.packageName]
          : [],
      ),
    ),
  )

  return {
    ...item,
    files,
    previewAnalysis,
    client: files.some((file) => file.client),
    externalPackages,
    iconDependencies: uniqueSorted(
      files.flatMap((file) => file.iconDependencies),
    ),
    presetImports: uniqueSorted(files.flatMap((file) => file.presetImports)),
    recipeReferences: uniqueSorted(
      files.flatMap((file) => file.recipeReferences),
    ),
    presetRecipeBindings: uniqueSorted(
      files.flatMap((file) => file.presetRecipeBindings),
    ),
  }
}

export async function analyzeItemFiles(
  discovery: RegistryDiscoveryResult,
  options: AnalyzeItemFilesOptions = {},
): Promise<RegistryAnalysisResult> {
  const diagnostics = [...discovery.diagnostics]
  const project = new Project({
    compilerOptions: {
      allowJs: false,
      jsx: ts.JsxEmit.ReactJSX,
      noEmit: true,
      skipLibCheck: true,
    },
    skipAddingFilesFromTsConfig: true,
  })
  const aliases = options.aliases ?? {}
  const externalRegistries = createExternalRegistryLookups(
    options.externalRegistries ?? [],
    diagnostics,
  )
  const items: AnalyzedRegistryItem[] = []

  for (const item of discovery.items) {
    items.push(
      await analyzeItem({
        aliases,
        diagnostics,
        externalRegistries,
        item,
        project,
      }),
    )
  }

  return { items, diagnostics }
}
