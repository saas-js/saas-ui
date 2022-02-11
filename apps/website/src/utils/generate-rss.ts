import siteMetadata from '@/data/site-config'

const generateRssItem = (post) => {
  console.log(post)
  if (post.slug.match(/\.draft/)) return ''

  let description = post.description
  if (!post.description) {
    description = post.body.raw.substr(0, 100) + '...'
  }

  return `
  <item>
    <guid>${siteMetadata.seo.siteUrl}${post.slug}</guid>
    <title>${post.title}</title>
    <link>${siteMetadata.seo.siteUrl}${post.slug}</link>
    <description>${description}</description>
    ${
      post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''
    }
    <author>${siteMetadata.author.email} (${siteMetadata.author.name})</author>
    ${post.tags?.map((t) => `<category>${t}</category>`).join('') || ''}
  </item>
`
}

const generateRss = (posts = [], page = 'index.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${siteMetadata.seo.title}</title>
      <link>${siteMetadata.seo.siteUrl}</link>
      <description>${siteMetadata.seo.description}</description>
      <language>${siteMetadata.seo.openGraph.locale}</language>
      <managingEditor>${siteMetadata.author.email} (${
  siteMetadata.author.name
})</managingEditor>
      <webMaster>${siteMetadata.author.email} (${
  siteMetadata.author.name
})</webMaster>
      <lastBuildDate>${new Date(
        posts[0].date || new Date()
      ).toUTCString()}</lastBuildDate>
      <atom:link href="${
        siteMetadata.seo.siteUrl
      }/${page}" rel="self" type="application/rss+xml"/>
      ${posts?.map(generateRssItem).join('')}
    </channel>
  </rss>
`
export default generateRss
