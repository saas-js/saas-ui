import {
  compilePublicRegistry,
  previewRegistryRoot,
  printRegistrySummary,
  publicRegistryRoot,
  reportRegistryError,
} from './public-registry'

try {
  const artifacts = await compilePublicRegistry({
    outputDir: publicRegistryRoot,
    previewOutputDir: previewRegistryRoot,
  })
  printRegistrySummary(artifacts)
} catch (error) {
  reportRegistryError(error)
}
