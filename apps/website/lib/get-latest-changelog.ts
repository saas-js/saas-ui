import { type Changelog, allChangelogs } from 'content-collections'

export function getLatestChangelog(
  products: string[],
): Pick<Changelog, 'title' | 'slug'> | null {
  const latest = allChangelogs
    .filter((changelog) => {
      const changelogProducts = changelog.products ?? []
      return products.some((product) => changelogProducts.includes(product))
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )[0]

  if (!latest) return null

  return {
    title: latest.title,
    slug: latest.slug,
  }
}
