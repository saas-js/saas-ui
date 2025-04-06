import { blogs } from '@/.velite'
import { BlogCard } from '@/components/blog-card'
import { HighlightHeading, Subheading } from '@/components/site/typography'
import { Box, Container, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Catch up on the latest Saas UI news, covering releases, framework developments, and other essential information.',
  openGraph: {
    images: `/og?title=Blog`,
  },
}

export default function BlogPage() {
  return (
    <Box py="20">
      <Container>
        <Stack gap={{ base: '5', md: '10' }} mb="20">
          <Stack gap="5" pr="4" maxW="3xl" px="1.5">
            <Heading as="h2" size="5xl">
              Saas UI News and Updates
            </Heading>
            <Subheading>
              Catch up on the latest Saas UI news, covering releases, framework
              developments, and other essential information
            </Subheading>
          </Stack>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} data={blog} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
