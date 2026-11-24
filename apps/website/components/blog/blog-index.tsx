import { BlogCard } from '@/components/blog/blog-card'
import { type BlogSite, getBlogPosts } from '@/lib/blog'
import { Box, Container, Grid, Heading, Stack } from '@chakra-ui/react'
import { allBlogs } from 'content-collections'
import { Metadata } from 'next'

const descriptions: Record<BlogSite, string> = {
  'saas-ui':
    'Catch up on the latest Saas UI news, covering component releases, tutorials, and design engineering.',
  'saas-js':
    'Catch up on the latest Saas.js news, covering starter kit releases, packages, and building SaaS apps with React.',
}

export const getBlogIndexMetadata = (site: BlogSite): Metadata => ({
  title: 'Blog',
  description: descriptions[site],
  alternates: { canonical: '/blog' },
  openGraph: {
    images: `/og?title=Blog&site=${site === 'saas-js' ? 'sjs' : 'sui'}`,
  },
})

export function BlogIndex({ site }: { site: BlogSite }) {
  const sortedBlogs = getBlogPosts(allBlogs, site)
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
