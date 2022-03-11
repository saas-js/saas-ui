import fs from 'fs'
import { format } from 'date-fns'

const cwd = process.cwd()

function getFrontmatter() {
  const date = format(new Date(), 'PP')
  return `---
title: Updates for ${date}
date: '${new Date().toString()}'
---`
}

async function main() {
  const content = fs.readFileSync(`${cwd}/.changelogrc`).toString()
  const changelogPath = `${cwd}/CHANGELOG.md`
  const changelog = await fs.promises.readFile(changelogPath, 'utf8')
  const newChangelog = changelog.replace(
    '<!-- CHANGELOG:INSERT -->',
    `<!-- CHANGELOG:INSERT -->\n\n${content}`
  )
  // write new changelog
  await fs.promises.writeFile(changelogPath, newChangelog)

  const postDate = format(new Date(), 'MM-dd-yyyy')
  const post = [getFrontmatter(), content].join('\n\n')

  // write changelog post
  fs.writeFileSync(
    `${cwd}/apps/website/src/pages/changelog/${postDate}.mdx`,
    post
  )
}

main()
