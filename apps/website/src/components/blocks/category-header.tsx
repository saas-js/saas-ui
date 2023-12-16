import NextLink from 'next/link'
import { Heading, Link, Center, Box, Icon } from '@chakra-ui/react'
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
        role="group"
        display="inline-flex"
        alignItems="center"
        color="muted"
      >
        <Icon
          as={FiArrowLeft}
          transitionProperty="all"
          transitionDuration="normal"
          _groupHover={{
            transform: 'translateX(-4px)',
          }}
        />
        <Box as="span" ml="1">
          Back to all categories
        </Box>
      </Link>

      <Heading size="xl">{category.name}</Heading>
    </Box>
  )
}
