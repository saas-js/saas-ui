export function scaleToken(value: string | number) {
  return `calc(${value} * var(--scale-factor))`
}

export function radiusToken(value: string | number) {
  console.log(`calc(${value} * var(--scale-factor) * var(--radius-factor))`)
  return `calc(${value} * var(--scale-factor) * var(--radius-factor))`
}

const BASE_GRID_SIZE = 4
const BASE_FONT_SIZE = 16

export function fluid<
  P extends string,
  MinPx extends number,
  MaxPx extends number,
>(params: { property: P; from: MinPx; to: MaxPx; divider?: number }) {
  const divider = params.divider ?? BASE_GRID_SIZE
  const breakpointMin = params.from / BASE_FONT_SIZE
  const breakpointMax = params.to / BASE_FONT_SIZE
  const breakpointScope = breakpointMax - breakpointMin
  return `
    clamp(calc(var(---${params.property}-min) * 1rem), calc((var(---${params.property}-scope) * 100vw) + (var(---${params.property}-intercept) * 1rem)), calc(var(---${params.property}-max) * 1rem));
    ---${params.property}-min: var(--${params.property}-min) / ${divider};
    ---${params.property}-max: var(--${params.property}-max) / ${divider};
    ---${params.property}-scope: (var(---${params.property}-max) - var(---${params.property}-min)) / ${breakpointScope};
    ---${params.property}-intercept: calc(var(---${params.property}-min) - (var(---${params.property}-scope) * ${breakpointMin}));
  ` as const
}

// fontSize: `clamp(calc(var(--${params.property}-min) * 1rem), calc((var(--${params.property}-scope) * 100vw) + (var(--${params.property}-intercept) * 1rem)), calc(var(--${params.property}-max) * 1rem))`,
// [`--${params.property}-min`]: `var(--${params.property}-min) / ${divider}`,
// [`--${params.property}-max`]: `var(--${params.property}-max) / ${divider}`,
// [`--${params.property}-scope`]: `(var(--${params.property}-max) - var(---${params.property}-min)) / ${breakpointScope}`,
// [`--${params.property}-intercept`]: `calc(var(--${params.property}-min) - (var(--${params.property}-scope) * ${breakpointMin}))`,
