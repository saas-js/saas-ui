'use client'

import { Box, Button, Card, Icon, Text } from '@saas-ui/react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export const QuickLink = (props: {
  href: string
  title: string
  description: string
  label?: string
  icon?: React.ReactNode
}) => {
  const {
    href,
    title,
    description,
    label = 'Learn more...',
    icon,
    ...rest
  } = props

  return (
    <Card.Root asChild mt="0" {...rest}>
      <Link href={href}>
        <Card.Body>
          {icon && (
            <Box w="24px" h="24px" mb="4" fontSize="xl" color="primary.500">
              {icon}
            </Box>
          )}
          <Text fontWeight="semibold" mb="1">
            {title}
          </Text>
          <Text color="muted" fontSize="md" mb="4">
            {description}
          </Text>
          <Button
            variant="link"
            color="inherit"
            rightIcon={
              <Icon
                as={FiArrowRight}
                mt="1px"
                transform="translateX(-5px)"
                transitionProperty="common"
                transitionDuration="fast"
                css={{ '.chakra-card:hover &': { transform: 'translateX(0)' } }}
              />
            }
            _hover={{
              textDecoration: 'none',
            }}
          >
            {label}
          </Button>
        </Card.Body>
      </Link>
    </Card.Root>
  )
}
