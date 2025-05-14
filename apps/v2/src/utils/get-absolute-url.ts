export const getAbsoluteUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return path
  }
  const url = new URL(path, window.location.origin)
  return url.toString()
}
