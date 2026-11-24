export const formatBlogDate = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface Author {
  name: string
  image: string
  x: { url: string; username: string }
}

const authorMap: Record<string, Author> = {
  eelco: {
    name: 'Eelco Wiersma',
    image:
      'https://gravatar.com/avatar/dc8572726ca3a50f4255f522b36c040d?size=256&cache=1743934247580',
    x: { url: 'https://x.com/eelcodotdev', username: '@eelcodotdev' },
  },
}

export const getBlogAuthor = (author: string): Author => {
  return authorMap[author] ?? {}
}

export type BlogSite = 'saas-ui' | 'saas-js'

export const blogOrigins: Record<BlogSite, string> = {
  'saas-ui': 'https://saas-ui.dev',
  // The apex 308s to www.
  'saas-js': 'https://www.saas-js.com',
}

/** Posts published on one site, newest first. */
export const getBlogPosts = <T extends { site: BlogSite; publishedAt: string }>(
  posts: T[],
  site: BlogSite,
) =>
  posts
    .filter((post) => post.site === site)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )

export const getBlogPostUrl = (post: { site: BlogSite; slug: string }) =>
  `${blogOrigins[post.site]}/blog/${post.slug}`
