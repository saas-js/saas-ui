import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import { createRegistryReleaseBundle } from './release-bundle'
import {
  FileSystemRegistryPromotionStore,
  type RegistryReleasePromotionStore,
  promoteRegistryRelease,
} from './release-promotion'

const temporaryRoots: string[] = []

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'registry-promotion-'))
  temporaryRoots.push(root)
  const inputs = {
    publicRegistryDir: path.join(root, 'input/public/r'),
    publicPreviewDir: path.join(root, 'input/public/__registry__'),
    proRegistryDir: path.join(root, 'input/pro/r'),
    proPreviewDir: path.join(root, 'input/pro/__registry__'),
  }
  await Promise.all(
    Object.values(inputs).map((directory) =>
      mkdir(directory, { recursive: true }),
    ),
  )
  await Promise.all([
    writeFile(
      path.join(inputs.publicRegistryDir, 'index.json'),
      '[{"name":"button"}]\n',
    ),
    writeFile(
      path.join(inputs.publicPreviewDir, 'index.tsx'),
      'public preview\n',
    ),
    writeFile(
      path.join(inputs.proRegistryDir, 'index.json'),
      '[{"name":"dashboard"}]\n',
    ),
    writeFile(
      path.join(inputs.proPreviewDir, 'index.tsx'),
      'private preview\n',
    ),
  ])
  const bundleDir = path.join(root, 'bundle')
  const manifest = await createRegistryReleaseBundle({
    ...inputs,
    outputDir: bundleDir,
  })
  const store = new FileSystemRegistryPromotionStore({
    controlRoot: path.join(root, 'published/control'),
    proRoot: path.join(root, 'published/pro'),
    publicRoot: path.join(root, 'published/public'),
  })
  return { bundleDir, manifest, root, store }
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots
      .splice(0)
      .map((root) => rm(root, { force: true, recursive: true })),
  )
})

describe('registry release promotion', () => {
  test('publishes separated immutable catalogs before switching one pointer', async () => {
    const value = await fixture()
    const pointer = await promoteRegistryRelease({
      bundleDir: value.bundleDir,
      expectedReleaseDigest: null,
      store: value.store,
    })

    expect(pointer.releaseDigest).toBe(value.manifest.releaseDigest)
    await expect(
      readFile(
        path.join(
          value.root,
          'published/public/releases',
          pointer.releaseDigest,
          'r/index.json',
        ),
        'utf8',
      ),
    ).resolves.toContain('button')
    await expect(
      readFile(
        path.join(
          value.root,
          'published/pro/releases',
          pointer.releaseDigest,
          'r/index.json',
        ),
        'utf8',
      ),
    ).resolves.toContain('dashboard')
    await expect(value.store.readPointer()).resolves.toEqual(pointer)
  })

  test('does not switch the pointer when either catalog publication fails', async () => {
    const value = await fixture()
    const store: RegistryReleasePromotionStore = {
      publishCatalog: async (name, bundleDir, manifest) => {
        if (name === 'pro') throw new Error('private destination unavailable')
        await value.store.publishCatalog(name, bundleDir, manifest)
      },
      publishManifest: value.store.publishManifest.bind(value.store),
      readPointer: value.store.readPointer.bind(value.store),
      compareAndSwapPointer: value.store.compareAndSwapPointer.bind(
        value.store,
      ),
    }

    await expect(
      promoteRegistryRelease({
        bundleDir: value.bundleDir,
        expectedReleaseDigest: null,
        store,
      }),
    ).rejects.toThrow('private destination unavailable')
    await expect(value.store.readPointer()).resolves.toBeNull()
  })

  test('rejects a stale expected pointer after immutable upload', async () => {
    const value = await fixture()
    await promoteRegistryRelease({
      bundleDir: value.bundleDir,
      expectedReleaseDigest: null,
      store: value.store,
    })

    await expect(
      promoteRegistryRelease({
        bundleDir: value.bundleDir,
        expectedReleaseDigest: 'stale-release',
        store: value.store,
      }),
    ).rejects.toThrow('pointer changed before promotion')
  })
})
