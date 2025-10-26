import fs from 'node:fs'
import path from 'node:path'
import type { PackageJson } from 'type-fest'

export function getPackageInfo(
  cwd: string = '',
  shouldThrow: boolean = true,
): PackageJson | null {
  const packageJsonPath = path.join(cwd, 'package.json')

  const packageJson = fs.readFileSync(packageJsonPath, 'utf8')

  try {
    return JSON.parse(packageJson) as PackageJson
  } catch (error) {
    if (shouldThrow) {
      throw error
    }
  }

  return null
}
