import { MDXContent } from '@/components/mdx-content'
import { formatBlogDate, getBlogAuthor } from '@/lib/blog'
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Span,
  Stack,
  Text,
} from '@saas-ui/react'
import { Avatar } from '@saas-ui/react'
import { allChangelogs } from 'content-collections'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Stay up to date with the latest features and improvements to Saas JS.',
  openGraph: {
    images: `/og?title=Changelog`,
  },
}

const ITEMS_PER_PAGE = 10

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function ChangelogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const currentPage = parseInt(pageParam || '1', 10)

  // Filter changelogs for tanstack and nextjs products
  const filteredChangelogs = allChangelogs.filter((changelog) => {
    const products = changelog.products || []
    return products.some(
      (product) => product === 'tanstack' || product === 'nextjs',
    )
  })

  const sortedChangelogs = filteredChangelogs.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  const totalPages = Math.ceil(sortedChangelogs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedChangelogs = sortedChangelogs.slice(startIndex, endIndex)

  return (
    <Box py="40" bg="bg.muted">
      <Container maxW="5xl">
        <Stack gap={{ base: '8', md: '12' }} pt="10">
          <Stack gap="5" pr="4" mb="8">
            <Heading as="h1" size="4xl">
              Changelog
            </Heading>
          </Stack>

          <Stack gap="0" pos="relative">
            {paginatedChangelogs.map((changelog, index) => (
              <Box
                key={changelog.slug}
                id={changelog.slug}
                display="flex"
                gap="8"
                pos="relative"
                pb="20"
              >
                {/* Timeline Date - Left Side */}
                <Box
                  w="180px"
                  flexShrink={0}
                  pos="relative"
                  display={{ base: 'none', md: 'block' }}
                >
                  <Box pos="sticky" top="20" pt="1">
                    <HStack gap="3" alignItems="flex-start">
                      <Stack gap="0" textAlign="right" flex="1">
                        <Text fontSize="sm" fontWeight="medium">
                          {formatBlogDate(changelog.publishedAt)}
                        </Text>
                        {changelog.version && (
                          <Badge
                            variant="outline"
                            textTransform="none"
                            colorPalette="primary"
                            w="fit-content"
                            ml="auto"
                          >
                            v{changelog.version}
                          </Badge>
                        )}
                      </Stack>
                      {/* Timeline Circle */}
                      <Box
                        w="12px"
                        h="12px"
                        borderRadius="full"
                        bg="primary.solid"
                        borderWidth="3px"
                        borderColor="bg"
                        pos="relative"
                        zIndex={2}
                        flexShrink={0}
                        mt="1"
                      />
                    </HStack>
                  </Box>
                  {/* Vertical Timeline Line */}
                  {index < paginatedChangelogs.length - 1 && (
                    <Box
                      pos="absolute"
                      right="6px"
                      top="20px"
                      bottom="-20px"
                      w="2px"
                      bg="border"
                      zIndex={1}
                    />
                  )}
                </Box>

                {/* Content - Right Side */}
                <Stack gap="4" flex="1" minW="0">
                  {/* Mobile Date */}
                  <HStack
                    textStyle="xs"
                    color="fg.subtle"
                    display={{ base: 'flex', md: 'none' }}
                  >
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

                  <Heading size="3xl">
                    <Link
                      href={`/changelog/${changelog.slug.replace('changelog/', '')}`}
                    >
                      {changelog.title}
                    </Link>
                  </Heading>
                  <Text color="fg.subtle">{changelog.description}</Text>
                  <HStack gap="2">
                    {changelog.authors.map((authorId) => {
                      const author = getBlogAuthor(authorId)
                      return (
                        <HStack key={author.name} gap="2">
                          <Avatar
                            src={author.image}
                            name={author.name}
                            size="xs"
                          />
                          <Text fontSize="sm" color="fg.subtle">
                            {author.name}
                          </Text>
                        </HStack>
                      )
                    })}
                  </HStack>
                  <Box mt="2">
                    <MDXContent code={changelog.code} />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <HStack justify="center" gap="2" pt="8">
              {currentPage > 1 && (
                <Button asChild variant="outline">
                  <Link href={`/changelog?page=${currentPage - 1}`}>
                    Previous
                  </Link>
                </Button>
              )}
              <HStack gap="1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Button
                      key={pageNum}
                      asChild
                      variant={pageNum === currentPage ? 'solid' : 'ghost'}
                      colorPalette={
                        pageNum === currentPage ? 'primary' : undefined
                      }
                    >
                      <Link href={`/changelog?page=${pageNum}`}>{pageNum}</Link>
                    </Button>
                  ),
                )}
              </HStack>
              {currentPage < totalPages && (
                <Button asChild variant="outline">
                  <Link href={`/changelog?page=${currentPage + 1}`}>Next</Link>
                </Button>
              )}
            </HStack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
