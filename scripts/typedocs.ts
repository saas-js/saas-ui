import { theme } from '@saas-ui/theme'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { join } from 'node:path/posix'
import prettier from 'prettier'
import ts from 'typescript'
import { extractThemeProps } from './extract-theme-props.js'

const includeTypes = [
  'Filter',
  'FilterItem',
  'FilterItems',
  'FilterOperator',
  'FilterOperatorId',
  'FilterType',
  'KanbanItems',
  'FeaturesOptions',
  'Segment',
]

interface ComponentTypeInfo {
  type: string
  defaultValue?: string | boolean | null
  required: boolean
  description?: string
}

interface ComponentTypeProperties {
  [component: string]: ComponentTypeInfo
}

interface TypeSearchOptions {
  shouldIgnoreProperty?: (property: ts.Symbol) => boolean | undefined
}

async function tryPrettier(typeName: string) {
  try {
    const prefix = 'type ONLY_FOR_FORMAT = '
    const prettyType = await prettier.format(prefix + typeName, {
      parser: 'typescript',
      semi: false,
    })
    return prettyType.replace(prefix, '').trim()
  } catch {
    return typeName
  }
}

function formatValue(value: string | undefined) {
  if (!value) return
  // convert "\"column\"", to "column"
  const x = value.replace(/^"(.*)"$/, '$1')
  return x === 'true' ? true : x === 'false' ? false : x
}

function sortByRequiredProperties(props: ComponentTypeProperties) {
  return Object.fromEntries(
    Object.entries(props)
      .sort(([aName], [bName]) => aName.localeCompare(bName))
      .sort(([, a], [, b]) =>
        a.required === b.required ? 0 : a.required ? -1 : 1
      )
  )
}

async function extractPropertiesOfTypeName(
  searchTerm: string | RegExp,
  sourceFile: ts.SourceFile,
  typeChecker: ts.TypeChecker,
  { shouldIgnoreProperty = () => false }: TypeSearchOptions = {}
) {
  const regexSearchTerm =
    typeof searchTerm === 'string' ? `^${searchTerm}$` : searchTerm

  const typeStatements = sourceFile.statements.filter(
    (statement) =>
      (ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement)) &&
      new RegExp(regexSearchTerm).test(statement.name.getText())
  )

  const results: Record<string, ComponentTypeProperties> = {}

  for (const typeStatement of typeStatements) {
    const properties: ComponentTypeProperties = {}
    const type = typeChecker.getTypeAtLocation(typeStatement)

    for (const property of type.getProperties()) {
      if (shouldIgnoreProperty(property)) {
        continue
      }

      const propertyName = property.getName()
      const type = typeChecker.getTypeOfSymbolAtLocation(property, sourceFile)

      const docTags = property.getJsDocTags()

      const defaultValue =
        docTags
          .find((tag) => tag.name === 'default')
          ?.text?.map((doc) => doc.text)
          ?.join('\n') || undefined

      const nonNullableType = type.getNonNullableType()

      const typeName = typeChecker.typeToString(nonNullableType)

      const required = nonNullableType === type && typeName !== 'any'

      const prettyType = await tryPrettier(typeName)

      properties[propertyName] = {
        type: prettyType,
        defaultValue: formatValue(defaultValue),
        required,
        description:
          property
            .getDocumentationComment(typeChecker)
            .map((comment) => comment.text)
            .join('\n') || undefined,
      }
    }

    let typeName = (typeStatement as any).name.getText() as string

    if (
      /Props$/.test(typeName) ||
      /Options$/.test(typeName) ||
      includeTypes.includes(typeName)
    ) {
      typeName = typeName.replace(/Props$/, '')
      results[typeName] = sortByRequiredProperties(properties)
    } else {
      log('Omitting type', `\`${typeName}\``)
    }
  }

  return Object.keys(results).length ? results : null
}

function createTypeSearch(
  tsConfigPath: string,
  typeSearchOptions: TypeSearchOptions = {}
) {
  const { shouldIgnoreProperty } = typeSearchOptions
  const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
  const basePath = path.dirname(tsConfigPath)
  const { fileNames, options } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    basePath
  )

  const program = ts.createProgram(fileNames, options)
  const sourceFiles = program.getSourceFiles()

  return async (
    searchTerm: Parameters<typeof extractPropertiesOfTypeName>[0]
  ) => {
    const results: Record<string, ComponentTypeProperties> = {}
    for (const sourceFile of sourceFiles) {
      const typeInfo = await extractPropertiesOfTypeName(
        searchTerm,
        sourceFile,
        program.getTypeChecker(),
        { shouldIgnoreProperty }
      )
      Object.assign(results, typeInfo)
    }
    return results
  }
}

function getSourceFileName(symbol: ts.Symbol): string | undefined {
  const declarations = symbol.getDeclarations()
  if (!declarations || declarations.length === 0) {
    return undefined
  }
  const sourceFile = declarations[0].getSourceFile()
  return sourceFile ? sourceFile.fileName : undefined
}

/**
 *  ASSUMPTION: All files use a type-only export (and it can't be inline)
 *
 *  @example
 *  export type { ButtonProps } from 'module'
 *
 *  NOT
 *
 *  export { type ButtonProps } from 'module'
 */
function extractTypeExports(code: string) {
  type ExportedType = {
    [typeName: string]: any
  }

  const exported: ExportedType = {}

  const exportedTypeRegex = /export type\s*{([^}]+)}/g
  let match = exportedTypeRegex.exec(code)

  while (match != null) {
    const types = match[1].split(',').map((s) => s.trim())
    types.forEach((type) => {
      const [typeName] = type.split(' ') ?? []
      exported[typeName] = true
    })
    match = exportedTypeRegex.exec(code)
  }

  const exportedTypes = Object.keys(exported).filter(Boolean)

  log({ exportedTypes })

  return exportedTypes
}

function shouldIgnoreProperty(property: ts.Symbol) {
  const sourceFileName = getSourceFileName(property)
  const isExternal = /(styled-system|system|@types\/react)/.test(
    sourceFileName ?? ''
  )
  const isExcludedByName = ['tw'].includes(property.getName())
  return isExternal || isExcludedByName
}

async function extractDirectory(dir: string) {
  const file = join(__dirname, '..', dir, 'index.ts')

  if (!existsSync(file)) return {}

  const content = await readFile(file, 'utf8')
  const searchType = createTypeSearch('tsconfig.json', { shouldIgnoreProperty })

  const promises = await Promise.all(
    extractTypeExports(content)?.map(searchType)
  )

  return promises
    .filter((value) => Object.keys(value).length !== 0)
    .reduce((acc, value) => ({ ...acc, ...value }), {})
}

const packages = [
  'saas-ui-auth',
  'saas-ui-command-bar',
  'saas-ui-charts',
  'saas-ui-forms',
  'saas-ui-file-upload',
  'saas-ui-data-table',
  'saas-ui-date-picker',
  'saas-ui-hooks',
  'saas-ui-hotkeys',
  'saas-ui-modals',
  'saas-ui-nprogress',
  'pro/saas-ui/kanban',
  'pro/saas-ui/onboarding',
  'pro/saas-ui/feature-flags',
]
const collections = ['saas-ui-core', 'pro/saas-ui/react']

const main = async () => {
  //
  const themeProps = extractThemeProps(theme)

  let dirs: string[] = packages.map((pkg) => join('packages', pkg, 'src'))
  for (const pkg of collections) {
    const dir = await readdir(join('packages', pkg, 'src'))
    dirs = dirs.concat(dir.map((dir) => path.join('packages', pkg, 'src', dir)))
  }

  for (const dir of dirs) {
    const typeExports = await extractDirectory(dir)

    const propMap: Record<string, any> = {}

    for (const [name, values] of Object.entries(typeExports)) {
      console.log('name', name)
      propMap[name] = sortByRequiredProperties({
        ...values,
        ...themeProps['Sui' + name],
      })
    }

    const isEmpty = Object.keys(propMap).length === 0

    if (!isEmpty) {
      await mkdir(join('tooling', 'props-docs', 'generated'), {
        recursive: true,
      })

      const basename = path.basename(dir)
      const filename =
        basename === 'src'
          ? path.basename(path.dirname(dir)).replace('saas-ui-', '')
          : basename

      const outPath = join(
        'tooling',
        'props-docs',
        'generated',
        `${filename}.json`
      )

      const formatted = await prettier.format(JSON.stringify(propMap), {
        parser: 'json',
      })

      await writeFile(outPath, formatted, 'utf8')

      log(`Wrote ${outPath}`)
    }
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

function log(...args: any[]) {
  console.log('[props-docs]: ', ...args)
}
