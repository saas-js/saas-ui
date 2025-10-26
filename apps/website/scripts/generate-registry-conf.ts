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

function getDependencies(imports: Set<string>, dependencies: string[]) {
  const fileDependencies = new Set<string>()
  const npmDependencies = new Set<string>()

  for (const _import of Array.from(imports)) {
    if (isNpmDependency(dependencies, _import)) {
      const resolved = resolveDependency(_import, dependencies)
      npmDependencies.add(resolved!)
    } else if (isFileDependency(_import)) {
      fileDependencies.add(_import)
    }
  }

  return { npmDependencies, fileDependencies }
}

const setFileExtension = (file: string, ext: string) =>
  basename(file, extname(file)) + ext

const excludedDependencies = ['react', 'react-dom']

const camelCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const getFileName = (file: string) => basename(file, extname(file))

const getComponentName = (file: string) =>
  getFileName(file).split('-').map(camelCase).join('')

async function main() {
  const dir = getBaseDirectory()
  const publicDir = getWwwOutput()

  const pkgJson = readFileSync(join(dir, '..', 'package.json'), 'utf-8')

  const dependencies = Object.keys(JSON.parse(pkgJson).dependencies).filter(
    (dep) => !excludedDependencies.includes(dep),
  )

  const srcDir = join(dir, 'chakra', 'ui')

  const files = readdirSync(srcDir, { encoding: 'utf-8' })

  const result = files.map((file) => {
    const filePath = file.endsWith('.tsx')
      ? join(srcDir, file)
      : join(srcDir, `${file}/${file}.tsx`)

    const relativePath = relative(join(dir, 'chakra'), filePath)

    const content = readFileSync(filePath, 'utf-8')
    const { npmDependencies, fileDependencies } = getDependencies(
      getImports(content),
      dependencies,
    )

    const files = [
      {
        name: file,
        path: relativePath,
      },
    ]

    if (!file.endsWith('.tsx')) {
      files.push({
        name: `${file}/index.ts`,
        path: join('ui', file, 'index.ts'),
      })
    }

    return {
      data: {
        type: 'registry:ui',
        npmDependencies: Array.from(npmDependencies),
        fileDependencies: Array.from(fileDependencies),
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
    registryDependencies: data.fileDependencies.map((dep) =>
      dep.replace('../', '').replace('/index.ts', ''),
    ),
    files: data.files.map((file) => ({
      path: file.path,
      type: file.name.includes('stories')
        ? ('registry:stories' as const)
        : ('registry:ui' as const),
    })),
  }))

  const content = `import { RegistryEntry } from '@saas-ui/registry'\n\nexport const ui = ${JSON.stringify(registryData, null, 2)} satisfies RegistryEntry[]`
  await writeFile(join(dir, 'registry-ui.ts'), content)

  // Format registry-ui.ts with Prettier
  const { exec } = await import('node:child_process')
  const { promisify } = await import('node:util')
  const execAsync = promisify(exec)

  const registryUiPath = join(dir, 'registry-ui.ts')
  try {
    await execAsync(`pnpm prettier --write "${registryUiPath}"`, {
      cwd: join(dir, '..', '..', '..'),
    })
  } catch (err) {
    consola.warn('Failed to format registry-ui.ts with Prettier', err)
  }

  consola.success('UI registry config generated 🎉. Happy coding!')
}

main().catch((err) => {
  consola.error(err)
  process.exit(1)
})
