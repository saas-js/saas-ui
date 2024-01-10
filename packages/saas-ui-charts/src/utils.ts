export const createCategoryColors = (
  categories: string[],
  colors: string[],
  theme: any
) => {
  return Object.fromEntries(
    categories.map((category, index) => {
      let color = colors[index] ?? 'gray.500'

      if (color.match(/\.[0-9]{2,3}/)) {
        color = `var(--chakra-colors-${color.replace('.', '-')})`
      } else if (theme.colors[color]) {
        color = theme.colors[color]?.[500]
      }

      return [category, color]
    })
  )
}
