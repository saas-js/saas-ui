import { ButtonLink } from '@/components/link'
import { ChakraLogo } from '@/components/logos/chakra'
import { FigmaLogo } from '@/components/logos/figma'
import { ReactLogo } from '@/components/logos/react'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'

export default function Home() {
  return (
    <Box _light={{ bg: '#f3f3f5' }}>
      <Container
        maxW="container.2xl"
        fontFamily="figtree"
        px="8"
        position="relative"
        zIndex="1"
      >
        <Stack
          py="32"
          spacing="4"
          maxW="container.md"
          textAlign="center"
          alignItems="center"
          margin="0 auto"
        >
          <Heading size="2xl">
            Build your Build intuitive apps that your{' '}
            <Text as="span">customers will love</Text>
          </Heading>

          <Text color="muted" fontSize="2xl" maxW="container.sm">
            Saas UI is a React component library and starterkit that
            doesn&apos;t get in your way and helps you build intuitive SaaS
            products with speed.
          </Text>

          <HStack pt="8" pb="8" spacing="8" justifyContent="center">
            <HStack>
              <ReactLogo height="24px" />
              <Text fontWeight="medium">React</Text>
            </HStack>
            {/* <ChakraLogo height="24px" /> */}
            <FigmaLogo height="24px" />
          </HStack>

          <ButtonGroup mt="8">
            <Button variant="primary" size="lg">
              View pricing
            </Button>
            <ButtonLink
              size="lg"
              href="/docs"
              variant="outline"
              fontFamily="mono"
              fontWeight="regular"
              _hover={{
                bg: 'whiteAlpha.200',
              }}
              rightIcon={
                <Icon
                  as={FiArrowRight}
                  sx={{
                    transitionProperty: 'common',
                    transitionDuration: 'normal',
                    '.chakra-button:hover &': {
                      transform: 'translate(5px)',
                    },
                  }}
                />
              }
            >
              npm i @saas-ui/react
            </ButtonLink>
          </ButtonGroup>
        </Stack>
      </Container>
      <Box>
        <Image src="/screenshots/list.png" width="100%" alt="dashboard image" />
      </Box>
      {/* <Box
        width="120vw"
        height="100vh"
        transform="auto"
        translateX="3%"
        position="relative"
      >
        <Image
          position="absolute"
          top="-75vh"
          src="/Macbook_Air_Mockup_1.jpg"
          width="100%"
          alt="dashboard image"
        />
      </Box> */}
    </Box>
  )
}
