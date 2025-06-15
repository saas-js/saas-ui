import { XIcon } from '@/components/icons/x-icon'
import { Avatar, Card, Heading, Stack, Text } from '@saas-ui/react'
import Link from 'next/link'

interface Testimonial extends Card.RootProps {
  name: string
  description: React.ReactNode
  avatar?: string
  href?: string
  children?: React.ReactNode
}

export const Testimonial = ({
  name,
  description,
  avatar,
  href,
  children,
  ...rest
}: Testimonial) => {
  return (
    <Card.Root position="relative" {...rest}>
      <Card.Header display="flex" flexDirection="row" alignItems="center">
        <Avatar
          name={name}
          src={avatar}
          size="sm"
          bg={avatar ? 'transparent' : undefined}
        />
        <Stack gap="0" ms="4">
          <Heading size="sm">{name}</Heading>
          <Text color="fg.muted" textStyle="sm">
            {description}
          </Text>
        </Stack>
      </Card.Header>
      <Card.Body pt="2">
        {children}

        {/* {href && (
          <Link href={href} position="absolute" top="4" right="4">
            <XIcon />
          </Link>
        )} */}
      </Card.Body>
    </Card.Root>
  )
}
