import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import {
  assertConsumerFixture,
  assertSwitchedProvider,
  createTemporaryConsumerDirectory,
  installConsumerFixture,
  reinstallConsumerFixture,
  removeConsumerDirectory,
  snapshotProject,
  switchConsumerColorMode,
} from './fixture'
import {
  CANONICAL_REGISTRY_ROOT,
  REPOSITORY_ROOT,
  createLocalRegistryClient,
} from './local-registry'

const temporaryDirectories: string[] = []

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map(removeConsumerDirectory),
  )
})

async function fixtureDirectory() {
  const cwd = await createTemporaryConsumerDirectory()
  temporaryDirectories.push(cwd)
  return cwd
}

describe('offline clean registry consumer', () => {
  it(
    'uses only canonical local JSON and rejects network or traversal resources',
    async () => {
      const client = createLocalRegistryClient()
      await expect(client.getIndex()).resolves.toEqual(expect.any(Array))
      await expect(
        client.getItem('sidebar', 'default'),
      ).resolves.toMatchObject({
        name: 'sidebar',
        type: 'registry:ui',
      })
      await expect(
        client.getItem('https://registry.invalid/sidebar.json', 'default'),
      ).rejects.toThrow(/offline/)
      await expect(client.getJson!('../package.json')).rejects.toThrow(
        /escapes public\/r/,
      )
      expect(CANONICAL_REGISTRY_ROOT).toBe(
        path.join(REPOSITORY_ROOT, 'apps/website/public/r'),
      )
    },
  )

  it.each(['on', 'off'] as const)(
    'initializes color mode %s, adds the vertical slice, and is idempotent',
    async (colorMode) => {
      const first = await installConsumerFixture({
        cwd: await fixtureDirectory(),
        colorMode,
      })
      await assertConsumerFixture(first)
      await reinstallConsumerFixture(first)

      const second = await installConsumerFixture({
        cwd: await fixtureDirectory(),
        colorMode,
      })
      await assertConsumerFixture(second)
      expect(await snapshotProject(second.cwd)).toEqual(
        await snapshotProject(first.cwd),
      )
    },
  )

  it('atomically switches the exclusive provider variants', async () => {
    const fixture = await installConsumerFixture({
      cwd: await fixtureDirectory(),
      colorMode: 'off',
    })

    const on = await switchConsumerColorMode(fixture, 'on')
    expect(on.plan.replacedItems).toEqual(['provider-no-color-mode'])
    await assertSwitchedProvider(fixture, 'on')

    const off = await switchConsumerColorMode(fixture, 'off')
    expect(off.plan.replacedItems).toEqual(['provider'])
    await assertSwitchedProvider(fixture, 'off')
  })
})
