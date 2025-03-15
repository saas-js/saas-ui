import GithubSlugger from 'github-slugger'

//see https://github.com/hashicorp/next-mdx-remote/issues/53#issuecomment-725906664
export function getTableOfContents(mdxContent: string) {
  const regexp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g

  const slugger = new GithubSlugger()

  const headings = Array.from(mdxContent.matchAll(regexp))

  let tableOfContents: Array<{
    text?: string
    id?: string
    level: 'h2' | 'h3'
  }> = []

  if (headings.length) {
    tableOfContents = headings.map(({ groups }) => {
      const headingText = groups?.content
      const headingType = groups?.flag === '##' ? 'h2' : 'h3'
      const headingLink = headingText
        ? slugger.slug(headingText, false)
        : undefined

      return {
        text: headingText,
        id: headingLink,
        level: headingType,
      }
    })
  }

  return tableOfContents
}
