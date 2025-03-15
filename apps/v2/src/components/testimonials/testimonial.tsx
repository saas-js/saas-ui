import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { FaXTwitter } from 'react-icons/fa6'

interface Testimonial extends CardProps {
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
    <Card position="relative" {...rest}>
      <CardHeader display="flex" flexDirection="row" alignItems="center">
        <Avatar
          name={name}
          src={avatar}
          size="sm"
          bg={avatar ? 'transparent' : undefined}
        />
        <Stack spacing="0" ms="4">
          <Heading size="sm">{name}</Heading>
          <Text color="muted" size="sm">
            {description}
          </Text>
        </Stack>
      </CardHeader>
      <CardBody pt="2">
        {children}

        {href && (
          <Link href={href} position="absolute" top="4" right="4">
            <FaXTwitter />
          </Link>
        )}
      </CardBody>
    </Card>
  )
}
