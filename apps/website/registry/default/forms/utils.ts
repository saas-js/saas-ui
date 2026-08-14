/**
 * Extract a displayable error message from a field's `meta.errors`.
 *
 * TanStack Form surfaces errors from two sources with different shapes:
 * - Standard Schema (Zod) validators produce issue objects `{ message }`.
 * - Function validators produce plain strings.
 *
 * This normalizes both to the first error's message string.
 */
export function getErrorText(
  errors: ReadonlyArray<unknown> | undefined,
): string | undefined {
  const first = errors?.[0]
  if (first == null) {
    return undefined
  }
  if (typeof first === 'string') {
    return first
  }
  return (first as { message?: string }).message
}
