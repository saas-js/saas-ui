import type { Config, RawConfig } from '#utils/get-config'
import { rawConfigSchema } from '#utils/get-config'

function compareText(left: string, right: string) {
  return left.localeCompare(right, 'en')
}

export function rawConfigFromConfig(config: Config): RawConfig {
  const { resolvedPaths: _resolvedPaths, ...rawConfig } = config
  return rawConfigSchema.parse(rawConfig)
}

export function withInstalledRegistryItems(
  config: RawConfig | Config,
  requested: readonly string[],
  replaced: readonly string[] = [],
): RawConfig {
  const rawConfig =
    'resolvedPaths' in config ? rawConfigFromConfig(config) : config
  const installed = new Set(rawConfig.installed ?? [])
  for (const name of replaced) installed.delete(name)
  for (const name of requested) installed.add(name)
  return rawConfigSchema.parse({
    ...rawConfig,
    installed: [...installed].sort(compareText),
  })
}

export function serializeComponentsConfig(config: RawConfig) {
  return `${JSON.stringify(config, null, 2)}\n`
}
