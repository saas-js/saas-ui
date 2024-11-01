export const breakpointValues = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const breakpoints = Object.fromEntries(
  Object.entries(breakpointValues).map(([key, value]) => [key, `${value}px`]),
)
