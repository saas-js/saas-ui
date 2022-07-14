import { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import { Box, Heading, Stack } from '@chakra-ui/react'

import SEO from '@/components/seo'
import { MDXComponents } from '@/docs/components/mdx-components'
import { allChangelogs } from '.contentlayer/generated'
// import type { Changelog } from '.contentlayer/types'
import { useMDXComponent } from 'next-contentlayer/hooks'
import generateRss from '@/utils/generate-rss'

import Layout from '../layouts'

import Link from '@/components/link'

import { compareDesc } from 'date-fns'

const Post = (props) => {
  const { title, body, frontMatter } = props

  const Component = useMDXComponent(body.code)

  return (
    <Box as="article">
      <Heading size="sm" mb="2" color="muted" fontWeight="medium">
        <Link href={frontMatter.slug}>{title}</Link>
      </Heading>
      <Component components={MDXComponents as any} />
    </Box>
  )
}

const Changelog = ({ changelogs }) => {
  const frontmatter = {
    title: 'Changelog',
    description: 'All updates and improvements to Saas UI',
    slug: '/changelog',
  }
  return (
    <Layout frontMatter={frontmatter}>
      <Box py={20}>
        <Stack spacing="20">
          {changelogs.map((item, i) => {
            return <Post key={item._id} {...item} />
          })}
        </Stack>
      </Box>
    </Layout>
  )
}

export default Changelog

export const getStaticProps: GetStaticProps = async (ctx) => {
  const changelogs =
    allChangelogs.sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    }) || []

  const rss = generateRss(allChangelogs, 'changelog.xml')
  fs.writeFileSync('./public/changelog.xml', rss)

  return {
    props: {
      header: { position: 'sticky', borderBottomWidth: '1px' },
      footer: false,
      changelogs,
    },
  }
}
