import { Icon, Link, SimpleGrid, Text } from '@chakra-ui/react'

import NextLink from 'next/link'
import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const PaginationLink = (props: any) => {
  const { label, href, children, ...rest } = props

  return (
    <NextLink href={href || '#'} passHref legacyBehavior>
      <Link
        _hover={{
          textDecor: 'none',
          bg: 'blackAlpha.50',
          _dark: {
            bg: 'whiteAlpha.50',
          },
        }}
        flex="1"
        borderRadius="md"
        borderWidth="1px"
        px="3"
        py="2"
        {...rest}
      >
        <Text fontSize="sm" px="2" color="muted">
          {label}
        </Text>
        <Text mt="1" fontSize="lg" fontWeight="semibold">
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}

export const Pagination = ({ previous, next, ...rest }: any) => {
  return (
    <SimpleGrid
      as="nav"
      aria-label="Pagination"
      spacing="80px"
      my="64px"
      columns={2}
      {...rest}
    >
      {previous ? (
        <PaginationLink
          textAlign="left"
          label="Previous"
          href={previous.path}
          rel="prev"
        >
          <Icon as={FiChevronLeft} mr="1" fontSize="1.2em" />
          {previous.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink
          textAlign="right"
          label="Next"
          href={next.path}
          rel="next"
        >
          {next.title}
          <Icon as={FiChevronRight} ml="1" fontSize="1.2em" />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}

export default Pagination
