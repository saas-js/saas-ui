export const createCategoryColors = (
  categories: string[],
  colors: string[],
) => {
  return Object.fromEntries(
    categories.map((category, index) => {
      const color = getColor(colors[index] ?? 'gray.500')
      return [category, color]
    }),
  )
}

export const getColor = (color: string) => {
  if (color.match(/\.[0-9]{2,3}/)) {
    return `var(--chakra-colors-${color.replace('.', '-')})`
  }

  return color
}
