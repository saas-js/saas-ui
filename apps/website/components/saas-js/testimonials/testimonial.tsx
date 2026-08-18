import { Avatar } from '#components/ui/avatar'
import { Card, Stack, Text } from '@chakra-ui/react'

interface Testimonial extends Card.RootProps {
  name: string
  description: React.ReactNode
  avatar?: string
  children?: React.ReactNode
}

export const Testimonial = ({
  name,
  description,
  avatar,
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
          <Text textStyle="sm" fontWeight="semibold">
            {name}
          </Text>
          <Text color="fg.muted" textStyle="sm">
            {description}
          </Text>
        </Stack>
      </Card.Header>
      <Card.Body pt="2">
        {children}
      </Card.Body>
    </Card.Root>
  )
}
