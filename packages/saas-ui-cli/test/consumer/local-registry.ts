import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  createRegistryClient,
  isRegistryUrl,
  type RegistryClient,
} from '../../src/utils/registry/client'

const testDirectory = path.dirname(fileURLToPath(import.meta.url))

export const CONSUMER_TEMPLATE_ROOT = path.join(testDirectory, 'template')
export const REPOSITORY_ROOT = path.resolve(testDirectory, '../../../..')
export const WEBSITE_ROOT = path.join(REPOSITORY_ROOT, 'apps/website')
export const CANONICAL_REGISTRY_ROOT = path.join(WEBSITE_ROOT, 'public/r')

function isWithin(root: string, target: string) {
  const relative = path.relative(root, target)
  return (
    relative === '' ||
    (!relative.startsWith('..') && !path.isAbsolute(relative))
  )
}

/**
 * Read the checked-in public registry through the same client contract as the
 * HTTP transport. No fallback transport is provided: URL references and paths
 * outside public/r fail before a network request could be attempted.
 */
export function createLocalRegistryClient(
  root = CANONICAL_REGISTRY_ROOT,
): RegistryClient {
  const canonicalRoot = path.resolve(root)

  return createRegistryClient(async (resource) => {
    if (isRegistryUrl(resource)) {
      throw new Error(
        `The consumer fixture is offline and cannot load registry URL: ` +
          resource,
      )
    }

    const target = path.resolve(canonicalRoot, resource)
    if (!isWithin(canonicalRoot, target)) {
      throw new Error(`Registry resource escapes public/r: ${resource}`)
    }

    try {
      return JSON.parse(await fs.readFile(target, 'utf8')) as unknown
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error(
          `Canonical registry resource is missing: ${path.relative(
            REPOSITORY_ROOT,
            target,
          )}. Run registry generation before the consumer fixture.`,
        )
      }
      throw error
    }
  })
}
