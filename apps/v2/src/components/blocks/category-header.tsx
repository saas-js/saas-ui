import NextLink from 'next/link'
import { Heading, Link, Box, Icon, HStack } from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { Category } from '../../data/blocks'
import { FigmaButton } from './figma-button'
import { ButtonLink } from '../link'
import { useAuth } from '@saas-ui/auth'

interface CategoryHeaderProps {
  category: Category
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  const { isAuthenticated } = useAuth()
  return (
    <HStack alignItems="start">
      <Box mb="20" flex="1">
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
      <FigmaButton />
      {!isAuthenticated && (
        <ButtonLink href="/login" size="sm" variant="outline">
          Log in
        </ButtonLink>
      )}
    </HStack>
  )
}
