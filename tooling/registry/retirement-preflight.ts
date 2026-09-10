import { execFile } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { lstat, readFile } from 'node:fs/promises'
import { mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

import { type LegacyCheckResult, scanLegacyReferences } from './legacy-check'

export const REACT_PACKAGE = '@saas-ui/react'
export const MIGRATION_URL =
  'https://github.com/saas-js/saas-ui/blob/v3/MIGRATION.md'

const CHANGESET_PATH = '.changeset/registry-template-transition.md'
const REQUIRED_CHANGESET_BUMPS = new Map([
  ['@saas-ui/chakra-preset', 'minor'],
  ['@saas-ui/cli', 'minor'],
] as const)
const VERSIONED_TRANSITION_MINIMUMS = new Map<
  string,
  { minimum: number; prefix: string }
>([
  ['@saas-ui/cli', { minimum: 0, prefix: '0.1.0-rc.' }],
  ['@saas-ui/chakra-preset', { minimum: 0, prefix: '3.0.0-rc.' }],
] as const)
const REQUIRED_MIGRATION_READMES = [
  'packages/saas-ui-chakra-preset/README.md',
  'packages/saas-ui-cli/README.md',
  'packages/saas-ui-react/README.md',
  'packages/saas-ui-tailwind-preset/README.md',
] as const
const execFileAsync = promisify(execFile)

interface ChangesetRelease {
  name: string
  newVersion: string
  type: string
}

interface ChangesetStatus {
  preState?: { mode?: string; tag?: string }
  releases?: ChangesetRelease[]
}

interface PackageManifest {
  bin?: Record<string, string>
  files?: string[]
  name?: string
  version?: string
}

export interface CliBuildInfo {
  authOrigin: string
  cliVersion: string
  kind: 'saas-ui.cli-build-info'
  presetVersion: string
  registryUrl: string
  schemaUrl: string
  version: 1
}

const CLI_BUILD_INFO_KEYS = [
  'authOrigin',
  'cliVersion',
  'kind',
  'presetVersion',
  'registryUrl',
  'schemaUrl',
  'version',
] as const

export const PRODUCTION_CLI_BUILD_INFO = {
  authOrigin: 'https://saas-ui.dev',
  registryUrl: 'https://saas-ui.dev/r',
  schemaUrl: 'https://saas-ui.dev/r/schema/components.json',
} as const

const FORBIDDEN_BUILT_CLI_VALUES = [
  'https://saas-ui.dev/r/schema.json',
  'beta.saas-ui.dev',
] as const

const LOCAL_REGISTRY_ENDPOINT =
  /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/r(?:\/|["'`\s]|$)/

export function verifyCliBuildInfo(
  buildInfo: CliBuildInfo,
  cliVersion: string,
  presetVersion: string,
) {
  if (
    !buildInfo ||
    typeof buildInfo !== 'object' ||
    Object.keys(buildInfo).sort().join('\0') !==
      [...CLI_BUILD_INFO_KEYS].sort().join('\0')
  ) {
    throw new Error(
      'CLI build info must contain exactly the versioned production contract fields',
    )
  }
  const expected: CliBuildInfo = {
    authOrigin: PRODUCTION_CLI_BUILD_INFO.authOrigin,
    cliVersion,
    kind: 'saas-ui.cli-build-info',
    presetVersion,
    registryUrl: PRODUCTION_CLI_BUILD_INFO.registryUrl,
    schemaUrl: PRODUCTION_CLI_BUILD_INFO.schemaUrl,
    version: 1,
  }
  for (const [key, value] of Object.entries(expected)) {
    if (buildInfo[key as keyof CliBuildInfo] !== value) {
      throw new Error(
        `CLI build info ${key} must equal ${String(value)}; found ${String(
          buildInfo[key as keyof CliBuildInfo],
        )}`,
      )
    }
  }
  return buildInfo
}

export interface RetirementPreflightOptions {
  repositoryRoot?: string
  releasePlan?: (repositoryRoot: string) => Promise<ChangesetStatus>
  scanLegacy?: (repositoryRoot: string) => Promise<LegacyCheckResult>
}

export interface RetirementPreflightReport {
  checks: string[]
  legacyFiles: number
  legacyScopes: number
  releaseVersions: Record<string, string>
  stage: 'repository-ready-for-compatibility-release'
}

export class RetirementPreflightError extends Error {
  readonly failures: readonly string[]

  constructor(failures: readonly string[]) {
    super(
      `@saas-ui/react retirement preflight failed:\n${failures
        .map((failure) => `- ${failure}`)
        .join('\n')}`,
    )
    this.name = 'RetirementPreflightError'
    this.failures = failures
  }
}

function parseChangesetBumps(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source)
  if (!match) throw new Error('changeset is missing YAML frontmatter')
  const bumps = new Map<string, string>()
  for (const line of match[1]!.split(/\r?\n/)) {
    const entry = /^'([^']+)':\s*(major|minor|patch)\s*$/.exec(line)
    if (entry) bumps.set(entry[1]!, entry[2]!)
  }
  return bumps
}

function normalizedProse(source: string) {
  return source.replace(/\s+/g, ' ').trim()
}

async function readRequired(root: string, relative: string) {
  try {
    return await readFile(path.join(root, relative), 'utf8')
  } catch (error) {
    throw new Error(
      `${relative} is missing or unreadable: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

async function readOptional(root: string, relative: string) {
  try {
    return await readFile(path.join(root, relative), 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }
}

async function readManifest(root: string, relative: string) {
  const source = await readRequired(root, relative)
  try {
    return JSON.parse(source) as PackageManifest
  } catch (error) {
    throw new Error(
      `${relative} is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

async function requireRegularFile(root: string, relative: string) {
  try {
    const stat = await lstat(path.join(root, relative))
    if (!stat.isFile() || stat.isSymbolicLink()) {
      throw new Error('not a regular file')
    }
  } catch (error) {
    throw new Error(
      `${relative} is missing or invalid: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

async function computeChangesetReleasePlan(
  repositoryRoot: string,
): Promise<ChangesetStatus> {
  const artifacts = path.join(repositoryRoot, '.artifacts')
  const relative = `.artifacts/retirement-plan-${randomUUID()}.json`
  const output = path.join(repositoryRoot, relative)
  await mkdir(artifacts, { recursive: true })
  try {
    await execFileAsync(
      process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
      ['exec', 'changeset', 'status', '--output', relative],
      { cwd: repositoryRoot, maxBuffer: 2 * 1024 * 1024 },
    )
    return JSON.parse(await readFile(output, 'utf8')) as ChangesetStatus
  } finally {
    await rm(output, { force: true })
  }
}

async function javascriptFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const target = path.join(directory, entry.name)
        if (entry.isSymbolicLink()) {
          throw new Error(`built CLI contains a symbolic link: ${target}`)
        }
        if (entry.isDirectory()) return javascriptFiles(target)
        return entry.isFile() && entry.name.endsWith('.js') ? [target] : []
      }),
    )
  ).flat()
}

export async function verifyBuiltCliProductionContract(rootInput: string) {
  const root = path.resolve(rootInput)
  const [cli, preset, buildInfoSource] = await Promise.all([
    readManifest(root, 'packages/saas-ui-cli/package.json'),
    readManifest(root, 'packages/saas-ui-chakra-preset/package.json'),
    readRequired(root, 'packages/saas-ui-cli/lib/build-info.json'),
  ])
  let buildInfo: CliBuildInfo
  try {
    buildInfo = JSON.parse(buildInfoSource) as CliBuildInfo
  } catch (error) {
    throw new Error(
      `CLI build info is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
  verifyCliBuildInfo(buildInfo, cli.version ?? '', preset.version ?? '')

  for (const relative of [
    'packages/saas-ui-cli/lib/cli.js',
    'packages/saas-ui-cli/lib/bash-complete.js',
  ]) {
    await requireRegularFile(root, relative)
  }
  const cliSource = await readRequired(root, 'packages/saas-ui-cli/lib/cli.js')
  if (!cliSource.startsWith('#!/usr/bin/env node')) {
    throw new Error(
      'packages/saas-ui-cli/lib/cli.js must start with a Node shebang',
    )
  }

  const files = await javascriptFiles(
    path.join(root, 'packages/saas-ui-cli/lib'),
  )
  if (!files.length) throw new Error('built CLI contains no JavaScript files')
  const source = (
    await Promise.all(files.map((file) => readFile(file, 'utf8')))
  ).join('\n')
  for (const value of [
    buildInfo.authOrigin,
    buildInfo.registryUrl,
    buildInfo.schemaUrl,
    buildInfo.presetVersion,
    buildInfo.cliVersion,
  ]) {
    if (!source.includes(value)) {
      throw new Error(`built CLI is missing release value: ${value}`)
    }
  }
  for (const value of FORBIDDEN_BUILT_CLI_VALUES) {
    if (source.includes(value)) {
      throw new Error(`built CLI contains forbidden release value: ${value}`)
    }
  }
  const localEndpoint = LOCAL_REGISTRY_ENDPOINT.exec(source)?.[0]?.trim()
  if (localEndpoint) {
    throw new Error(
      `built CLI contains forbidden release value: ${localEndpoint.replace(/["'`]$/, '')}`,
    )
  }
  return buildInfo
}

export async function runRetirementPreflight(
  options: RetirementPreflightOptions = {},
): Promise<RetirementPreflightReport> {
  const root = path.resolve(options.repositoryRoot ?? process.cwd())
  const failures: string[] = []
  const checks: string[] = []
  const check = async (label: string, operation: () => Promise<void>) => {
    try {
      await operation()
      checks.push(label)
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error))
    }
  }
  const changesetSource = await readOptional(root, CHANGESET_PATH)

  await check('compatibility release state', async () => {
    if (changesetSource !== null) {
      const bumps = parseChangesetBumps(changesetSource)
      for (const [name, expected] of REQUIRED_CHANGESET_BUMPS) {
        const actual = bumps.get(name)
        if (actual !== expected) {
          throw new Error(
            `${CHANGESET_PATH} must declare '${name}': ${expected}; found ${
              actual ?? 'no entry'
            }`,
          )
        }
      }
      return
    }

    for (const spec of [
      {
        manifest: 'packages/saas-ui-cli/package.json',
        name: '@saas-ui/cli',
      },
      {
        manifest: 'packages/saas-ui-chakra-preset/package.json',
        name: '@saas-ui/chakra-preset',
      },
    ]) {
      const manifest = await readManifest(root, spec.manifest)
      const expected = VERSIONED_TRANSITION_MINIMUMS.get(spec.name)!
      const suffix = manifest.version?.startsWith(expected.prefix)
        ? manifest.version.slice(expected.prefix.length)
        : ''
      const sequence = /^\d+$/.test(suffix) ? Number(suffix) : -1
      if (manifest.name !== spec.name || sequence < expected.minimum) {
        throw new Error(
          `${spec.manifest} must contain the versioned compatibility release at ${expected.prefix}${expected.minimum} or newer; found ${String(
            manifest.name,
          )}@${String(manifest.version)}`,
        )
      }
    }
  })

  await check('release branch and prerelease channel', async () => {
    const config = JSON.parse(
      await readRequired(root, '.changeset/config.json'),
    ) as { baseBranch?: string }
    if (config.baseBranch !== 'v3') {
      throw new Error(
        `.changeset/config.json baseBranch must be v3; found ${String(config.baseBranch)}`,
      )
    }
    const pre = JSON.parse(await readRequired(root, '.changeset/pre.json')) as {
      mode?: string
      tag?: string
    }
    if (pre.mode !== 'pre' || pre.tag !== 'rc') {
      throw new Error(
        `.changeset/pre.json must be in rc prerelease mode; found ${String(pre.mode)}/${String(pre.tag)}`,
      )
    }
  })

  const releaseVersions: Record<string, string> = {}
  await check('computed Changesets release plan', async () => {
    if (changesetSource === null) {
      for (const spec of [
        {
          manifest: 'packages/saas-ui-cli/package.json',
          name: '@saas-ui/cli',
        },
        {
          manifest: 'packages/saas-ui-chakra-preset/package.json',
          name: '@saas-ui/chakra-preset',
        },
      ]) {
        const manifest = await readManifest(root, spec.manifest)
        releaseVersions[spec.name] = manifest.version!
      }
      return
    }
    const status = await (options.releasePlan ?? computeChangesetReleasePlan)(
      root,
    )
    if (status.preState?.mode !== 'pre' || status.preState.tag !== 'rc') {
      throw new Error('computed Changesets plan is not on the rc channel')
    }
    const releases = new Map(
      (status.releases ?? []).map((release) => [release.name, release]),
    )
    for (const [name, expectedType] of REQUIRED_CHANGESET_BUMPS) {
      const release = releases.get(name)
      if (release?.type !== expectedType || !release.newVersion) {
        throw new Error(
          `computed Changesets plan must release ${name} as ${expectedType}`,
        )
      }
      releaseVersions[name] = release.newVersion
    }
  })

  await check('migration guide state', async () => {
    const source = normalizedProse(await readRequired(root, 'MIGRATION.md'))
    const required = [
      '@saas-ui/chakra-preset',
      '@saas-ui/cli',
      'migrate react-to-registry',
      'Package lifecycle status is determined by published npm metadata',
    ]
    for (const text of required) {
      if (!source.includes(text)) {
        throw new Error(`MIGRATION.md is missing required text: ${text}`)
      }
    }
  })

  await check('stable package migration links', async () => {
    for (const relative of REQUIRED_MIGRATION_READMES) {
      const source = await readRequired(root, relative)
      if (!source.includes(MIGRATION_URL)) {
        throw new Error(`${relative} must link to ${MIGRATION_URL}`)
      }
      if (source.includes('../../MIGRATION.md')) {
        throw new Error(
          `${relative} contains a package-tarball-unsafe relative migration link`,
        )
      }
    }
  })

  await check('replacement package manifests', async () => {
    for (const relative of [
      'packages/saas-ui-chakra-preset/package.json',
      'packages/saas-ui-cli/package.json',
    ]) {
      const manifest = await readManifest(root, relative)
      if (!manifest.name || !manifest.version) {
        throw new Error(`${relative} must declare a package name and version`)
      }
    }
  })

  await check('CLI migration entry point', async () => {
    const relative = 'packages/saas-ui-cli/package.json'
    const manifest = await readManifest(root, relative)
    if (manifest.name !== '@saas-ui/cli') {
      throw new Error(`${relative} must describe @saas-ui/cli`)
    }
    if (manifest.bin?.['saas-ui'] !== 'lib/cli.js') {
      throw new Error(`${relative} must expose the saas-ui CLI at lib/cli.js`)
    }
    if (!manifest.files?.includes('lib')) {
      throw new Error(`${relative} must publish the lib directory`)
    }
    await requireRegularFile(
      root,
      'packages/saas-ui-cli/src/commands/migrate/react-to-registry/command.ts',
    )
    await requireRegularFile(
      root,
      'packages/saas-ui-cli/src/commands/migrate/react-to-registry/impl.ts',
    )
  })

  await check('built CLI production contract', async () => {
    await verifyBuiltCliProductionContract(root)
  })

  await check('primitives package retained', async () => {
    const relative = 'packages/saas-ui-react/package.json'
    const manifest = await readManifest(root, relative)
    if (manifest.name !== REACT_PACKAGE || !manifest.version) {
      throw new Error(
        `${relative} must retain a versioned ${REACT_PACKAGE} primitives package`,
      )
    }
    const readme = normalizedProse(
      await readRequired(root, 'packages/saas-ui-react/README.md'),
    )
    if (!readme.includes('Unstyled React primitives')) {
      throw new Error(
        'packages/saas-ui-react/README.md must describe the unstyled primitives package',
      )
    }
  })

  let legacyResult: LegacyCheckResult | undefined
  await check('zero legacy runtime references', async () => {
    legacyResult = await (options.scanLegacy ?? scanLegacyReferences)(root)
    if (legacyResult.references.length) {
      throw new Error(
        `legacy guard found ${legacyResult.references.length} unapproved runtime reference(s)`,
      )
    }
  })

  if (failures.length) throw new RetirementPreflightError(failures)

  return {
    checks,
    legacyFiles: legacyResult!.files,
    legacyScopes: legacyResult!.scopes.length,
    releaseVersions,
    stage: 'repository-ready-for-compatibility-release',
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
    const report = await runRetirementPreflight()
    console.log(
      `Retirement preflight passed (${report.checks.length} checks, ` +
        `${report.legacyFiles} legacy-guard files, ` +
        `${report.legacyScopes} scopes).`,
    )
    console.log(
      'Repository is ready for the compatibility release; this does not prove ' +
        'that npm publication or deprecation has happened.',
    )
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
