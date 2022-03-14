import { Octokit } from '@octokit/rest'
import fs from 'fs'
import path from 'path'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function main() {
  const res = await octokit.repos.getContent({
    owner: 'saas-js',
    repo: 'saas-ui-pro',
    path: 'CHANGELOG.md',
  })

  let content = Buffer.from((res.data as any).content, 'base64').toString(
    'utf-8'
  )

  content = content.replace('<!-- CHANGELOG:INSERT -->', '')

  fs.writeFileSync(
    path.join(
      process.cwd(),
      'apps',
      'website',
      'src',
      'pages',
      'changelog',
      'content.mdx'
    ),
    content
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
