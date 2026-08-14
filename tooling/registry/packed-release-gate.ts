import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
  lstat,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rm,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import { gunzip } from 'node:zlib'

import { NPM_REGISTRY_ORIGIN } from './published-version-gate'
import {
  type CliBuildInfo,
  MIGRATION_URL,
  verifyCliBuildInfo,
} from './retirement-preflight'

const execFileAsync = promisify(execFile)
const gunzipAsync = promisify(gunzip)

const PACKAGE_SPECS = [
  {
    buildRoot: 'lib',
    manifest: 'packages/saas-ui-cli/package.json',
    name: '@saas-ui/cli',
    required: [
      'README.md',
      'package.json',
      'lib/bash-complete.js',
      'lib/build-info.json',
      'lib/cli.js',
    ],
  },
  {
    buildRoot: 'dist',
    manifest: 'packages/saas-ui-chakra-preset/package.json',
    name: '@saas-ui/chakra-preset',
    required: [
      'README.md',
      'package.json',
      'dist/colors.d.ts',
      'dist/colors.js',
      'dist/index.d.ts',
      'dist/index.js',
    ],
  },
  {
    buildRoot: 'dist',
    manifest: 'packages/saas-ui-react/package.json',
    name: '@saas-ui/react',
    required: [
      'README.md',
      'package.json',
      'dist/index.d.ts',
      'dist/index.js',
    ],
  },
] as const

const MAX_UNPACKED_BYTES = 128 * 1024 * 1024
const MAX_PACKED_BYTES = 32 * 1024 * 1024
const TAR_BLOCK_BYTES = 512

interface PackageManifest {
  dependencies?: Record<string, string>
  name?: string
  version?: string
  [key: string]: unknown
}

interface PackageSpec {
  buildRoot: string
  manifest: string
  name: string
  required: readonly string[]
}

export interface PackedReleaseArtifact {
  archive: string
  files: Map<string, Buffer>
  name: string
  version: string
}

export interface PackedReleaseGateReport {
  artifacts: Array<{
    files: number
    name: string
    version: string
  }>
  publication: Array<{
    name: string
    state: 'identical' | 'unpublished'
    version: string
  }>
  stage: 'packed-artifacts-ready-for-publication'
}

export interface PackedReleaseGateOptions {
  makeTemporaryRoot?: () => Promise<string>
  pack?: (
    packageName: string,
    destination: string,
    repositoryRoot: string,
  ) => Promise<string>
  publishedFiles?: (
    artifact: PackedReleaseArtifact,
  ) => Promise<Map<string, Buffer> | null>
  repositoryRoot?: string
}

function tarString(block: Buffer, start: number, length: number) {
  const zero = block.indexOf(0, start)
  const end = zero === -1 || zero > start + length ? start + length : zero
  return block.subarray(start, end).toString('utf8')
}

function tarOctal(block: Buffer, start: number, length: number) {
  const value = tarString(block, start, length).trim().replace(/\0/g, '')
  if (!/^[0-7]*$/.test(value)) {
    throw new Error(`Invalid tar octal value: ${value}`)
  }
  return value ? Number.parseInt(value, 8) : 0
}

function verifyTarChecksum(block: Buffer) {
  const expected = tarOctal(block, 148, 8)
  let actual = 0
  for (let index = 0; index < TAR_BLOCK_BYTES; index++) {
    actual += index >= 148 && index < 156 ? 32 : block[index]!
  }
  if (actual !== expected) {
    throw new Error('Packed tarball has an invalid header checksum')
  }
}

function safePackagePath(value: string) {
  if (
    !value.startsWith('package/') ||
    value.includes('\\') ||
    path.posix.isAbsolute(value) ||
    value.split('/').some((segment) => segment === '..' || segment === '.')
  ) {
    throw new Error(`Packed tarball contains an unsafe path: ${value}`)
  }
  return value.slice('package/'.length).replace(/\/$/, '')
}

export async function readPackedTarballBuffer(compressed: Buffer) {
  if (compressed.byteLength > MAX_PACKED_BYTES) {
    throw new Error(`Packed tarball exceeds ${MAX_PACKED_BYTES} bytes`)
  }
  const content = await gunzipAsync(compressed)
  if (content.byteLength > MAX_UNPACKED_BYTES) {
    throw new Error(
      `Packed tarball exceeds ${MAX_UNPACKED_BYTES} unpacked bytes`,
    )
  }

  const files = new Map<string, Buffer>()
  let offset = 0
  while (offset + TAR_BLOCK_BYTES <= content.byteLength) {
    const header = content.subarray(offset, offset + TAR_BLOCK_BYTES)
    if (header.every((byte) => byte === 0)) break
    verifyTarChecksum(header)
    const name = tarString(header, 0, 100)
    const prefix = tarString(header, 345, 155)
    const entry = safePackagePath(prefix ? `${prefix}/${name}` : name)
    const size = tarOctal(header, 124, 12)
    const type = String.fromCharCode(header[156] || 48)
    const bodyStart = offset + TAR_BLOCK_BYTES
    const bodyEnd = bodyStart + size
    if (bodyEnd > content.byteLength) {
      throw new Error(`Packed tarball entry is truncated: ${entry}`)
    }
    if (type === '0') {
      if (!entry) throw new Error('Packed tarball contains an empty file path')
      if (files.has(entry)) {
        throw new Error(`Packed tarball contains a duplicate file: ${entry}`)
      }
      files.set(entry, Buffer.from(content.subarray(bodyStart, bodyEnd)))
    } else if (type !== '5') {
      throw new Error(
        `Packed tarball contains unsupported entry type ${JSON.stringify(
          type,
        )}: ${entry}`,
      )
    }
    offset = bodyStart + Math.ceil(size / TAR_BLOCK_BYTES) * TAR_BLOCK_BYTES
  }
  return files
}

export async function readPackedTarball(archive: string) {
  return readPackedTarballBuffer(await readFile(archive))
}

function parseJson<T>(content: Buffer, label: string): T {
  try {
    return JSON.parse(content.toString('utf8')) as T
  } catch (error) {
    throw new Error(
      `${label} is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

function requirePackedFile(
  files: Map<string, Buffer>,
  name: string,
  file: string,
) {
  const content = files.get(file)
  if (!content?.byteLength) {
    throw new Error(`${name} packed artifact is missing ${file}`)
  }
  return content
}

function findLocalProtocol(
  value: unknown,
  location = 'package.json',
): string | null {
  if (typeof value === 'string') {
    return /^(?:workspace|file|link):/.test(value)
      ? `${location}=${value}`
      : null
  }
  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) {
      const found = findLocalProtocol(entry, `${location}[${index}]`)
      if (found) return found
    }
    return null
  }
  if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) {
      const found = findLocalProtocol(entry, `${location}.${key}`)
      if (found) return found
    }
  }
  return null
}

function verifyFileBoundary(spec: PackageSpec, files: Map<string, Buffer>) {
  for (const file of files.keys()) {
    if (
      file !== 'package.json' &&
      file !== 'README.md' &&
      !/^LICEN[CS]E(?:\..+)?$/i.test(file) &&
      !file.startsWith(`${spec.buildRoot}/`)
    ) {
      throw new Error(
        `${spec.name} packed artifact contains unexpected file: ${file}`,
      )
    }
  }
}

function verifyPackedCli(
  artifact: PackedReleaseArtifact,
  presetVersion: string,
) {
  const source = requirePackedFile(
    artifact.files,
    artifact.name,
    'lib/build-info.json',
  )
  const buildInfo = parseJson<CliBuildInfo>(source, 'packed CLI build info')
  verifyCliBuildInfo(buildInfo, artifact.version, presetVersion)
  const javascript = [...artifact.files]
    .filter(([file]) => file.startsWith('lib/') && file.endsWith('.js'))
    .map(([, content]) => content.toString('utf8'))
    .join('\n')
  for (const value of [
    buildInfo.authOrigin,
    buildInfo.registryUrl,
    buildInfo.schemaUrl,
    buildInfo.presetVersion,
    buildInfo.cliVersion,
  ]) {
    if (!javascript.includes(value)) {
      throw new Error(
        `packed CLI JavaScript is missing release value: ${value}`,
      )
    }
  }
  if (javascript.includes('beta.saas-ui.dev')) {
    throw new Error('packed CLI JavaScript contains the beta Saas UI endpoint')
  }
}

export function verifyPackedReleaseArtifacts(
  artifacts: readonly PackedReleaseArtifact[],
  sourceVersions: ReadonlyMap<string, string>,
): PackedReleaseGateReport {
  const byName = new Map(artifacts.map((artifact) => [artifact.name, artifact]))
  if (
    byName.size !== PACKAGE_SPECS.length ||
    artifacts.length !== PACKAGE_SPECS.length
  ) {
    throw new Error(
      'Packed release gate requires exactly CLI, Chakra preset, and React artifacts',
    )
  }

  for (const spec of PACKAGE_SPECS) {
    const artifact = byName.get(spec.name)
    if (!artifact) {
      throw new Error(`Packed release artifact is missing ${spec.name}`)
    }
    for (const required of spec.required) {
      requirePackedFile(artifact.files, spec.name, required)
    }
    verifyFileBoundary(spec, artifact.files)
    const manifest = parseJson<PackageManifest>(
      artifact.files.get('package.json')!,
      `${spec.name} packed package.json`,
    )
    const expectedVersion = sourceVersions.get(spec.name)
    if (manifest.name !== spec.name || manifest.version !== expectedVersion) {
      throw new Error(
        `${spec.name} packed manifest must be ${spec.name}@${expectedVersion}; found ${String(
          manifest.name,
        )}@${String(manifest.version)}`,
      )
    }
    if (artifact.version !== expectedVersion) {
      throw new Error(
        `${spec.name} packed artifact version ${artifact.version} does not match ${expectedVersion}`,
      )
    }
    const localProtocol = findLocalProtocol(manifest)
    if (localProtocol) {
      throw new Error(
        `${spec.name} packed manifest contains a local protocol: ${localProtocol}`,
      )
    }
    const readme = artifact.files.get('README.md')!.toString('utf8')
    if (!readme.includes(MIGRATION_URL)) {
      throw new Error(
        `${spec.name} packed README must link to ${MIGRATION_URL}`,
      )
    }
    if (readme.includes('../../MIGRATION.md')) {
      throw new Error(
        `${spec.name} packed README contains a tarball-unsafe migration link`,
      )
    }
  }

  const presetVersion = sourceVersions.get('@saas-ui/chakra-preset')!
  const react = byName.get('@saas-ui/react')!
  const reactManifest = parseJson<PackageManifest>(
    react.files.get('package.json')!,
    '@saas-ui/react packed package.json',
  )
  if (!reactManifest.dependencies?.['@saas-ui/hooks']) {
    throw new Error(
      '@saas-ui/react packed manifest must depend on @saas-ui/hooks',
    )
  }
  verifyPackedCli(byName.get('@saas-ui/cli')!, presetVersion)

  return {
    artifacts: PACKAGE_SPECS.map((spec) => {
      const artifact = byName.get(spec.name)!
      return {
        files: artifact.files.size,
        name: artifact.name,
        version: artifact.version,
      }
    }),
    publication: [],
    stage: 'packed-artifacts-ready-for-publication',
  }
}

interface NpmPackageMetadata extends PackageManifest {
  dist?: {
    integrity?: string
    tarball?: string
  }
}

async function fetchWithTimeout<T>(
  url: string,
  accept: string,
  consume: (response: Response) => Promise<T>,
) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)
  try {
    const response = await fetch(url, {
      headers: { accept },
      redirect: 'error',
      signal: controller.signal,
    })
    return await consume(response)
  } finally {
    clearTimeout(timeout)
  }
}

export async function downloadPublishedFiles(
  artifact: PackedReleaseArtifact,
): Promise<Map<string, Buffer> | null> {
  const metadataUrl = `${NPM_REGISTRY_ORIGIN}/${encodeURIComponent(
    artifact.name,
  )}/${encodeURIComponent(artifact.version)}`
  let metadata: NpmPackageMetadata | null
  try {
    metadata = await fetchWithTimeout(
      metadataUrl,
      'application/json',
      async (response) => {
        if (response.status === 404) return null
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        return (await response.json()) as NpmPackageMetadata
      },
    )
  } catch (error) {
    throw new Error(
      `Unable to query npm for ${artifact.name}@${artifact.version}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
  if (!metadata) return null
  if (
    metadata.name !== artifact.name ||
    metadata.version !== artifact.version
  ) {
    throw new Error(
      `npm returned mismatched metadata for ${artifact.name}@${artifact.version}`,
    )
  }
  const tarball = metadata.dist?.tarball
  const integrity = metadata.dist?.integrity
  if (!tarball || !integrity?.startsWith('sha512-')) {
    throw new Error(
      `npm metadata for ${artifact.name}@${artifact.version} is missing its tarball or SHA-512 integrity`,
    )
  }
  const tarballUrl = new URL(tarball)
  if (
    tarballUrl.origin !== NPM_REGISTRY_ORIGIN ||
    tarballUrl.username ||
    tarballUrl.password ||
    tarballUrl.search ||
    tarballUrl.hash
  ) {
    throw new Error(
      `npm returned an unsafe tarball URL for ${artifact.name}@${artifact.version}`,
    )
  }

  let compressed: Buffer
  try {
    compressed = await fetchWithTimeout(
      tarballUrl.href,
      'application/octet-stream',
      async (response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        const contentLength = Number(response.headers.get('content-length'))
        if (
          Number.isFinite(contentLength) &&
          contentLength > MAX_PACKED_BYTES
        ) {
          throw new Error(`tarball exceeds ${MAX_PACKED_BYTES} bytes`)
        }
        return Buffer.from(await response.arrayBuffer())
      },
    )
  } catch (error) {
    throw new Error(
      `Unable to download ${artifact.name}@${artifact.version}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
  if (compressed.byteLength > MAX_PACKED_BYTES) {
    throw new Error(
      `${artifact.name}@${artifact.version} published tarball exceeds ${MAX_PACKED_BYTES} bytes`,
    )
  }
  const actualIntegrity = `sha512-${createHash('sha512')
    .update(compressed)
    .digest('base64')}`
  if (actualIntegrity !== integrity) {
    throw new Error(
      `${artifact.name}@${artifact.version} published tarball does not match npm integrity`,
    )
  }
  return readPackedTarballBuffer(compressed)
}

function firstFileDifference(
  local: ReadonlyMap<string, Buffer>,
  published: ReadonlyMap<string, Buffer>,
) {
  const paths = [...new Set([...local.keys(), ...published.keys()])].sort()
  for (const file of paths) {
    const localContent = local.get(file)
    const publishedContent = published.get(file)
    if (!localContent) return `${file} exists only in the published tarball`
    if (!publishedContent) return `${file} exists only in the local tarball`
    if (!localContent.equals(publishedContent))
      return `${file} has different bytes`
  }
  return null
}

export async function verifyPublishedArtifactCompatibility(
  artifacts: readonly PackedReleaseArtifact[],
  lookup: (
    artifact: PackedReleaseArtifact,
  ) => Promise<Map<string, Buffer> | null> = downloadPublishedFiles,
) {
  return Promise.all(
    artifacts.map(async (artifact) => {
      const published = await lookup(artifact)
      if (!published) {
        return {
          name: artifact.name,
          state: 'unpublished' as const,
          version: artifact.version,
        }
      }
      const difference = firstFileDifference(artifact.files, published)
      if (difference) {
        throw new Error(
          `${artifact.name}@${artifact.version} already exists on npm with different contents: ${difference}. Refuse to publish until Changesets computes a new version.`,
        )
      }
      return {
        name: artifact.name,
        state: 'identical' as const,
        version: artifact.version,
      }
    }),
  )
}

function isWithin(root: string, target: string) {
  const relative = path.relative(root, target)
  return (
    relative === '' ||
    (!relative.startsWith('..') && !path.isAbsolute(relative))
  )
}

async function defaultPack(
  packageName: string,
  destination: string,
  repositoryRoot: string,
) {
  const before = new Set(await readdir(destination))
  await execFileAsync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['--filter', packageName, 'pack', '--pack-destination', destination],
    { cwd: repositoryRoot, maxBuffer: 8 * 1024 * 1024 },
  )
  const created = (await readdir(destination)).filter(
    (entry) => !before.has(entry) && entry.endsWith('.tgz'),
  )
  if (created.length !== 1) {
    throw new Error(
      `${packageName} pack produced ${created.length} tarballs; expected one`,
    )
  }
  return path.join(destination, created[0]!)
}

async function sourceVersions(repositoryRoot: string) {
  const result = new Map<string, string>()
  for (const spec of PACKAGE_SPECS) {
    const manifest = parseJson<PackageManifest>(
      await readFile(path.join(repositoryRoot, spec.manifest)),
      spec.manifest,
    )
    if (manifest.name !== spec.name || !manifest.version) {
      throw new Error(`${spec.manifest} must describe a versioned ${spec.name}`)
    }
    result.set(spec.name, manifest.version)
  }
  return result
}

export async function runPackedReleaseGate(
  options: PackedReleaseGateOptions = {},
) {
  const repositoryRoot = path.resolve(options.repositoryRoot ?? process.cwd())
  const temporaryRoot = await (
    options.makeTemporaryRoot ??
    (() => mkdtemp(path.join(tmpdir(), 'saas-ui-packed-release-')))
  )()
  const pack = options.pack ?? defaultPack
  try {
    const versions = await sourceVersions(repositoryRoot)
    const artifacts: PackedReleaseArtifact[] = []
    for (const spec of PACKAGE_SPECS) {
      const archive = path.resolve(
        await pack(spec.name, temporaryRoot, repositoryRoot),
      )
      const archiveStat = await lstat(archive)
      if (!archiveStat.isFile() || archiveStat.isSymbolicLink()) {
        throw new Error(`${spec.name} pack did not return a regular tarball`)
      }
      const canonicalRoot = await realpath(temporaryRoot)
      const canonicalArchive = await realpath(archive)
      if (!isWithin(canonicalRoot, canonicalArchive)) {
        throw new Error(
          `${spec.name} pack returned an archive outside the temporary root`,
        )
      }
      const files = await readPackedTarball(canonicalArchive)
      const manifest = parseJson<PackageManifest>(
        requirePackedFile(files, spec.name, 'package.json'),
        `${spec.name} packed package.json`,
      )
      artifacts.push({
        archive: canonicalArchive,
        files,
        name: manifest.name ?? '',
        version: manifest.version ?? '',
      })
    }
    const report = verifyPackedReleaseArtifacts(artifacts, versions)
    report.publication = await verifyPublishedArtifactCompatibility(
      artifacts,
      options.publishedFiles,
    )
    return report
  } finally {
    await rm(temporaryRoot, { force: true, recursive: true })
  }
}

function isDirectExecution() {
  const script = process.argv[1]
  return Boolean(
    script && pathToFileURL(path.resolve(script)).href === import.meta.url,
  )
}

if (isDirectExecution()) {
  try {
    const report = await runPackedReleaseGate()
    for (const artifact of report.artifacts) {
      const publication = report.publication.find(
        (entry) => entry.name === artifact.name,
      )!
      console.log(
        `Verified ${artifact.name}@${artifact.version} (${artifact.files} packed files, npm: ${publication.state}).`,
      )
    }
    console.log(
      'Packed compatibility artifacts are byte-compatible with npm and ready for publication; no publication was performed.',
    )
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
