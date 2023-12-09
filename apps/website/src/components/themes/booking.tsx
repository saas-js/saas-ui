import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
  IconProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { OverflowMenu } from '@saas-ui/react'
import Image from 'next/image'
import { FiCheck, FiHeart } from 'react-icons/fi'

export const MoreIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </Icon>
  )
}

const CardButton = (props: ButtonProps) => (
  <Button
    bg="blackAlpha.600"
    _hover={{ bg: 'blackAlpha.500' }}
    _dark={{ bg: 'blackAlpha.600' }}
    border="0"
    {...props}
  />
)

export const HotelCard = () => {
  return (
    <Card position="relative" overflow="hidden" minHeight="320px">
      <Image
        src="/img/mountains.jpg"
        fill
        alt="Picture of south tirol mountains"
        style={{
          objectFit: 'cover',
        }}
      />
      <CardHeader>
        <ButtonGroup w="full">
          <CardButton>
            <Icon as={FiHeart} color="red.500" fill="red.500" />
          </CardButton>

          <Spacer />
          <Menu>
            <MenuButton as={CardButton}>
              <MoreIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Share</MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </CardHeader>
      <CardFooter
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        position="absolute"
        bottom="0"
        width="100%"
        bgGradient="linear(to-t, blackAlpha.900, transparent)"
        py="2"
        pt="16"
        color="white"
      >
        <Box>
          <Text color="muted" fontSize="sm">
            Italy
          </Text>
          <Heading as="h4" flex="1" size="md" fontWeight="medium">
            South Tirol
          </Heading>
          <Text color="muted" fontSize="sm">
            Hiking • Cycling • Bouldering{' '}
          </Text>
        </Box>

        <Button variant="primary">Book now</Button>
      </CardFooter>
    </Card>
  )
}
