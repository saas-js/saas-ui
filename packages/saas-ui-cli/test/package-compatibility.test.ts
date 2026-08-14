import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'

import {
  SUPPORTED_PRESET_VERSION,
  getSupportedPackagePolicy,
  isSupportedPackageSpecifier,
  normalizeSupportedPackageDeclaration,
  packageCompatibilityIssue,
  resolveWorkspacePackageVersion,
  supportedPackageDeclaration,
} from '#utils/package-compatibility'

const projects: string[] = []

afterEach(async () => {
  await Promise.all(
    projects.splice(0).map((cwd) => rm(cwd, { force: true, recursive: true })),
  )
})

async function workspace(presetVersion = SUPPORTED_PRESET_VERSION) {
  const root = await mkdtemp(path.join(tmpdir(), 'sui-package-policy-'))
  projects.push(root)
  const app = path.join(root, 'apps/website')
  const preset = path.join(root, 'packages/chakra-preset')
  await mkdir(app, { recursive: true })
  await mkdir(preset, { recursive: true })
  await writeFile(
    path.join(root, 'pnpm-workspace.yaml'),
    'packages:\n  - apps/*\n  - packages/*\n',
  )
  await writeFile(
    path.join(app, 'package.json'),
    JSON.stringify({
      name: 'website',
      dependencies: { '@saas-ui/chakra-preset': 'workspace:*' },
    }),
  )
  await writeFile(
    path.join(preset, 'package.json'),
    JSON.stringify({
      name: '@saas-ui/chakra-preset',
      version: presetVersion,
    }),
  )
  return { app, root }
}

describe('supported package compatibility', () => {
  it('publishes explicit init declarations', () => {
    expect(supportedPackageDeclaration('@chakra-ui/react')).toBe(
      '@chakra-ui/react@^3.28.0',
    )
    expect(supportedPackageDeclaration('@emotion/react')).toBe(
      '@emotion/react@^11.0.0',
    )
    expect(supportedPackageDeclaration('@saas-ui/chakra-preset')).toBe(
      `@saas-ui/chakra-preset@${SUPPORTED_PRESET_VERSION}`,
    )
    expect(supportedPackageDeclaration('@saas-ui/react')).toMatch(
      /^@saas-ui\/react@3\.0\.0-rc\.\d+$/,
    )
    expect(supportedPackageDeclaration('next-themes')).toBe(
      'next-themes@^0.4.6',
    )
  })

  it.each([
    ['@chakra-ui/react', '^3.0.0', false],
    ['@chakra-ui/react', '^3.30.0', true],
    ['@chakra-ui/react', '>=3.28.0 <4.0.0', true],
    ['@chakra-ui/react', '3.20.0', false],
    ['@chakra-ui/react', '^2.10.0', false],
    ['@chakra-ui/react', 'latest', false],
    ['@emotion/react', '11', true],
    ['@emotion/react', '>=11.0.0 <12.0.0', true],
    ['@emotion/react', '^10.0.0', false],
    ['@saas-ui/chakra-preset', '^3.0.0', true],
    ['@saas-ui/chakra-preset', SUPPORTED_PRESET_VERSION, true],
    ['@saas-ui/chakra-preset', `^${SUPPORTED_PRESET_VERSION}`, true],
    ['@saas-ui/chakra-preset', '3.0.0-next.7', false],
    ['@saas-ui/chakra-preset', '3.0.0-beta.9', false],
    ['@chakra-ui/react', '3.30.0-next.1', false],
    ['@saas-ui/chakra-preset', '^2.0.0', false],
    ['next-themes', '^0.4.0', false],
    ['next-themes', '^0.4.6', true],
    ['next-themes', '0.4.x', false],
    ['next-themes', '0.5.0', false],
    ['next-themes', '0.x', false],
    ['next-themes', '^0.3.0', false],
  ] as const)('checks %s specifier %s', (name, specifier, expected) => {
    expect(
      isSupportedPackageSpecifier(getSupportedPackagePolicy(name)!, specifier),
    ).toBe(expected)
  })

  it('resolves workspace protocol declarations to the local package version', async () => {
    const { app } = await workspace()
    expect(resolveWorkspacePackageVersion(app, '@saas-ui/chakra-preset')).toBe(
      SUPPORTED_PRESET_VERSION,
    )
    expect(
      packageCompatibilityIssue('@saas-ui/chakra-preset', 'workspace:*', {
        cwd: app,
      }),
    ).toBeNull()
    expect(
      packageCompatibilityIssue(
        '@saas-ui/chakra-preset',
        `workspace:^${SUPPORTED_PRESET_VERSION}`,
        { cwd: app },
      ),
    ).toBeNull()
    expect(
      packageCompatibilityIssue('@saas-ui/chakra-preset', 'workspace:^3.0.0', {
        cwd: app,
      }),
    ).toContain('does not accept local version')
    expect(
      normalizeSupportedPackageDeclaration(
        '@saas-ui/chakra-preset@workspace:*',
        { cwd: app },
      ),
    ).toBe(`@saas-ui/chakra-preset@${SUPPORTED_PRESET_VERSION}`)
  })

  it('validates the website workspace preset against the repository package', async () => {
    const repository = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../../..',
    )
    const website = path.join(repository, 'apps/website')
    const manifest = JSON.parse(
      await readFile(path.join(website, 'package.json'), 'utf8'),
    ) as { dependencies: Record<string, string> }
    const specifier = manifest.dependencies['@saas-ui/chakra-preset']!
    expect(specifier).toBe('workspace:*')
    expect(
      packageCompatibilityIssue('@saas-ui/chakra-preset', specifier, {
        cwd: website,
      }),
    ).toBeNull()
    expect(
      resolveWorkspacePackageVersion(website, '@saas-ui/chakra-preset'),
    ).toBe(SUPPORTED_PRESET_VERSION)
  })

  it('rejects unresolved and unsupported workspace package versions', async () => {
    const { app } = await workspace('3.0.0-beta.2')
    expect(
      packageCompatibilityIssue('@saas-ui/chakra-preset', 'workspace:*', {
        cwd: app,
      }),
    ).toContain('incompatible specifier')
    expect(
      packageCompatibilityIssue('@saas-ui/chakra-preset', 'workspace:*'),
    ).toContain('cannot be validated without a project directory')
  })

  it.each([
    ['3.2.1', 'workspace:^3.0.0', null],
    ['3.2.1', 'workspace:~3.0.0', 'does not accept local version'],
    ['3.0.4', 'workspace:~3.0.0', null],
  ] as const)(
    'validates local version %s against selector %s',
    async (localVersion, specifier, issue) => {
      const { app } = await workspace(localVersion)
      const result = packageCompatibilityIssue(
        '@saas-ui/chakra-preset',
        specifier,
        { cwd: app },
      )
      if (issue) expect(result).toContain(issue)
      else expect(result).toBeNull()
    },
  )
})
