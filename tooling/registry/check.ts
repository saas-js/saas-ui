import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import {
  compilePublicRegistry,
  printRegistrySummary,
  reportRegistryError,
} from './public-registry'

interface FileSnapshot {
  path: string
  content: Buffer
}

async function snapshotDirectory(
  root: string,
  directory = root,
): Promise<FileSnapshot[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const snapshots = await Promise.all(
    entries.map(async (entry): Promise<FileSnapshot[]> => {
      const absolutePath = path.join(directory, entry.name)
      if (entry.isDirectory()) return snapshotDirectory(root, absolutePath)
      if (!entry.isFile()) return []

      return [
        {
          path: path.relative(root, absolutePath).split(path.sep).join('/'),
          content: await readFile(absolutePath),
        },
      ]
    }),
  )

  return snapshots
    .flat()
    .sort((left, right) => left.path.localeCompare(right.path, 'en'))
}

export async function compareDirectories(expected: string, actual: string) {
  const [expectedFiles, actualFiles] = await Promise.all([
    snapshotDirectory(expected),
    snapshotDirectory(actual),
  ])
  const expectedByPath = new Map(
    expectedFiles.map((file) => [file.path, file.content]),
  )
  const actualByPath = new Map(
    actualFiles.map((file) => [file.path, file.content]),
  )
  const paths = [
    ...new Set([...expectedByPath.keys(), ...actualByPath.keys()]),
  ].sort((left, right) => left.localeCompare(right, 'en'))

  return paths.flatMap((filePath) => {
    const expectedContent = expectedByPath.get(filePath)
    const actualContent = actualByPath.get(filePath)
    if (!expectedContent) return [`unexpected ${filePath}`]
    if (!actualContent) return [`missing ${filePath}`]
    if (!expectedContent.equals(actualContent)) return [`changed ${filePath}`]
    return []
  })
}

async function checkRegistry() {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'saas-ui-registry-'))
  const firstPublicRoot = path.join(temporaryRoot, 'first', 'public', 'r')
  const firstPreviewRoot = path.join(temporaryRoot, 'first', '__registry__')
  const secondPublicRoot = path.join(temporaryRoot, 'second', 'public', 'r')
  const secondPreviewRoot = path.join(temporaryRoot, 'second', '__registry__')

  try {
    const [artifacts] = await Promise.all([
      compilePublicRegistry({
        outputDir: firstPublicRoot,
        previewOutputDir: firstPreviewRoot,
      }),
      compilePublicRegistry({
        outputDir: secondPublicRoot,
        previewOutputDir: secondPreviewRoot,
      }),
    ])
    const [publicDrift, previewDrift] = await Promise.all([
      compareDirectories(firstPublicRoot, secondPublicRoot),
      compareDirectories(firstPreviewRoot, secondPreviewRoot),
    ])
    const drift = [
      ...publicDrift.map((entry) => `public/r: ${entry}`),
      ...previewDrift.map((entry) => `__registry__: ${entry}`),
    ]

    if (drift.length) {
      throw new Error(
        `Registry generation is nondeterministic:\n${drift
          .map((entry) => `- ${entry}`)
          .join('\n')}`,
      )
    }

    printRegistrySummary(artifacts, 'Validated')
    console.log('Two clean public registry builds are byte-for-byte identical.')
  } finally {
    await rm(temporaryRoot, { force: true, recursive: true })
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  try {
    await checkRegistry()
  } catch (error) {
    reportRegistryError(error)
  }
}
