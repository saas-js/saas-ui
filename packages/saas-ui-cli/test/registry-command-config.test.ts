import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import {
  resolveRegistryCommandConfig,
  resolveRegistryCommandCwd,
} from '#utils/resolve-registry-command-config'

const projects: string[] = []

afterEach(async () => {
  await Promise.all(
    projects.splice(0).map((cwd) => rm(cwd, { recursive: true, force: true })),
  )
})

async function monorepo() {
  const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-command-config-'))
  projects.push(root)
  const ui = path.join(root, 'packages/ui')
  await mkdir(ui, { recursive: true })
  await writeFile(path.join(root, 'package.json'), '{"private":true}\n')
  await writeFile(path.join(root, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n')
  await writeFile(path.join(ui, 'package.json'), '{"name":"@test/ui"}\n')
  await writeFile(
    path.join(ui, 'components.json'),
    `${JSON.stringify({
      system: 'chakra',
      style: 'default',
      rsc: false,
      tsx: true,
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
        ui: '@/components/ui',
        lib: '@/lib',
        hooks: '@/hooks',
        icons: '@/icons',
      },
    })}\n`,
  )
  return { root, ui }
}

describe('registry command config resolution', () => {
  it('selects packages/ui when invoked from a monorepo root', async () => {
    const { root, ui } = await monorepo()
    await expect(resolveRegistryCommandCwd(root)).resolves.toBe(ui)
    await expect(resolveRegistryCommandConfig(root)).resolves.toMatchObject({
      resolvedPaths: { cwd: ui },
    })
  })

  it('keeps packages/ui when invoked directly in that package', async () => {
    const { ui } = await monorepo()
    await expect(resolveRegistryCommandCwd(ui)).resolves.toBe(ui)
    await expect(resolveRegistryCommandConfig(ui)).resolves.toMatchObject({
      resolvedPaths: { cwd: ui },
    })
  })
})
