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
