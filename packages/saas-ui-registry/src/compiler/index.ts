import {
  type EmitRegistryInput,
  type EmitRegistryOptions,
  createRegistryArtifacts,
  publishRegistryArtifacts,
} from './emit.js'
import type { RegistryItemConfig } from './model.js'
import { assertRegistryValid } from './validate.js'

export * from './analyze.js'
export * from './discover.js'
export * from './emit.js'
export * from './graph.js'
export * from './model.js'
export * from './validate.js'

/**
 * Type an authored component.config.ts without making it executable input to
 * the compiler. Discovery still reads the returned object statically.
 */
export function defineRegistryItem(
  config: RegistryItemConfig,
): RegistryItemConfig {
  return config
}

/**
 * Build and validate the complete artifact set before allowing filesystem
 * publication. The regular emitter remains available for pure/staged usage.
 */
export async function emitValidatedRegistryArtifacts(
  input: EmitRegistryInput,
  options: EmitRegistryOptions = {},
) {
  const artifacts = createRegistryArtifacts(input, options)
  assertRegistryValid(artifacts.validationReport)

  if (!options.outputDir) {
    return artifacts
  }

  return publishRegistryArtifacts(artifacts, options)
}
