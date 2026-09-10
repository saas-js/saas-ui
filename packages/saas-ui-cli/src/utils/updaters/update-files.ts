import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'

import type { Config } from '#utils/get-config'
import { resolveRegistryFileTarget } from '#utils/install-plan'
import type { RegistryItem } from '#utils/registry/schema'
import { transform } from '#utils/transformers'
import { transformImport } from '#utils/transformers/transform-import'
import { transformRsc } from '#utils/transformers/transform-rsc'

/** @deprecated Registry files should be written through create/applyInstallPlan. */
export function resolveTargetDir(
  _projectInfo: unknown,
  config: Config,
  target: string,
) {
  const marker = '__target__.tsx'
  const resolved = resolveRegistryFileTarget(
    {
      path: marker,
      target: target.endsWith('/') ? `${target}${marker}` : target,
      type: 'registry:component',
    },
    config,
  )
  return target.endsWith('/') ? path.dirname(resolved) : resolved
}

/**
 * Compatibility adapter. New installations use the lock-aware install plan so
 * dependency and file changes are committed together.
 */
export async function updateFiles(
  files: RegistryItem['files'],
  config: Config,
  options: {
    overwrite?: boolean
    force?: boolean
    silent?: boolean
  } = {},
) {
  const planned = []
  const collisions = new Map<string, string>()
  const conflicts: string[] = []

  for (const file of files ?? []) {
    if (file.content === undefined) continue
    const target = resolveRegistryFileTarget(file, config)
    const previous = collisions.get(target)
    if (previous) {
      conflicts.push(`${previous} and ${file.path} both target ${target}`)
      continue
    }
    collisions.set(target, file.path)
    if (existsSync(target) && !options.overwrite && !options.force) {
      conflicts.push(
        `${path.relative(config.resolvedPaths.cwd, target)} exists`,
      )
      continue
    }
    planned.push({
      target,
      content: await transform(
        {
          filename: file.path,
          raw: file.content,
          config,
          transformJsx: !config.tsx,
        },
        [transformImport, transformRsc],
      ),
    })
  }

  if (conflicts.length) {
    throw new Error(
      `File conflicts:\n${conflicts.map((value) => `- ${value}`).join('\n')}`,
    )
  }
  for (const file of planned) {
    await fs.mkdir(path.dirname(file.target), { recursive: true })
    await fs.writeFile(file.target, file.content, 'utf8')
  }
}
