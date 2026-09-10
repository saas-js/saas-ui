import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import {
  type PublishDirectoryOperations,
  createRegistryReleaseBundle,
  publishStagedDirectory,
  verifyRegistryReleaseBundle,
} from './release-bundle'

const temporaryRoots: string[] = []

async function createFixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'registry-release-bundle-'))
  temporaryRoots.push(root)
  const publicRegistryDir = path.join(root, 'public-r')
  const publicPreviewDir = path.join(root, 'public-preview')
  const outputDir = path.join(root, 'release')
  await Promise.all([
    mkdir(path.join(publicRegistryDir, 'styles'), { recursive: true }),
    mkdir(publicPreviewDir, { recursive: true }),
  ])
  await Promise.all([
    writeFile(
      path.join(publicRegistryDir, 'index.json'),
      `${JSON.stringify([{ name: 'button' }])}\n`,
    ),
    writeFile(
      path.join(publicRegistryDir, 'styles', 'button.json'),
      'button\n',
    ),
    writeFile(path.join(publicPreviewDir, 'index.tsx'), 'public preview\n'),
  ])
  return {
    outputDir,
    publicPreviewDir,
    publicRegistryDir,
    root,
  }
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots
      .splice(0)
      .map((root) => rm(root, { force: true, recursive: true })),
  )
})

describe('registry release bundle', () => {
  test('publishes the public registry as one deterministic release unit', async () => {
    const fixture = await createFixture()
    const first = await createRegistryReleaseBundle(fixture)
    const firstManifest = await readFile(
      path.join(fixture.outputDir, 'manifest.json'),
      'utf8',
    )
    const second = await createRegistryReleaseBundle(fixture)

    expect(first).toEqual(second)
    expect(
      await readFile(path.join(fixture.outputDir, 'manifest.json'), 'utf8'),
    ).toBe(firstManifest)
    expect(first.kind).toBe('saas-ui.registry-release')
    expect(first.catalogs.public.items).toBe(1)
    expect(first.releaseDigest).toMatch(/^[a-f0-9]{64}$/)
    await expect(
      readFile(
        path.join(fixture.outputDir, 'public', 'r', 'styles', 'button.json'),
        'utf8',
      ),
    ).resolves.toBe('button\n')
    await expect(
      verifyRegistryReleaseBundle(fixture.outputDir),
    ).resolves.toEqual(first)
  })

  test('rejects symlinked release inputs', async () => {
    const fixture = await createFixture()
    await symlink(
      path.join(fixture.publicRegistryDir, 'index.json'),
      path.join(fixture.publicRegistryDir, 'linked.json'),
    )

    await expect(createRegistryReleaseBundle(fixture)).rejects.toThrow(
      'must not contain symlinks',
    )
  })

  test('detects files changed after the release is assembled', async () => {
    const fixture = await createFixture()
    await createRegistryReleaseBundle(fixture)
    await writeFile(
      path.join(fixture.outputDir, 'public', 'r', 'styles', 'button.json'),
      'tampered\n',
    )

    await expect(
      verifyRegistryReleaseBundle(fixture.outputDir),
    ).rejects.toThrow('failed verification')
  })

  test('detects files added after the release is assembled', async () => {
    const fixture = await createFixture()
    await createRegistryReleaseBundle(fixture)
    await writeFile(
      path.join(fixture.outputDir, 'public', '__registry__', 'extra.tsx'),
      'extra\n',
    )

    await expect(
      verifyRegistryReleaseBundle(fixture.outputDir),
    ).rejects.toThrow('file list does not match')
  })

  test('rejects declared files outside the public release roots', async () => {
    const fixture = await createFixture()
    const manifest = await createRegistryReleaseBundle(fixture)
    const content = 'unexpected\n'
    await writeFile(path.join(fixture.outputDir, 'unexpected.txt'), content)
    manifest.files.unshift({
      bytes: Buffer.byteLength(content),
      path: 'unexpected.txt',
      sha256: '0'.repeat(64),
    })
    await writeFile(
      path.join(fixture.outputDir, 'manifest.json'),
      `${JSON.stringify(manifest, null, 2)}\n`,
    )

    await expect(
      verifyRegistryReleaseBundle(fixture.outputDir),
    ).rejects.toThrow('outside an allowed root')
  })

  test('preserves the backup when publish and rollback both fail', async () => {
    const removed: string[] = []
    let renameCalls = 0
    const operations: PublishDirectoryOperations = {
      mkdir: async () => undefined,
      rename: async () => {
        renameCalls += 1
        if (renameCalls > 1) throw new Error(`rename failure ${renameCalls}`)
      },
      rm: async (target) => {
        removed.push(String(target))
      },
    }

    await expect(
      publishStagedDirectory('/release.stage', '/release', operations, 'test'),
    ).rejects.toThrow(
      'Registry release publish and rollback failed; backup preserved at /release.backup-test',
    )
    expect(removed).not.toContain('/release.backup-test')
    expect(removed).toContain('/release.stage')
  })
})
