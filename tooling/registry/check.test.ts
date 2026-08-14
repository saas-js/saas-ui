import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import { compareDirectories } from './check'
import {
  chakraPresetManifestPath,
  compilePublicRegistry,
  publicRegistryVersion,
  registryWatchFiles,
  registryWatchInputs,
} from './public-registry'

const fixtureRoot = path.join(process.cwd(), '.tmp-registry-check-test')

const developmentSourcePattern =
  /(?:^|\/)(?:__stories__|__tests__|stories|tests?)(?:\/|$)|(?:^|\.)(?:test-d|spec-d|type-tests?|test|spec|stories|story|preview)\.[cm]?[jt]sx?$/i

function developmentPayloadFiles(
  artifacts: Awaited<ReturnType<typeof compilePublicRegistry>>,
) {
  return artifacts.files.flatMap((artifact) => {
    if (!artifact.path.endsWith('.json')) return []

    const value = JSON.parse(artifact.content) as
      | { files?: Array<{ path: string; target?: string }> }
      | Array<{ files?: Array<{ path: string; target?: string }> }>
    const items = Array.isArray(value) ? value : [value]

    return items.flatMap((item) =>
      Array.isArray(item.files)
        ? item.files
            .flatMap((file) => [file.path, file.target].filter(Boolean))
            .filter((file): file is string =>
              developmentSourcePattern.test(file),
            )
            .map((file) => `${artifact.path}: ${file}`)
        : [],
    )
  })
}

afterEach(async () => {
  const { rm } = await import('node:fs/promises')
  await rm(fixtureRoot, { force: true, recursive: true })
})

describe('registry automation', () => {
  test('reports missing, unexpected, and changed generated files', async () => {
    const expected = path.join(fixtureRoot, 'expected')
    const actual = path.join(fixtureRoot, 'actual')
    await Promise.all([
      mkdir(path.join(expected, 'nested'), { recursive: true }),
      mkdir(path.join(actual, 'nested'), { recursive: true }),
    ])
    await Promise.all([
      writeFile(path.join(expected, 'same.json'), 'same'),
      writeFile(path.join(actual, 'same.json'), 'same'),
      writeFile(path.join(expected, 'nested', 'changed.json'), 'expected'),
      writeFile(path.join(actual, 'nested', 'changed.json'), 'actual'),
      writeFile(path.join(expected, 'missing.json'), 'missing'),
      writeFile(path.join(actual, 'unexpected.json'), 'unexpected'),
    ])

    await expect(compareDirectories(expected, actual)).resolves.toEqual([
      'missing missing.json',
      'changed nested/changed.json',
      'unexpected unexpected.json',
    ])
  })

  test('watches source inputs and never generated output', () => {
    expect(registryWatchInputs).toEqual(
      expect.arrayContaining([
        expect.stringContaining('apps/website/registry'),
        expect.stringContaining('packages/saas-ui-chakra-preset/src'),
        expect.stringContaining('packages/saas-ui-registry/src'),
      ]),
    )
    expect(registryWatchInputs).not.toEqual(
      expect.arrayContaining([
        expect.stringContaining('apps/website/public/r'),
        expect.stringContaining('apps/website/__registry__'),
      ]),
    )
    expect(registryWatchFiles).toEqual([
      expect.stringContaining('apps/website/registry/registry-icons.ts'),
      chakraPresetManifestPath,
    ])
  })

  test('versions every production registry item from the preset release', async () => {
    const artifacts = await compilePublicRegistry()
    const index = artifacts.files.find((file) => file.path === 'index.json')
    const items = JSON.parse(index?.content ?? '[]') as Array<{
      name: string
      version?: string
    }>

    expect(items.length).toBeGreaterThan(0)
    expect(new Set(items.map((item) => item.version))).toEqual(
      new Set([publicRegistryVersion]),
    )

    const sidebar = artifacts.files.find(
      (file) => file.path === 'styles/default/sidebar.json',
    )
    expect(JSON.parse(sidebar?.content ?? '{}')).toMatchObject({
      name: 'sidebar',
      version: publicRegistryVersion,
    })
  })

  test('keeps development-only sources out of every production payload', async () => {
    const artifacts = await compilePublicRegistry()

    expect(developmentPayloadFiles(artifacts)).toEqual([])
  })
})
