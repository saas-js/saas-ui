import { execFile } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

export const NPM_REGISTRY_ORIGIN = 'https://registry.npmjs.org'

const TRANSITION_PACKAGES = [
  {
    manifest: 'packages/saas-ui-cli/package.json',
    name: '@saas-ui/cli',
  },
  {
    manifest: 'packages/saas-ui-chakra-preset/package.json',
    name: '@saas-ui/chakra-preset',
  },
  {
    manifest: 'packages/saas-ui-react/package.json',
    name: '@saas-ui/react',
  },
] as const

export type PublishedVersionGateMode =
  | 'manifest'
  | 'planned'
  | 'planned-if-pending'

export interface ReleaseCandidate {
  name: string
  version: string
}

interface ChangesetStatus {
  releases?: Array<{
    name?: string
    newVersion?: string
  }>
}

interface PackageManifest {
  name?: string
  version?: string
}

export interface PublishedVersionGateOptions {
  candidates?: readonly ReleaseCandidate[]
  lookup?: (candidate: ReleaseCandidate) => Promise<boolean>
  mode?: PublishedVersionGateMode
  repositoryRoot?: string
}

export interface PublishedVersionGateReport {
  checked: ReleaseCandidate[]
  mode: PublishedVersionGateMode
  skipped: boolean
  stage: 'target-versions-available'
}

export class PublishedVersionCollisionError extends Error {
  readonly collisions: readonly ReleaseCandidate[]

  constructor(collisions: readonly ReleaseCandidate[]) {
    super(
      `Compatibility release target versions already exist on npm:\n${collisions
        .map(({ name, version }) => `- ${name}@${version}`)
        .join(
          '\n',
        )}\nRefuse to publish until Changesets computes new, unpublished versions.`,
    )
    this.name = 'PublishedVersionCollisionError'
    this.collisions = collisions
  }
}

function parseJson<T>(source: string, label: string): T {
  try {
    return JSON.parse(source) as T
  } catch (error) {
    throw new Error(
      `${label} is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

function assertCandidate(candidate: ReleaseCandidate, label: string) {
  if (!candidate.name || !candidate.version) {
    throw new Error(`${label} must contain a package name and version`)
  }
  if (
    !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(
      candidate.version,
    )
  ) {
    throw new Error(
      `${label} has an invalid SemVer version: ${candidate.version}`,
    )
  }
  return candidate
}

async function manifestCandidates(repositoryRoot: string) {
  return Promise.all(
    TRANSITION_PACKAGES.map(async (spec) => {
      const manifest = parseJson<PackageManifest>(
        await readFile(path.join(repositoryRoot, spec.manifest), 'utf8'),
        spec.manifest,
      )
      if (manifest.name !== spec.name) {
        throw new Error(
          `${spec.manifest} must declare ${spec.name}; found ${String(
            manifest.name,
          )}`,
        )
      }
      return assertCandidate(
        { name: spec.name, version: manifest.version ?? '' },
        spec.manifest,
      )
    }),
  )
}

async function plannedCandidates(repositoryRoot: string) {
  const artifacts = path.join(repositoryRoot, '.artifacts')
  const relative = `.artifacts/published-version-plan-${randomUUID()}.json`
  const output = path.join(repositoryRoot, relative)
  await mkdir(artifacts, { recursive: true })
  try {
    await execFileAsync(
      process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
      ['exec', 'changeset', 'status', '--output', relative],
      { cwd: repositoryRoot, maxBuffer: 2 * 1024 * 1024 },
    )
    const status = parseJson<ChangesetStatus>(
      await readFile(output, 'utf8'),
      relative,
    )
    const releases = new Map(
      (status.releases ?? []).map((release) => [
        release.name,
        release.newVersion,
      ]),
    )
    return TRANSITION_PACKAGES.map((spec) =>
      assertCandidate(
        {
          name: spec.name,
          version: releases.get(spec.name) ?? '',
        },
        `Changesets release for ${spec.name}`,
      ),
    )
  } finally {
    await rm(output, { force: true })
  }
}

async function hasPendingTransition(repositoryRoot: string) {
  try {
    await readFile(
      path.join(repositoryRoot, '.changeset/registry-template-transition.md'),
      'utf8',
    )
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false
    throw error
  }
}

export async function lookupPublishedVersion(
  candidate: ReleaseCandidate,
  fetcher: typeof fetch = fetch,
) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)
  try {
    const response = await fetcher(
      `${NPM_REGISTRY_ORIGIN}/${encodeURIComponent(candidate.name)}/${encodeURIComponent(
        candidate.version,
      )}`,
      {
        headers: { accept: 'application/json' },
        redirect: 'error',
        signal: controller.signal,
      },
    )
    if (response.status === 404) return false
    if (!response.ok) {
      throw new Error(
        `npm registry returned ${response.status} ${response.statusText}`,
      )
    }
    const metadata = (await response.json()) as PackageManifest
    if (
      metadata.name !== candidate.name ||
      metadata.version !== candidate.version
    ) {
      throw new Error(
        `npm registry returned mismatched metadata for ${candidate.name}@${candidate.version}`,
      )
    }
    return true
  } catch (error) {
    throw new Error(
      `Unable to verify ${candidate.name}@${candidate.version} against npm: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  } finally {
    clearTimeout(timeout)
  }
}

export async function verifyPublishedVersionAvailability(
  options: PublishedVersionGateOptions = {},
): Promise<PublishedVersionGateReport> {
  const repositoryRoot =
    options.repositoryRoot ?? path.resolve(import.meta.dirname, '../..')
  const mode = options.mode ?? 'manifest'
  if (
    !options.candidates &&
    mode === 'planned-if-pending' &&
    !(await hasPendingTransition(repositoryRoot))
  ) {
    return {
      checked: [],
      mode,
      skipped: true,
      stage: 'target-versions-available',
    }
  }
  const candidates = (
    options.candidates ??
    (mode === 'planned' || mode === 'planned-if-pending'
      ? await plannedCandidates(repositoryRoot)
      : await manifestCandidates(repositoryRoot))
  ).map((candidate, index) =>
    assertCandidate(candidate, `candidate ${index + 1}`),
  )

  const expected = new Set<string>(TRANSITION_PACKAGES.map((spec) => spec.name))
  if (
    candidates.length !== expected.size ||
    candidates.some((candidate) => !expected.delete(candidate.name)) ||
    expected.size
  ) {
    throw new Error(
      `Published-version gate must check exactly: ${TRANSITION_PACKAGES.map(
        (spec) => spec.name,
      ).join(', ')}`,
    )
  }

  const lookup = options.lookup ?? lookupPublishedVersion
  const published = await Promise.all(
    candidates.map(async (candidate) => ({
      candidate,
      published: await lookup(candidate),
    })),
  )
  const collisions = published
    .filter((result) => result.published)
    .map((result) => result.candidate)
  if (collisions.length) throw new PublishedVersionCollisionError(collisions)

  return {
    checked: [...candidates],
    mode,
    skipped: false,
    stage: 'target-versions-available',
  }
}

async function main() {
  const argument = process.argv[2]
  const mode: PublishedVersionGateMode =
    argument === '--planned'
      ? 'planned'
      : argument === '--planned-if-pending'
        ? 'planned-if-pending'
        : argument === '--manifest' || argument === undefined
          ? 'manifest'
          : (() => {
              throw new Error(
                `Unknown argument ${argument}; expected --planned-if-pending, --planned, or --manifest`,
              )
            })()
  const report = await verifyPublishedVersionAvailability({ mode })
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  main().catch((error) => {
    process.stderr.write(
      `${error instanceof Error ? error.message : String(error)}\n`,
    )
    process.exitCode = 1
  })
}
