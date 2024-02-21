export const slugify = (value: string) => {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
