import { type FSWatcher, readFile, readdir, watch } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'

import {
  compilePublicRegistry,
  previewRegistryRoot,
  printRegistrySummary,
  publicRegistryRoot,
  registryWatchFiles,
  registryWatchInputs,
  reportRegistryError,
} from './public-registry'

const watchers = new Map<string, FSWatcher>()
const watchedFileSnapshots = new Map<string, string>()
const ignoredDirectoryNames = new Set([
  '.git',
  '.next',
  '.turbo',
  '.vite',
  'dist',
  'node_modules',
])
let generation: Promise<void> | undefined
let rerunRequested = false
let debounce: NodeJS.Timeout | undefined

async function generate() {
  if (generation) {
    rerunRequested = true
    return generation
  }

  generation = (async () => {
    do {
      rerunRequested = false
      try {
        const artifacts = await compilePublicRegistry({
          outputDir: publicRegistryRoot,
          previewOutputDir: previewRegistryRoot,
        })
        printRegistrySummary(artifacts)
      } catch (error) {
        reportRegistryError(error)
        process.exitCode = undefined
      }
    } while (rerunRequested)
  })().finally(() => {
    generation = undefined
  })

  return generation
}

function scheduleGeneration(changedPath: string) {
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(() => {
    console.log(`Registry input changed: ${changedPath}`)
    void refreshWatchers().then(generate, reportRegistryError)
  }, 75)
}

async function addDirectoryWatcher(directory: string) {
  if (watchers.has(directory)) return
  try {
    if (!(await stat(directory)).isDirectory()) return
  } catch {
    return
  }

  const watcher = watch(directory, (event, filename) => {
    scheduleGeneration(path.join(directory, filename?.toString() ?? event))
  })
  watcher.on('error', reportRegistryError)
  watchers.set(directory, watcher)

  await new Promise<void>((resolve, reject) => {
    readdir(directory, { withFileTypes: true }, (error, entries) => {
      if (error) return reject(error)
      Promise.all(
        entries
          .filter(
            (entry) =>
              entry.isDirectory() && !ignoredDirectoryNames.has(entry.name),
          )
          .map((entry) =>
            addDirectoryWatcher(path.join(directory, entry.name)),
          ),
      ).then(() => resolve(), reject)
    })
  })
}

async function addFileWatcher(filename: string) {
  if (watchers.has(filename)) return
  try {
    if (!(await stat(filename)).isFile()) return
  } catch {
    return
  }

  try {
    watchedFileSnapshots.set(filename, await readFile(filename, 'utf8'))
  } catch {
    return
  }

  const watcher = watch(filename, () => {
    void readFile(filename, 'utf8')
      .then((content) => {
        if (watchedFileSnapshots.get(filename) === content) return
        watchedFileSnapshots.set(filename, content)
        scheduleGeneration(filename)
      })
      .catch(() => scheduleGeneration(filename))
  })
  watcher.on('error', reportRegistryError)
  watchers.set(filename, watcher)
}

async function refreshWatchers() {
  await Promise.all([
    ...registryWatchInputs.map(addDirectoryWatcher),
    ...registryWatchFiles.map(addFileWatcher),
  ])
}

function close() {
  if (debounce) clearTimeout(debounce)
  for (const watcher of watchers.values()) watcher.close()
  watchers.clear()
  watchedFileSnapshots.clear()
}

process.once('SIGINT', () => {
  close()
  process.exit(130)
})
process.once('SIGTERM', () => {
  close()
  process.exit(143)
})

await refreshWatchers()
if (!process.argv.includes('--skip-initial')) await generate()
console.log(`Watching ${watchers.size} registry source directories.`)
