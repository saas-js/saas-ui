import GithubSlugger from 'github-slugger'

const slugger = new GithubSlugger()

//see https://github.com/hashicorp/next-mdx-remote/issues/53#issuecomment-725906664
export function getTableOfContents(mdxContent: string) {
  const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm')
  // @ts-ignore
  const headings = [...mdxContent.matchAll(regexp)]
  let tableOfContents = []

  if (headings.length) {
    tableOfContents = headings.map((heading) => {
      const headingText = heading[2].trim()
      const headingType = heading[1].trim() === '##' ? 'h2' : 'h3'
      const headingLink = slugger.slug(headingText, false)

      return {
        text: headingText,
        id: headingLink,
        level: headingType,
      }
    })
  }

  return tableOfContents
}
