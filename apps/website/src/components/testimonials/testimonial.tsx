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
import { FaTwitter } from 'react-icons/fa'

interface Testimonial extends CardProps {
  name: string
  description: React.ReactNode
  avatar: string
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
        <Avatar name={name} src={avatar} size="sm" bg="transparent" />
        <Stack spacing="1" ms="4">
          <Heading size="sm">{name}</Heading>
          <Text color="muted" size="xs">
            {description}
          </Text>
        </Stack>
      </CardHeader>
      <CardBody>
        {children}

        {href && (
          <Link href={href} position="absolute" top="4" right="4">
            <FaTwitter />
          </Link>
        )}
      </CardBody>
    </Card>
  )
}
