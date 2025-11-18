import { cosmiconfig } from 'cosmiconfig'
import path from 'node:path'
import { loadConfig } from 'tsconfig-paths'
import { z } from 'zod'

import { detectMonorepo, hasMonorepoAliases } from '#utils/detect-monorepo'
import { highlighter } from '#utils/highlighter'
import { resolveImport } from '#utils/resolve-import'

export const DEFAULT_STYLE = 'default'
export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig('components', {
  searchPlaces: ['components.json'],
})

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    system: z.string().optional().default('chakra'),
    style: z.string().optional().default('default'),
    rsc: z.coerce.boolean().default(false),
    tsx: z.coerce.boolean().default(true),
    registries: z
      .record(
        z.string(),
        z.union([
          z.string(),
          z.object({
            url: z.string(),
            headers: z.record(z.string(), z.string()).optional(),
            params: z.record(z.string(), z.string()).optional(),
          }),
        ]),
      )
      .optional(),
    // theme: z.object({
    //   config: z.string(),
    // }),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      ui: z.string().optional(),
      lib: z.string().optional(),
      hooks: z.string().optional(),
    }),
  })
  .strict()

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    utils: z.string(),
    components: z.string(),
    lib: z.string(),
    hooks: z.string(),
    ui: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  const monorepoInfo = await detectMonorepo(cwd)
  const isMonorepo =
    monorepoInfo.isMonorepo || hasMonorepoAliases(config.aliases)

  const tsConfig = loadConfig(cwd)

  if (tsConfig.resultType === 'failed') {
    throw new Error(
      `Failed to load ${config.tsx ? 'tsconfig' : 'jsconfig'}.json. ${
        tsConfig.message ?? ''
      }`.trim(),
    )
  }

  const resolveAlias = async (alias: string): Promise<string> => {
    if (isMonorepo && /^@[^/]+\/[^/]+/.test(alias)) {
      const match = alias.match(/^@[^/]+\/[^/]+\/(.+)$/)
      if (match && match[1]) {
        const relativePath = match[1]
        return path.resolve(cwd, 'src', relativePath)
      }
      return path.resolve(cwd, 'src')
    }

    const resolved = await resolveImport(alias, tsConfig)
    return resolved ?? path.resolve(cwd, 'src')
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
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
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
