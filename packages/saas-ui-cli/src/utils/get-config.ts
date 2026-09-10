import {
  type ComponentsRegistryConfig,
  componentsConfigSchema,
} from '@saas-ui/registry/schema'
import { cosmiconfig } from 'cosmiconfig'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

import { detectMonorepo, hasMonorepoAliases } from '#utils/detect-monorepo'
import { highlighter } from '#utils/highlighter'
import { loadProjectEnv } from '#utils/load-project-env'

import {
  type EffectiveTsConfig,
  loadEffectiveTsConfig,
  resolveEffectiveAlias,
} from './effective-tsconfig'

export const DEFAULT_STYLE = 'default'
export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'

export type RegistryConfig = ComponentsRegistryConfig

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig('components', {
  searchPlaces: ['components.json'],
})

export const rawConfigSchema = componentsConfigSchema

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    utils: z.string(),
    components: z.string(),
    lib: z.string(),
    hooks: z.string(),
    ui: z.string(),
    icons: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  loadProjectEnv(cwd)
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(
  cwd: string,
  config: RawConfig,
  effectiveConfig?: EffectiveTsConfig,
) {
  const monorepoInfo = await detectMonorepo(cwd)
  const isMonorepo =
    monorepoInfo.isMonorepo || hasMonorepoAliases(config.aliases)

  const tsConfig =
    effectiveConfig ??
    (await loadEffectiveTsConfig(
      cwd,
      config.tsx ? 'tsconfig.json' : 'jsconfig.json',
    ))

  const resolveAlias = async (alias: string): Promise<string> => {
    if (isMonorepo && /^@[^/]+\/[^/]+/.test(alias)) {
      const match = alias.match(/^@[^/]+\/[^/]+\/(.+)$/)
      if (match && match[1]) {
        const relativePath = match[1]
        return path.resolve(cwd, 'src', relativePath)
      }
      return path.resolve(cwd, 'src')
    }

    const resolved = resolveEffectiveAlias(alias, tsConfig)
    if (resolved) {
      return resolved
    }

    // A missing path alias should not prevent init from constructing a plan.
    // Init persists the alias after the install plan has been validated. This
    // fallback also makes the target deterministic for fresh React projects.
    const hasSrcDir = existsSync(path.resolve(cwd, 'src'))
    const aliasPath = alias
      .replace(/^@\//, '')
      .replace(/^#/, '')
      .replace(/^~\//, '')

    return path.resolve(cwd, hasSrcDir ? 'src' : '', aliasPath)
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      cwd,
      utils: await resolveAlias(config.aliases['utils']),
      components: await resolveAlias(config.aliases['components']),
      ui: config.aliases['ui']
        ? await resolveAlias(config.aliases['ui'])
        : path.resolve(await resolveAlias(config.aliases['components']), 'ui'),
      lib: config.aliases['lib']
        ? await resolveAlias(config.aliases['lib'])
        : path.resolve(await resolveAlias(config.aliases['utils']), '..'),
      hooks: config.aliases['hooks']
        ? await resolveAlias(config.aliases['hooks'])
        : path.resolve(
            await resolveAlias(config.aliases['components']),
            '..',
            'hooks',
          ),
      icons: config.aliases['icons']
        ? await resolveAlias(config.aliases['icons'])
        : path.resolve(
            await resolveAlias(config.aliases['components']),
            'icons',
          ),
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    explorer.clearCaches()
    const configResult = await explorer.search(cwd)

    if (!configResult) {
      return null
    }

    return rawConfigSchema.parse(configResult.config)
  } catch (error) {
    const componentPath = `${cwd}/components.json`
    throw new Error(
      `Invalid configuration found in ${highlighter.info(componentPath)}.`,
    )
  }
}
