export type Breakpoints = false | 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export const getBreakpoints = (breakpoint: Breakpoints = 'lg') => {
  return breakpoint
    ? {
        base: true,
        [breakpoint]: false,
      }
    : { base: false }
}
