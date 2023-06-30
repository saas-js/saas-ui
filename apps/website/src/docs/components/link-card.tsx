import { Box, Card, CardBody, Center, LinkBox } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import Link from 'next/link'

export const LinkCard = (props) => {
  const { href, children, ...rest } = props
  return (
    <Link passHref href={href} legacyBehavior>
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
