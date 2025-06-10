import { MDXContent } from '@/components/mdx-content'
import { formatBlogDate, getBlogAuthor } from '@/lib/blog'
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
import { Avatar, BackButton } from '@saas-ui/react'
import { allBlogs } from 'content-collections'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TbArrowLeft } from 'react-icons/tb'

interface Props {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  return allBlogs.map((blog) => ({ slug: blog.slug.replace('blog/', '') }))
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const blog = allBlogs.find((blog) => blog.slug === `blog/${slug}`)

  return {
    title: blog?.title,
    description: blog?.description,
    openGraph: {
      images: `/og?title=${blog?.title}&category=${blog?.type}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const blog = allBlogs.find((blog) => blog.slug === slug)
  if (!blog) return notFound()

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
      <MDXContent code={blog.code} />
    </Container>
  )
}
