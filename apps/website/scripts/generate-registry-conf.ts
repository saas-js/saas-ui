import { consola } from 'consola'
import { findUpSync } from 'find-up'
import { ensureDirSync } from 'fs-extra'
import { readFileSync, readdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { basename, extname, join, relative } from 'node:path'

function getBaseDirectory() {
  const dir = findUpSync('registry', { type: 'directory' })
  if (!dir) throw new ReferenceError('Could not find registry directory')
  return dir
}

function getWwwOutput() {
  const dir = findUpSync('public', { type: 'directory' })
  if (!dir) throw new ReferenceError('Could not find public directory')
  return dir
}

function getImports(content: string) {
  const imports = new Set<string>()
  const matches = Array.from(content.matchAll(/from ["'](.+)["']/g))
  for (const match of matches) {
    imports.add(match[1])
  }

  return imports
}

function isNpmDependency(dependencies: string[], _import: string) {
  return dependencies.some((dep) => _import.includes(dep))
}

function isFileDependency(_import: string) {
  return _import.startsWith('.') || _import.startsWith('compositions/ui')
}

function isIconDependency(_import: string) {
  // Check for direct icon imports: '#icons/close-icon' or '../icons/close-icon'
  if (_import.includes('/icons/') && _import.endsWith('-icon')) {
    return true
  }
  // Check for icon barrel imports: '../../icons/index.ts' or '../../icons'
  if (_import.includes('/icons') && (_import.endsWith('/index.ts') || _import.endsWith('/icons'))) {
    return true
  }
  return false
}

function extractIconName(_import: string) {
  // Direct import: '#icons/close-icon' or '../icons/close-icon'
  const directMatch = _import.match(/\/icons\/(.+)-icon/)
  if (directMatch) {
    return directMatch[1] + '-icon'
  }
  // Barrel import - return null, we'll handle this separately
  return null
}

function extractIconsFromBarrelImport(content: string, iconImportPath: string): string[] {
  // Find the import statement for the icon barrel
  // Example: import { ChevronRightIcon, CloseIcon } from '../../icons/index.ts'
  const importRegex = new RegExp(
    `import\\s+{([^}]+)}\\s+from\\s+["']${iconImportPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`
  )
  const match = content.match(importRegex)

  if (!match) return []

  // Extract icon names and convert to kebab-case
  const namedImports = match[1].split(',').map(n => n.trim())

  return namedImports
    .filter(name => name.endsWith('Icon'))
    .map(name => {
      // ChevronRightIcon -> chevron-right-icon
      const withoutIcon = name.replace(/Icon$/, '')
      return withoutIcon.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '-icon'
    })
}

function resolveDependency(specifier: string, dependencies: string[]) {
  let result = dependencies.find((dependency) => specifier === dependency)
  if (result) return result

  if (specifier.startsWith('@')) {
    const scopedMatch = specifier.match(/^(@[^/]+\/[^/]+)/)
    if (scopedMatch) {
      result = dependencies.find((dep) => dep === scopedMatch[1])
      if (result) return result
    }
  }

  const matches = Array.from(specifier.matchAll(/(.+?)\//g))
  console.log(matches)
  if (matches.length) result = matches[0][1]
  return result
}

function getDependencies(imports: Set<string>, dependencies: string[], content: string) {
  const fileDependencies = new Set<string>()
  const npmDependencies = new Set<string>()
  const iconDependencies = new Set<string>()

  for (const _import of Array.from(imports)) {
    if (isIconDependency(_import)) {
      const iconName = extractIconName(_import)
      if (iconName) {
        // Direct icon import
        iconDependencies.add(iconName)
      } else {
        // Barrel import - extract named imports from content
        const icons = extractIconsFromBarrelImport(content, _import)
        icons.forEach(icon => iconDependencies.add(icon))
      }
    } else if (isNpmDependency(dependencies, _import)) {
      const resolved = resolveDependency(_import, dependencies)
      npmDependencies.add(resolved!)
    } else if (isFileDependency(_import)) {
      fileDependencies.add(_import)
    }
  }

  return { npmDependencies, fileDependencies, iconDependencies }
}

const setFileExtension = (file: string, ext: string) =>
  basename(file, extname(file)) + ext

const excludedDependencies = ['react', 'react-dom']

const camelCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const getFileName = (file: string) => basename(file, extname(file))

const getComponentName = (file: string) =>
  getFileName(file).split('-').map(camelCase).join('')

const toKebabCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

async function generateIconsRegistry(dir: string) {
  const { icons, iconLibraries } = await import(
    join(dir, 'registry-icons.ts')
  )

  const iconEntries = Object.entries(icons).map(([name, iconSets]) => {
    const kebabName = toKebabCase(name)
    const iconName = `${kebabName}-icon`
    const componentName = `${getComponentName(kebabName)}Icon`

    // Use lucide as default for now
    const defaultIconSet = 'lucide'
    const iconSetName = iconSets[defaultIconSet as keyof typeof iconSets]

    return {
      name: iconName,
      type: 'registry:icon' as const,
      files: [
        {
          path: `icons/${iconName}.tsx`,
          type: 'registry:icon' as const,
        },
      ],
      meta: {
        componentName,
        iconSet: defaultIconSet,
        iconName: iconSetName,
      },
    }
  })

  return iconEntries
}

async function main() {
  const dir = getBaseDirectory()
  const publicDir = getWwwOutput()

  const pkgJson = readFileSync(join(dir, '..', 'package.json'), 'utf-8')

  const dependencies = Object.keys(JSON.parse(pkgJson).dependencies).filter(
    (dep) => !excludedDependencies.includes(dep),
  )

  const srcDir = join(dir, 'default', 'ui')

  const files = readdirSync(srcDir, { encoding: 'utf-8' })

  const result = files.map((file) => {
    const filePath = file.endsWith('.tsx')
      ? join(srcDir, file)
      : join(srcDir, file, `${file}.tsx`)

    const relativePath = relative(join(dir, 'default'), filePath)

    const content = readFileSync(filePath, 'utf-8')
    const { npmDependencies, fileDependencies, iconDependencies } =
      getDependencies(getImports(content), dependencies, content)

    let files: { name: string; path: string }[] = []

    if (file.endsWith('.tsx')) {
      files.push({
        name: file,
        path: relativePath,
      })
    } else {
      const componentFiles = readdirSync(join(srcDir, file), {
        encoding: 'utf-8',
      })

      for (const componentFile of componentFiles) {
        files.push({
          name: componentFile,
          path: relative(
            join(dir, 'default'),
            join(srcDir, file, componentFile),
          ),
        })
      }
    }

    return {
      data: {
        type: 'registry:ui',
        npmDependencies: Array.from(npmDependencies),
        fileDependencies: Array.from(fileDependencies),
        iconDependencies: Array.from(iconDependencies),
        id: getFileName(file),
        files,
        component: getComponentName(file),
      },
    }
  })

  const registryData = result.map(({ data }) => ({
    name: data.id,
    type: 'registry:ui' as const,
    dependencies: data.npmDependencies,
    registryDependencies: [
      ...data.fileDependencies
        .filter((dep) => !dep.startsWith('./'))
        .map((dep) => dep.replace('../', '').replace('/index.ts', '')),
      ...data.iconDependencies,
    ],
    files: data.files.map((file) => ({
      path: file.path,
      type: file.name.includes('stories')
        ? ('registry:story' as const)
        : ('registry:ui' as const),
    })),
  }))

  // Generate UI registry
  const uiContent = `import { RegistryEntry } from '@saas-ui/registry'\n\nexport const ui = ${JSON.stringify(registryData, null, 2)} satisfies RegistryEntry[]`
  await writeFile(join(dir, 'registry-ui.ts'), uiContent)

  // Generate Icons registry
  const iconsRegistry = await generateIconsRegistry(dir)
  const iconsContent = `import { RegistryEntry } from '@saas-ui/registry'\n\nexport const icons = ${JSON.stringify(iconsRegistry, null, 2)} satisfies RegistryEntry[]`
  await writeFile(join(dir, 'registry-icons-generated.ts'), iconsContent)

  // Format registry files with Prettier
  const { exec } = await import('node:child_process')
  const { promisify } = await import('node:util')
  const execAsync = promisify(exec)

  const registryUiPath = join(dir, 'registry-ui.ts')
  const registryIconsPath = join(dir, 'registry-icons-generated.ts')
  try {
    await execAsync(
      `pnpm prettier --write "${registryUiPath}" "${registryIconsPath}"`,
      {
        cwd: join(dir, '..', '..', '..'),
      },
    )
  } catch (err) {
    consola.warn('Failed to format registry files with Prettier', err)
  }

  consola.success('UI and Icons registry configs generated 🎉. Happy coding!')
}

main().catch((err) => {
  consola.error(err)
  process.exit(1)
})
