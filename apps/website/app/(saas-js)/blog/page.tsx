import { BlogCard } from '@/components/blog-card'
import { Box, Container, Grid, Heading, Stack } from '@chakra-ui/react'
import { allBlogs } from 'content-collections'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Catch up on the latest Saas UI news, covering releases, framework developments, and other essential information.',
  openGraph: {
    images: `/og?title=Blog`,
  },
}

const sortedBlogs = allBlogs.sort((a, b) => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
})

export default function BlogPage() {
  const firstTwo = sortedBlogs.slice(0, 2)
  const nextThree = sortedBlogs.slice(2, 5)
  const remaining = sortedBlogs.slice(5)

  return (
    <Box py="20">
      <Container maxW="6xl">
        <Stack gap={{ base: '5', md: '10' }} pt="10">
          <Stack gap="5" pr="4" maxW="3xl">
            <Heading as="h2" size="2xl">
              Blog
            </Heading>
          </Stack>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="6">
            {firstTwo.map((blog, index) => (
              <BlogCard key={index} data={blog} aspectRatio={16 / 9} />
            ))}
          </Grid>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="6">
            {nextThree.map((blog, index) => (
              <BlogCard key={index} data={blog} aspectRatio={16 / 9} />
            ))}
          </Grid>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap="6">
            {remaining.map((blog, index) => (
              <BlogCard key={index} data={blog} aspectRatio={16 / 9} />
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  )
}
