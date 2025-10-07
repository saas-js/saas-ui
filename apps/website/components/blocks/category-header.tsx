'use client'

import { Category } from '@/blocks'
import { LinkButton } from '@/components/link-button'
import { Box, HStack, Heading, Icon, Link } from '@saas-ui/react'
import NextLink from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

interface CategoryHeaderProps {
  category: Category
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  // const { isAuthenticated } = useAuth()
  const isAuthenticated = true
  return (
    <HStack alignItems="start">
      <Box mb="12" flex="1">
        <Link
          as={NextLink}
          href="/blocks"
          role="group"
          display="inline-flex"
          alignItems="center"
          color="fg.muted"
          textStyle="sm"
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

        <Heading textStyle="4xl">{category.name}</Heading>
      </Box>

      {!isAuthenticated && (
        <LinkButton href="/login" size="sm" variant="outline">
          Log in
        </LinkButton>
      )}
    </HStack>
  )
}
