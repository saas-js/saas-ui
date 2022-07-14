import { GetStaticPaths, GetStaticProps } from 'next'
import {
  Box,
  Heading,
  Text,
  Stack,
  Container,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react'

import SEO from '@/components/seo'

import { allBlogs } from '.contentlayer/generated'

import Link from '@/components/link'
import { compareDesc } from 'date-fns'

const Post = (props) => {
  const { title, description, slug, status } = props

  return (
    <LinkBox as="article">
      <Heading size="md" mb="2">
        <LinkOverlay as={Link} href={slug}>
          {title}
        </LinkOverlay>
      </Heading>
      <Text color={useColorModeValue('gray.500', 'gray.400')}>
        {description}
      </Text>
    </LinkBox>
  )
}

const BlogPage = ({ blogs }) => {
  return (
    <Box py={20}>
      <SEO
        title="Blog"
        description="A blog about UI development"
        titleTemplate="%s - Saas UI"
      />
      <Container maxW="4xl">
        <Heading size="2xl" as="h2" mb="12">
          Blog
        </Heading>

        <Stack>
          {blogs.map((blog, i) => {
            return <Post key={blog._id} {...blog} />
          })}
        </Stack>
      </Container>
    </Box>
  )
}

export default BlogPage

export const getStaticProps: GetStaticProps = async (ctx) => {
  const blogs =
    allBlogs
      .filter(
        (blog) =>
          process.env.NODE_ENV === 'development' || blog.status !== 'draft'
      )
      .sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
      }) || []

  return {
    props: {
      blogs,
    },
  }
}
