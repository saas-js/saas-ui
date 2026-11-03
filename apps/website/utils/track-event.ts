export const trackEvent = (category: string, meta: Record<string, any>) => {
  if (typeof window === 'undefined') {
    return
  }

  window.kobbe?.track(category, meta)
}

declare global {
  interface Window {
    kobbe?: {
      track: (name: string, properties?: Record<string, unknown>) => void
    }
  }
}
