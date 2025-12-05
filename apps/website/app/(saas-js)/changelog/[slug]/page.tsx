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
} from '@saas-ui/react'
import { Avatar } from '@saas-ui/react'
import { type Changelog, allChangelogs } from 'content-collections'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TbArrowLeft } from 'react-icons/tb'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export const generateStaticParams = async () => {
  return allChangelogs
    .filter((changelog) =>
      changelog.products?.some(
        (product) => product === 'tanstack' || product === 'nextjs',
      ),
    )
    .map((changelog) => ({
      slug: changelog.slug,
    }))
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const changelog = allChangelogs.find(
    (changelog) => changelog.slug === `changelog/${slug}`,
  )

  return {
    title: changelog?.title,
    description: changelog?.description,
    openGraph: {
      images: `/og?title=${changelog?.title}`,
    },
  }
}

export default async function ChangelogPostPage({ params }: Props) {
  const { slug } = await params

  const changelog = allChangelogs.find((changelog) => changelog.slug === slug)

  if (!changelog) return notFound()

  return (
    <Container py="20" maxW="5xl">
      <Stack py="8" gap="2">
        <Box>
          <Button variant="ghost" asChild>
            <Link href="/changelog">
              <TbArrowLeft /> All updates
            </Link>
          </Button>
        </Box>
        <Separator my="10" />
        <HStack textStyle="xs" color="fg.subtle">
          {changelog.version && (
            <>
              <Badge
                variant="outline"
                textTransform="none"
                colorPalette="primary"
              >
                v{changelog.version}
              </Badge>
              <Span>·</Span>
            </>
          )}
          {formatBlogDate(changelog.publishedAt)}
        </HStack>
        <Heading size="4xl">{changelog.title}</Heading>
        <Text color="fg.subtle">{changelog.description}</Text>
        <Stack mt="4" gap="3">
          <Text color="fg.subtle" fontSize="sm">
            Posted by
          </Text>
          <HStack>
            {changelog.authors.map((authorId) => {
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
      <MDXContent code={changelog.code} />
    </Container>
  )
}
