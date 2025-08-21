import { formatBlogDate, getBlogAuthor } from '@/lib/blog'
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Flex,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VisuallyHidden,
} from '@saas-ui/react'
import { Avatar, AvatarGroup } from '@saas-ui/react'
import { Blog } from 'content-collections'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  data: Blog
  aspectRatio?: number
}

export const BlogCard = (props: Props) => {
  const { data, aspectRatio = 16 / 9 } = props
  const { title, description, authors, publishedAt } = data
  return (
    <LinkBox asChild>
      <Card.Root size="lg" _hover={{ borderColor: 'border.emphasized' }}>
        <AspectRatio
          ratio={aspectRatio}
          bg="bg.subtle"
          borderTopRadius="md"
          overflow="hidden"
        >
          <Image
            src={`/og?title=${title}`}
            alt={title}
            objectFit="cover"
            objectPosition="center"
            width={340}
            height={340 * aspectRatio}
          />
        </AspectRatio>
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
            <Card.Title mt="1" fontSize="xl">
              <LinkOverlay asChild href={`/${data.slug}`}>
                <Link href={`/blog/${data.slug}`}>{title}</Link>
              </LinkOverlay>
            </Card.Title>
            <VisuallyHidden>
              <Card.Description flex="1">{description}</Card.Description>
            </VisuallyHidden>
          </Stack>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  )
}
