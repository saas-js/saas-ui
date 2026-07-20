import {
  type EmitRegistryOptions,
  type RegistryArtifacts,
  RegistryValidationError,
  analyzeItemFiles,
  createEmitRegistryInput,
  createIconItemMetadata,
  discoverRegistryItems,
  emitValidatedRegistryArtifacts,
  resolveDependencyGraph,
  validateRegistry,
} from '@saas-ui/registry/compiler'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  iconLibraries,
  icons,
} from '../../apps/website/registry/registry-icons'
import { version as chakraPresetVersion } from '../../packages/saas-ui-chakra-preset/package.json'
import { presetRecipeKeys } from '@saas-ui/chakra-preset/recipe-keys'

export const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
)
export const websiteRoot = path.join(repositoryRoot, 'apps', 'website')
export const publicRegistryRoot = path.join(websiteRoot, 'public', 'r')
export const previewRegistryRoot = path.join(websiteRoot, '__registry__')
export const publicRegistryVersion = chakraPresetVersion
export const chakraPresetManifestPath = path.join(
  repositoryRoot,
  'packages',
  'saas-ui-chakra-preset',
  'package.json',
)

export const registryWatchInputs = [
  path.join(websiteRoot, 'registry', 'default'),
  path.join(repositoryRoot, 'packages', 'saas-ui-chakra-preset', 'src'),
  path.join(repositoryRoot, 'packages', 'saas-ui-registry', 'src'),
  path.join(repositoryRoot, 'tooling', 'registry'),
] as const
export const registryWatchFiles = [
  path.join(websiteRoot, 'registry', 'registry-icons.ts'),
  chakraPresetManifestPath,
] as const

export interface CompilePublicRegistryOptions {
  outputDir?: string
  previewOutputDir?: string
}

export async function compilePublicRegistry(
  options: CompilePublicRegistryOptions = {},
): Promise<RegistryArtifacts> {
  const sourceRoot = path.join(websiteRoot, 'registry', 'default')
  const discovery = await discoverRegistryItems({
    sourceRoots: [{ path: sourceRoot, version: publicRegistryVersion }],
  })
  const analysis = await analyzeItemFiles(discovery, {
    aliases: {
      '@': websiteRoot,
      '#components': path.join(websiteRoot, 'components'),
      '#hooks': path.join(websiteRoot, 'hooks'),
      '#lib': path.join(websiteRoot, 'lib'),
      '#theme': path.join(websiteRoot, 'theme'),
      '#utils': path.join(websiteRoot, 'utils'),
    },
  })
  const graph = resolveDependencyGraph(analysis, {
    externalPackages: ['react', 'react-dom'],
  })
  const validation = validateRegistry(graph, { presetRecipeKeys })
  const input = createEmitRegistryInput(graph, {
    name: 'saas-ui',
    homepage: 'https://saas-ui.dev',
    diagnostics: validation.diagnostics,
    iconLibraries,
    iconMetadata: icons,
    iconItemMetadata: createIconItemMetadata(icons),
  })
  const emitOptions: EmitRegistryOptions = {}

  if (options.outputDir) emitOptions.outputDir = options.outputDir
  if (options.previewOutputDir) {
    emitOptions.previewOutputDir = options.previewOutputDir
  }

  return emitValidatedRegistryArtifacts(input, emitOptions)
}

export function printRegistrySummary(
  artifacts: RegistryArtifacts,
  verb = 'Generated',
) {
  const { errors, infos, items, warnings } = artifacts.validationReport
  console.log(
    `${verb} ${artifacts.files.length} registry artifacts for ${items} items.`,
  )
  if (errors || warnings) {
    console.warn(
      `Registry diagnostics: ${errors} error(s), ${warnings} warning(s), ${infos} info message(s).`,
    )
  }
}

export function reportRegistryError(error: unknown) {
  if (!(error instanceof RegistryValidationError)) throw error

  console.error(error.message)
  process.exitCode = 1
}
