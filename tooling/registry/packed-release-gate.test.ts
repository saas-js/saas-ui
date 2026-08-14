import { access, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import {
  type PackedReleaseArtifact,
  runPackedReleaseGate,
  verifyPackedReleaseArtifacts,
  verifyPublishedArtifactCompatibility,
} from './packed-release-gate'
import { MIGRATION_URL } from './retirement-preflight'

const roots: string[] = []
const versions = new Map([
  ['@saas-ui/cli', '0.1.0-next.2'],
  ['@saas-ui/chakra-preset', '3.0.0-next.10'],
  ['@saas-ui/react', '3.0.0-next.56'],
])

function json(value: unknown) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`)
}

function artifact(
  name: string,
  files: Record<string, Buffer | string>,
): PackedReleaseArtifact {
  const version = versions.get(name)!
  return {
    archive: `/temporary/${name}.tgz`,
    files: new Map(
      Object.entries(files).map(([file, content]) => [
        file,
        Buffer.isBuffer(content) ? content : Buffer.from(content),
      ]),
    ),
    name,
    version,
  }
}

function fixtures() {
  const cliVersion = versions.get('@saas-ui/cli')!
  const presetVersion = versions.get('@saas-ui/chakra-preset')!
  const reactVersion = versions.get('@saas-ui/react')!
  const migrationReadme = `Migrate with ${MIGRATION_URL}\n`
  const releaseValues = [
    'https://saas-ui.dev',
    'https://saas-ui.dev/r',
    'https://saas-ui.dev/r/schema/components.json',
    cliVersion,
    presetVersion,
  ].join('\n')
  return [
    artifact('@saas-ui/cli', {
      'README.md': migrationReadme,
      'package.json': json({ name: '@saas-ui/cli', version: cliVersion }),
      'lib/bash-complete.js': releaseValues,
      'lib/build-info.json': json({
        authOrigin: 'https://saas-ui.dev',
        cliVersion,
        kind: 'saas-ui.cli-build-info',
        presetVersion,
        registryUrl: 'https://saas-ui.dev/r',
        schemaUrl: 'https://saas-ui.dev/r/schema/components.json',
        version: 1,
      }),
      'lib/cli.js': releaseValues,
    }),
    artifact('@saas-ui/chakra-preset', {
      'README.md': migrationReadme,
      'dist/colors.d.ts': 'export declare const colors: unknown\n',
      'dist/colors.js': 'export const colors = {}\n',
      'dist/index.d.ts': 'export declare const defaultSystem: unknown\n',
      'dist/index.js': 'export const defaultSystem = {}\n',
      'package.json': json({
        name: '@saas-ui/chakra-preset',
        version: presetVersion,
      }),
    }),
    artifact('@saas-ui/react', {
      'README.md': migrationReadme,
      'dist/index.d.ts': 'export declare const Sidebar: unknown\n',
      'dist/index.js': 'export const Sidebar = {}\n',
      'package.json': json({
        dependencies: { '@saas-ui/hooks': '3.0.0-next.4' },
        name: '@saas-ui/react',
        version: reactVersion,
      }),
    }),
  ]
}

afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { force: true, recursive: true })),
  )
})

describe('post-version packed release gate', () => {
  test('accepts exact built package boundaries and release contracts', () => {
    expect(verifyPackedReleaseArtifacts(fixtures(), versions)).toEqual({
      artifacts: [
        { files: 5, name: '@saas-ui/cli', version: '0.1.0-next.2' },
        {
          files: 6,
          name: '@saas-ui/chakra-preset',
          version: '3.0.0-next.10',
        },
        { files: 4, name: '@saas-ui/react', version: '3.0.0-next.56' },
      ],
      publication: [],
      stage: 'packed-artifacts-ready-for-publication',
    })
  })

  test('accepts unpublished artifacts and exact idempotent publication retries', async () => {
    const artifacts = fixtures()
    await expect(
      verifyPublishedArtifactCompatibility(artifacts, async (artifact) =>
        artifact.name === '@saas-ui/cli'
          ? new Map(
              [...artifact.files].map(([file, content]) => [
                file,
                Buffer.from(content),
              ]),
            )
          : null,
      ),
    ).resolves.toEqual([
      { name: '@saas-ui/cli', state: 'identical', version: '0.1.0-next.2' },
      {
        name: '@saas-ui/chakra-preset',
        state: 'unpublished',
        version: '3.0.0-next.10',
      },
      {
        name: '@saas-ui/react',
        state: 'unpublished',
        version: '3.0.0-next.56',
      },
    ])
  })

  test('rejects an occupied version with different packed contents', async () => {
    const artifacts = fixtures()
    await expect(
      verifyPublishedArtifactCompatibility(artifacts, async (artifact) => {
        if (artifact.name !== '@saas-ui/react') return null
        const files = new Map(artifact.files)
        files.set('dist/index.js', Buffer.from('different published bytes\n'))
        return files
      }),
    ).rejects.toThrow(
      '@saas-ui/react@3.0.0-next.56 already exists on npm with different contents: dist/index.js has different bytes',
    )
  })

  test('rejects local dependency protocols in the packed manifest', () => {
    const artifacts = fixtures()
    const preset = artifacts.find(
      (entry) => entry.name === '@saas-ui/chakra-preset',
    )!
    preset.files.set(
      'package.json',
      json({
        devDependencies: { typescript: 'workspace:*' },
        name: preset.name,
        version: preset.version,
      }),
    )

    expect(() => verifyPackedReleaseArtifacts(artifacts, versions)).toThrow(
      'packed manifest contains a local protocol',
    )
  })

  test('rejects a React tarball without the hooks dependency', () => {
    const artifacts = fixtures()
    const react = artifacts.find((entry) => entry.name === '@saas-ui/react')!
    react.files.set(
      'package.json',
      json({
        name: react.name,
        version: react.version,
      }),
    )

    expect(() => verifyPackedReleaseArtifacts(artifacts, versions)).toThrow(
      'packed manifest must depend on @saas-ui/hooks',
    )
  })

  test('rejects endpoint drift in packed CLI build info', () => {
    const artifacts = fixtures()
    const cli = artifacts.find((entry) => entry.name === '@saas-ui/cli')!
    const buildInfo = JSON.parse(
      cli.files.get('lib/build-info.json')!.toString('utf8'),
    ) as { registryUrl: string }
    buildInfo.registryUrl = 'https://beta.saas-ui.dev/r'
    cli.files.set('lib/build-info.json', json(buildInfo))

    expect(() => verifyPackedReleaseArtifacts(artifacts, versions)).toThrow(
      'registryUrl must equal https://saas-ui.dev/r',
    )
  })

  test('removes its temporary root when packing fails', async () => {
    const repositoryRoot = await mkdtemp(
      path.join(tmpdir(), 'packed-release-repository-'),
    )
    const temporaryRoot = path.join(
      tmpdir(),
      `packed-release-cleanup-${Date.now()}`,
    )
    roots.push(repositoryRoot, temporaryRoot)
    for (const [name, version] of versions) {
      const directory =
        name === '@saas-ui/cli'
          ? 'saas-ui-cli'
          : name === '@saas-ui/chakra-preset'
            ? 'saas-ui-chakra-preset'
            : 'saas-ui-react'
      const target = path.join(repositoryRoot, 'packages', directory)
      await mkdir(target, { recursive: true })
      await writeFile(
        path.join(target, 'package.json'),
        JSON.stringify({ name, version }),
      )
    }

    await expect(
      runPackedReleaseGate({
        makeTemporaryRoot: async () => {
          await mkdir(temporaryRoot)
          return temporaryRoot
        },
        pack: async () => {
          throw new Error('pack failed')
        },
        publishedFiles: async () => null,
        repositoryRoot,
      }),
    ).rejects.toThrow('pack failed')
    await expect(access(temporaryRoot)).rejects.toMatchObject({
      code: 'ENOENT',
    })
  })
})
