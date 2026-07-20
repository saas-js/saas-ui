import { REGISTRY_SCHEMA_VERSION } from '@saas-ui/registry/schema'
import { createHash, randomUUID } from 'node:crypto'
import {
  lstat,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { repositoryRoot } from './public-registry'

export interface RegistryReleaseBundleOptions {
  outputDir: string
  publicPreviewDir: string
  publicRegistryDir: string
}

interface ReleaseFile {
  bytes: number
  path: string
  sha256: string
}

interface ReleaseCatalog {
  digest: string
  index: string
  items: number
}

export interface RegistryReleaseManifest {
  catalogs: {
    public: ReleaseCatalog
  }
  files: ReleaseFile[]
  kind: 'saas-ui.registry-release'
  manifestVersion: 1
  releaseDigest: string
  schemaVersion: typeof REGISTRY_SCHEMA_VERSION
}

type ManifestWithoutDigest = Omit<RegistryReleaseManifest, 'releaseDigest'>

const manifestFileName = 'manifest.json'
const releaseRoots = ['public/__registry__/', 'public/r/'] as const

function compareStrings(left: string, right: string) {
  return left < right ? -1 : left > right ? 1 : 0
}

function sha256(content: string | Buffer) {
  return createHash('sha256').update(content).digest('hex')
}

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(',')}]`
  }
  if (value && typeof value === 'object') {
    return `{${Object.entries(value)
      .sort(([left], [right]) => compareStrings(left, right))
      .map(([key, entry]) => `${JSON.stringify(key)}:${canonicalJson(entry)}`)
      .join(',')}}`
  }
  return JSON.stringify(value)
}

function validateRelativePath(relativePath: string) {
  const segments = relativePath.split('/')
  if (
    !relativePath ||
    relativePath.includes('\\') ||
    relativePath.includes('\0') ||
    path.posix.isAbsolute(relativePath) ||
    segments.some((segment) => !segment || segment === '.' || segment === '..')
  ) {
    throw new Error(`Invalid registry release path: ${relativePath}`)
  }
}

async function listFiles(directory: string, prefix = ''): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries.sort((left, right) =>
    compareStrings(left.name, right.name),
  )) {
    const relativePath = path.posix.join(prefix, entry.name)
    validateRelativePath(relativePath)
    const absolutePath = path.join(directory, entry.name)
    const stat = await lstat(absolutePath)

    if (stat.isSymbolicLink()) {
      throw new Error(
        `Registry release inputs must not contain symlinks: ${absolutePath}`,
      )
    }
    if (stat.isDirectory()) {
      files.push(...(await listFiles(absolutePath, relativePath)))
    } else if (stat.isFile()) {
      files.push(relativePath)
    } else {
      throw new Error(`Unsupported registry release input: ${absolutePath}`)
    }
  }

  return files
}

function catalogDigest(files: readonly ReleaseFile[]) {
  return sha256(
    files
      .map((file) => `${file.path}\0${file.bytes}\0${file.sha256}\n`)
      .join(''),
  )
}

function validateUniquePaths(files: readonly ReleaseFile[]) {
  const paths = new Set<string>()
  const foldedPaths = new Set<string>()

  for (const file of files) {
    validateRelativePath(file.path)
    const foldedPath = file.path.toLowerCase()
    if (paths.has(file.path) || foldedPaths.has(foldedPath)) {
      throw new Error(`Duplicate registry release path: ${file.path}`)
    }
    paths.add(file.path)
    foldedPaths.add(foldedPath)
  }
}

function validateReleaseLayout(files: readonly ReleaseFile[]) {
  const populatedRoots = new Set<string>()

  for (const file of files) {
    const root = releaseRoots.find((candidate) =>
      file.path.startsWith(candidate),
    )
    if (!root) {
      throw new Error(
        `Registry release file is outside an allowed root: ${file.path}`,
      )
    }
    populatedRoots.add(root)
  }

  for (const root of releaseRoots) {
    if (!populatedRoots.has(root)) {
      throw new Error(`Registry release root is empty or missing: ${root}`)
    }
  }
}

async function stageDirectory(
  sourceDir: string,
  stageDir: string,
  destination: string,
) {
  const files: ReleaseFile[] = []

  for (const relativePath of await listFiles(sourceDir)) {
    const sourcePath = path.join(sourceDir, relativePath)
    const releasePath = path.posix.join(destination, relativePath)
    const targetPath = path.join(stageDir, releasePath)
    const content = await readFile(sourcePath)
    await mkdir(path.dirname(targetPath), { recursive: true })
    await writeFile(targetPath, content)
    files.push({
      bytes: content.byteLength,
      path: releasePath,
      sha256: sha256(content),
    })
  }

  return files
}

async function readItemCount(indexPath: string) {
  const index = JSON.parse(await readFile(indexPath, 'utf8')) as unknown
  if (!Array.isArray(index)) {
    throw new Error(`Registry index must be an array: ${indexPath}`)
  }
  return index.length
}

function releaseDigest(manifest: ManifestWithoutDigest) {
  return sha256(canonicalJson(manifest))
}

function assertManifest(
  value: unknown,
): asserts value is RegistryReleaseManifest {
  const manifest = value as Partial<RegistryReleaseManifest> | null
  if (
    !manifest ||
    manifest.kind !== 'saas-ui.registry-release' ||
    manifest.manifestVersion !== 1 ||
    manifest.schemaVersion !== REGISTRY_SCHEMA_VERSION ||
    !Array.isArray(manifest.files) ||
    !manifest.catalogs?.public ||
    typeof manifest.releaseDigest !== 'string'
  ) {
    throw new Error('Invalid registry release manifest')
  }
}

export async function verifyRegistryReleaseBundle(bundleDir: string) {
  const resolvedBundleDir = path.resolve(bundleDir)
  const manifestPath = path.join(resolvedBundleDir, manifestFileName)
  const parsed = JSON.parse(await readFile(manifestPath, 'utf8')) as unknown
  assertManifest(parsed)
  const manifest = parsed

  const actualPaths = (await listFiles(resolvedBundleDir)).filter(
    (file) => file !== manifestFileName,
  )
  const declaredPaths = manifest.files.map((file) => file.path)
  validateUniquePaths(manifest.files)
  validateReleaseLayout(manifest.files)

  if (JSON.stringify(actualPaths) !== JSON.stringify(declaredPaths)) {
    throw new Error('Registry release file list does not match the manifest')
  }

  const actualFiles: ReleaseFile[] = []
  for (const file of manifest.files) {
    const content = await readFile(path.join(resolvedBundleDir, file.path))
    const actual = {
      bytes: content.byteLength,
      path: file.path,
      sha256: sha256(content),
    }
    if (actual.bytes !== file.bytes || actual.sha256 !== file.sha256) {
      throw new Error(`Registry release file failed verification: ${file.path}`)
    }
    actualFiles.push(actual)
  }

  for (const name of ['public'] as const) {
    const catalog = manifest.catalogs[name]
    const catalogFiles = actualFiles.filter((file) =>
      file.path.startsWith(`${name}/`),
    )
    if (catalog.index !== `${name}/r/index.json`) {
      throw new Error(`Invalid ${name} registry index path`)
    }
    if (catalog.digest !== catalogDigest(catalogFiles)) {
      throw new Error(`${name} registry catalog digest does not match`)
    }
    const items = await readItemCount(
      path.join(resolvedBundleDir, catalog.index),
    )
    if (catalog.items !== items) {
      throw new Error(`${name} registry item count does not match`)
    }
  }

  const { releaseDigest: declaredDigest, ...manifestWithoutDigest } = manifest
  if (declaredDigest !== releaseDigest(manifestWithoutDigest)) {
    throw new Error('Registry release digest does not match')
  }

  return manifest
}

export interface PublishDirectoryOperations {
  mkdir(
    target: string,
    options: { recursive: true },
  ): Promise<string | undefined>
  rename(source: string, destination: string): Promise<void>
  rm(target: string, options: { force: true; recursive: true }): Promise<void>
}

const defaultPublishDirectoryOperations: PublishDirectoryOperations = {
  mkdir,
  rename,
  rm,
}

export async function publishStagedDirectory(
  stageDir: string,
  outputDir: string,
  operations = defaultPublishDirectoryOperations,
  backupId = randomUUID(),
) {
  const backupDir = `${outputDir}.backup-${backupId}`
  let hasBackup = false

  try {
    await operations.mkdir(path.dirname(outputDir), { recursive: true })
    try {
      await operations.rename(outputDir, backupDir)
      hasBackup = true
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
    await operations.rename(stageDir, outputDir)
    if (hasBackup) {
      await operations.rm(backupDir, { force: true, recursive: true })
      hasBackup = false
    }
  } catch (publishError) {
    await operations.rm(outputDir, { force: true, recursive: true })
    if (hasBackup) {
      try {
        await operations.rename(backupDir, outputDir)
        hasBackup = false
      } catch (restoreError) {
        throw new AggregateError(
          [publishError, restoreError],
          `Registry release publish and rollback failed; backup preserved at ${backupDir}`,
        )
      }
    }
    throw publishError
  } finally {
    await operations.rm(stageDir, { force: true, recursive: true })
    if (!hasBackup) {
      await operations.rm(backupDir, { force: true, recursive: true })
    }
  }
}

export async function createRegistryReleaseBundle(
  options: RegistryReleaseBundleOptions,
): Promise<RegistryReleaseManifest> {
  const outputDir = path.resolve(options.outputDir)
  const stageDir = `${outputDir}.stage-${randomUUID()}`

  await mkdir(stageDir, { recursive: true })

  try {
    const staged = await Promise.allSettled([
      stageDirectory(options.publicRegistryDir, stageDir, 'public/r'),
      stageDirectory(options.publicPreviewDir, stageDir, 'public/__registry__'),
    ])
    const failures = staged.filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected',
    )
    if (failures.length === 1) throw failures[0]!.reason
    if (failures.length > 1) {
      throw new AggregateError(
        failures.map((failure) => failure.reason),
        'Multiple registry release inputs failed to stage.',
      )
    }
    const [publicRegistry, publicPreview] = staged.map(
      (result) => (result as PromiseFulfilledResult<ReleaseFile[]>).value,
    )
    const files = [...publicRegistry, ...publicPreview].sort((left, right) =>
      compareStrings(left.path, right.path),
    )
    validateUniquePaths(files)
    validateReleaseLayout(files)

    const manifestWithoutDigest: ManifestWithoutDigest = {
      catalogs: {
        public: {
          digest: catalogDigest(
            files.filter((file) => file.path.startsWith('public/')),
          ),
          index: 'public/r/index.json',
          items: await readItemCount(
            path.join(stageDir, 'public', 'r', 'index.json'),
          ),
        },
      },
      files,
      kind: 'saas-ui.registry-release',
      manifestVersion: 1,
      schemaVersion: REGISTRY_SCHEMA_VERSION,
    }
    const manifest: RegistryReleaseManifest = {
      ...manifestWithoutDigest,
      releaseDigest: releaseDigest(manifestWithoutDigest),
    }

    await writeFile(
      path.join(stageDir, manifestFileName),
      `${JSON.stringify(manifest, null, 2)}\n`,
      'utf8',
    )
    await verifyRegistryReleaseBundle(stageDir)
    await publishStagedDirectory(stageDir, outputDir)
    return manifest
  } catch (error) {
    await rm(stageDir, { force: true, recursive: true })
    throw error
  }
}

async function main() {
  const manifest = await createRegistryReleaseBundle({
    outputDir: path.join(repositoryRoot, '.artifacts', 'registry-release'),
    publicPreviewDir: path.join(
      repositoryRoot,
      'apps',
      'website',
      '__registry__',
    ),
    publicRegistryDir: path.join(
      repositoryRoot,
      'apps',
      'website',
      'public',
      'r',
    ),
  })
  console.log(
    `Verified registry release candidate ${manifest.releaseDigest} ` +
      `(${manifest.catalogs.public.items} public items).`,
  )
}

const entryPath = process.argv[1]
if (
  entryPath &&
  import.meta.url === pathToFileURL(path.resolve(entryPath)).href
) {
  await main()
}
