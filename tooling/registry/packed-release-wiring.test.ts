import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import { verifyCliPrepublishContract } from './cli-prepublish-contract'

const repositoryRoot = path.resolve(import.meta.dirname, '../..')
const temporaryRoots: string[] = []

async function manifest(relative: string) {
  return JSON.parse(
    await readFile(path.join(repositoryRoot, relative), 'utf8'),
  ) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    scripts?: Record<string, string>
    version?: string
  }
}

async function write(root: string, relative: string, content: string) {
  const target = path.join(root, relative)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, content)
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots
      .splice(0)
      .map((root) => rm(root, { force: true, recursive: true })),
  )
})

describe('packed release wiring', () => {
  test('checks the built CLI at prepublish without rebuilding it', async () => {
    const cli = await manifest('packages/saas-ui-cli/package.json')
    expect(cli.scripts?.prepublishOnly).toBe(
      'tsx --conditions=sui ../../tooling/registry/cli-prepublish-contract.ts',
    )
    expect(cli.scripts?.prepublishOnly).not.toContain('build')
  })

  test('packs after version and build but before publication', async () => {
    const root = await manifest('package.json')
    const release = root.scripts?.release ?? ''
    const version = release.indexOf('changeset:version')
    const build = release.indexOf('build:packages')
    const packed = release.indexOf('registry:retirement:packed-release')
    const publish = release.indexOf('publish:rc')

    expect(version).toBeGreaterThanOrEqual(0)
    expect(build).toBeGreaterThan(version)
    expect(packed).toBeGreaterThan(build)
    expect(publish).toBeGreaterThan(packed)
  })

  test('checks planned versions before preparing and bundling release artifacts', async () => {
    const root = await manifest('package.json')
    const release = root.scripts?.['registry:release'] ?? ''
    const preflight = release.indexOf('registry:retirement:preflight')
    const availability = release.indexOf(
      'registry:retirement:version-availability',
    )
    const prepare = release.indexOf('registry:prepare')
    const bundle = release.indexOf('registry:release:bundle')

    expect(preflight).toBeGreaterThanOrEqual(0)
    expect(availability).toBeGreaterThan(preflight)
    expect(prepare).toBeGreaterThan(availability)
    expect(bundle).toBeGreaterThan(prepare)
    expect(release).not.toContain('git diff')
  })

  test('clean-checkout CLI, dogfood, consumer, and website entry points prepare emitted inputs', async () => {
    const [root, cli, website] = await Promise.all([
      manifest('package.json'),
      manifest('packages/saas-ui-cli/package.json'),
      manifest('apps/website/package.json'),
    ])

    for (const name of [
      'registry:ci',
      'registry:dogfood:check',
      'registry:cli:acceptance',
      'registry:consumer:test',
      'registry:consumer:install-all:test',
      'registry:consumer:acceptance',
      'registry:consumer:install-all:acceptance',
      'registry:consumer:packed:acceptance',
      'registry:cli:local',
    ]) {
      expect(root.scripts?.[name], name).toMatch(
        /registry:(?:generate|prepare)/,
      )
    }
    for (const name of [
      'test',
      'test:consumer',
      'test:consumer:install-all',
      'test:consumer:acceptance',
      'test:consumer:install-all:acceptance',
    ]) {
      expect(cli.scripts?.[name], `CLI ${name}`).toContain('registry:generate')
    }
    expect(website.scripts?.dev).toContain('registry:generate')
    expect(website.scripts?.dev).toContain('registry:dev')
    expect(website.scripts?.prebuild).toBe('pnpm registry:generate')
  })

  test('keeps derived public catalogs out of new commits', async () => {
    const rootIgnore = await readFile(
      path.join(repositoryRoot, '.gitignore'),
      'utf8',
    )
    expect(rootIgnore).toContain('/apps/website/public/r/')
    expect(rootIgnore).toContain('/apps/website/__registry__/')
  })

  test('the prepublish command validates existing build bytes', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'cli-prepublish-contract-'))
    temporaryRoots.push(root)
    await write(
      root,
      'packages/saas-ui-cli/package.json',
      JSON.stringify({ name: '@saas-ui/cli', version: '1.2.3' }),
    )
    await write(
      root,
      'packages/saas-ui-chakra-preset/package.json',
      JSON.stringify({
        name: '@saas-ui/chakra-preset',
        version: '3.0.0-next.10',
      }),
    )
    const values = [
      'https://saas-ui.dev',
      'https://saas-ui.dev/r',
      'https://saas-ui.dev/r/schema/components.json',
      '1.2.3',
      '3.0.0-next.10',
    ].join('\n')
    await write(
      root,
      'packages/saas-ui-cli/lib/cli.js',
      `#!/usr/bin/env node\n${values}\n`,
    )
    await write(root, 'packages/saas-ui-cli/lib/bash-complete.js', 'export {}\n')
    await write(
      root,
      'packages/saas-ui-cli/lib/build-info.json',
      JSON.stringify({
        authOrigin: 'https://saas-ui.dev',
        cliVersion: '1.2.3',
        kind: 'saas-ui.cli-build-info',
        presetVersion: '3.0.0-next.10',
        registryUrl: 'https://saas-ui.dev/r',
        schemaUrl: 'https://saas-ui.dev/r/schema/components.json',
        version: 1,
      }),
    )

    await expect(verifyCliPrepublishContract(root)).resolves.toMatchObject({
      cliVersion: '1.2.3',
      presetVersion: '3.0.0-next.10',
    })
  })
})
