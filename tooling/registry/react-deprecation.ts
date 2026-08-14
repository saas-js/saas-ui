import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { appendFile, mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

export const DEPRECATED_PACKAGE = '@saas-ui/react'
export const DEPRECATION_REGISTRY = 'https://registry.npmjs.org/'
export const DEPRECATION_PACKUMENT_URL = `${DEPRECATION_REGISTRY}@saas-ui%2freact`
export const DEPRECATION_MIGRATION_URL =
  'https://github.com/saas-js/saas-ui/blob/v3/MIGRATION.md'
export const DEPRECATION_MESSAGE =
  '@saas-ui/react is deprecated. Migrate to @saas-ui/chakra-preset and ' +
  `@saas-ui/cli: ${DEPRECATION_MIGRATION_URL}`

const execFileAsync = promisify(execFile)
const EXACT_SEMVER =
  /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/

export interface DeprecationInputs {
  channel: 'latest' | 'next'
  cliVersion: string
  controlCommit: string
  presetVersion: string
  reactVersion: string
}

export interface DeprecationPlan extends DeprecationInputs {
  kind: 'saas-ui.react-deprecation-plan'
  message: string
  migrationUrl: string
  package: typeof DEPRECATED_PACKAGE
  packageIntegrities: {
    cli: string
    preset: string
    react: string
  }
  planVersion: 3
  registry: string
  targetVersions: string[]
}

export interface DeprecationPlanResult {
  alreadyDeprecated: boolean
  alreadyDeprecatedVersions: string[]
  confirmation: string
  digest: string
  pendingVersions: string[]
  plan: DeprecationPlan
}

export interface DeprecationAdapters {
  authNpm?: (args: readonly string[]) => Promise<string>
  fetch?: typeof fetch
  npm?: (args: readonly string[]) => Promise<string>
  pack?: (request: ExactPackageRequest) => Promise<ExactPackageArchive>
  sleep?: (milliseconds: number) => Promise<void>
}

export interface ExactPackageRequest {
  files: readonly string[]
  name: string
  version: string
}

export interface ExactPackageArchive {
  files: Readonly<Record<string, string>>
  integrity: string
}

const CONTROL_COMMIT = /^[a-f0-9]{40}$/
const EXACT_INTEGRITY = /^sha512-[A-Za-z0-9+/]+={0,2}$/
const POSTVERIFY_DELAYS = [0, 1_000, 3_000, 7_000] as const
const REACT_README = 'README.md'
const CLI_BUILD_INFO = 'lib/build-info.json'

function validateVersion(label: string, value: string) {
  if (!EXACT_SEMVER.test(value)) {
    throw new Error(
      `${label} must be an exact SemVer version; received ${value}`,
    )
  }
}

export function validateDeprecationInputs(
  inputs: DeprecationInputs,
): DeprecationInputs {
  if (inputs.channel !== 'latest' && inputs.channel !== 'next') {
    throw new Error('channel must be latest or next')
  }
  if (!CONTROL_COMMIT.test(inputs.controlCommit)) {
    throw new Error('controlCommit must be a full lowercase Git commit SHA')
  }
  validateVersion('reactVersion', inputs.reactVersion)
  validateVersion('cliVersion', inputs.cliVersion)
  validateVersion('presetVersion', inputs.presetVersion)
  return {
    channel: inputs.channel,
    cliVersion: inputs.cliVersion,
    controlCommit: inputs.controlCommit,
    presetVersion: inputs.presetVersion,
    reactVersion: inputs.reactVersion,
  }
}

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).sort(
      ([left], [right]) => left.localeCompare(right, 'en'),
    )
    return `{${entries
      .map(([key, entry]) => `${JSON.stringify(key)}:${canonicalJson(entry)}`)
      .join(',')}}`
  }
  return JSON.stringify(value)
}

export function digestDeprecationPlan(plan: DeprecationPlan) {
  return createHash('sha256').update(canonicalJson(plan)).digest('hex')
}

function confirmationFor(plan: DeprecationPlan, digest: string) {
  return `DEPRECATE ${plan.package} ALL ${plan.targetVersions.length} VERSIONS AT ${plan.controlCommit} ${digest}`
}

interface ReactCatalog {
  deprecatedByVersion: ReadonlyMap<string, string | undefined>
  versions: string[]
}

function compareCanonicalVersions(left: string, right: string) {
  return left < right ? -1 : left > right ? 1 : 0
}

async function readReactCatalog(fetcher: typeof fetch): Promise<ReactCatalog> {
  const response = await fetcher(DEPRECATION_PACKUMENT_URL, {
    cache: 'no-store',
    headers: { accept: 'application/json' },
    method: 'GET',
    redirect: 'error',
  })
  if (!response.ok) {
    throw new Error(
      `npm package metadata returned ${response.status}: ${DEPRECATION_PACKUMENT_URL}`,
    )
  }
  const payload: unknown = await response.json()
  const manifests =
    payload && typeof payload === 'object'
      ? Reflect.get(payload as object, 'versions')
      : undefined
  if (!manifests || typeof manifests !== 'object' || Array.isArray(manifests)) {
    throw new Error(`${DEPRECATED_PACKAGE} package metadata has no version map`)
  }

  const deprecatedByVersion = new Map<string, string | undefined>()
  for (const [version, manifest] of Object.entries(
    manifests as Record<string, unknown>,
  )) {
    validateVersion('published react version', version)
    if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
      throw new Error(
        `${DEPRECATED_PACKAGE}@${version} package metadata is malformed`,
      )
    }
    const manifestVersion = Reflect.get(manifest, 'version')
    if (manifestVersion !== version) {
      throw new Error(
        `${DEPRECATED_PACKAGE} package metadata mismatches version ${version}`,
      )
    }
    const deprecated = Reflect.get(manifest, 'deprecated')
    if (deprecated !== undefined && typeof deprecated !== 'string') {
      throw new Error(
        `${DEPRECATED_PACKAGE}@${version} has invalid deprecation metadata`,
      )
    }
    deprecatedByVersion.set(version, deprecated as string | undefined)
  }
  const versions = [...deprecatedByVersion.keys()].sort(
    compareCanonicalVersions,
  )
  if (!versions.length) {
    throw new Error(`${DEPRECATED_PACKAGE} has no published versions`)
  }
  return { deprecatedByVersion, versions }
}

function sameVersionSet(left: readonly string[], right: readonly string[]) {
  return (
    left.length === right.length &&
    left.every((version, index) => version === right[index])
  )
}

function assertApprovedCatalog(
  catalog: ReactCatalog,
  expectedVersions?: readonly string[],
) {
  if (expectedVersions && !sameVersionSet(catalog.versions, expectedVersions)) {
    throw new Error(
      `${DEPRECATED_PACKAGE} published version set changed after approval; ` +
        `expected ${expectedVersions.length} exact versions, found ${catalog.versions.length}`,
    )
  }
  for (const version of catalog.versions) {
    const deprecated = catalog.deprecatedByVersion.get(version)
    if (deprecated !== undefined && deprecated !== DEPRECATION_MESSAGE) {
      throw new Error(
        `${DEPRECATED_PACKAGE}@${version} has conflicting deprecation metadata`,
      )
    }
  }
}

async function execNpm(
  args: readonly string[],
  options: { authenticated: boolean },
) {
  const env = { ...process.env }
  if (!options.authenticated) {
    env.NODE_AUTH_TOKEN = ''
    env.NPM_TOKEN = ''
  }
  const { stdout } = await execFileAsync('npm', [...args], {
    env,
    maxBuffer: 1024 * 1024,
  })
  return stdout.trim()
}

async function defaultReadOnlyNpm(args: readonly string[]) {
  return execNpm(args, { authenticated: false })
}

async function defaultAuthenticatedNpm(args: readonly string[]) {
  return execNpm(args, { authenticated: true })
}

export function exactPackagePackArgs(
  name: string,
  version: string,
  root: string,
) {
  return [
    'pack',
    `${name}@${version}`,
    '--json',
    '--ignore-scripts=true',
    '--prefer-online',
    `--pack-destination=${root}`,
    `--registry=${DEPRECATION_REGISTRY}`,
  ] as const
}

async function readArchiveFile(archive: string, relative: string) {
  if (!relative || relative.startsWith('/') || relative.includes('..')) {
    throw new Error(`unsafe package archive path: ${relative}`)
  }
  const { stdout } = await execFileAsync(
    'tar',
    ['-xOf', archive, `package/${relative}`],
    {
      env: { ...process.env, NODE_AUTH_TOKEN: '', NPM_TOKEN: '' },
      maxBuffer: 5 * 1024 * 1024,
    },
  )
  return stdout
}

async function defaultPackExactPackage(
  request: ExactPackageRequest,
): Promise<ExactPackageArchive> {
  const root = await mkdtemp(join(tmpdir(), 'saas-ui-deprecation-pack-'))
  try {
    const output = parseJson(
      await execNpm(exactPackagePackArgs(request.name, request.version, root), {
        authenticated: false,
      }),
      `npm pack ${request.name}@${request.version}`,
    )
    const entry = Array.isArray(output) ? output[0] : undefined
    if (
      !Array.isArray(output) ||
      output.length !== 1 ||
      !entry ||
      typeof entry !== 'object' ||
      Reflect.get(entry, 'name') !== request.name ||
      Reflect.get(entry, 'version') !== request.version
    ) {
      throw new Error(
        `npm pack returned an unexpected identity for ${request.name}@${request.version}`,
      )
    }
    const filename = Reflect.get(entry, 'filename')
    const reportedIntegrity = Reflect.get(entry, 'integrity')
    if (
      typeof filename !== 'string' ||
      filename !== basename(filename) ||
      typeof reportedIntegrity !== 'string' ||
      !EXACT_INTEGRITY.test(reportedIntegrity)
    ) {
      throw new Error(
        `npm pack returned unsafe or incomplete evidence for ${request.name}@${request.version}`,
      )
    }
    const archive = resolve(root, filename)
    if (resolve(root, basename(filename)) !== archive) {
      throw new Error(`npm pack archive escaped its temporary directory`)
    }
    const bytes = await readFile(archive)
    const integrity = `sha512-${createHash('sha512')
      .update(bytes)
      .digest('base64')}`
    if (reportedIntegrity !== integrity) {
      throw new Error(
        `npm pack integrity mismatch for ${request.name}@${request.version}`,
      )
    }
    const files = Object.fromEntries(
      await Promise.all(
        request.files.map(async (relative) => [
          relative,
          await readArchiveFile(archive, relative),
        ]),
      ),
    )
    return { files, integrity }
  } finally {
    await rm(root, { force: true, recursive: true })
  }
}

function parseJson(value: string, label: string): unknown {
  if (!value.trim()) return undefined
  try {
    return JSON.parse(value)
  } catch (error) {
    throw new Error(
      `npm returned invalid JSON for ${label}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

async function npmJson(
  npm: NonNullable<DeprecationAdapters['npm']>,
  spec: string,
  field: string,
) {
  return parseJson(
    await npm([
      'view',
      spec,
      field,
      '--json',
      '--prefer-online',
      `--registry=${DEPRECATION_REGISTRY}`,
    ]),
    `${spec} ${field}`,
  )
}

async function assertPublishedVersion(
  npm: NonNullable<DeprecationAdapters['npm']>,
  name: string,
  version: string,
) {
  const actual = await npmJson(npm, `${name}@${version}`, 'version')
  if (actual !== version) {
    throw new Error(`${name}@${version} is not published exactly as requested`)
  }
}

async function assertDistTag(
  npm: NonNullable<DeprecationAdapters['npm']>,
  name: string,
  channel: DeprecationInputs['channel'],
  version: string,
) {
  const tags = await npmJson(npm, name, 'dist-tags')
  const actual =
    tags && typeof tags === 'object'
      ? Reflect.get(tags as object, channel)
      : undefined
  if (actual !== version) {
    throw new Error(
      `${name} dist-tag ${channel} must equal ${version}; found ${String(actual)}`,
    )
  }
}

async function assertMigrationUrl(fetcher: typeof fetch) {
  const response = await fetcher(DEPRECATION_MIGRATION_URL, {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  })
  if (!response.ok) {
    throw new Error(
      `migration URL returned ${response.status}: ${DEPRECATION_MIGRATION_URL}`,
    )
  }
}

async function assertPresetDependency(
  npm: NonNullable<DeprecationAdapters['npm']>,
  reactVersion: string,
  presetVersion: string,
) {
  const dependency = await npmJson(
    npm,
    `${DEPRECATED_PACKAGE}@${reactVersion}`,
    'dependencies.@saas-ui/chakra-preset',
  )
  if (dependency !== presetVersion) {
    throw new Error(
      `${DEPRECATED_PACKAGE}@${reactVersion} must depend exactly on ` +
        `@saas-ui/chakra-preset@${presetVersion}; found ${String(dependency)}`,
    )
  }
}

function assertReactReadme(readme: string | undefined, reactVersion: string) {
  if (
    typeof readme !== 'string' ||
    !readme.includes(DEPRECATION_MIGRATION_URL) ||
    !readme.includes('@saas-ui/cli') ||
    !readme.includes('@saas-ui/chakra-preset')
  ) {
    throw new Error(
      `${DEPRECATED_PACKAGE}@${reactVersion} tarball README lacks the migration contract`,
    )
  }
}

function assertCliBuildInfo(
  source: string | undefined,
  cliVersion: string,
  presetVersion: string,
) {
  const buildInfo = source
    ? parseJson(source, `@saas-ui/cli@${cliVersion} ${CLI_BUILD_INFO}`)
    : undefined
  const expected = {
    authOrigin: 'https://saas-ui.dev',
    cliVersion,
    kind: 'saas-ui.cli-build-info',
    presetVersion,
    registryUrl: 'https://saas-ui.dev/r',
    schemaUrl: 'https://saas-ui.dev/r/schema/components.json',
    version: 1,
  }
  if (
    !buildInfo ||
    typeof buildInfo !== 'object' ||
    Object.keys(buildInfo).sort().join('\0') !==
      Object.keys(expected).sort().join('\0')
  ) {
    throw new Error(
      `@saas-ui/cli@${cliVersion} tarball lacks the exact production build-info contract`,
    )
  }
  for (const [key, value] of Object.entries(expected)) {
    if (Reflect.get(buildInfo, key) !== value) {
      throw new Error(
        `@saas-ui/cli@${cliVersion} build-info ${key} must equal ${String(value)}`,
      )
    }
  }
}

async function collectPackageIntegrities(
  inputs: DeprecationInputs,
  npm: NonNullable<DeprecationAdapters['npm']>,
  pack: NonNullable<DeprecationAdapters['pack']>,
) {
  const requests = {
    cli: {
      files: [CLI_BUILD_INFO],
      name: '@saas-ui/cli',
      version: inputs.cliVersion,
    },
    preset: {
      files: [],
      name: '@saas-ui/chakra-preset',
      version: inputs.presetVersion,
    },
    react: {
      files: [REACT_README],
      name: DEPRECATED_PACKAGE,
      version: inputs.reactVersion,
    },
  } as const satisfies Record<string, ExactPackageRequest>
  const entries = await Promise.all(
    Object.entries(requests).map(async ([key, request]) => {
      const [expectedIntegrity, archive] = await Promise.all([
        npmJson(npm, `${request.name}@${request.version}`, 'dist.integrity'),
        pack(request),
      ])
      if (
        typeof expectedIntegrity !== 'string' ||
        !EXACT_INTEGRITY.test(expectedIntegrity) ||
        archive.integrity !== expectedIntegrity
      ) {
        throw new Error(
          `${request.name}@${request.version} tarball does not match its published dist.integrity`,
        )
      }
      return [key, { archive, integrity: expectedIntegrity }] as const
    }),
  )
  const evidence = Object.fromEntries(entries) as Record<
    keyof typeof requests,
    { archive: ExactPackageArchive; integrity: string }
  >
  assertReactReadme(
    evidence.react.archive.files[REACT_README],
    inputs.reactVersion,
  )
  assertCliBuildInfo(
    evidence.cli.archive.files[CLI_BUILD_INFO],
    inputs.cliVersion,
    inputs.presetVersion,
  )
  return {
    cli: evidence.cli.integrity,
    preset: evidence.preset.integrity,
    react: evidence.react.integrity,
  }
}

export async function createDeprecationPlan(
  input: DeprecationInputs,
  adapters: DeprecationAdapters = {},
): Promise<DeprecationPlanResult> {
  const inputs = validateDeprecationInputs({ ...input })
  const npm = adapters.npm ?? defaultReadOnlyNpm
  const pack = adapters.pack ?? defaultPackExactPackage
  const fetcher = adapters.fetch ?? fetch

  const [reactCatalog] = await Promise.all([
    readReactCatalog(fetcher),
    assertPublishedVersion(npm, DEPRECATED_PACKAGE, inputs.reactVersion),
    assertPublishedVersion(npm, '@saas-ui/cli', inputs.cliVersion),
    assertPublishedVersion(npm, '@saas-ui/chakra-preset', inputs.presetVersion),
    assertPresetDependency(npm, inputs.reactVersion, inputs.presetVersion),
    assertMigrationUrl(fetcher),
  ])
  assertApprovedCatalog(reactCatalog)
  if (!reactCatalog.deprecatedByVersion.has(inputs.reactVersion)) {
    throw new Error(
      `${DEPRECATED_PACKAGE}@${inputs.reactVersion} is not in the complete published version set`,
    )
  }
  await Promise.all([
    assertDistTag(npm, DEPRECATED_PACKAGE, inputs.channel, inputs.reactVersion),
    assertDistTag(npm, '@saas-ui/cli', inputs.channel, inputs.cliVersion),
    assertDistTag(
      npm,
      '@saas-ui/chakra-preset',
      inputs.channel,
      inputs.presetVersion,
    ),
  ])

  const packageIntegrities = await collectPackageIntegrities(inputs, npm, pack)

  const [cliBin, cliDeprecated, presetDeprecated] = await Promise.all([
    npmJson(npm, `@saas-ui/cli@${inputs.cliVersion}`, 'bin'),
    npmJson(npm, `@saas-ui/cli@${inputs.cliVersion}`, 'deprecated'),
    npmJson(
      npm,
      `@saas-ui/chakra-preset@${inputs.presetVersion}`,
      'deprecated',
    ),
  ])

  if (
    !cliBin ||
    typeof cliBin !== 'object' ||
    Reflect.get(cliBin as object, 'saas-ui') !== 'lib/cli.js'
  ) {
    throw new Error(
      `@saas-ui/cli@${inputs.cliVersion} must publish the saas-ui bin at lib/cli.js`,
    )
  }
  if (cliDeprecated) {
    throw new Error(`@saas-ui/cli@${inputs.cliVersion} is deprecated`)
  }
  if (presetDeprecated) {
    throw new Error(
      `@saas-ui/chakra-preset@${inputs.presetVersion} is deprecated`,
    )
  }
  const alreadyDeprecatedVersions = reactCatalog.versions.filter(
    (version) =>
      reactCatalog.deprecatedByVersion.get(version) === DEPRECATION_MESSAGE,
  )
  const pendingVersions = reactCatalog.versions.filter(
    (version) =>
      reactCatalog.deprecatedByVersion.get(version) !== DEPRECATION_MESSAGE,
  )
  const plan: DeprecationPlan = {
    ...inputs,
    kind: 'saas-ui.react-deprecation-plan',
    message: DEPRECATION_MESSAGE,
    migrationUrl: DEPRECATION_MIGRATION_URL,
    package: DEPRECATED_PACKAGE,
    packageIntegrities,
    planVersion: 3,
    registry: DEPRECATION_REGISTRY,
    targetVersions: reactCatalog.versions,
  }
  const digest = digestDeprecationPlan(plan)
  return {
    alreadyDeprecated: pendingVersions.length === 0,
    alreadyDeprecatedVersions,
    confirmation: confirmationFor(plan, digest),
    digest,
    pendingVersions,
    plan,
  }
}

export async function applyDeprecationPlan(
  input: DeprecationInputs & {
    confirmation: string
    expectedDigest: string
  },
  adapters: DeprecationAdapters = {},
): Promise<
  DeprecationPlanResult & { changed: boolean; changedVersions: string[] }
> {
  const npm = adapters.npm ?? defaultReadOnlyNpm
  const authNpm = adapters.authNpm ?? adapters.npm ?? defaultAuthenticatedNpm
  const planned = await createDeprecationPlan(input, { ...adapters, npm })
  if (!/^[a-f0-9]{64}$/.test(input.expectedDigest)) {
    throw new Error('expectedDigest must be a SHA-256 digest')
  }
  if (planned.digest !== input.expectedDigest) {
    throw new Error(
      `deprecation plan changed: expected ${input.expectedDigest}, found ${planned.digest}`,
    )
  }
  if (input.confirmation !== planned.confirmation) {
    throw new Error(`confirmation must exactly equal: ${planned.confirmation}`)
  }
  if (planned.alreadyDeprecated) {
    return { ...planned, changed: false as const, changedVersions: [] }
  }

  await authNpm(['whoami', `--registry=${DEPRECATION_REGISTRY}`])
  const fetcher = adapters.fetch ?? fetch
  const changedVersions: string[] = []
  for (const version of planned.pendingVersions) {
    const spec = `${DEPRECATED_PACKAGE}@${version}`
    const command = [
      'deprecate',
      spec,
      DEPRECATION_MESSAGE,
      `--registry=${DEPRECATION_REGISTRY}`,
    ] as const
    await authNpm([...command, '--dry-run'])

    let currentCatalog: ReactCatalog
    try {
      currentCatalog = await readReactCatalog(fetcher)
      assertApprovedCatalog(currentCatalog, planned.plan.targetVersions)
    } catch (error) {
      throw new Error(
        `Stopped before mutating ${spec}; ${changedVersions.length} earlier exact ` +
          `version(s) were already changed in this run. ${
            error instanceof Error ? error.message : String(error)
          }`,
        { cause: error },
      )
    }
    if (
      currentCatalog.deprecatedByVersion.get(version) === DEPRECATION_MESSAGE
    ) {
      continue
    }

    try {
      await authNpm(command)
      changedVersions.push(version)
    } catch (error) {
      throw new Error(
        `npm deprecation returned an error and may have succeeded; inspect ${spec} ` +
          `before retrying. ${changedVersions.length} earlier exact version(s) were ` +
          `already changed in this run: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  const sleep =
    adapters.sleep ??
    ((milliseconds: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, milliseconds)))
  let lastError: unknown
  for (const delay of POSTVERIFY_DELAYS) {
    if (delay) await sleep(delay)
    try {
      const verified = await createDeprecationPlan(input, { ...adapters, npm })
      if (verified.digest !== planned.digest) {
        throw new Error(
          `${DEPRECATED_PACKAGE} published version set or immutable evidence changed during post-verification`,
        )
      }
      if (!verified.alreadyDeprecated) {
        throw new Error(
          `${verified.pendingVersions.length} approved exact version(s) do not expose the approved message yet`,
        )
      }
      return {
        ...verified,
        changed: changedVersions.length > 0,
        changedVersions,
      }
    } catch (error) {
      lastError = error
    }
  }
  throw new Error(
    `post-verification failed after npm mutation; the deprecation may have ` +
      `partially or fully succeeded for ${changedVersions.length} exact version(s). ` +
      `Inspect the approved set and do not blindly retry: ${
        lastError instanceof Error ? lastError.message : String(lastError)
      }`,
  )
}

function inputsFromEnvironment(): DeprecationInputs {
  return {
    channel: process.env.SAAS_UI_RELEASE_CHANNEL as 'latest' | 'next',
    cliVersion: process.env.SAAS_UI_CLI_VERSION ?? '',
    controlCommit: process.env.SAAS_UI_DEPRECATION_CONTROL_COMMIT ?? '',
    presetVersion: process.env.SAAS_UI_PRESET_VERSION ?? '',
    reactVersion: process.env.SAAS_UI_REACT_VERSION ?? '',
  }
}

async function writeOutput(name: string, value: string) {
  const output = process.env.GITHUB_OUTPUT
  if (output) await appendFile(output, `${name}=${value}\n`)
}

async function main() {
  const mode = process.argv[2]
  if (mode !== 'plan' && mode !== 'apply') {
    throw new Error('usage: react-deprecation.ts <plan|apply>')
  }
  if (process.env.GITHUB_REF && process.env.GITHUB_REF !== 'refs/heads/v3') {
    throw new Error('npm deprecation is restricted to refs/heads/v3')
  }
  if (
    process.env.GITHUB_SHA &&
    process.env.SAAS_UI_DEPRECATION_CONTROL_COMMIT !== process.env.GITHUB_SHA
  ) {
    throw new Error('control commit must equal the checked-out workflow commit')
  }
  const inputs = inputsFromEnvironment()
  if (mode === 'apply') {
    if (process.env.SAAS_UI_DEPRECATION_EXECUTE !== 'true') {
      throw new Error('apply requires SAAS_UI_DEPRECATION_EXECUTE=true')
    }
    if (!process.env.NODE_AUTH_TOKEN) {
      throw new Error('apply requires NODE_AUTH_TOKEN')
    }
  }
  const result =
    mode === 'plan'
      ? await createDeprecationPlan(inputs)
      : await applyDeprecationPlan({
          ...inputs,
          confirmation: process.env.SAAS_UI_DEPRECATION_CONFIRMATION ?? '',
          expectedDigest: process.env.SAAS_UI_DEPRECATION_PLAN_DIGEST ?? '',
        })

  console.log(`${JSON.stringify(result.plan, null, 2)}\n`)
  console.log(`Plan digest: ${result.digest}`)
  console.log(`Required confirmation: ${result.confirmation}`)
  if ('changed' in result) {
    const changedVersions =
      'changedVersions' in result && Array.isArray(result.changedVersions)
        ? result.changedVersions
        : []
    console.log(
      result.changed
        ? `${changedVersions.length} exact package version(s) deprecated and the complete set post-verified.`
        : 'Every exact package version already had the approved message; no mutation.',
    )
  } else {
    console.log('Read-only plan complete; npm was not mutated.')
  }
  await Promise.all([
    writeOutput('digest', result.digest),
    writeOutput('confirmation', result.confirmation),
    writeOutput('target_count', String(result.plan.targetVersions.length)),
  ])
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
