import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardProps,
  Checkbox,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'
import { dataAttr } from '@chakra-ui/utils'
import { FiCheck } from 'react-icons/fi'

export const PaymentSuccessful = () => {
  return (
    <Card
      display="flex"
      gap="6"
      alignItems="center"
      textAlign="center"
      position="relative"
      p="10"
    >
      <CloseButton position="absolute" top="4" right="4" />
      <Flex
        alignItems="center"
        justifyContent="center"
        rounded="full"
        h="12"
        w="12"
        bg="green.100"
        _dark={{
          bg: transparentize('green.200', 0.16),
        }}
      >
        <Icon as={FiCheck} color="green.500" fontSize="3xl" />
      </Flex>

      <VStack>
        <Heading fontWeight="medium" fontSize="xl">
          Payment was successful
        </Heading>
        <Text color="muted" fontSize="md">
          Payment has been received successful.
          <br />
          Thank you for your payment.
        </Text>
      </VStack>

      <ButtonGroup orientation="vertical" w="full">
        <Button variant="primary" w="full">
          Download Receipt
        </Button>
        <Button variant="secondary" w="full">
          Download Invoice
        </Button>
      </ButtonGroup>
    </Card>
  )
}

interface RadioCardProps extends CardProps {
  isChecked?: boolean
}

const RadioCard: React.FC<RadioCardProps> = (props) => {
  const { children, isChecked, onChange, ...rest } = props
  return (
    <Card
      p="4"
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      gap="4"
      _checked={{
        borderColor: 'primary.500',
      }}
      data-checked={dataAttr(isChecked)}
      {...rest}
    >
      <Radio isChecked={isChecked} />

      {children}
    </Card>
  )
}

export const PaymentOptions = () => {
  return (
    <RadioGroup name="paymentMethod">
      <VStack spacing="4" alignItems="stretch">
        <RadioCard isChecked>
          <VStack alignItems="flex-start" spacing="1">
            <Heading size="sm" fontWeight="semibold">
              Apple Pay
            </Heading>
            <Text color="muted" fontSize="sm">
              Pay with Apple Pay
            </Text>
          </VStack>
        </RadioCard>
        <RadioCard>
          <VStack alignItems="flex-start" spacing="1">
            <Heading size="sm" fontWeight="semibold">
              Google Pay
            </Heading>
            <Text color="muted" fontSize="sm">
              Pay with Google Pay
            </Text>
          </VStack>
        </RadioCard>
        <RadioCard>
          <VStack alignItems="flex-start" spacing="1">
            <Heading size="sm" fontWeight="semibold">
              Paypal
            </Heading>
            <Text color="muted" fontSize="sm">
              Pay with Paypal
            </Text>
          </VStack>
        </RadioCard>
        <RadioCard>
          <VStack alignItems="flex-start" spacing="1">
            <Heading size="sm" fontWeight="semibold">
              Amazon
            </Heading>
            <Text color="muted" fontSize="sm">
              Pay with Amazon
            </Text>
          </VStack>
        </RadioCard>
      </VStack>
    </RadioGroup>
  )
}
