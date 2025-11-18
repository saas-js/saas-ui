export function isUrl(path: string): boolean {
  try {
    new URL(path)
    return true
  } catch {
    return false
  }
}

export function isLocalFile(path: string): boolean {
  return path.startsWith('.') || path.startsWith('/')
}
