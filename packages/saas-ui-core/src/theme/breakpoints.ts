export const breakpointValues = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const breakpoints = Object.fromEntries(
  Object.entries(breakpointValues).map(([key, value]) => [key, `${value}px`]),
)
