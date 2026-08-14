import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import {
  type EmitRegistryInput,
  RegistryValidationError,
  emitValidatedRegistryArtifacts,
} from '../../src/compiler/index.js'

const temporaryDirectories: string[] = []

async function createOutputDirectories() {
  const root = await mkdtemp(path.join(tmpdir(), 'sui-registry-validated-'))
  temporaryDirectories.push(root)
  const outputDir = path.join(root, 'public', 'r')
  const previewOutputDir = path.join(root, '__registry__')
  await Promise.all([
    mkdir(outputDir, { recursive: true }),
    mkdir(previewOutputDir, { recursive: true }),
  ])
  return { outputDir, previewOutputDir }
}

const validInput: EmitRegistryInput = {
  items: [
    {
      name: 'button',
      type: 'registry:ui',
      files: [
        {
          path: 'ui/button/button.tsx',
          content: 'export default function Button() { return null }',
          type: 'registry:ui',
          hasRenderableDefaultExport: true,
        },
      ],
    },
  ],
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { force: true, recursive: true })),
  )
})

describe('fail-closed registry emission', () => {
  it('rejects invalid artifacts without changing either publication root', async () => {
    const { outputDir, previewOutputDir } = await createOutputDirectories()
    const publicSentinel = path.join(outputDir, 'last-known-good.txt')
    const previewSentinel = path.join(previewOutputDir, 'last-known-good.txt')
    await Promise.all([
      writeFile(publicSentinel, 'public-good\n', 'utf8'),
      writeFile(previewSentinel, 'preview-good\n', 'utf8'),
    ])
    const invalidInput: EmitRegistryInput = {
      ...validInput,
      diagnostics: [
        {
          code: 'registry-dependency-not-found',
          message: 'Registry dependency "missing" does not exist',
          severity: 'error',
          item: 'button',
          dependency: 'missing',
        },
      ],
    }

    let failure: unknown
    try {
      await emitValidatedRegistryArtifacts(invalidInput, {
        outputDir,
        previewOutputDir,
      })
    } catch (error) {
      failure = error
    }

    expect(failure).toBeInstanceOf(RegistryValidationError)
    expect((failure as Error).message).toBe(
      [
        'Registry validation failed with 1 error(s).',
        '- [registry-dependency-not-found] button: Registry dependency "missing" does not exist',
      ].join('\n'),
    )
    expect(await readFile(publicSentinel, 'utf8')).toBe('public-good\n')
    expect(await readFile(previewSentinel, 'utf8')).toBe('preview-good\n')
    await expect(access(path.join(outputDir, 'index.json'))).rejects.toThrow()
    await expect(
      access(path.join(previewOutputDir, 'index.tsx')),
    ).rejects.toThrow()
    await expect(
      access(path.join(outputDir, '.registry-artifacts.json')),
    ).rejects.toThrow()
  })

  it('rejects errors discovered only while building artifact previews', async () => {
    const { outputDir, previewOutputDir } = await createOutputDirectories()
    const invalidPreviewInput: EmitRegistryInput = {
      items: [
        {
          name: 'button',
          type: 'registry:ui',
          preview: 'ui/button/button.stories.tsx',
          files: [
            {
              path: 'ui/button/button.tsx',
              content: 'export function Button() { return null }',
              type: 'registry:ui',
            },
            {
              path: 'ui/button/button.stories.tsx',
              content: 'export default { title: "Button" }',
              type: 'registry:story',
            },
          ],
        },
      ],
    }

    await expect(
      emitValidatedRegistryArtifacts(invalidPreviewInput, {
        outputDir,
        previewOutputDir,
      }),
    ).rejects.toMatchObject({
      name: 'RegistryValidationError',
      report: {
        valid: false,
        diagnostics: [
          expect.objectContaining({
            code: 'preview-default-export-not-renderable',
            severity: 'error',
          }),
        ],
      },
    })
    await expect(access(path.join(outputDir, 'index.json'))).rejects.toThrow()
    await expect(
      access(path.join(previewOutputDir, 'index.tsx')),
    ).rejects.toThrow()
  })

  it('publishes a valid artifact set identical to the pure preflight', async () => {
    const { outputDir, previewOutputDir } = await createOutputDirectories()
    const preflight = await emitValidatedRegistryArtifacts(validInput)
    const published = await emitValidatedRegistryArtifacts(validInput, {
      outputDir,
      previewOutputDir,
    })

    expect(published).toEqual(preflight)
    expect(published.validationReport).toMatchObject({
      valid: true,
      errors: 0,
    })
    expect(await readFile(path.join(outputDir, 'index.json'), 'utf8')).toBe(
      preflight.files.find((file) => file.path === 'index.json')?.content,
    )
    expect(
      await readFile(path.join(previewOutputDir, 'index.tsx'), 'utf8'),
    ).toBe(
      preflight.files.find((file) => file.path === '__registry__/index.tsx')
        ?.content,
    )
  })

  it('publishes the exact artifact object that passed validation', async () => {
    const { outputDir, previewOutputDir } = await createOutputDirectories()
    let itemReads = 0
    const singleBuildInput = {
      get items() {
        itemReads += 1
        if (itemReads > 1) {
          throw new Error('artifact input was rebuilt after validation')
        }
        return validInput.items
      },
    } as EmitRegistryInput

    const published = await emitValidatedRegistryArtifacts(singleBuildInput, {
      outputDir,
      previewOutputDir,
    })

    expect(itemReads).toBe(1)
    expect(await readFile(path.join(outputDir, 'index.json'), 'utf8')).toBe(
      published.files.find((file) => file.path === 'index.json')?.content,
    )
    expect(
      await readFile(path.join(previewOutputDir, 'index.tsx'), 'utf8'),
    ).toBe(
      published.files.find((file) => file.path === '__registry__/index.tsx')
        ?.content,
    )
  })
})
