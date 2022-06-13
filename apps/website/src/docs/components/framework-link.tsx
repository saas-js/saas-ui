import {
  Box,
  Center,
  Link as ChakraLink,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import {
  BlitzSvg,
  CreateReactAppSvg,
  NextjsSvg,
  RedwoodSvg,
  RemixSvg,
  ViteSvg,
} from './framework-svg'

const FrameworkLink = (props) => {
  const { accentColor, href, children, name } = props
  return (
    <Link passHref href={href}>
      <ChakraLink
        textDecoration="none"
        _hover={{ textDecoration: 'none', transform: 'scale(1.1)' }}
      >
        <Box boxShadow="md" bg="white" borderRadius="lg" pt="4">
          {children}

          <Center
            bg={accentColor}
            borderBottomStartRadius="lg"
            borderBottomEndRadius="lg"
            height="30px"
            mt="4"
          >
            <Text color="white" fontSize="sm" fontWeight="bold">
              {name}
            </Text>
          </Center>
        </Box>
      </ChakraLink>
    </Link>
  )
}

export const FrameworkLinks = () => {
  return (
    <SimpleGrid mt="12" minChildWidth="160px" spacing="40px" fontSize="6xl">
      <FrameworkLink
        href="/docs/installation/cra-guide"
        accentColor="#0AC09D"
        name="Create React App"
      >
        <CreateReactAppSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/nextjs-guide"
        accentColor="black"
        name="Next.js"
      >
        <NextjsSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/blitzjs-guide"
        accentColor="#6700EB"
        name="BlitzJS"
      >
        <BlitzSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/redwoodjs-guide"
        accentColor="#BF4722"
        name="RedwoodJS"
      >
        <RedwoodSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/remix-guide"
        accentColor="#121212"
        name="Remix"
      >
        <RemixSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/vite-guide"
        accentColor="#C07600"
        name="Vite"
      >
        <ViteSvg style={{ margin: 'auto' }} />
      </FrameworkLink>
    </SimpleGrid>
  )
}
