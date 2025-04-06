import { Blog } from '@/.velite'
import { formatBlogDate, getBlogAuthor } from '@/lib/blog'
import { Box, Button, Card, Flex, Stack, Text } from '@chakra-ui/react'
import { Avatar, AvatarGroup } from '@saas-ui/react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  data: Blog
}

export const BlogCard = (props: Props) => {
  const { data } = props
  const { title, description, authors, publishedAt } = data
  return (
    <Card.Root size="sm">
      <Box h="40" bg="bg.subtle" borderTopRadius="md" overflow="hidden">
        <Image
          src={`/og?title=${title}`}
          alt={title}
          objectFit="cover"
          objectPosition="center"
          width={340}
          height={200}
        />
      </Box>
      <Card.Body>
        <Stack gap="1" fontSize="sm" height="full">
          <Flex gap="2" justify="space-between" alignItems="center">
            <Text textStyle="xs" color="fg.subtle">
              {formatBlogDate(publishedAt)}
            </Text>
            <AvatarGroup size="xs">
              {authors.map((author) => {
                const { name, image } = getBlogAuthor(author)
                return <Avatar key={author} src={image} name={name} />
              })}
            </AvatarGroup>
          </Flex>
          <Card.Title mt="1">
            <Link href={`/${data.slug}`}>{title}</Link>
          </Card.Title>
          <Card.Description flex="1">{description}</Card.Description>
          <Button asChild variant="subtle" mt="4" size="sm">
            <Link href={`/${data.slug}`}>Read more</Link>
          </Button>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}
