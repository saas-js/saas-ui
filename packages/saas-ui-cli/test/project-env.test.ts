import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { loadProjectEnv } from '#utils/load-project-env'

const variable = 'SAAS_UI_NAMESPACE_ENV_TEST'
const original = process.env[variable]
const temporaryDirectories: string[] = []

afterEach(async () => {
  if (original === undefined) delete process.env[variable]
  else process.env[variable] = original
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { force: true, recursive: true })),
  )
})

describe('project environment', () => {
  it('loads .env.local before .env without overriding the command environment', async () => {
    const cwd = await mkdtemp(path.join(tmpdir(), 'saas-ui-env-'))
    temporaryDirectories.push(cwd)
    await writeFile(path.join(cwd, '.env.local'), `${variable}=local\n`)
    await writeFile(path.join(cwd, '.env'), `${variable}=fallback\n`)

    delete process.env[variable]
    loadProjectEnv(cwd)
    expect(process.env[variable]).toBe('local')

    process.env[variable] = 'command'
    loadProjectEnv(cwd)
    expect(process.env[variable]).toBe('command')
  })
})
