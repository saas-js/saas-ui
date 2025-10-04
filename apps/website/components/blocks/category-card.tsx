import { Category } from '@/blocks'
import {
  Card,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from '@saas-ui/react'
import Link from 'next/link'

export interface CategoryCardProps {
  category: Category
  count: number
}

export function CategoryCard({ count, category }: CategoryCardProps) {
  const imgStyles = {}

  return (
    <LinkBox asChild>
      <Card.Root
        role="button"
        tabIndex={-1}
        css={{
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
        overflow="hidden"
      >
        <Flex
          flexDirection="column"
          bgGradient="to-bl"
          gradientFrom="white"
          gradientTo="gray.50"
          _dark={{
            bg: 'black',
            gradientFrom: 'transparent',
            gradientTo: 'white/5',
          }}
          overflow="hidden"
          px="8"
          alignItems="center"
          justifyItems="center"
        >
          <>
            <Image
              src={category.images.light.src}
              alt="light category image"
              _dark={{ display: 'none' }}
              {...imgStyles}
            />
            <Image
              src={category.images.dark.src}
              alt="dark category image"
              _light={{ display: 'none' }}
              {...imgStyles}
            />
          </>
        </Flex>
        <Card.Body borderTopWidth="1px" borderColor="border.subtle">
          <Heading as="h4" size="sm" fontWeight="medium">
            <LinkOverlay asChild>
              <Link href={`/blocks/${category.slug}`}>{category.name}</Link>
            </LinkOverlay>
          </Heading>
          <Text color="muted" fontSize="sm">
            {count ?? 'No'} {count === 1 ? 'component' : 'components'}
          </Text>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  )
}
