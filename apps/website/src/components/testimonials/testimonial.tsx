import { Avatar } from '@chakra-ui/react'
import { Card, CardBody } from '@saas-ui/react'

export const Testimonial = ({
  name,
  description,
  avatar,
  children,
  ...rest
}) => {
  return (
    <Card
      avatar={<Avatar name={name} src={avatar} bg="transparent" />}
      title={name}
      subtitle={description}
      {...rest}
    >
      <CardBody>{children}</CardBody>
    </Card>
  )
}
