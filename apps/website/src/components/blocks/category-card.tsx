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
} from '@chakra-ui/react'
import { Category } from '../../data/blocks'

export interface CategoryCardProps {
  category: Category
  count: number
}

export function CategoryCard({ count, category }: CategoryCardProps) {
  const {
    images: { light: LightImage, dark: DarkImage },
  } = category

  const imgStyles = {
    transitionProperty: 'all',
    transitionDuration: 'normal',
    _groupHover: {
      transform: 'scale(1.05)',
    },
    minHeight: '100px',
  }

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
      <Box
        bgGradient="linear(to-bl,white, gray.50)"
        _dark={{
          bg: 'whiteAlpha.100',
          bgGradient: 'linear(to-bl,transparent, whiteAlpha.50)',
        }}
        overflow="hidden"
        px="8"
      >
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
      </Box>
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
