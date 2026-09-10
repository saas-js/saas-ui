import { describe, expect, test, vi } from 'vitest'

import {
  DEPRECATION_MESSAGE,
  DEPRECATION_MIGRATION_URL,
  DEPRECATION_PACKUMENT_URL,
  type ExactPackageRequest,
  applyDeprecationPlan,
  createDeprecationPlan,
  exactPackagePackArgs,
  validateDeprecationInputs,
} from './react-deprecation'

const inputs = {
  channel: 'next' as const,
  cliVersion: '0.1.0-next.2',
  controlCommit: '0123456789abcdef0123456789abcdef01234567',
  presetVersion: '3.0.0-next.9',
  reactVersion: '3.0.0-next.55',
}

const reactVersions = [inputs.reactVersion, '1.0.0', '2.4.1'] as const

const packageIntegrities = {
  '@saas-ui/chakra-preset': `sha512-${'A'.repeat(88)}`,
  '@saas-ui/cli': `sha512-${'B'.repeat(88)}`,
  '@saas-ui/react': `sha512-${'C'.repeat(88)}`,
} as const

const cliBuildInfo = JSON.stringify({
  authOrigin: 'https://saas-ui.dev',
  cliVersion: inputs.cliVersion,
  kind: 'saas-ui.cli-build-info',
  presetVersion: inputs.presetVersion,
  registryUrl: 'https://saas-ui.dev/r',
  schemaUrl: 'https://saas-ui.dev/r/schema/components.json',
  version: 1,
})

function adapters(
  overrides: Record<string, unknown> = {},
  initialDeprecated?: string | Record<string, string | undefined>,
  packImplementation?: (request: ExactPackageRequest) => Promise<{
    files: Record<string, string>
    integrity: string
  }>,
) {
  const publishedVersions = [
    ...((overrides['@saas-ui/react|versions'] as string[] | undefined) ??
      reactVersions),
  ]
  const deprecatedByVersion = new Map(
    publishedVersions.map((version) => [
      version,
      typeof initialDeprecated === 'string'
        ? initialDeprecated
        : initialDeprecated?.[version],
    ]),
  )
  const values: Record<string, unknown> = {
    '@saas-ui/react@3.0.0-next.55|version': inputs.reactVersion,
    '@saas-ui/cli@0.1.0-next.2|version': inputs.cliVersion,
    '@saas-ui/chakra-preset@3.0.0-next.9|version': inputs.presetVersion,
    '@saas-ui/react|dist-tags': { next: inputs.reactVersion },
    '@saas-ui/cli|dist-tags': { next: inputs.cliVersion },
    '@saas-ui/chakra-preset|dist-tags': { next: inputs.presetVersion },
    '@saas-ui/cli@0.1.0-next.2|bin': { 'saas-ui': 'lib/cli.js' },
    '@saas-ui/cli@0.1.0-next.2|deprecated': undefined,
    '@saas-ui/chakra-preset@3.0.0-next.9|deprecated': undefined,
    '@saas-ui/react@3.0.0-next.55|dist.integrity':
      packageIntegrities['@saas-ui/react'],
    '@saas-ui/cli@0.1.0-next.2|dist.integrity':
      packageIntegrities['@saas-ui/cli'],
    '@saas-ui/chakra-preset@3.0.0-next.9|dist.integrity':
      packageIntegrities['@saas-ui/chakra-preset'],
    '@saas-ui/react@3.0.0-next.55|dependencies.@saas-ui/chakra-preset':
      inputs.presetVersion,
    ...overrides,
  }
  const npm = vi.fn(async (args: readonly string[]) => {
    if (args[0] === 'whoami') return 'release-bot'
    if (args[0] === 'deprecate') {
      if (!args.includes('--dry-run')) {
        const spec = args[1] ?? ''
        const version = spec.slice(spec.lastIndexOf('@') + 1)
        deprecatedByVersion.set(version, DEPRECATION_MESSAGE)
      }
      return ''
    }
    const key = `${args[1]}|${args[2]}`
    const value = values[key]
    return value === undefined ? '' : JSON.stringify(value)
  })
  const pack = vi.fn(
    packImplementation ??
      (async (request: ExactPackageRequest) => ({
        files:
          request.name === '@saas-ui/react'
            ? {
                'README.md': `Use @saas-ui/cli and @saas-ui/chakra-preset. ${DEPRECATION_MIGRATION_URL}`,
              }
            : request.name === '@saas-ui/cli'
              ? { 'lib/build-info.json': cliBuildInfo }
              : {},
        integrity:
          packageIntegrities[request.name as keyof typeof packageIntegrities],
      })),
  )
  return {
    fetch: vi.fn(async (input: string | URL | Request) => {
      if (String(input) !== DEPRECATION_PACKUMENT_URL) {
        return new Response('ok', { status: 200 })
      }
      return Response.json({
        versions: Object.fromEntries(
          publishedVersions.map((version) => [
            version,
            {
              version,
              ...(deprecatedByVersion.get(version) === undefined
                ? {}
                : { deprecated: deprecatedByVersion.get(version) }),
            },
          ]),
        ),
      })
    }),
    npm,
    pack,
  }
}

describe('react npm deprecation plan', () => {
  test('creates a deterministic read-only complete-version plan', async () => {
    const mocks = adapters()
    const first = await createDeprecationPlan(inputs, mocks)
    const second = await createDeprecationPlan(inputs, mocks)

    expect(first).toEqual(second)
    expect(first.digest).toMatch(/^[a-f0-9]{64}$/)
    expect(first.plan.planVersion).toBe(3)
    expect(first.plan.targetVersions).toEqual([
      '1.0.0',
      '2.4.1',
      inputs.reactVersion,
    ])
    expect(first.pendingVersions).toEqual(first.plan.targetVersions)
    expect(first.alreadyDeprecatedVersions).toEqual([])
    expect(first.plan.controlCommit).toBe(inputs.controlCommit)
    expect(first.plan.packageIntegrities).toEqual({
      cli: packageIntegrities['@saas-ui/cli'],
      preset: packageIntegrities['@saas-ui/chakra-preset'],
      react: packageIntegrities['@saas-ui/react'],
    })
    expect(first.confirmation).toBe(
      `DEPRECATE @saas-ui/react ALL 3 VERSIONS AT ${inputs.controlCommit} ${first.digest}`,
    )
    expect(mocks.npm).not.toHaveBeenCalledWith(
      expect.arrayContaining(['deprecate']),
    )
    expect(mocks.fetch).toHaveBeenCalledWith(
      DEPRECATION_PACKUMENT_URL,
      expect.objectContaining({ method: 'GET', redirect: 'error' }),
    )
    expect(mocks.npm.mock.calls.some(([args]) => args[2] === 'readme')).toBe(
      false,
    )
    expect(mocks.pack).toHaveBeenCalledTimes(6)
  })

  test('packs exact packages with lifecycle scripts disabled', () => {
    expect(
      exactPackagePackArgs('@saas-ui/react', inputs.reactVersion, '/tmp/pack'),
    ).toEqual(
      expect.arrayContaining([
        'pack',
        `@saas-ui/react@${inputs.reactVersion}`,
        '--json',
        '--ignore-scripts=true',
      ]),
    )
  })

  test('rejects non-exact or injectable versions before npm access', async () => {
    expect(() =>
      validateDeprecationInputs({
        ...inputs,
        reactVersion: '3.0.0-next.55; npm unpublish',
      }),
    ).toThrow('must be an exact SemVer version')
  })

  test('fails closed when a release channel moved', async () => {
    await expect(
      createDeprecationPlan(
        inputs,
        adapters({
          '@saas-ui/cli|dist-tags': { next: '0.1.0-next.3' },
        }),
      ),
    ).rejects.toThrow('dist-tag next must equal')
  })

  test('requires the exact published CLI entry point', async () => {
    await expect(
      createDeprecationPlan(
        inputs,
        adapters({
          '@saas-ui/cli@0.1.0-next.2|bin': { 'saas-ui': 'dist/cli.js' },
        }),
      ),
    ).rejects.toThrow('must publish the saas-ui bin at lib/cli.js')
  })

  test('requires the compatibility release to depend on the selected preset', async () => {
    await expect(
      createDeprecationPlan(
        inputs,
        adapters({
          '@saas-ui/react@3.0.0-next.55|dependencies.@saas-ui/chakra-preset':
            '3.0.0-next.8',
        }),
      ),
    ).rejects.toThrow('must depend exactly on')
  })

  test('requires exact tarball integrity and the React tarball README', async () => {
    await expect(
      createDeprecationPlan(
        inputs,
        adapters({}, undefined, async (request) => ({
          files:
            request.name === '@saas-ui/react'
              ? { 'README.md': 'legacy package' }
              : request.name === '@saas-ui/cli'
                ? { 'lib/build-info.json': cliBuildInfo }
                : {},
          integrity:
            packageIntegrities[request.name as keyof typeof packageIntegrities],
        })),
      ),
    ).rejects.toThrow('tarball README lacks the migration contract')

    await expect(
      createDeprecationPlan(
        inputs,
        adapters({}, undefined, async (request) => ({
          files:
            request.name === '@saas-ui/react'
              ? {
                  'README.md': `@saas-ui/cli @saas-ui/chakra-preset ${DEPRECATION_MIGRATION_URL}`,
                }
              : request.name === '@saas-ui/cli'
                ? { 'lib/build-info.json': cliBuildInfo }
                : {},
          integrity:
            request.name === '@saas-ui/react'
              ? `sha512-${'D'.repeat(88)}`
              : packageIntegrities[
                  request.name as keyof typeof packageIntegrities
                ],
        })),
      ),
    ).rejects.toThrow('does not match its published dist.integrity')
  })

  test('requires the exact production CLI build-info from its tarball', async () => {
    await expect(
      createDeprecationPlan(
        inputs,
        adapters({}, undefined, async (request) => ({
          files:
            request.name === '@saas-ui/react'
              ? {
                  'README.md': `@saas-ui/cli @saas-ui/chakra-preset ${DEPRECATION_MIGRATION_URL}`,
                }
              : request.name === '@saas-ui/cli'
                ? {
                    'lib/build-info.json': JSON.stringify({
                      ...JSON.parse(cliBuildInfo),
                      registryUrl: 'https://example.com/r',
                    }),
                  }
                : {},
          integrity:
            packageIntegrities[request.name as keyof typeof packageIntegrities],
        })),
      ),
    ).rejects.toThrow('build-info registryUrl must equal')
  })

  test('rejects conflicting existing deprecation metadata', async () => {
    const mocks = adapters({}, { '2.4.1': 'Use an unrelated package' })

    await expect(createDeprecationPlan(inputs, mocks)).rejects.toThrow(
      'conflicting deprecation metadata',
    )
  })

  test('binds the canonical complete version set into the plan digest', async () => {
    const baseline = await createDeprecationPlan(inputs, adapters())
    const expanded = await createDeprecationPlan(
      inputs,
      adapters({
        '@saas-ui/react|versions': [...reactVersions, '2.10.0'],
      }),
    )

    expect(expanded.plan.targetVersions).toEqual([
      '1.0.0',
      '2.10.0',
      '2.4.1',
      inputs.reactVersion,
    ])
    expect(expanded.digest).not.toBe(baseline.digest)
    expect(expanded.confirmation).toContain('ALL 4 VERSIONS')
  })

  test('requires the current digest and exact confirmation before mutation', async () => {
    const mocks = adapters()
    const plan = await createDeprecationPlan(inputs, mocks)

    await expect(
      applyDeprecationPlan(
        {
          ...inputs,
          confirmation: 'DEPRECATE',
          expectedDigest: plan.digest,
        },
        mocks,
      ),
    ).rejects.toThrow('confirmation must exactly equal')
    expect(mocks.npm.mock.calls.some(([args]) => args[0] === 'deprecate')).toBe(
      false,
    )
  })

  test('binds apply to the control commit used by the reviewed plan', async () => {
    const mocks = adapters()
    const plan = await createDeprecationPlan(inputs, mocks)

    await expect(
      applyDeprecationPlan(
        {
          ...inputs,
          controlCommit: 'abcdef0123456789abcdef0123456789abcdef01',
          confirmation: plan.confirmation,
          expectedDigest: plan.digest,
        },
        mocks,
      ),
    ).rejects.toThrow('deprecation plan changed')
    expect(mocks.npm.mock.calls.some(([args]) => args[0] === 'deprecate')).toBe(
      false,
    )
  })

  test('binds apply to the planned immutable tarball identities', async () => {
    const plannedAdapters = adapters()
    const plan = await createDeprecationPlan(inputs, plannedAdapters)
    const replacementIntegrity = `sha512-${'D'.repeat(88)}`
    const replacementAdapters = adapters(
      {
        '@saas-ui/react@3.0.0-next.55|dist.integrity': replacementIntegrity,
      },
      undefined,
      async (request) => ({
        files:
          request.name === '@saas-ui/react'
            ? {
                'README.md': `@saas-ui/cli @saas-ui/chakra-preset ${DEPRECATION_MIGRATION_URL}`,
              }
            : request.name === '@saas-ui/cli'
              ? { 'lib/build-info.json': cliBuildInfo }
              : {},
        integrity:
          request.name === '@saas-ui/react'
            ? replacementIntegrity
            : packageIntegrities[
                request.name as keyof typeof packageIntegrities
              ],
      }),
    )

    await expect(
      applyDeprecationPlan(
        {
          ...inputs,
          confirmation: plan.confirmation,
          expectedDigest: plan.digest,
        },
        replacementAdapters,
      ),
    ).rejects.toThrow('deprecation plan changed')
    expect(
      replacementAdapters.npm.mock.calls.some(
        ([args]) => args[0] === 'deprecate',
      ),
    ).toBe(false)
  })

  test('dry-runs, applies, and post-verifies every approved exact version', async () => {
    const mocks = adapters()
    const readNpm = vi.fn(mocks.npm)
    const authNpm = vi.fn(mocks.npm)
    const testAdapters = {
      authNpm,
      fetch: mocks.fetch,
      npm: readNpm,
      pack: mocks.pack,
    }
    const plan = await createDeprecationPlan(inputs, testAdapters)
    const result = await applyDeprecationPlan(
      {
        ...inputs,
        confirmation: plan.confirmation,
        expectedDigest: plan.digest,
      },
      testAdapters,
    )

    expect(result.changed).toBe(true)
    const mutations = authNpm.mock.calls
      .map(([args]) => args)
      .filter((args) => args[0] === 'deprecate')
    expect(mutations).toHaveLength(6)
    expect(mutations.filter((args) => args.includes('--dry-run'))).toHaveLength(
      3,
    )
    expect(
      mutations
        .filter((args) => !args.includes('--dry-run'))
        .map((args) => args[1]),
    ).toEqual([
      '@saas-ui/react@1.0.0',
      '@saas-ui/react@2.4.1',
      `@saas-ui/react@${inputs.reactVersion}`,
    ])
    expect(result.changedVersions).toEqual([
      '1.0.0',
      '2.4.1',
      inputs.reactVersion,
    ])
    expect(readNpm.mock.calls.every(([args]) => args[0] === 'view')).toBe(true)
  })

  test('is idempotent when every exact version has the approved message', async () => {
    const mocks = adapters({}, DEPRECATION_MESSAGE)
    const authNpm = vi.fn(mocks.npm)
    const plan = await createDeprecationPlan(inputs, mocks)
    const result = await applyDeprecationPlan(
      {
        ...inputs,
        confirmation: plan.confirmation,
        expectedDigest: plan.digest,
      },
      { ...mocks, authNpm },
    )

    expect(result.changed).toBe(false)
    expect(authNpm).not.toHaveBeenCalled()
  })

  test('rechecks the version set and fails closed before each exact mutation', async () => {
    const mocks = adapters()
    const plan = await createDeprecationPlan(inputs, mocks)
    let catalogReads = 0
    const fetcher = vi.fn(async (input: string | URL | Request) => {
      const response = await mocks.fetch(input)
      if (String(input) !== DEPRECATION_PACKUMENT_URL) return response
      catalogReads += 1
      if (catalogReads < 3) return response
      const payload = (await response.json()) as {
        versions: Record<string, unknown>
      }
      payload.versions['3.0.0-next.56'] = { version: '3.0.0-next.56' }
      return Response.json(payload)
    })
    const authNpm = vi.fn(mocks.npm)

    await expect(
      applyDeprecationPlan(
        {
          ...inputs,
          confirmation: plan.confirmation,
          expectedDigest: plan.digest,
        },
        { ...mocks, authNpm, fetch: fetcher },
      ),
    ).rejects.toThrow('published version set changed after approval')
    expect(
      authNpm.mock.calls
        .map(([args]) => args)
        .filter(
          (args) => args[0] === 'deprecate' && !args.includes('--dry-run'),
        )
        .map((args) => args[1]),
    ).toEqual(['@saas-ui/react@1.0.0'])
  })

  test('retries full read-only evidence after registry propagation delay', async () => {
    const mocks = adapters()
    const plan = await createDeprecationPlan(inputs, mocks)
    let staleReads = 0
    const authNpm = vi.fn(async (args: readonly string[]) => {
      const result = await mocks.npm(args)
      if (args[0] === 'deprecate' && !args.includes('--dry-run')) staleReads = 2
      return result
    })
    const readNpm = vi.fn(mocks.npm)
    const fetcher = vi.fn(async (input: string | URL | Request) => {
      const response = await mocks.fetch(input)
      if (String(input) !== DEPRECATION_PACKUMENT_URL || staleReads === 0) {
        return response
      }
      staleReads -= 1
      const payload = (await response.json()) as {
        versions: Record<string, { deprecated?: string }>
      }
      delete payload.versions[inputs.reactVersion]?.deprecated
      return Response.json(payload)
    })
    const sleep = vi.fn(async () => {})

    const result = await applyDeprecationPlan(
      {
        ...inputs,
        confirmation: plan.confirmation,
        expectedDigest: plan.digest,
      },
      { authNpm, fetch: fetcher, npm: readNpm, pack: mocks.pack, sleep },
    )

    expect(result.changed).toBe(true)
    expect(sleep).toHaveBeenNthCalledWith(1, 1_000)
    expect(sleep).toHaveBeenNthCalledWith(2, 3_000)
  })
})
