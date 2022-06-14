import { Box, Center, LinkBox } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { Card, CardBody } from '@saas-ui/react'
import Link from 'next/link'

export const LinkCard = (props) => {
  const { href, children, ...rest } = props
  return (
    <Link passHref href={href}>
      <Card
        as={LinkBox}
        _hover={{
          borderColor: useColorModeValue('blackAlpha.300', 'whiteAlpha.300'),
        }}
        transitionProperty="common"
        transitionDuration="normal"
        cursor="pointer"
        {...rest}
      >
        <CardBody>{children}</CardBody>
      </Card>
    </Link>
  )
}
