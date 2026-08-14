import { structuredPatch } from 'diff'
import { promises as fs } from 'node:fs'

import { highlighter } from '#utils/highlighter'
import type { InstallPlan, PlannedInstallFile } from '#utils/install-plan'

const DEFAULT_FILE_LIMIT = 5

export interface FormatInstallPlanDiffOptions {
  changedOnly?: boolean
  filter?: string
  limit?: number
}

function normalizePath(value: string) {
  return value.replaceAll('\\', '/')
}

export function filterInstallPlanFiles(
  files: readonly PlannedInstallFile[],
  filter?: string,
) {
  if (!filter) return [...files]
  const normalizedFilter = normalizePath(filter)
  const exact = files.filter(
    (file) =>
      normalizePath(file.target) === normalizedFilter ||
      normalizePath(file.source) === normalizedFilter,
  )
  if (exact.length) return exact
  return files.filter(
    (file) =>
      normalizePath(file.target).includes(normalizedFilter) ||
      normalizePath(file.source).includes(normalizedFilter),
  )
}

function normalizeLine(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/['"]/g, "'")
    .replace(/;/g, '')
    .replace(/,$/, '')
}

export function isFormattingOnlyChange(before: string, after: string) {
  const normalize = (value: string) =>
    value.split('\n').map(normalizeLine).filter(Boolean).join(' ')
  return before !== after && normalize(before) === normalize(after)
}

function formatPatch(target: string, before: string, after: string) {
  const patch = structuredPatch(
    `a/${target}`,
    `b/${target}`,
    before,
    after,
    '',
    '',
    { context: 3 },
  )
  const lines = [`--- a/${target}`, `+++ b/${target}`]
  for (const hunk of patch.hunks) {
    lines.push(
      highlighter.info(
        `@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`,
      ),
    )
    for (const line of hunk.lines) {
      if (line.startsWith('+')) lines.push(highlighter.success(line))
      else if (line.startsWith('-')) lines.push(highlighter.error(line))
      else lines.push(line)
    }
  }
  return lines
}

async function readExistingContent(file: PlannedInstallFile) {
  return fs.readFile(file.absoluteTarget, 'utf8').catch(() => '')
}

export async function formatInstallPlanDiff(
  plan: InstallPlan,
  options: FormatInstallPlanDiffOptions = {},
) {
  let files = filterInstallPlanFiles(plan.files, options.filter)
  if (options.changedOnly) {
    files = files.filter((file) => file.action !== 'unchanged')
  }
  const total = files.length
  const limit = options.filter
    ? Number.POSITIVE_INFINITY
    : (options.limit ?? DEFAULT_FILE_LIMIT)
  files = files.slice(0, limit)

  const lines = [`Registry diff: ${plan.requestedItems.join(', ') || '(none)'}`]
  if (!files.length) {
    lines.push(
      options.filter
        ? `No file matching "${options.filter}" found.`
        : 'No file changes.',
    )
    return lines.join('\n')
  }

  for (const file of files) {
    lines.push('', `${file.target} (${file.action})`)
    if (file.action === 'unchanged') {
      lines.push('No changes.')
      continue
    }
    const before = await readExistingContent(file)
    if (isFormattingOnlyChange(before, file.content)) {
      lines.push('Formatting-only changes (spacing, quotes, or semicolons).')
      continue
    }
    lines.push(...formatPatch(file.target, before, file.content))
  }

  if (total > files.length) {
    lines.push(
      '',
      `Showing ${files.length} of ${total} files. Use --diff <path> to view a specific file.`,
    )
  }
  return lines.join('\n')
}
