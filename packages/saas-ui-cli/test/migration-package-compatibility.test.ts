import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { fileMigrationPackageAdapter } from '#utils/migrations/react-to-registry-packages'
import { SUPPORTED_PRESET_VERSION } from '#utils/package-compatibility'

const projects: string[] = []

afterEach(async () => {
  await Promise.all(
    projects.splice(0).map((cwd) => rm(cwd, { force: true, recursive: true })),
  )
})

async function project(dependencies: Record<string, string>) {
  const cwd = await mkdtemp(path.join(tmpdir(), 'sui-migration-packages-'))
  projects.push(cwd)
  const source = `${JSON.stringify({ private: true, dependencies }, null, 2)}\n`
  await writeFile(path.join(cwd, 'package.json'), source)
  return { cwd, source }
}

async function workspaceProject(
  presetVersion: string,
  specifier = 'workspace:*',
) {
  const root = await mkdtemp(path.join(tmpdir(), 'sui-migration-workspace-'))
  projects.push(root)
  const cwd = path.join(root, 'apps/website')
  const preset = path.join(root, 'packages/chakra-preset')
  await mkdir(cwd, { recursive: true })
  await mkdir(preset, { recursive: true })
  await writeFile(
    path.join(root, 'pnpm-workspace.yaml'),
    'packages:\n  - apps/*\n  - packages/*\n',
  )
  await writeFile(
    path.join(preset, 'package.json'),
    JSON.stringify({
      name: '@saas-ui/chakra-preset',
      version: presetVersion,
    }),
  )
  const source = `${JSON.stringify(
    {
      private: true,
      dependencies: { '@saas-ui/chakra-preset': specifier },
    },
    null,
    2,
  )}\n`
  await writeFile(path.join(cwd, 'package.json'), source)
  return { cwd, source }
}

function request(cwd: string, requiredPackages: string[]) {
  return {
    cwd,
    requiredPackages,
    removeLegacyPackage: false,
    legacyReferences: [],
  }
}

describe('migration package compatibility', () => {
  it.each([
    ['@chakra-ui/react', '^2.10.0'],
    ['@saas-ui/chakra-preset', '^2.0.0'],
  ])(
    'rejects an incompatible retained %s spec without mutation',
    async (packageName, specifier) => {
      const { cwd, source } = await project({ [packageName]: specifier })
      await expect(
        fileMigrationPackageAdapter.plan(request(cwd, [packageName])),
      ).rejects.toThrow('incompatible specifier')
      await expect(
        readFile(path.join(cwd, 'package.json'), 'utf8'),
      ).resolves.toBe(source)
    },
  )

  it('retains a compatible supported Chakra v3 range', async () => {
    const { cwd } = await project({ '@chakra-ui/react': '^3.30.0' })
    const plan = await fileMigrationPackageAdapter.plan(
      request(cwd, ['@chakra-ui/react']),
    )
    expect(plan.changed).toBe(false)
    expect(plan.actions).toContainEqual(
      expect.objectContaining({
        action: 'retain',
        package: '@chakra-ui/react',
        specifier: '^3.30.0',
        status: 'unchanged',
      }),
    )
  })

  it('adds the centralized supported range instead of a moving tag', async () => {
    const { cwd } = await project({})
    const plan = await fileMigrationPackageAdapter.plan(
      request(cwd, ['@chakra-ui/react']),
    )
    expect(JSON.parse(plan.after).dependencies).toMatchObject({
      '@chakra-ui/react': '^3.28.0',
    })
  })

  it('pins the current preset next release for a clean migration', async () => {
    const { cwd } = await project({})
    const plan = await fileMigrationPackageAdapter.plan(
      request(cwd, ['@saas-ui/chakra-preset']),
    )
    expect(JSON.parse(plan.after).dependencies).toMatchObject({
      '@saas-ui/chakra-preset': SUPPORTED_PRESET_VERSION,
    })
  })

  it('retains a compatible stable v3 preset declaration', async () => {
    const { cwd } = await project({
      '@saas-ui/chakra-preset': '^3.0.0',
    })
    const plan = await fileMigrationPackageAdapter.plan(
      request(cwd, ['@saas-ui/chakra-preset']),
    )
    expect(plan.changed).toBe(false)
    expect(plan.actions).toContainEqual(
      expect.objectContaining({
        package: '@saas-ui/chakra-preset',
        specifier: '^3.0.0',
        status: 'unchanged',
      }),
    )
  })

  it('retains workspace protocol only after resolving the local package version', async () => {
    const { cwd } = await workspaceProject(SUPPORTED_PRESET_VERSION)
    const plan = await fileMigrationPackageAdapter.plan(
      request(cwd, ['@saas-ui/chakra-preset']),
    )
    expect(plan.changed).toBe(false)
    expect(plan.actions).toContainEqual(
      expect.objectContaining({
        package: '@saas-ui/chakra-preset',
        specifier: 'workspace:*',
        status: 'unchanged',
      }),
    )
  })

  it('rejects an incompatible workspace package without mutation', async () => {
    const { cwd, source } = await workspaceProject('3.0.0-beta.2')
    await expect(
      fileMigrationPackageAdapter.plan(
        request(cwd, ['@saas-ui/chakra-preset']),
      ),
    ).rejects.toThrow('incompatible specifier')
    await expect(
      readFile(path.join(cwd, 'package.json'), 'utf8'),
    ).resolves.toBe(source)
  })

  it('rejects duplicate dependency classifications without mutation', async () => {
    const { cwd } = await project({ '@chakra-ui/react': '^3.28.0' })
    const packagePath = path.join(cwd, 'package.json')
    const manifest = JSON.parse(await readFile(packagePath, 'utf8'))
    manifest.peerDependencies = { '@chakra-ui/react': '^3.28.0' }
    const source = `${JSON.stringify(manifest, null, 2)}\n`
    await writeFile(packagePath, source)

    await expect(
      fileMigrationPackageAdapter.plan(request(cwd, ['@chakra-ui/react'])),
    ).rejects.toThrow('multiple dependency sections')
    await expect(readFile(packagePath, 'utf8')).resolves.toBe(source)
  })

  it('rejects malformed dependency declarations without mutation', async () => {
    const { cwd } = await project({})
    const packagePath = path.join(cwd, 'package.json')
    const source = `${JSON.stringify(
      {
        private: true,
        optionalDependencies: { '@chakra-ui/react': 3 },
      },
      null,
      2,
    )}\n`
    await writeFile(packagePath, source)

    await expect(
      fileMigrationPackageAdapter.plan(request(cwd, ['@chakra-ui/react'])),
    ).rejects.toThrow('non-string declaration')
    await expect(readFile(packagePath, 'utf8')).resolves.toBe(source)
  })
})
