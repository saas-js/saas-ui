import { createHash, randomUUID } from 'node:crypto'
import {
  lstat,
  mkdir,
  open,
  readFile,
  rename,
  rm,
  unlink,
  writeFile,
} from 'node:fs/promises'
import path from 'node:path'

import {
  type RegistryReleaseManifest,
  verifyRegistryReleaseBundle,
} from './release-bundle'

type CatalogName = 'pro' | 'public'

export interface RegistryReleasePointer {
  catalogs: Record<CatalogName, string>
  kind: 'saas-ui.registry-release-pointer'
  pointerVersion: 1
  releaseDigest: string
}

export interface RegistryReleasePromotionStore {
  publishCatalog(
    name: CatalogName,
    bundleDir: string,
    manifest: RegistryReleaseManifest,
  ): Promise<void>
  publishManifest(
    bundleDir: string,
    manifest: RegistryReleaseManifest,
  ): Promise<void>
  readPointer(): Promise<RegistryReleasePointer | null>
  compareAndSwapPointer(
    expectedReleaseDigest: string | null,
    pointer: RegistryReleasePointer,
  ): Promise<boolean>
}

export interface FileSystemRegistryPromotionStoreOptions {
  controlRoot: string
  proRoot: string
  publicRoot: string
}

function pathsOverlap(left: string, right: string) {
  const relative = path.relative(left, right)
  return (
    relative === '' ||
    (!relative.startsWith('..') && !path.isAbsolute(relative))
  )
}

function sha256(content: Buffer) {
  return createHash('sha256').update(content).digest('hex')
}

async function readPointerFile(pointerPath: string) {
  try {
    return JSON.parse(
      await readFile(pointerPath, 'utf8'),
    ) as RegistryReleasePointer
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }
}

function catalogFiles(name: CatalogName, manifest: RegistryReleaseManifest) {
  const prefix = `${name}/`
  return manifest.files
    .filter((file) => file.path.startsWith(prefix))
    .map((file) => ({ ...file, path: file.path.slice(prefix.length) }))
}

async function verifyPublishedCatalog(
  directory: string,
  name: CatalogName,
  manifest: RegistryReleaseManifest,
) {
  for (const file of catalogFiles(name, manifest)) {
    const target = path.join(directory, file.path)
    const stat = await lstat(target)
    if (!stat.isFile() || stat.isSymbolicLink()) {
      throw new Error(
        `Published ${name} catalog contains an invalid file: ${file.path}`,
      )
    }
    const content = await readFile(target)
    if (content.byteLength !== file.bytes || sha256(content) !== file.sha256) {
      throw new Error(
        `Published ${name} catalog failed verification: ${file.path}`,
      )
    }
  }
}

async function publishImmutableCatalog(
  root: string,
  name: CatalogName,
  bundleDir: string,
  manifest: RegistryReleaseManifest,
) {
  const releasesRoot = path.join(root, 'releases')
  const target = path.join(releasesRoot, manifest.releaseDigest)
  await mkdir(releasesRoot, { recursive: true })
  try {
    const stat = await lstat(target)
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      throw new Error(
        `Immutable ${name} release path is not a directory: ${target}`,
      )
    }
    await verifyPublishedCatalog(target, name, manifest)
    return
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }

  const stage = path.join(releasesRoot, `.stage-${randomUUID()}`)
  await mkdir(stage)
  try {
    for (const file of catalogFiles(name, manifest)) {
      const source = path.join(bundleDir, name, file.path)
      const destination = path.join(stage, file.path)
      await mkdir(path.dirname(destination), { recursive: true })
      await writeFile(destination, await readFile(source))
    }
    await verifyPublishedCatalog(stage, name, manifest)
    try {
      await rename(stage, target)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
      await verifyPublishedCatalog(target, name, manifest)
    }
  } finally {
    await rm(stage, { force: true, recursive: true })
  }
}

export class FileSystemRegistryPromotionStore implements RegistryReleasePromotionStore {
  readonly controlRoot: string
  readonly proRoot: string
  readonly publicRoot: string

  constructor(options: FileSystemRegistryPromotionStoreOptions) {
    this.controlRoot = path.resolve(options.controlRoot)
    this.proRoot = path.resolve(options.proRoot)
    this.publicRoot = path.resolve(options.publicRoot)
    if (
      pathsOverlap(this.proRoot, this.publicRoot) ||
      pathsOverlap(this.publicRoot, this.proRoot) ||
      pathsOverlap(this.controlRoot, this.publicRoot) ||
      pathsOverlap(this.publicRoot, this.controlRoot) ||
      pathsOverlap(this.controlRoot, this.proRoot) ||
      pathsOverlap(this.proRoot, this.controlRoot)
    ) {
      throw new Error(
        'Control, public, and Pro registry promotion roots must be separate and non-overlapping.',
      )
    }
  }

  async publishCatalog(
    name: CatalogName,
    bundleDir: string,
    manifest: RegistryReleaseManifest,
  ) {
    await publishImmutableCatalog(
      name === 'public' ? this.publicRoot : this.proRoot,
      name,
      bundleDir,
      manifest,
    )
  }

  async publishManifest(bundleDir: string, manifest: RegistryReleaseManifest) {
    const releaseRoot = path.join(
      this.controlRoot,
      'releases',
      manifest.releaseDigest,
    )
    const target = path.join(releaseRoot, 'manifest.json')
    await mkdir(releaseRoot, { recursive: true })
    const source = await readFile(path.join(bundleDir, 'manifest.json'))
    try {
      const existing = await readFile(target)
      if (!existing.equals(source)) {
        throw new Error(
          `Immutable registry release manifest differs at ${target}`,
        )
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      const temporary = `${target}.${randomUUID()}.tmp`
      try {
        await writeFile(temporary, source, { flag: 'wx' })
        await rename(temporary, target)
      } finally {
        await rm(temporary, { force: true })
      }
    }
  }

  async readPointer() {
    return await readPointerFile(path.join(this.controlRoot, 'current.json'))
  }

  async compareAndSwapPointer(
    expectedReleaseDigest: string | null,
    pointer: RegistryReleasePointer,
  ) {
    await mkdir(this.controlRoot, { recursive: true })
    const pointerPath = path.join(this.controlRoot, 'current.json')
    const lockPath = path.join(this.controlRoot, '.current.lock')
    const temporary = `${pointerPath}.${randomUUID()}.tmp`
    let lock: Awaited<ReturnType<typeof open>> | undefined
    try {
      try {
        lock = await open(lockPath, 'wx')
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
          throw new Error(
            'Registry release pointer is locked by another promotion.',
          )
        }
        throw error
      }
      const current = await readPointerFile(pointerPath)
      if ((current?.releaseDigest ?? null) !== expectedReleaseDigest) {
        return false
      }
      await writeFile(temporary, `${JSON.stringify(pointer, null, 2)}\n`, {
        flag: 'wx',
      })
      await rename(temporary, pointerPath)
      return true
    } finally {
      if (lock) {
        await lock.close()
        await unlink(lockPath).catch((error: NodeJS.ErrnoException) => {
          if (error.code !== 'ENOENT') throw error
        })
      }
      await rm(temporary, { force: true })
    }
  }
}

export async function promoteRegistryRelease(options: {
  bundleDir: string
  expectedReleaseDigest: string | null
  store: RegistryReleasePromotionStore
}) {
  const manifest = await verifyRegistryReleaseBundle(options.bundleDir)
  const pointer: RegistryReleasePointer = {
    catalogs: {
      pro: manifest.catalogs.pro.digest,
      public: manifest.catalogs.public.digest,
    },
    kind: 'saas-ui.registry-release-pointer',
    pointerVersion: 1,
    releaseDigest: manifest.releaseDigest,
  }

  const publications = await Promise.allSettled([
    options.store.publishCatalog('public', options.bundleDir, manifest),
    options.store.publishCatalog('pro', options.bundleDir, manifest),
  ])
  const failures = publications.flatMap((result) =>
    result.status === 'rejected' ? [result.reason] : [],
  )
  if (failures.length === 1) throw failures[0]
  if (failures.length > 1) {
    throw new AggregateError(
      failures,
      'Public and Pro catalog publication failed.',
    )
  }
  await options.store.publishManifest(options.bundleDir, manifest)
  const promoted = await options.store.compareAndSwapPointer(
    options.expectedReleaseDigest,
    pointer,
  )
  if (!promoted) {
    const current = await options.store.readPointer()
    throw new Error(
      `Registry release pointer changed before promotion (expected ${options.expectedReleaseDigest ?? 'none'}, found ${current?.releaseDigest ?? 'none'}).`,
    )
  }
  return pointer
}
