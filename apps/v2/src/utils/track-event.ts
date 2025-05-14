export const trackEvent = (category: string, meta: Record<string, any>) => {
  if (typeof window === 'undefined') {
    return
  }
  /* @ts-ignore */
  window.pirsch?.(category, { meta })
}
