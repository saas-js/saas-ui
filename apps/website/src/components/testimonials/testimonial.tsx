import { Avatar } from '@chakra-ui/react'
import { Card, CardBody, CardProps, Link } from '@saas-ui/react'
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
    <Card
      position="relative"
      avatar={<Avatar name={name} src={avatar} bg="transparent" />}
      title={name}
      subtitle={description}
      {...rest}
    >
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
