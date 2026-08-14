import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { verifyBuiltCliProductionContract } from './retirement-preflight'

export const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
)

export async function verifyCliPrepublishContract(root = repositoryRoot) {
  return await verifyBuiltCliProductionContract(root)
}

function isDirectExecution() {
  const script = process.argv[1]
  return Boolean(
    script && pathToFileURL(path.resolve(script)).href === import.meta.url,
  )
}

if (isDirectExecution()) {
  try {
    const buildInfo = await verifyCliPrepublishContract()
    console.log(
      `CLI prepublish contract passed for ${buildInfo.cliVersion} with preset ${buildInfo.presetVersion}.`,
    )
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
