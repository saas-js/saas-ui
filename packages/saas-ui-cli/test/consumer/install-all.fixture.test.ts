import { afterEach, describe, expect, it } from 'vitest'

import {
  assertInstallAllConsumerFixture,
  createTemporaryConsumerDirectory,
  installAllConsumerFixture,
  reinstallAllConsumerFixture,
  removeConsumerDirectory,
  snapshotProject,
} from './fixture'

const temporaryDirectories: string[] = []

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(removeConsumerDirectory))
})

describe('generated install-all registry consumer', () => {
  it(
    'installs the complete public graph with exclusive defaults and is idempotent',
    async () => {
      const cwd = await createTemporaryConsumerDirectory()
      temporaryDirectories.push(cwd)

      const first = await installAllConsumerFixture(cwd)
      await assertInstallAllConsumerFixture(first)
      await reinstallAllConsumerFixture(first)

      const secondCwd = await createTemporaryConsumerDirectory()
      temporaryDirectories.push(secondCwd)
      const second = await installAllConsumerFixture(secondCwd)
      await assertInstallAllConsumerFixture(second)
      expect(await snapshotProject(second.cwd)).toEqual(
        await snapshotProject(first.cwd),
      )
    },
    30_000,
  )
})
