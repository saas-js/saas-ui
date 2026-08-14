import { existsSync } from 'node:fs'
import path from 'node:path'

import { detectMonorepo } from '#utils/detect-monorepo'
import { getConfig } from '#utils/get-config'

export async function resolveRegistryCommandCwd(input: string) {
  const cwd = path.resolve(input)
  if (!existsSync(cwd)) throw new Error(`The path ${cwd} does not exist.`)
  if (existsSync(path.join(cwd, 'components.json'))) return cwd

  const monorepo = await detectMonorepo(cwd)
  if (!monorepo.isMonorepo) return cwd
  const candidates = [
    path.join(cwd, 'packages/ui'),
    ...(monorepo.root ? [path.join(monorepo.root, 'packages/ui')] : []),
  ]
  return (
    [...new Set(candidates)].find((candidate) =>
      existsSync(path.join(candidate, 'components.json')),
    ) ?? cwd
  )
}

export async function resolveRegistryCommandConfig(input: string) {
  const cwd = await resolveRegistryCommandCwd(input)
  const config = await getConfig(cwd)
  if (!config) throw new Error('Configuration is missing. Run init first.')
  return config
}
