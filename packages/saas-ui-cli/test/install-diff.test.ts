import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import {
  filterInstallPlanFiles,
  formatInstallPlanDiff,
  isFormattingOnlyChange,
} from '#utils/install-diff'
import type { InstallPlan, PlannedInstallFile } from '#utils/install-plan'

const temporaryDirectories: string[] = []

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { force: true, recursive: true })),
  )
})

function plan(files: PlannedInstallFile[]): InstallPlan {
  return {
    schemaVersion: 1,
    style: 'default',
    mode: 'add',
    requestedItems: ['@acme/button'],
    transitiveItems: [],
    replacedItems: [],
    items: [],
    dependencies: [],
    devDependencies: [],
    conflicts: [],
    files,
    docs: [],
  }
}

function file(
  root: string,
  target: string,
  content: string,
  action: PlannedInstallFile['action'] = 'conflict',
): PlannedInstallFile {
  return {
    item: '@acme/button',
    source: `ui/${path.basename(target)}`,
    target,
    absoluteTarget: path.join(root, target),
    content,
    hash: '0'.repeat(64),
    action,
  }
}

function stripAnsi(value: string) {
  return value.replace(/\u001B\[[0-9;]*m/g, '')
}

describe('install plan diff formatting', () => {
  it('formats a filtered unified diff using local content as the base', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-diff-'))
    temporaryDirectories.push(root)
    const button = file(
      root,
      'src/components/ui/button.tsx',
      'export const Button = 2\n',
    )
    const card = file(
      root,
      'src/components/ui/card.tsx',
      'export const Card = 2\n',
      'create',
    )
    await mkdir(path.dirname(button.absoluteTarget), { recursive: true })
    await writeFile(button.absoluteTarget, 'export const Button = 1\n')

    const output = stripAnsi(
      await formatInstallPlanDiff(plan([button, card]), {
        filter: 'button.tsx',
      }),
    )

    expect(output).toContain('src/components/ui/button.tsx (conflict)')
    expect(output).toContain('-export const Button = 1')
    expect(output).toContain('+export const Button = 2')
    expect(output).not.toContain('card.tsx')
  })

  it('limits an overview and resolves exact or partial paths', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-diff-'))
    temporaryDirectories.push(root)
    const files = Array.from({ length: 6 }, (_, index) =>
      file(
        root,
        `src/components/ui/file-${index}.tsx`,
        `export const n = ${index}\n`,
        'create',
      ),
    )

    expect(filterInstallPlanFiles(files, 'file-3.tsx')).toEqual([files[3]])
    const output = stripAnsi(await formatInstallPlanDiff(plan(files)))
    expect(output).toContain('Showing 5 of 6 files')
    expect(output).not.toContain('file-5.tsx')
  })

  it('suppresses formatting-only noise', async () => {
    expect(
      isFormattingOnlyChange(
        'export const value = "same";\n',
        "export const value = 'same'\n",
      ),
    ).toBe(true)
  })
})
