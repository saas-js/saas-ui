import fs from 'fs'
import { allBlogs, Blog } from '.contentlayer/generated'
import { MDXComponents } from '@/docs/components/mdx-components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from '@/hooks/next-contentlayer'
import readingTime from 'reading-time'
import Layout from 'src/layouts/'
import generateRss from '@/utils/generate-rss'

export default function Page({ blog }: { blog: Blog }) {
  const Component = useMDXComponent(blog.body.code)

  return (
    <Layout frontMatter={blog.frontMatter}>
      {/* @ts-ignore */}
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = allBlogs
    .map((t) => t._id.replace('blog/', '').replace('.mdx', ''))
    .map((id) => ({ params: { slug: id.split('/') } }))

  return {
    paths: blogs,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]
  const blog = allBlogs.find((blog) => blog._id.includes(params.join('/')))

  const rss = generateRss(allBlogs, 'blog.xml')
  fs.writeFileSync('./public/blog.xml', rss)

  blog.frontMatter.stats = readingTime(blog.body.raw)

  return {
    props: {
      blog,
      header: { position: 'sticky', borderBottomWidth: '1px' },
      footer: false,
    },
  }
}
