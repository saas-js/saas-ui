export function recipeClassNames(
  className: string,
  variants?: Record<string, string | undefined>,
): string {
  const parts = [className]

  for (const [name, value] of Object.entries(variants ?? {})) {
    if (value) {
      parts.push(`${className}--${name}-${value}`)
    }
  }

  return parts.join(' ')
}
