import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export interface MonorepoInfo {
  isMonorepo: boolean
  root?: string
  packageName?: string
  type?: 'turborepo' | 'pnpm' | 'yarn' | 'npm'
}

export async function detectMonorepo(cwd: string): Promise<MonorepoInfo> {
  const packageJsonPath = path.join(cwd, 'package.json')

  if (!existsSync(packageJsonPath)) {
    return { isMonorepo: false }
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  const packageName = packageJson.name

  const isWorkspacePackage = packageName && /^@[^/]+\/[^/]+/.test(packageName)

  let currentDir = cwd
  let depth = 0
  const maxDepth = 5

  while (depth < maxDepth) {
    if (existsSync(path.join(currentDir, 'turbo.json'))) {
      return {
        isMonorepo: true,
        root: currentDir,
        packageName,
        type: 'turborepo',
      }
    }

    if (existsSync(path.join(currentDir, 'pnpm-workspace.yaml'))) {
      return {
        isMonorepo: true,
        root: currentDir,
        packageName,
        type: 'pnpm',
      }
    }

    const rootPackageJsonPath = path.join(currentDir, 'package.json')
    if (existsSync(rootPackageJsonPath) && currentDir !== cwd) {
      try {
        const rootPackageJson = JSON.parse(
          readFileSync(rootPackageJsonPath, 'utf8'),
        )
        if (rootPackageJson.workspaces) {
          return {
            isMonorepo: true,
            root: currentDir,
            packageName,
            type: Array.isArray(rootPackageJson.workspaces) ? 'npm' : 'yarn',
          }
        }
      } catch {
        continue
      }
    }

    const parentDir = path.dirname(currentDir)
    if (parentDir === currentDir) break
    currentDir = parentDir
    depth++
  }

  if (isWorkspacePackage) {
    return {
      isMonorepo: true,
      packageName,
    }
  }

  return { isMonorepo: false }
}

export function hasMonorepoAliases(aliases: Record<string, string>): boolean {
  const values = Object.values(aliases)
  return values.some((value) => /^@[^/]+\/[^/]+/.test(value))
}

export function getMonorepoPackagePrefix(
  aliases: Record<string, string>,
): string | null {
  for (const value of Object.values(aliases)) {
    const match = value.match(/^(@[^/]+\/[^/]+)/)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

export function monorepoAliasToPath(
  alias: string,
  packagePrefix: string,
): string {
  const relativePath = alias.replace(packagePrefix, '')

  if (relativePath.startsWith('/')) {
    return `./src${relativePath}`
  }

  return `./src/${relativePath}`
}
