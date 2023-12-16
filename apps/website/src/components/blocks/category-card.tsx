import cx from 'clsx'
import Link from 'next/link'
import {
  Card,
  CardBody,
  Text,
  Image,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  AspectRatio,
  Flex,
} from '@chakra-ui/react'
import { Category } from '../../data/blocks'

export interface CategoryCardProps {
  category: Category
  count: number
}

export function CategoryCard({ count, category }: CategoryCardProps) {
  const imgStyles = {}

  return (
    <Card
      as={LinkBox}
      sx={{
        '& svg[data-dark]': {
          display: 'none',
          _dark: {
            display: 'block',
          },
        },
        '& svg[data-light]': {
          _dark: {
            display: 'none',
          },
        },
      }}
      role="group"
      overflow="hidden"
    >
      <Flex
        flexDirection="column"
        bgGradient="linear(to-bl,white, gray.100)"
        _dark={{
          bg: 'black',
          bgGradient: 'linear(to-tl,transparent, whiteAlpha.50)',
        }}
        overflow="hidden"
        px="8"
        alignItems="center"
        justifyItems="center"
      >
        <>
          <Image
            src={category.images.light}
            alt="light category image"
            _dark={{ display: 'none' }}
            {...imgStyles}
          />
          <Image
            src={category.images.dark}
            alt="dark category image"
            _light={{ display: 'none' }}
            {...imgStyles}
          />
        </>
      </Flex>
      <CardBody>
        <Heading as="h4" size="sm" fontWeight="medium">
          <LinkOverlay as={Link} href={`/blocks/${category.slug}`}>
            {category.name}
          </LinkOverlay>
        </Heading>
        <Text color="muted" fontSize="sm">
          {count ?? 'No'} {count === 1 ? 'component' : 'components'}
        </Text>
      </CardBody>
    </Card>
  )
}
