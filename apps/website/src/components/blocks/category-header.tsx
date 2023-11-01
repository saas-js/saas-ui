import NextLink from 'next/link'
import { Heading, Link, Center, Box } from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { Category } from '../../data/blocks'

interface CategoryHeaderProps {
  category: Category
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <Box mb="20">
      <Link
        as={NextLink}
        href="/blocks"
        display="inline-flex"
        alignItems="center"
        color="muted"
      >
        <FiArrowLeft size="0.9rem" />
        <Box as="span" ml="1">
          Back to all categories
        </Box>
      </Link>

      <Heading size="xl">{category.name}</Heading>
    </Box>
  )
}
