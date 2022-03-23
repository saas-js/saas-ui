export function useActivePath(path: string) {
  if (typeof window !== 'undefined') {
    return window.location.pathname === path
  }
}
