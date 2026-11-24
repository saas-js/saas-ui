import { MDXContent } from '@/components/mdx-content'
import {
  type BlogSite,
  formatBlogDate,
  getBlogAuthor,
  getBlogPostUrl,
  getBlogPosts,
} from '@/lib/blog'
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Separator,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { allBlogs } from 'content-collections'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { TbArrowLeft } from 'react-icons/tb'

import { Avatar } from '#components/ui/avatar'

interface Props {
  params: Promise<{ slug: string }>
}

export const getBlogStaticParams = (site: BlogSite) =>
  getBlogPosts(allBlogs, site).map((blog) => ({ slug: blog.slug }))

export const getBlogPostMetadata = async (
  site: BlogSite,
  { params }: Props,
): Promise<Metadata> => {
  const { slug } = await params
  const blog = allBlogs.find((blog) => blog.slug === slug)

  if (!blog || blog.site !== site) return {}

  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      type: 'article',
      publishedTime: blog.publishedAt,
      images: `/og?title=${encodeURIComponent(blog.title)}&category=${blog.type}&site=${site === 'saas-js' ? 'sjs' : 'sui'}`,
    },
  }
}

export async function BlogPost({ site, params }: Props & { site: BlogSite }) {
  const { slug } = await params

  const blog = allBlogs.find((blog) => blog.slug === slug)

  if (!blog) return notFound()

  // Both blogs used to live on saas-js.com. A post requested on the other
  // site's blog moves to its home instead of 404ing or serving a duplicate.
  if (blog.site !== site) permanentRedirect(getBlogPostUrl(blog))

  return (
    <Container py="20" maxW="5xl">
      <Stack py="8" gap="2">
        <Box>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <TbArrowLeft /> All posts
            </Link>
          </Button>
        </Box>
        <Separator my="10" />
        <HStack textStyle="xs" color="fg.subtle">
          <Badge
            variant="outline"
            textTransform="capitalize"
            colorPalette="primary"
          >
            {blog.type}
          </Badge>
          <Span>·</Span>
          {formatBlogDate(blog.publishedAt)}
        </HStack>
        <Heading size="4xl">{blog.title}</Heading>
        <Text color="fg.subtle">{blog.description}</Text>
        <Stack mt="4" gap="3">
          <Text color="fg.subtle" fontSize="sm">
            Posted by
          </Text>
          <HStack>
            {blog.authors.map((authorId) => {
              const author = getBlogAuthor(authorId)
              return (
                <HStack key={author.name} gap="4">
                  <Avatar src={author.image} name={author.name} />
                  <Stack gap="0" fontSize="sm">
                    <Text>{author.name}</Text>
                    <Text color="fg.subtle">{author.x.username}</Text>
                  </Stack>
                </HStack>
              )
            })}
          </HStack>
        </Stack>
      </Stack>
      <Separator my="10" />
      <MDXContent code={blog.code} mdxId={blog.mdxId} />
    </Container>
  )
}
