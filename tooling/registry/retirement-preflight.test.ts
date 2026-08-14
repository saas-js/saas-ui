import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import type { LegacyCheckResult } from './legacy-check'
import {
  MIGRATION_URL,
  RetirementPreflightError,
  runRetirementPreflight,
} from './retirement-preflight'

const temporaryRoots: string[] = []

async function write(root: string, relative: string, content: string) {
  const target = path.join(root, relative)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, content)
}

function legacyResult(
  overrides: Partial<LegacyCheckResult> = {},
): LegacyCheckResult {
  return {
    files: 42,
    references: [],
    scopes: ['public', 'internal'],
    skippedScopes: [],
    ...overrides,
  }
}

const releasePlan = async () => ({
  preState: { mode: 'pre', tag: 'rc' },
  releases: [
    { name: '@saas-ui/cli', type: 'minor', newVersion: '0.1.0-rc.0' },
    {
      name: '@saas-ui/chakra-preset',
      type: 'minor',
      newVersion: '3.0.0-rc.0',
    },
  ],
})

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'retirement-preflight-'))
  temporaryRoots.push(root)
  await write(
    root,
    '.changeset/registry-template-transition.md',
    `---
'@saas-ui/cli': minor
'@saas-ui/chakra-preset': minor
---

Compatibility release.
`,
  )
  await write(
    root,
    '.changeset/config.json',
    JSON.stringify({ baseBranch: 'v3' }),
  )
  await write(
    root,
    '.changeset/pre.json',
    JSON.stringify({ mode: 'pre', tag: 'rc' }),
  )
  await write(
    root,
    'MIGRATION.md',
    `Use @saas-ui/chakra-preset and @saas-ui/cli.
Run migrate react-to-registry.
Package lifecycle status is determined by published npm metadata.
`,
  )
  for (const relative of [
    'packages/saas-ui-chakra-preset/README.md',
    'packages/saas-ui-cli/README.md',
    'packages/saas-ui-react/README.md',
    'packages/saas-ui-tailwind-preset/README.md',
  ]) {
    await write(root, relative, `Migration: ${MIGRATION_URL}\n`)
  }
  await write(
    root,
    'packages/saas-ui-react/README.md',
    `Unstyled React primitives for Saas UI.
Migration: ${MIGRATION_URL}
`,
  )
  await write(
    root,
    'packages/saas-ui-react/package.json',
    JSON.stringify({ name: '@saas-ui/react', version: '3.0.0' }),
  )
  await write(
    root,
    'packages/saas-ui-chakra-preset/package.json',
    JSON.stringify({
      name: '@saas-ui/chakra-preset',
      version: '3.0.0',
    }),
  )
  await write(
    root,
    'packages/saas-ui-cli/package.json',
    JSON.stringify({
      bin: { 'saas-ui': 'lib/cli.js' },
      files: ['lib'],
      name: '@saas-ui/cli',
      version: '1.0.0',
    }),
  )
  await write(
    root,
    'packages/saas-ui-cli/src/commands/migrate/react-to-registry/command.ts',
    'export {}\n',
  )
  await write(
    root,
    'packages/saas-ui-cli/src/commands/migrate/react-to-registry/impl.ts',
    'export {}\n',
  )
  await write(
    root,
    'packages/saas-ui-cli/lib/cli.js',
    `#!/usr/bin/env node
https://saas-ui.dev
https://saas-ui.dev/r
https://saas-ui.dev/r/schema/components.json
3.0.0
1.0.0
`,
  )
  await write(root, 'packages/saas-ui-cli/lib/bash-complete.js', 'export {}\n')
  await write(
    root,
    'packages/saas-ui-cli/lib/release-contract.js',
    [
      'https://saas-ui.dev',
      'https://saas-ui.dev/r',
      'https://saas-ui.dev/r/schema/components.json',
      '3.0.0',
      '1.0.0',
    ].join('\n'),
  )
  await write(
    root,
    'packages/saas-ui-cli/lib/build-info.json',
    `${JSON.stringify(
      {
        authOrigin: 'https://saas-ui.dev',
        cliVersion: '1.0.0',
        kind: 'saas-ui.cli-build-info',
        presetVersion: '3.0.0',
        registryUrl: 'https://saas-ui.dev/r',
        schemaUrl: 'https://saas-ui.dev/r/schema/components.json',
        version: 1,
      },
      null,
      2,
    )}\n`,
  )
  return root
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots
      .splice(0)
      .map((root) => rm(root, { force: true, recursive: true })),
  )
})

describe('react package retirement preflight', () => {
  test('reports repository readiness without claiming npm side effects', async () => {
    const root = await fixture()
    const report = await runRetirementPreflight({
      repositoryRoot: root,
      releasePlan,
      scanLegacy: async () => legacyResult(),
    })

    expect(report).toMatchObject({
      legacyFiles: 42,
      legacyScopes: 2,
      stage: 'repository-ready-for-compatibility-release',
    })
    expect(report.releaseVersions).toEqual({
      '@saas-ui/chakra-preset': '3.0.0-rc.0',
      '@saas-ui/cli': '0.1.0-rc.0',
    })
    expect(report.checks).toHaveLength(10)
  })

  test('accepts the versioned release state after Changesets consumes the transition', async () => {
    const root = await fixture()
    await rm(path.join(root, '.changeset/registry-template-transition.md'), {
      force: true,
    })
    await write(
      root,
      'packages/saas-ui-cli/package.json',
      JSON.stringify({
        bin: { 'saas-ui': 'lib/cli.js' },
        files: ['lib'],
        name: '@saas-ui/cli',
        version: '0.1.0-rc.0',
      }),
    )
    await write(
      root,
      'packages/saas-ui-chakra-preset/package.json',
      JSON.stringify({
        name: '@saas-ui/chakra-preset',
        version: '3.0.0-rc.0',
      }),
    )
    await write(
      root,
      'packages/saas-ui-react/package.json',
      JSON.stringify({
        name: '@saas-ui/react',
        version: '3.0.0-rc.0',
      }),
    )
    const releaseValues = [
      'https://saas-ui.dev',
      'https://saas-ui.dev/r',
      'https://saas-ui.dev/r/schema/components.json',
      '3.0.0-rc.0',
      '0.1.0-rc.0',
    ].join('\n')
    await write(
      root,
      'packages/saas-ui-cli/lib/cli.js',
      `#!/usr/bin/env node\n${releaseValues}\n`,
    )
    await write(
      root,
      'packages/saas-ui-cli/lib/bash-complete.js',
      'export {}\n',
    )
    await write(
      root,
      'packages/saas-ui-cli/lib/release-contract.js',
      releaseValues,
    )
    await write(
      root,
      'packages/saas-ui-cli/lib/build-info.json',
      JSON.stringify({
        authOrigin: 'https://saas-ui.dev',
        cliVersion: '0.1.0-rc.0',
        kind: 'saas-ui.cli-build-info',
        presetVersion: '3.0.0-rc.0',
        registryUrl: 'https://saas-ui.dev/r',
        schemaUrl: 'https://saas-ui.dev/r/schema/components.json',
        version: 1,
      }),
    )
    const releasePlan = async () => {
      throw new Error('release plan must not run after versioning')
    }

    const report = await runRetirementPreflight({
      repositoryRoot: root,
      releasePlan,
      scanLegacy: async () => legacyResult(),
    })

    expect(report.checks).toHaveLength(10)
    expect(report.releaseVersions).toEqual({
      '@saas-ui/chakra-preset': '3.0.0-rc.0',
      '@saas-ui/cli': '0.1.0-rc.0',
    })
  })

  test('rejects an absent transition changeset before manifests are versioned', async () => {
    const root = await fixture()
    await rm(path.join(root, '.changeset/registry-template-transition.md'), {
      force: true,
    })

    await expect(
      runRetirementPreflight({
        repositoryRoot: root,
        releasePlan,
        scanLegacy: async () => legacyResult(),
      }),
    ).rejects.toThrow('must contain the versioned compatibility release')
  })

  test('rejects a missing transition changeset bump', async () => {
    const root = await fixture()
    await write(
      root,
      '.changeset/registry-template-transition.md',
      `---
'@saas-ui/cli': minor
---
`,
    )

    await expect(
      runRetirementPreflight({
        repositoryRoot: root,
        releasePlan,
        scanLegacy: async () => legacyResult(),
      }),
    ).rejects.toThrow("must declare '@saas-ui/chakra-preset': minor")
  })

  test('rejects tarball-unsafe migration links', async () => {
    const root = await fixture()
    await write(
      root,
      'packages/saas-ui-cli/README.md',
      `${MIGRATION_URL}\n../../MIGRATION.md\n`,
    )

    await expect(
      runRetirementPreflight({
        repositoryRoot: root,
        releasePlan,
        scanLegacy: async () => legacyResult(),
      }),
    ).rejects.toThrow('package-tarball-unsafe relative migration link')
  })

  test('fails when the legacy guard finds an unapproved runtime reference', async () => {
    const root = await fixture()

    await expect(
      runRetirementPreflight({
        repositoryRoot: root,
        releasePlan,
        scanLegacy: async () =>
          legacyResult({
            references: [
              {
                column: 1,
                line: 1,
                package: '@saas-ui/react',
                path: 'app.tsx',
                scope: 'internal',
                specifier: '@saas-ui/react',
              },
            ],
          }),
      }),
    ).rejects.toBeInstanceOf(RetirementPreflightError)
  })

  test('rejects a computed release plan with the wrong package bump', async () => {
    const root = await fixture()

    await expect(
      runRetirementPreflight({
        repositoryRoot: root,
        releasePlan: async () => ({
          preState: { mode: 'pre', tag: 'rc' },
          releases: [
            {
              name: '@saas-ui/cli',
              type: 'minor',
              newVersion: '0.1.0-rc.0',
            },
            {
              name: '@saas-ui/chakra-preset',
              type: 'patch',
              newVersion: '3.0.0-rc.0',
            },
          ],
        }),
        scanLegacy: async () => legacyResult(),
      }),
    ).rejects.toThrow(
      'computed Changesets plan must release @saas-ui/chakra-preset as minor',
    )
  })

  test('rejects a built CLI that still contains beta endpoints', async () => {
    const root = await fixture()
    await write(
      root,
      'packages/saas-ui-cli/lib/release-contract.js',
      [
        'https://saas-ui.dev',
        'https://saas-ui.dev/r',
        'https://saas-ui.dev/r/schema/components.json',
        'https://beta.saas-ui.dev/r',
        '3.0.0',
        '1.0.0',
      ].join('\n'),
    )

    await expect(
      runRetirementPreflight({
        repositoryRoot: root,
        releasePlan,
        scanLegacy: async () => legacyResult(),
      }),
    ).rejects.toThrow(
      'built CLI contains forbidden release value: beta.saas-ui.dev',
    )
  })

  test.each([
    'https://saas-ui.dev/r/schema.json',
    'http://localhost:3020/r',
    'http://127.0.0.1:3020/r',
  ])('rejects the stale or local built CLI value %s', async (value) => {
    const root = await fixture()
    await write(
      root,
      'packages/saas-ui-cli/lib/release-contract.js',
      [
        'https://saas-ui.dev',
        'https://saas-ui.dev/r',
        'https://saas-ui.dev/r/schema/components.json',
        '3.0.0',
        '1.0.0',
        value,
      ].join('\n'),
    )

    await expect(
      runRetirementPreflight({
        repositoryRoot: root,
        releasePlan,
        scanLegacy: async () => legacyResult(),
      }),
    ).rejects.toThrow(`built CLI contains forbidden release value: ${value}`)
  })

  test('rejects stale machine-readable CLI build metadata', async () => {
    const root = await fixture()
    await write(
      root,
      'packages/saas-ui-cli/lib/build-info.json',
      `${JSON.stringify({
        authOrigin: 'https://saas-ui.dev',
        cliVersion: '1.0.0',
        kind: 'saas-ui.cli-build-info',
        presetVersion: '3.0.0-next.8',
        registryUrl: 'https://saas-ui.dev/r',
        schemaUrl: 'https://saas-ui.dev/r/schema/components.json',
        version: 1,
      })}\n`,
    )

    await expect(
      runRetirementPreflight({
        repositoryRoot: root,
        releasePlan,
        scanLegacy: async () => legacyResult(),
      }),
    ).rejects.toThrow(
      'CLI build info presetVersion must equal 3.0.0; found 3.0.0-next.8',
    )
  })
})
