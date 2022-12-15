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
  Button,
  Icon,
  VStack,
  HStack,
  Image,
} from '@chakra-ui/react'

import SEO from '@/components/seo'

import { allBlogs } from '.contentlayer/generated'

import Link, { ButtonLink } from '@/components/link'
import { compareDesc } from 'date-fns'
import { FiArrowRight } from 'react-icons/fi'

const Post = (props) => {
  const { title, description, slug, image, status } = props

  return (
    <LinkBox as="article" role="group">
      <HStack alignItems="flex-start" spacing="8">
        <Box
          width="300px"
          height="150px"
          flexShrink="0"
          overflow="hidden"
          borderRadius="lg"
        >
          <Image src={image || `/api/og?title=${title}`} alt={title} />
        </Box>
        <Box pt="4">
          <Heading size="md" mb="2">
            <LinkOverlay
              as={Link}
              href={slug}
              _hover={{ textDecoration: 'none' }}
            >
              {title}
            </LinkOverlay>
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.400')} mb="4">
            {description}
          </Text>
          <ButtonLink
            size="sm"
            href={slug}
            variant="outline"
            _hover={{
              bg: 'whiteAlpha.200',
            }}
            rightIcon={
              <Icon
                as={FiArrowRight}
                sx={{
                  transitionProperty: 'common',
                  transitionDuration: 'normal',
                  _groupHover: {
                    transform: 'translate(5px)',
                  },
                }}
              />
            }
          >
            Continue reading
          </ButtonLink>
        </Box>
      </HStack>
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

        <Stack spacing="12">
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
