import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  HStack,
  Heading,
  Icon,
  Progress,
  Tag,
  Text,
} from '@chakra-ui/react'
import { FaLinkedinIn } from 'react-icons/fa'

export const UserProfileCard = () => {
  return (
    <Card flex="1">
      <CardHeader
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt="10"
      >
        <Avatar src="/showcase-avatar.jpg" size="lg" mb="8">
          <AvatarBadge bg="#0a66c2" p="1" borderWidth="2px">
            <Icon as={FaLinkedinIn} fontSize="12" />
          </AvatarBadge>
        </Avatar>

        <Heading as="h4" fontWeight="regular" fontSize="md">
          Renata Alink
        </Heading>
        <Text color="muted" fontSize="sm">
          hello@saas-ui.dev
        </Text>
      </CardHeader>
      <CardBody display="flex" alignItems="center" justifyContent="center">
        <Tag
          bg="none"
          border="1px solid"
          borderColor="blackAlpha.100"
          color="muted"
          rounded="full"
          _dark={{
            borderColor: 'whiteAlpha.100',
          }}
        >
          <Badge rounded="full" bg="red.500" boxSize="2" me="2" /> Customer
        </Tag>
      </CardBody>
    </Card>
  )
}
