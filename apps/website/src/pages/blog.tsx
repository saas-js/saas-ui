import { GetStaticProps } from 'next'
import {
  Box,
  Heading,
  Text,
  Container,
  HStack,
  Image,
  SimpleGrid,
  Card,
  AspectRatio,
  CardBody,
  Avatar,
} from '@chakra-ui/react'

import SEO from '@/components/seo'

import { allBlogs } from '.contentlayer/generated'

import Link from '@/components/link'
import { compareDesc } from 'date-fns'
import {
  StructuredList,
  StructuredListCell,
  StructuredListItem,
} from '@saas-ui/react'

const Post = (props) => {
  const { title, description, slug, image, status, author, avatar, size } =
    props

  return (
    <Card
      as={Link}
      href={slug}
      rounded="xl"
      overflow="hidden"
      _hover={{ bg: 'gray.100' }}
      _dark={{ bg: 'gray.800', _hover: { bg: 'gray.700' } }}
      transitionProperty="common"
      transitionDuration="normal"
      position="relative"
    >
      <AspectRatio ratio={16 / 9} width="full">
        <Image
          src={image || `/api/og?title=${title}`}
          alt={title}
          width="100%"
        />
      </AspectRatio>

      <CardBody
        position="absolute"
        bgGradient="linear(to-t, gray.900, transparent)"
        bottom="0"
        width="full"
        pt="4"
        px={size === 'sm' ? '4' : '6'}
      >
        <HStack>
          <Avatar
            size={size === 'sm' ? '2xs' : 'xs'}
            name={author}
            src={avatar}
          />{' '}
          <Text fontSize="sm" color="muted" display="none">
            {author}
          </Text>
        </HStack>
        {image ? (
          <Heading size="md" mt="2">
            {title}
          </Heading>
        ) : null}
      </CardBody>
    </Card>
  )
}

const BlogPage = ({ blogs }) => {
  const latest = blogs.slice(0, 2)
  const recent = blogs.slice(2, 5)
  const older = blogs.slice(5)

  return (
    <Box py={20}>
      <SEO
        title="Blog"
        description="A blog about UI development"
        titleTemplate="%s - Saas UI"
      />
      <Container maxW="container.lg">
        <Heading size="xl" as="h2" mb="12">
          Blog
        </Heading>

        <SimpleGrid columns={2} spacing={8} mb={8}>
          {latest.map((blog, i) => {
            return <Post key={blog._id} {...blog} />
          })}
        </SimpleGrid>

        <SimpleGrid columns={3} spacing={8}>
          {recent.map((blog, i) => {
            return <Post key={blog._id} {...blog} size="sm" />
          })}
        </SimpleGrid>

        <StructuredList>
          {older.map((post, i) => {
            return (
              <StructuredListItem key={post.slug} href={post.slug}>
                <StructuredListCell>{post.title}</StructuredListCell>
              </StructuredListItem>
            )
          })}
        </StructuredList>
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
