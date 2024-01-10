export const createCategoryColors = (
  categories: string[],
  colors: string[],
  theme: any
) => {
  return Object.fromEntries(
    categories.map((category, index) => {
      const color = getColor(colors[index] ?? 'gray.500', theme)
      return [category, color]
    })
  )
}

export const getColor = (color: string, theme: any) => {
  if (color.match(/\.[0-9]{2,3}/)) {
    return `var(--chakra-colors-${color.replace('.', '-')})`
  } else if (theme.colors[color]) {
    return theme.colors[color]?.[500]
  }

  return color
}
