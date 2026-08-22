import * as recast from 'recast'
import { type ParserOptions, parse } from '@babel/parser'
import fg from 'fast-glob'
import { createHash } from 'node:crypto'
import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'

import type { Config } from '#utils/get-config'
import {
  type RegistryExportMap,
  assertLegacyExportProvenance,
  chakraReactExports,
  chakraStyledSystemExports,
  defaultRegistryExportMap,
  resolveRegistryImport,
  unsupportedLegacyExports,
} from '#utils/migrations/react-to-registry-mapping'
import {
  type MigrationPackageAction,
  type MigrationPackageAdapter,
  type MigrationPackagePlan,
  fileMigrationPackageAdapter,
} from '#utils/migrations/react-to-registry-packages'

const LEGACY_MODULE = '@saas-ui/react'
const PRIMITIVE_SUBPATHS = new Set([
  'error-boundary',
  'grid-list',
  'navbar',
  'sidebar',
  'steps',
  'utils',
])
const CHAKRA_MODULE = '@chakra-ui/react'
const CHAKRA_STYLED_SYSTEM_MODULE = '@chakra-ui/react/styled-system'
const PRESET_MODULE = '@saas-ui/chakra-preset'
const PRESET_COLORS_MODULE = '@saas-ui/chakra-preset/colors'
const REPORT_VERSION = 1 as const

const TRANSFORMABLE_SOURCE_EXTENSIONS = [
  'js',
  'jsx',
  'ts',
  'tsx',
  'mjs',
  'cjs',
  'mts',
  'cts',
  'mdx',
] as const
const LEGACY_REFERENCE_EXTENSIONS = [
  ...TRANSFORMABLE_SOURCE_EXTENSIONS,
] as const
const MIGRATION_GLOB_IGNORES = [
  '**/.next/**',
  '**/.saas-ui/**',
  '**/build/**',
  '**/coverage/**',
  '**/dist/**',
  '**/node_modules/**',
] as const

const PARSE_OPTIONS: ParserOptions = {
  sourceType: 'module',
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  tokens: true,
  plugins: [
    'asyncGenerators',
    'bigInt',
    'classPrivateMethods',
    'classPrivateProperties',
    'classProperties',
    'classStaticBlock',
    'decorators-legacy',
    'dynamicImport',
    'exportDefaultFrom',
    'exportNamespaceFrom',
    'importAssertions',
    'importMeta',
    'jsx',
    'nullishCoalescingOperator',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'optionalChaining',
    'topLevelAwait',
    'typescript',
  ],
}

export type MigrationDiagnosticSeverity = 'error' | 'warning'

export interface MigrationDiagnostic {
  code: string
  severity: MigrationDiagnosticSeverity
  message: string
  file?: string
  line?: number
  column?: number
}

export interface MigrationFileReport {
  path: string
  changed: boolean
  migratedBindings: number
  requestedItems: string[]
  requiredPackages: string[]
  diagnostics: MigrationDiagnostic[]
}

export interface ReactToRegistryMigrationReport {
  version: typeof REPORT_VERSION
  migration: 'react-to-registry'
  mode: 'dry-run' | 'write'
  success: boolean
  applied: boolean
  filesScanned: number
  filesChanged: number
  requestedItems: string[]
  requiredPackages: string[]
  packageActions: MigrationPackageAction[]
  files: MigrationFileReport[]
  diagnostics: MigrationDiagnostic[]
  rollback: {
    sourceFiles: 'atomic-with-backups'
    installer: 'callback-owned'
    packageManifest: 'atomic-with-rollback'
    limitation: string
  }
}

export interface TemplateInstallRequest {
  cwd: string
  items: readonly string[]
}

/**
 * The callback is intentionally independent from a CLI command. Implementors
 * should validate their complete install plan before mutating and roll back
 * their own file/package changes when they reject.
 */
export type TemplateInstaller = (
  request: TemplateInstallRequest,
) => Promise<void>

export interface ReactToRegistryMigrationOptions {
  cwd: string
  inputs?: readonly string[]
  config: Pick<Config, 'aliases'>
  write?: boolean
  installer?: TemplateInstaller
  packageAdapter?: MigrationPackageAdapter
  registryExports?: RegistryExportMap
  replaceDefaultRegistryExports?: boolean
}

export interface TransformReactToRegistryOptions {
  filePath: string
  source: string
  config: Pick<Config, 'aliases'>
  registryExports?: RegistryExportMap
  replaceDefaultRegistryExports?: boolean
}

export interface TransformReactToRegistryResult {
  output: string
  report: MigrationFileReport
}

export type TransformReactToRegistryMdxOptions = TransformReactToRegistryOptions

const BASE_MIGRATION_PACKAGES = [
  '@chakra-ui/react',
  '@emotion/react',
  '@saas-ui/chakra-preset',
] as const

const KNOWN_LEGACY_SUBPATHS = new Set([
  ...Object.values(defaultRegistryExportMap).map((target) => target.item),
  'absolute-center',
  'aspect-ratio',
  'badge',
  'bleed',
  'box',
  'button',
  'button-group',
  'card',
  'center',
  'checkmark',
  'circle',
  'client-only',
  'code',
  'code-block',
  'collapsible',
  'color-mode',
  'combobox',
  'color-picker',
  'color-swatch',
  'container',
  'data-list',
  'download-trigger',
  'editable',
  'em',
  'environment',
  'field',
  'fieldset',
  'flex',
  'float',
  'focus-trap',
  'for',
  'format',
  'group',
  'heading',
  'highlight',
  'icon',
  'icons',
  'image',
  'input',
  'input-addon',
  'input-element',
  'kbd',
  'link',
  'link-box',
  'list',
  'loader',
  'locale',
  'mark',
  'presence',
  'progress',
  'progress-circle',
  'portal',
  'qr-code',
  'quote',
  'radio-group',
  'radiomark',
  'rating-group',
  'scroll-area',
  'separator',
  'show',
  'simple-grid',
  'skip-nav',
  'skip-nav-link',
  'spacer',
  'span',
  'square',
  'stack',
  'sticky',
  'strong',
  'table',
  'tabs',
  'text',
  'textarea',
  'theme',
  'timeline',
  'toast',
  'toggle',
  'toggle-group',
  'tree-view',
  'visually-hidden',
  'wrap',
])
const MDX_FENCE_LANGUAGES = new Set([
  'js',
  'javascript',
  'jsx',
  'ts',
  'typescript',
  'tsx',
  'mjs',
  'cjs',
  'mts',
  'cts',
])

interface DesiredImport {
  imported: string
  isType: boolean
  local: string
  module: string
}

interface PlannedFile {
  absolutePath: string
  original: string
  output: string
  mode: number
  report: MigrationFileReport
}

type AstNode = Record<string, unknown> & {
  type: string
  loc?: {
    start?: { line?: number; column?: number }
  } | null
}

function sourceValue(node: unknown): string | undefined {
  if (!node || typeof node !== 'object') return undefined
  const value = Reflect.get(node, 'value')
  return typeof value === 'string' ? value : undefined
}

function identifierName(node: unknown): string | undefined {
  if (!node || typeof node !== 'object') return undefined
  const name = Reflect.get(node, 'name')
  if (typeof name === 'string') return name
  return sourceValue(node)
}

function diagnosticAt(
  code: string,
  message: string,
  file: string,
  node?: AstNode,
): MigrationDiagnostic {
  const start = node?.loc?.start
  return {
    code,
    severity: 'error',
    message,
    file,
    ...(start?.line ? { line: start.line } : {}),
    ...(start?.column === undefined ? {} : { column: start.column + 1 }),
  }
}

function parseSource(source: string) {
  return recast.parse(source, {
    parser: {
      parse(code: string) {
        return parse(code, PARSE_OPTIONS)
      },
    },
  })
}

function classifyImport(
  imported: string,
  config: Pick<Config, 'aliases'>,
  registryExports: RegistryExportMap,
): { desired?: Omit<DesiredImport, 'isType' | 'local'>; items: string[] } {
  if (imported === 'defaultSystem' || imported === 'defaultConfig') {
    return { desired: { imported, module: PRESET_MODULE }, items: [] }
  }
  if (imported === 'ColorPalette') {
    return {
      desired: { imported, module: PRESET_COLORS_MODULE },
      items: [],
    }
  }

  const target = registryExports[imported]
  if (target) {
    return {
      desired: {
        imported: target.exportName ?? imported,
        module: resolveRegistryImport(target, config),
      },
      items: [target.item, ...(target.additionalItems ?? [])],
    }
  }
  if (chakraStyledSystemExports.has(imported)) {
    return {
      desired: { imported, module: CHAKRA_STYLED_SYSTEM_MODULE },
      items: [],
    }
  }
  if (chakraReactExports.has(imported)) {
    return {
      desired: { imported, module: CHAKRA_MODULE },
      items: [],
    }
  }
  if (unsupportedLegacyExports.has(imported)) return { items: [] }
  return { items: [] }
}

function inspectUnsupportedReferences(
  ast: AstNode,
  filePath: string,
  diagnostics: MigrationDiagnostic[],
) {
  recast.types.visit(ast, {
    visitExportNamedDeclaration(nodePath) {
      const node = nodePath.node as unknown as AstNode
      if (sourceValue(Reflect.get(node, 'source')) === LEGACY_MODULE) {
        diagnostics.push(
          diagnosticAt(
            'unsupported-re-export',
            `Re-exports from ${LEGACY_MODULE} require manual migration.`,
            filePath,
            node,
          ),
        )
      }
      this.traverse(nodePath)
    },
    visitExportAllDeclaration(nodePath) {
      const node = nodePath.node as unknown as AstNode
      if (sourceValue(Reflect.get(node, 'source')) === LEGACY_MODULE) {
        diagnostics.push(
          diagnosticAt(
            'unsupported-re-export',
            `Wildcard re-exports from ${LEGACY_MODULE} require manual migration.`,
            filePath,
            node,
          ),
        )
      }
      this.traverse(nodePath)
    },
    visitCallExpression(nodePath) {
      const node = nodePath.node as unknown as AstNode
      const callee = Reflect.get(node, 'callee') as AstNode | undefined
      const args = Reflect.get(node, 'arguments') as unknown[] | undefined
      const moduleName = sourceValue(args?.[0])
      const calleeObject = callee
        ? (Reflect.get(callee, 'object') as AstNode | undefined)
        : undefined
      const calleeProperty = callee
        ? identifierName(Reflect.get(callee, 'property'))
        : undefined
      const isStaticModuleCall =
        identifierName(callee) === 'require' ||
        (callee?.type === 'MemberExpression' &&
          ((identifierName(calleeObject) === 'require' &&
            calleeProperty === 'resolve') ||
            (['jest', 'vi'].includes(identifierName(calleeObject) ?? '') &&
              ['doMock', 'mock', 'unmock'].includes(calleeProperty ?? ''))))
      if (
        moduleName === LEGACY_MODULE &&
        (callee?.type === 'Import' || isStaticModuleCall)
      ) {
        diagnostics.push(
          diagnosticAt(
            callee?.type === 'Import'
              ? 'unsupported-dynamic-import'
              : 'unsupported-static-module-reference',
            `Static module references to ${LEGACY_MODULE} require manual migration.`,
            filePath,
            node,
          ),
        )
      }
      this.traverse(nodePath)
    },
    visitImportExpression(nodePath) {
      const node = nodePath.node as unknown as AstNode
      if (sourceValue(Reflect.get(node, 'source')) === LEGACY_MODULE) {
        diagnostics.push(
          diagnosticAt(
            'unsupported-dynamic-import',
            `Dynamic imports of ${LEGACY_MODULE} require manual migration.`,
            filePath,
            node,
          ),
        )
      }
      this.traverse(nodePath)
    },
    visitTSImportEqualsDeclaration(nodePath) {
      const node = nodePath.node as unknown as AstNode
      const reference = Reflect.get(node, 'moduleReference')
      const expression =
        reference && typeof reference === 'object'
          ? Reflect.get(reference, 'expression')
          : undefined
      if (sourceValue(expression) === LEGACY_MODULE) {
        diagnostics.push(
          diagnosticAt(
            'unsupported-import-equals',
            `TypeScript import-equals from ${LEGACY_MODULE} requires manual migration.`,
            filePath,
            node,
          ),
        )
      }
      this.traverse(nodePath)
    },
    visitTSImportType(nodePath) {
      const node = nodePath.node as unknown as AstNode
      const argument = Reflect.get(node, 'argument')
      if (sourceValue(argument) === LEGACY_MODULE) {
        diagnostics.push(
          diagnosticAt(
            'unsupported-type-import',
            `TypeScript import types from ${LEGACY_MODULE} require manual migration.`,
            filePath,
            node,
          ),
        )
      }
      this.traverse(nodePath)
    },
    visitTSModuleDeclaration(nodePath) {
      const node = nodePath.node as unknown as AstNode
      if (sourceValue(Reflect.get(node, 'id')) === LEGACY_MODULE) {
        diagnostics.push(
          diagnosticAt(
            'unsupported-module-augmentation',
            `Module declarations for ${LEGACY_MODULE} require manual migration.`,
            filePath,
            node,
          ),
        )
      }
      this.traverse(nodePath)
    },
  })
}

function effectiveImportKind(declaration: AstNode, specifier: AstNode) {
  return (
    Reflect.get(declaration, 'importKind') === 'type' ||
    Reflect.get(specifier, 'importKind') === 'type'
  )
}

function makeImportSpecifier(desired: DesiredImport) {
  const specifier = recast.types.builders.importSpecifier.from({
    imported: recast.types.builders.identifier(desired.imported),
    local: recast.types.builders.identifier(desired.local),
  }) as unknown as AstNode
  if (desired.isType) Reflect.set(specifier, 'importKind', 'type')
  return specifier
}

function makeImportDeclaration(moduleName: string, desired: DesiredImport[]) {
  const declaration = recast.types.builders.importDeclaration(
    desired.map(makeImportSpecifier) as never,
    recast.types.builders.stringLiteral(moduleName),
  ) as unknown as AstNode
  if (desired.length > 0 && desired.every((entry) => entry.isType)) {
    Reflect.set(declaration, 'importKind', 'type')
    for (const specifier of Reflect.get(
      declaration,
      'specifiers',
    ) as AstNode[]) {
      Reflect.set(specifier, 'importKind', null)
    }
  }
  return declaration
}

function hasEquivalentImport(declarations: AstNode[], desired: DesiredImport) {
  return declarations.some((declaration) => {
    if (sourceValue(Reflect.get(declaration, 'source')) !== desired.module) {
      return false
    }
    const specifiers = Reflect.get(declaration, 'specifiers') as
      | AstNode[]
      | undefined
    return specifiers?.some(
      (specifier) =>
        specifier.type === 'ImportSpecifier' &&
        identifierName(Reflect.get(specifier, 'imported')) ===
          desired.imported &&
        identifierName(Reflect.get(specifier, 'local')) === desired.local &&
        effectiveImportKind(declaration, specifier) === desired.isType,
    )
  })
}

function findLocalImport(declarations: AstNode[], local: string) {
  for (const declaration of declarations) {
    const moduleName = sourceValue(Reflect.get(declaration, 'source'))
    const specifiers = Reflect.get(declaration, 'specifiers') as
      | AstNode[]
      | undefined
    for (const specifier of specifiers ?? []) {
      if (identifierName(Reflect.get(specifier, 'local')) === local) {
        return { declaration, moduleName, specifier }
      }
    }
  }
  return undefined
}

export function transformReactToRegistrySource(
  options: TransformReactToRegistryOptions,
): TransformReactToRegistryResult {
  assertLegacyExportProvenance()
  const diagnostics: MigrationDiagnostic[] = []
  const requestedItems = new Set<string>()
  const registryExports = options.replaceDefaultRegistryExports
    ? (options.registryExports ?? {})
    : { ...defaultRegistryExportMap, ...options.registryExports }
  let ast: AstNode

  try {
    ast = parseSource(options.source) as AstNode
  } catch (error) {
    const parseError = error as Error & {
      loc?: { line?: number; column?: number }
    }
    diagnostics.push({
      code: 'parse-error',
      severity: 'error',
      message: parseError.message,
      file: options.filePath,
      ...(parseError.loc?.line ? { line: parseError.loc.line } : {}),
      ...(parseError.loc?.column === undefined
        ? {}
        : { column: parseError.loc.column + 1 }),
    })
    return {
      output: options.source,
      report: {
        path: options.filePath,
        changed: false,
        migratedBindings: 0,
        requestedItems: [],
        requiredPackages: [],
        diagnostics,
      },
    }
  }

  inspectUnsupportedReferences(ast, options.filePath, diagnostics)

  const program = Reflect.get(ast, 'program') as AstNode
  const body = Reflect.get(program, 'body') as AstNode[]
  const legacyDeclarations = body.filter(
    (node) =>
      node.type === 'ImportDeclaration' &&
      sourceValue(Reflect.get(node, 'source')) === LEGACY_MODULE,
  )
  const otherImports = body.filter(
    (node) =>
      node.type === 'ImportDeclaration' && !legacyDeclarations.includes(node),
  )
  const desiredImports: DesiredImport[] = []
  let migratedBindings = 0

  for (const declaration of legacyDeclarations) {
    const specifiers = (Reflect.get(declaration, 'specifiers') ??
      []) as AstNode[]
    if (specifiers.length === 0) {
      diagnostics.push(
        diagnosticAt(
          'unsupported-side-effect-import',
          `A side-effect import of ${LEGACY_MODULE} requires manual migration.`,
          options.filePath,
          declaration,
        ),
      )
    }

    for (const specifier of specifiers) {
      if (specifier.type === 'ImportDefaultSpecifier') {
        diagnostics.push(
          diagnosticAt(
            'unsupported-default-import',
            `Default imports from ${LEGACY_MODULE} require manual migration.`,
            options.filePath,
            specifier,
          ),
        )
        continue
      }
      if (specifier.type === 'ImportNamespaceSpecifier') {
        diagnostics.push(
          diagnosticAt(
            'unsupported-namespace-import',
            `Namespace imports from ${LEGACY_MODULE} require manual migration.`,
            options.filePath,
            specifier,
          ),
        )
        continue
      }
      if (specifier.type !== 'ImportSpecifier') {
        diagnostics.push(
          diagnosticAt(
            'unsupported-import',
            `This import from ${LEGACY_MODULE} requires manual migration.`,
            options.filePath,
            specifier,
          ),
        )
        continue
      }

      const imported = identifierName(Reflect.get(specifier, 'imported'))
      const local = identifierName(Reflect.get(specifier, 'local'))
      if (!imported || !local) {
        diagnostics.push(
          diagnosticAt(
            'unsupported-import',
            `Unable to read an imported binding from ${LEGACY_MODULE}.`,
            options.filePath,
            specifier,
          ),
        )
        continue
      }

      const classified = classifyImport(
        imported,
        options.config,
        registryExports,
      )
      if (!classified.desired) {
        diagnostics.push(
          diagnosticAt(
            'unsupported-legacy-export',
            `The ${imported} export has no semantics-preserving registry replacement; migrate it manually.`,
            options.filePath,
            specifier,
          ),
        )
        continue
      }
      for (const item of classified.items) requestedItems.add(item)
      desiredImports.push({
        ...classified.desired,
        isType: effectiveImportKind(declaration, specifier),
        local,
      })
      migratedBindings += 1
    }
  }

  const seenDesiredLocals = new Map<string, DesiredImport>()
  for (const desired of desiredImports) {
    const previous = seenDesiredLocals.get(desired.local)
    if (
      previous &&
      (previous.module !== desired.module ||
        previous.imported !== desired.imported ||
        previous.isType !== desired.isType)
    ) {
      diagnostics.push({
        code: 'import-binding-conflict',
        severity: 'error',
        message: `The local binding ${desired.local} resolves to more than one migration target.`,
        file: options.filePath,
      })
    } else {
      seenDesiredLocals.set(desired.local, desired)
    }

    const existing = findLocalImport(otherImports, desired.local)
    if (existing && !hasEquivalentImport(otherImports, desired)) {
      diagnostics.push(
        diagnosticAt(
          'import-binding-conflict',
          `The local binding ${desired.local} is already imported from ${existing.moduleName ?? 'another module'}.`,
          options.filePath,
          existing.specifier,
        ),
      )
    }
  }

  if (diagnostics.some((entry) => entry.severity === 'error')) {
    return {
      output: options.source,
      report: {
        path: options.filePath,
        changed: false,
        migratedBindings: 0,
        requestedItems: [...requestedItems].sort(),
        requiredPackages: [],
        diagnostics,
      },
    }
  }

  const missingDesired = desiredImports.filter(
    (desired, index, all) =>
      !hasEquivalentImport(otherImports, desired) &&
      all.findIndex(
        (candidate) =>
          candidate.imported === desired.imported &&
          candidate.local === desired.local &&
          candidate.module === desired.module &&
          candidate.isType === desired.isType,
      ) === index,
  )

  const createdDeclarations: AstNode[] = []
  const touchedDeclarations: AstNode[] = []
  const modules = [...new Set(missingDesired.map((entry) => entry.module))]
  for (const moduleName of modules) {
    const moduleImports = missingDesired.filter(
      (entry) => entry.module === moduleName,
    )
    const hasValues = moduleImports.some((entry) => !entry.isType)
    const target = otherImports.find(
      (declaration) =>
        sourceValue(Reflect.get(declaration, 'source')) === moduleName &&
        (!hasValues || Reflect.get(declaration, 'importKind') !== 'type'),
    )
    if (target) {
      const specifiers = Reflect.get(target, 'specifiers') as AstNode[]
      for (const desired of moduleImports) {
        const specifier = makeImportSpecifier(desired)
        if (Reflect.get(target, 'importKind') === 'type') {
          Reflect.set(specifier, 'importKind', null)
        }
        specifiers.push(specifier)
      }
      touchedDeclarations.push(target)
    } else {
      createdDeclarations.push(makeImportDeclaration(moduleName, moduleImports))
    }
  }

  const comments = legacyDeclarations.flatMap(
    (declaration) => (Reflect.get(declaration, 'comments') ?? []) as unknown[],
  )
  const equivalentCommentTarget = desiredImports
    .map((desired) =>
      otherImports.find((declaration) =>
        hasEquivalentImport([declaration], desired),
      ),
    )
    .find((declaration) => declaration !== undefined)
  const commentTarget =
    createdDeclarations[0] ?? touchedDeclarations[0] ?? equivalentCommentTarget
  if (commentTarget && comments.length)
    Reflect.set(commentTarget, 'comments', comments)

  const firstLegacyIndex = body.findIndex((node) =>
    legacyDeclarations.includes(node),
  )
  const filteredBody = body.filter((node) => !legacyDeclarations.includes(node))
  const insertionIndex = body
    .slice(0, firstLegacyIndex < 0 ? 0 : firstLegacyIndex)
    .filter((node) => !legacyDeclarations.includes(node)).length
  filteredBody.splice(insertionIndex, 0, ...createdDeclarations)
  Reflect.set(program, 'body', filteredBody)

  let output = recast.print(ast, { quote: 'single' }).code
  const sourceUsesImportSemicolons =
    /(?:^|\n)\s*(?:import\b[^\n]*|}\s+from\s+['"][^'"]+['"]);/.test(
      options.source,
    )
  if (!sourceUsesImportSemicolons) {
    output = output
      .replace(/^(\s*import\b[^\n]*);$/gm, '$1')
      .replace(/^(\s*}\s+from\s+['"][^'"]+['"]);$/gm, '$1')
  }
  if (sourceHasLegacyReference(output)) {
    diagnostics.push({
      code: 'unsupported-static-legacy-reference',
      severity: 'error',
      message:
        `A static ${LEGACY_MODULE} reference remains after import planning; ` +
        'migrate it manually.',
      file: options.filePath,
    })
    return {
      output: options.source,
      report: {
        path: options.filePath,
        changed: false,
        migratedBindings: 0,
        requestedItems: [...requestedItems].sort(),
        requiredPackages: [],
        diagnostics,
      },
    }
  }
  return {
    output,
    report: {
      path: options.filePath,
      changed: output !== options.source,
      migratedBindings,
      requestedItems: [...requestedItems].sort(),
      requiredPackages: [
        ...(migratedBindings ? BASE_MIGRATION_PACKAGES : []),
        ...([...requestedItems].some((item) =>
          ['color-mode', 'provider'].includes(item),
        )
          ? ['next-themes']
          : []),
      ].sort(),
      diagnostics,
    },
  }
}

interface MdxCodeRegion {
  start: number
  end: number
  supported: boolean
}

interface MdxImportCandidate {
  start: number
  end: number
  moduleName?: string
  kind: 'dynamic' | 'static'
}

function mdxCodeRegions(source: string) {
  const regions: MdxCodeRegion[] = []
  const lines = [...source.matchAll(/^.*(?:\r\n|\n|\r|$)/gm)].filter(
    (match) => match[0].length > 0,
  )
  let fence:
    | {
        marker: string
        start: number
        supported: boolean
      }
    | undefined

  for (const line of lines) {
    const offset = line.index ?? 0
    const content = line[0].replace(/(?:\r\n|\n|\r)$/, '')
    if (!fence) {
      const opening = /^[ \t]*(`{3,}|~{3,})[ \t]*([^ \t{]*)/.exec(content)
      if (!opening) continue
      const marker = opening[1]
      if (!marker) continue
      const language = (opening[2] ?? '').toLowerCase()
      fence = {
        marker,
        start: offset + line[0].length,
        supported: MDX_FENCE_LANGUAGES.has(language),
      }
      continue
    }

    const marker = fence.marker[0] === '`' ? '`' : '~'
    const closing = new RegExp(
      `^[ \\t]*${marker}{${fence.marker.length},}[ \\t]*$`,
    )
    if (!closing.test(content)) continue
    regions.push({
      start: fence.start,
      end: offset,
      supported: fence.supported,
    })
    fence = undefined
  }

  if (fence) {
    regions.push({
      start: fence.start,
      end: source.length,
      supported: fence.supported,
    })
  }
  return regions
}

function legacyModuleInStatement(statement: string) {
  const staticImport =
    /(?:\bfrom\s*|^import\s*)(['"])(@saas-ui\/react(?:\/[^'"\s;]+)?)\1/m
  return staticImport.exec(statement)?.[2]
}

function scanMdxImport(
  source: string,
  start: number,
  limit: number,
): MdxImportCandidate | undefined {
  const firstToken = /^import\s*/.exec(source.slice(start, limit))?.[0]
  if (!firstToken) return undefined
  const afterImport = start + firstToken.length
  if (source[afterImport] === '(') {
    const lineEnd = source.indexOf('\n', afterImport)
    const end = lineEnd === -1 || lineEnd > limit ? limit : lineEnd
    return /import\s*\(\s*['"]@saas-ui\/react(?:\/[^'"]+)?['"]/.test(
      source.slice(start, end),
    )
      ? { start, end, kind: 'dynamic' }
      : undefined
  }
  if (source[afterImport] === '.') return undefined

  let quote: string | undefined
  let escaped = false
  let lineComment = false
  let blockComment = false
  let braces = 0
  let brackets = 0
  let parentheses = 0

  for (let index = afterImport; index < limit; index++) {
    const character = source[index]
    const next = source[index + 1]
    if (lineComment) {
      if (character !== '\n' && character !== '\r') continue
      lineComment = false
    } else if (blockComment) {
      if (character === '*' && next === '/') {
        blockComment = false
        index += 1
      }
      continue
    } else if (quote) {
      if (escaped) escaped = false
      else if (character === '\\') escaped = true
      else if (character === quote) quote = undefined
      continue
    } else if (character === '/' && next === '/') {
      lineComment = true
      index += 1
      continue
    } else if (character === '/' && next === '*') {
      blockComment = true
      index += 1
      continue
    } else if (character === "'" || character === '"') {
      quote = character
      continue
    } else if (character === '{') braces += 1
    else if (character === '}') braces = Math.max(0, braces - 1)
    else if (character === '[') brackets += 1
    else if (character === ']') brackets = Math.max(0, brackets - 1)
    else if (character === '(') parentheses += 1
    else if (character === ')') parentheses = Math.max(0, parentheses - 1)

    const topLevel = braces === 0 && brackets === 0 && parentheses === 0
    if (character === ';' && topLevel) {
      const end = index + 1
      const moduleName = legacyModuleInStatement(source.slice(start, end))
      return moduleName ? { start, end, kind: 'static', moduleName } : undefined
    }
    if (character === '\n' || character === '\r') {
      const end = index
      const statement = source.slice(start, end)
      const moduleName = legacyModuleInStatement(statement)
      if (moduleName) return { start, end, kind: 'static', moduleName }
      if (!topLevel) continue

      const nextLineStart =
        character === '\r' && next === '\n' ? index + 2 : index + 1
      const nextLineEnd = source.indexOf('\n', nextLineStart)
      const nextLine = source
        .slice(
          nextLineStart,
          nextLineEnd === -1 || nextLineEnd > limit ? limit : nextLineEnd,
        )
        .trimStart()
      const trimmed = statement.trimEnd()
      if (
        trimmed.endsWith(',') ||
        trimmed === 'import' ||
        nextLine.startsWith('from ')
      ) {
        if (character === '\r' && next === '\n') index += 1
        continue
      }
      return statement.includes(LEGACY_MODULE)
        ? { start, end, kind: 'static' }
        : undefined
    }
  }

  const statement = source.slice(start, limit)
  const moduleName = legacyModuleInStatement(statement)
  return moduleName || statement.includes(LEGACY_MODULE)
    ? { start, end: limit, kind: 'static', moduleName }
    : undefined
}

function findMdxImports(source: string) {
  const regions = mdxCodeRegions(source)
  const candidates: MdxImportCandidate[] = []
  const addCandidates = (start: number, end: number, allowIndent: boolean) => {
    const segment = source.slice(start, end)
    const pattern = allowIndent ? /^[ \t]*import\b/gm : /^import\b/gm
    for (const match of segment.matchAll(pattern)) {
      const matched = match[0]
      const importOffset = matched.lastIndexOf('import')
      const candidate = scanMdxImport(
        source,
        start + (match.index ?? 0) + importOffset,
        end,
      )
      if (candidate) candidates.push(candidate)
    }
  }
  const addDynamicCandidates = (start: number, end: number) => {
    const segment = source.slice(start, end)
    for (const match of segment.matchAll(
      /\bimport\s*\(\s*['"]@saas-ui\/react(?:\/[^'"]+)?['"]/g,
    )) {
      const importOffset = match[0].indexOf('import')
      const candidate = scanMdxImport(
        source,
        start + (match.index ?? 0) + importOffset,
        end,
      )
      if (candidate) candidates.push(candidate)
    }
  }

  const topLevel = source.matchAll(/^import\b/gm)
  for (const match of topLevel) {
    const start = match.index ?? 0
    if (regions.some((region) => start >= region.start && start < region.end)) {
      continue
    }
    const candidate = scanMdxImport(source, start, source.length)
    if (candidate) candidates.push(candidate)
  }
  for (const region of regions) {
    if (region.supported) {
      addCandidates(region.start, region.end, true)
      addDynamicCandidates(region.start, region.end)
    }
  }

  return candidates
    .filter(
      (candidate, index, all) =>
        all.findIndex(
          (other) =>
            other.start === candidate.start && other.end === candidate.end,
        ) === index,
    )
    .sort((left, right) => left.start - right.start)
}

function lineAndColumnAt(source: string, offset: number) {
  const before = source.slice(0, offset)
  const lineStart = Math.max(before.lastIndexOf('\n'), before.lastIndexOf('\r'))
  return {
    line: (before.match(/\r\n|\n|\r/g)?.length ?? 0) + 1,
    column: offset - lineStart,
  }
}

function offsetMdxDiagnostic(
  diagnostic: MigrationDiagnostic,
  source: string,
  candidate: MdxImportCandidate,
) {
  const location = lineAndColumnAt(source, candidate.start)
  return {
    ...diagnostic,
    line: location.line + (diagnostic.line ?? 1) - 1,
    column:
      (diagnostic.line ?? 1) === 1
        ? location.column + (diagnostic.column ?? 1) - 1
        : diagnostic.column,
  }
}

/** Transform complete MDX ESM and JavaScript/TypeScript fence imports only. */
export function transformReactToRegistryMdx(
  options: TransformReactToRegistryMdxOptions,
): TransformReactToRegistryResult {
  const candidates = findMdxImports(options.source)
  const requestedItems = new Set<string>()
  const requiredPackages = new Set<string>()
  const diagnostics: MigrationDiagnostic[] = []
  const replacements: Array<{ start: number; end: number; output: string }> = []
  let migratedBindings = 0

  for (const candidate of candidates) {
    const location = lineAndColumnAt(options.source, candidate.start)
    if (candidate.kind === 'dynamic') {
      diagnostics.push({
        code: 'unsupported-dynamic-import',
        severity: 'error',
        message: `Dynamic imports of ${LEGACY_MODULE} require manual migration.`,
        file: options.filePath,
        ...location,
      })
      continue
    }
    if (!candidate.moduleName) {
      diagnostics.push({
        code: 'malformed-mdx-import',
        severity: 'error',
        message:
          `A static ${LEGACY_MODULE} import could not be parsed completely; ` +
          'repair it before migrating.',
        file: options.filePath,
        ...location,
      })
      continue
    }

    const subpath = candidate.moduleName.startsWith(`${LEGACY_MODULE}/`)
      ? candidate.moduleName.slice(LEGACY_MODULE.length + 1)
      : undefined
    if (subpath && !KNOWN_LEGACY_SUBPATHS.has(subpath)) {
      diagnostics.push({
        code: 'unsupported-legacy-subpath',
        severity: 'error',
        message:
          `The legacy subpath "${candidate.moduleName}" is not a known ` +
          'component entry point; migrate it manually.',
        file: options.filePath,
        ...location,
      })
      continue
    }

    const statement = options.source.slice(candidate.start, candidate.end)
    const moduleOffset = statement.lastIndexOf(candidate.moduleName)
    const normalized =
      subpath && moduleOffset !== -1
        ? statement.slice(0, moduleOffset) +
          LEGACY_MODULE +
          statement.slice(moduleOffset + candidate.moduleName.length)
        : statement
    const result = transformReactToRegistrySource({
      ...options,
      source: normalized,
    })
    diagnostics.push(
      ...result.report.diagnostics.map((diagnostic) =>
        offsetMdxDiagnostic(diagnostic, options.source, candidate),
      ),
    )
    for (const item of result.report.requestedItems) requestedItems.add(item)
    for (const dependency of result.report.requiredPackages) {
      requiredPackages.add(dependency)
    }
    migratedBindings += result.report.migratedBindings
    if (result.report.changed) {
      const newline = /\r\n|\n|\r/.exec(options.source)?.[0] ?? '\n'
      const lineStart = Math.max(
        options.source.lastIndexOf('\n', candidate.start - 1),
        options.source.lastIndexOf('\r', candidate.start - 1),
      )
      const indent = options.source.slice(lineStart + 1, candidate.start)
      const output = result.output
        .replace(/\r\n|\r|\n/g, '\n')
        .replace(/\n/g, `${newline}${indent}`)
      replacements.push({ ...candidate, output })
    }
  }

  let output = options.source
  for (const replacement of [...replacements].reverse()) {
    output =
      output.slice(0, replacement.start) +
      replacement.output +
      output.slice(replacement.end)
  }
  return {
    output,
    report: {
      path: options.filePath,
      changed: output !== options.source,
      migratedBindings,
      requestedItems: [...requestedItems].sort(),
      requiredPackages: [...requiredPackages].sort(),
      diagnostics,
    },
  }
}

function isWithin(root: string, target: string) {
  const relative = path.relative(root, target)
  return (
    relative === '' ||
    (!relative.startsWith('..') && !path.isAbsolute(relative))
  )
}

async function collectInputFiles(
  cwd: string,
  inputs: readonly string[],
  extensions: readonly string[] = TRANSFORMABLE_SOURCE_EXTENSIONS,
) {
  const patterns: string[] = []
  const extensionPattern = `{${extensions.join(',')}}`
  for (const input of inputs.length ? inputs : ['.']) {
    const absolute = path.resolve(cwd, input)
    if (existsSync(absolute) && (await fs.stat(absolute)).isDirectory()) {
      patterns.push(`${input.replaceAll('\\', '/')}/**/*.${extensionPattern}`)
    } else {
      patterns.push(input.replaceAll('\\', '/'))
    }
  }

  const matches = await fg(patterns, {
    absolute: true,
    cwd,
    dot: false,
    followSymbolicLinks: false,
    ignore: [...MIGRATION_GLOB_IGNORES],
    onlyFiles: true,
    unique: true,
  })
  return matches
    .filter((match) =>
      extensions.includes(path.extname(match).slice(1).toLowerCase()),
    )
    .map((match) => path.resolve(match))
    .sort((left, right) => left.localeCompare(right))
}

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function isPrimitiveModule(specifier: string) {
  if (!specifier.startsWith(`${LEGACY_MODULE}/`)) return false
  return PRIMITIVE_SUBPATHS.has(specifier.slice(LEGACY_MODULE.length + 1))
}

function sourceHasLegacyReference(source: string) {
  // Conservative by design: type-reference directives and JSDoc import types
  // live in comments and are not represented as normal module AST nodes.
  // Current primitive entry points such as @saas-ui/react/sidebar are kept.
  if (/@saas-ui\/react(?!\/)/.test(source)) return true
  for (const match of source.matchAll(/['"](@saas-ui\/react\/[^'"]+)['"]/g)) {
    if (!isPrimitiveModule(match[1]!)) return true
  }
  return false
}

function sourceHasPrimitiveReference(source: string) {
  for (const match of source.matchAll(/['"](@saas-ui\/react\/[^'"]+)['"]/g)) {
    if (isPrimitiveModule(match[1]!)) return true
  }
  return false
}

function manifestHasNonDependencyLegacyReference(value: unknown): boolean {
  if (typeof value === 'string') return value.includes(LEGACY_MODULE)
  if (Array.isArray(value)) {
    return value.some(manifestHasNonDependencyLegacyReference)
  }
  if (!value || typeof value !== 'object') return false
  return Object.entries(value).some(
    ([key, child]) =>
      ![
        'dependencies',
        'devDependencies',
        'optionalDependencies',
        'peerDependencies',
        'packageManager',
        'pnpm',
      ].includes(key) &&
      (key.includes(LEGACY_MODULE) ||
        manifestHasNonDependencyLegacyReference(child)),
  )
}

async function collectRemainingLegacyReferences(
  cwd: string,
  plannedFiles: readonly PlannedFile[],
) {
  const planned = new Map(
    plannedFiles.map((file) => [file.absolutePath, file.output]),
  )
  const references: string[] = []
  const primitiveReferences: string[] = []
  for (const absolutePath of await collectInputFiles(
    cwd,
    ['.'],
    LEGACY_REFERENCE_EXTENSIONS,
  )) {
    const source =
      planned.get(absolutePath) ?? (await fs.readFile(absolutePath, 'utf8'))
    const relative = path.relative(cwd, absolutePath).replaceAll(path.sep, '/')
    if (sourceHasLegacyReference(source)) references.push(relative)
    if (sourceHasPrimitiveReference(source)) primitiveReferences.push(relative)
  }

  const manifestPath = path.join(cwd, 'package.json')
  try {
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
    if (manifestHasNonDependencyLegacyReference(manifest)) {
      references.push('package.json (non-dependency reference)')
    }
  } catch {
    // The package adapter reports a precise missing/invalid manifest error.
  }
  return {
    legacyReferences: [...new Set(references)].sort(),
    primitiveReferences: [...new Set(primitiveReferences)].sort(),
  }
}

function makeReport(
  mode: ReactToRegistryMigrationReport['mode'],
  files: PlannedFile[],
  diagnostics: MigrationDiagnostic[],
  packageActions: MigrationPackageAction[] = [],
): ReactToRegistryMigrationReport {
  const requestedItems = [
    ...new Set(files.flatMap((file) => file.report.requestedItems)),
  ].sort()
  const requiredPackages = [
    ...new Set(files.flatMap((file) => file.report.requiredPackages)),
  ].sort()
  return {
    version: REPORT_VERSION,
    migration: 'react-to-registry',
    mode,
    success: !diagnostics.some((entry) => entry.severity === 'error'),
    applied: false,
    filesScanned: files.length,
    filesChanged: files.filter((file) => file.report.changed).length,
    requestedItems,
    requiredPackages,
    packageActions,
    files: files.map((file) => file.report),
    diagnostics,
    rollback: {
      sourceFiles: 'atomic-with-backups',
      installer: 'callback-owned',
      packageManifest: 'atomic-with-rollback',
      limitation:
        'Source and package-manifest edits are rolled back if package or ' +
        'template application rejects. Package-manager lock/install side ' +
        'effects and template installer side effects remain callback-owned.',
    },
  }
}

async function applyMigration(
  cwd: string,
  files: PlannedFile[],
  items: readonly string[],
  packagePlan: MigrationPackagePlan,
  packageAdapter: MigrationPackageAdapter,
  installer?: TemplateInstaller,
) {
  const changed = files.filter((file) => file.report.changed)
  for (const file of changed) {
    const current = await fs.readFile(file.absolutePath, 'utf8')
    if (hash(current) !== hash(file.original)) {
      throw new Error(
        `Migration input changed after planning: ${path.relative(cwd, file.absolutePath)}`,
      )
    }
    const stats = await fs.lstat(file.absolutePath)
    if (stats.isSymbolicLink()) {
      throw new Error(`Refusing to migrate symbolic link: ${file.absolutePath}`)
    }
  }

  const workspace = path.join(
    cwd,
    '.saas-ui',
    `.migrate.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}`,
  )
  const applied: Array<{
    absolutePath: string
    backup: string
  }> = []
  let packageAttempted = false
  await fs.mkdir(path.join(workspace, 'stage'), { recursive: true })
  try {
    for (const [index, file] of changed.entries()) {
      const staged = path.join(workspace, 'stage', String(index))
      await fs.writeFile(staged, file.output, {
        encoding: 'utf8',
        mode: file.mode,
      })
    }
    for (const [index, file] of changed.entries()) {
      const staged = path.join(workspace, 'stage', String(index))
      const backup = path.join(workspace, 'backup', String(index))
      await fs.mkdir(path.dirname(backup), { recursive: true })
      await fs.rename(file.absolutePath, backup)
      try {
        await fs.rename(staged, file.absolutePath)
      } catch (error) {
        await fs.rename(backup, file.absolutePath)
        throw error
      }
      applied.push({ absolutePath: file.absolutePath, backup })
    }

    packageAttempted = true
    await packageAdapter.apply(packagePlan)
    if (items.length && installer) await installer({ cwd, items })
  } catch (error) {
    let rollbackError: unknown
    if (packageAttempted) {
      try {
        await packageAdapter.rollback(packagePlan)
      } catch (caught) {
        rollbackError = caught
      }
    }
    for (const entry of [...applied].reverse()) {
      await fs.rm(entry.absolutePath, { force: true })
      if (existsSync(entry.backup)) {
        await fs.rename(entry.backup, entry.absolutePath)
      }
    }
    if (rollbackError) {
      throw new Error(
        `${error instanceof Error ? error.message : String(error)} ` +
          `Package rollback also failed: ${
            rollbackError instanceof Error
              ? rollbackError.message
              : String(rollbackError)
          }`,
      )
    }
    throw error
  } finally {
    await fs.rm(workspace, { recursive: true, force: true })
  }
}

export async function migrateReactToRegistry(
  options: ReactToRegistryMigrationOptions,
): Promise<ReactToRegistryMigrationReport> {
  const cwd = path.resolve(options.cwd)
  const root = await fs.realpath(cwd)
  const filePaths = await collectInputFiles(cwd, options.inputs ?? [])
  const planningDiagnostics: MigrationDiagnostic[] = []

  if (filePaths.length === 0) {
    planningDiagnostics.push({
      code: 'no-input-files',
      severity: 'error',
      message:
        'No JavaScript, TypeScript, or MDX files matched the migration inputs.',
    })
  }

  const files: PlannedFile[] = []
  for (const absolutePath of filePaths) {
    let realPath: string
    try {
      realPath = await fs.realpath(absolutePath)
    } catch (error) {
      planningDiagnostics.push({
        code: 'input-read-error',
        severity: 'error',
        message: error instanceof Error ? error.message : String(error),
        file: absolutePath,
      })
      continue
    }
    const canonicalInput = path.resolve(root, path.relative(cwd, absolutePath))
    if (!isWithin(root, realPath) || realPath !== canonicalInput) {
      planningDiagnostics.push({
        code: 'unsafe-input-path',
        severity: 'error',
        message: `Migration inputs must be regular files inside ${root}.`,
        file: absolutePath,
      })
      continue
    }

    const original = await fs.readFile(absolutePath, 'utf8')
    const transform =
      path.extname(absolutePath).toLowerCase() === '.mdx'
        ? transformReactToRegistryMdx
        : transformReactToRegistrySource
    const transformed = transform({
      filePath: path.relative(cwd, absolutePath).replaceAll(path.sep, '/'),
      source: original,
      config: options.config,
      registryExports: options.registryExports,
      replaceDefaultRegistryExports: options.replaceDefaultRegistryExports,
    })
    planningDiagnostics.push(...transformed.report.diagnostics)
    files.push({
      absolutePath,
      original,
      output: transformed.output,
      mode: (await fs.stat(absolutePath)).mode,
      report: transformed.report,
    })
  }

  const mode = options.write ? 'write' : 'dry-run'
  const requiredPackages = [
    ...new Set(files.flatMap((file) => file.report.requiredPackages)),
  ].sort()
  const packageAdapter = options.packageAdapter ?? fileMigrationPackageAdapter
  let packagePlan: MigrationPackagePlan | undefined
  try {
    const remaining = await collectRemainingLegacyReferences(cwd, files)
    packagePlan = await packageAdapter.plan({
      cwd,
      requiredPackages,
      removeLegacyPackage: true,
      legacyReferences: remaining.legacyReferences,
      primitiveReferences: remaining.primitiveReferences,
    })
    for (const action of packagePlan.manualActions) {
      planningDiagnostics.push({
        code: 'required-manual-package-action',
        severity: 'error',
        message: `${action.package}: ${action.reason}`,
      })
    }
  } catch (error) {
    planningDiagnostics.push({
      code: 'package-plan-error',
      severity: 'error',
      message: error instanceof Error ? error.message : String(error),
    })
  }

  const report = makeReport(
    mode,
    files,
    planningDiagnostics,
    packagePlan?.actions ?? [],
  )
  if (options.write && report.requestedItems.length > 0 && !options.installer) {
    const diagnostic: MigrationDiagnostic = {
      code: 'missing-installer',
      severity: 'error',
      message:
        'Write mode requires a template installer callback for registry-owned imports.',
    }
    report.diagnostics.push(diagnostic)
    report.success = false
  }
  if (!report.success || !options.write || !packagePlan) return report

  try {
    await applyMigration(
      cwd,
      files,
      report.requestedItems,
      packagePlan,
      packageAdapter,
      options.installer,
    )
    for (const action of report.packageActions) {
      if (action.status === 'planned') action.status = 'applied'
    }
    report.applied = report.filesChanged > 0 || packagePlan.changed
    return report
  } catch (error) {
    const diagnostic: MigrationDiagnostic = {
      code: 'apply-error',
      severity: 'error',
      message: error instanceof Error ? error.message : String(error),
    }
    report.diagnostics.push(diagnostic)
    report.success = false
    report.applied = false
    return report
  }
}

export function formatMigrationReport(report: ReactToRegistryMigrationReport) {
  const lines = [
    `Migration: ${report.migration} (${report.mode})`,
    `Scanned ${report.filesScanned} file(s); ${report.filesChanged} would change.`,
  ]
  if (report.requestedItems.length) {
    lines.push(`Templates: ${report.requestedItems.join(', ')}`)
  }
  if (report.requiredPackages.length) {
    lines.push(`Packages: ${report.requiredPackages.join(', ')}`)
  }
  for (const action of report.packageActions) {
    const packageName = `${action.package}${
      action.specifier ? `@${action.specifier}` : ''
    }`
    lines.push(
      `Package ${action.status}: ${action.action} ${packageName} — ${action.reason}`,
    )
  }
  for (const file of report.files) {
    if (file.changed) {
      lines.push(`- ${file.path}: ${file.migratedBindings} binding(s)`)
    }
  }
  for (const diagnostic of report.diagnostics) {
    const location = diagnostic.file
      ? `${diagnostic.file}${diagnostic.line ? `:${diagnostic.line}:${diagnostic.column ?? 1}` : ''}: `
      : ''
    lines.push(
      `${diagnostic.severity.toUpperCase()} ${diagnostic.code}: ${location}${diagnostic.message}`,
    )
  }
  if (report.mode === 'write' && report.success) {
    lines.push(
      report.applied ? 'Migration applied.' : 'No changes were applied.',
    )
  } else if (report.mode === 'dry-run' && report.success) {
    lines.push('Dry run only; no files or templates were changed.')
  }
  lines.push(`Rollback limitation: ${report.rollback.limitation}`)
  return lines.join('\n')
}
