import { transparentize } from '@chakra-ui/theme-tools'
import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Progress,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { FiChevronUp } from 'react-icons/fi'

export const Revenue = () => {
  return (
    <Card>
      <CardBody>
        <Stat mb="2">
          <StatLabel>Total revenue</StatLabel>
          <Flex alignItems="center" gap="2">
            <StatNumber>$76,000.00</StatNumber>

            <StatHelpText
              rounded="full"
              px="2"
              fontWeight="medium"
              fontSize="sm"
              bg="green.100"
              color="green.600"
              margin="0"
              _dark={{
                bg: transparentize('green.200', 0.16),
                color: 'green.300',
              }}
            >
              <Icon as={FiChevronUp} />
              9.6%
            </StatHelpText>
          </Flex>
        </Stat>
        <Progress value={60} w="full" h="2" />
      </CardBody>
    </Card>
  )
}
